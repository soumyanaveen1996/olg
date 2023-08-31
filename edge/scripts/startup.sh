readonly DB_LOCATION=db/data
if [ ! -d $DB_LOCATION ]
then
    mkdir -p $DB_LOCATION
fi

readonly DB_LOG_LOCATION=db/log
if [ ! -d $DB_LOG_LOCATION ]
then
    mkdir -p $DB_LOG_LOCATION
fi

readonly mongoPID=$(pgrep mongod)
if [[ -n $mongoPID ]]; then
    echo "MongoDB is already running."
else
    echo "Starting MongoDB without auth"
    mongod --fork --dbpath ${DB_LOCATION} --logpath ${DB_LOG_LOCATION}/mongod.log
#    echo "use admin ; db.dropUser({'admin'}) ; db.createUser({user: 'admin', pwd: 'test', roles: [ { role: 'userAdminAnyDatabase', db: 'admin' } ]}) ;" | mongosh --norc --quiet
#    echo "quit;" | mongosh --norc --quiet
#    echo "Restarting MongoDB with auth"
#    "$(pwd)"/localsetup/mongo-shutdown.sh
#    mongod --fork --auth --dbpath db --logpath log/mongod.log
fi

readonly redisStatus=$(brew services list | grep redis | awk '{print $2}')
if [ "$redisStatus" == 'started' ]
then
    echo "Redis is already running."
else
    echo "Starting Redis"
    brew services start redis
fi

echo "Installing node dependencies"
npm install

echo "Loading the DB"
node "$(pwd)"/scripts/runDataSync.js

echo "Creating env file"
readonly envFile="$(pwd)"'/.env'
readonly JWT_SECRET=$(xxd -l 50 -c 50 -p /dev/urandom)
echo "JWT_SECRET=$JWT_SECRET" > "$envFile"


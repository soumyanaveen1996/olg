readonly mongoPID=$(pgrep mongod)
if [[ -n "$mongoPID" ]]; then
  echo "Stopping Mongo"
  kill -2 "$mongoPID"
  echo "MongoDB is shutdown successfully"
else
  echo "MongoDB is already shutdown"
fi

echo "Stopping Redis"
brew services stop redis
echo "Redis is shutdown successfully"
## NEW: script to build the images
To automate the process there are 2 scripts
The first script is `build.sh` that will build the images, export and generate
the `out.zip` file. The `out.zip` file is the one to share with the client

To call the `build.sh` script with parameters for the docker build, you can pass one of these values.

 1. `dev_frontm` - Default. docker build with edge server + DEV API gateway and web app + "localhost:4001" edge server url
 2. `dev_olg` - docker build to run on client machine (with proxy). docker build with edge server + DEV API gateway and web app + "proxy" edge server url
 3. `prod_frontm` - docker build with edge server + PROD API gateway and web app + "localhost:4001" edge server url
 4. `prod_olg` - docker build to run on client machine (with proxy). docker build with edge server + PROD API gateway and web app + "proxy" edge server url

The second script `cleanup.sh` is a script to delete all the current images related to the project

To run the scripts first make the script executable: chmod +x build.sh and chmod +x cleanup.sh 

## Option 2: manually export and share the images:

 1. Run `docker compose up`
 2. Run `docker ps` and check the docker container ids
 3. Commit each container running `docker commit <id> tag`:

```bash
docker commit <id1> edge
docker commit <id2> webapp
docker commit <id3> redis-frontm
docker commit <id4> mongo-frontm
```

4. Run: `docker save webapp edge mongo redis -o ./out/out.tar`. 

5. Compress the out folder. That zip file is the one to be shared


## To import the images follow the next steps:

1. Download the zip file created in the previous step
2. Extract the file and open a terminal in the extracted folder
3. Run: `docker load --input ./out.tar `
4. Run: `docker compose up` (use -d option if you want to detach the terminal)
5. The webapp can be accessed in `localhost:8080` 

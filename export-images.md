## To export and share the images follow the next steps:

 1. Run `docker compose up`
 2. Run `docker ps` and check the docker container ids
 3. Commit each container running `docker commit <id> tag`:

```bash
docker commit <id1> edge
docker commit <id2> webapp
docker commit <id3> redis
docker commit <id4> mongo
```

4. Run: `docker save webapp edge mongo redis -o ./out/out.tar`. 

5. Compress the out folder. That zip file is the one to be shared


## To import the images follow the next steps:

1. Download the zip file created in the previous step
2. Extract the file and open a terminal in the extracted folder
3. Run: `docker load --input ./out.tar `
4. Run: `docker compose up` (use -d option if you want to detach the terminal)
5. The webapp can be accessed in `localhost:8080` 

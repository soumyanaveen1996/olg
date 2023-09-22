#!/bin/bash

echo "Removing images"
docker image rm edge webapp mongo-frontm redis-frontm redis:alpine mongo -f 



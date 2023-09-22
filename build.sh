#!/bin/bash

OUT="out.zip"

echo "Building images"
docker compose build
docker compose pull mongo redis

echo "Exporting images"
docker image tag mongo mongo-frontm
docker image tag redis:alpine redis-frontm
docker save edge webapp mongo-frontm redis-frontm -o ./out/out.tar

zip -r $OUT ./out

echo "Build generated $OUT"

#!/bin/bash

OUT="out.zip"

DEFAULT_BUILD_TYPE="dev_frontm"
dev_frontm='--build-arg="EDGE_BUILD_TYPE=dev" --build-arg="WEBAPP_BUILD_TYPE=docker_frontm"'
dev_olg='--build-arg="EDGE_BUILD_TYPE=dev" --build-arg="WEBAPP_BUILD_TYPE=docker_olg"'
prod_frontm='--build-arg="EDGE_BUILD_TYPE=prod" --build-arg="WEBAPP_BUILD_TYPE=docker_frontm"'
prod_olg='--build-arg="EDGE_BUILD_TYPE=prod" --build-arg="WEBAPP_BUILD_TYPE=docker_olg"'

input_build_type=${1:-$DEFAULT_BUILD_TYPE}
echo "input_build_type = ${input_build_type}"

echo "Building images"
echo "Using build args: ${!input_build_type}"
docker compose build "${!input_build_type}"
docker compose pull mongo redis

echo "Exporting images"
docker image tag mongo mongo-frontm
docker image tag redis:alpine redis-frontm
docker save edge webapp mongo-frontm redis-frontm -o ./out/out.tar

zip -r $OUT ./out

echo "Build generated $OUT"

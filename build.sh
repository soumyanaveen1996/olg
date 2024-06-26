#!/bin/bash


echo "input_build_type = $1"
echo "input_builddomain_type = $2"

case $1 in
    dev_frontm)
        build_args="--build-arg EDGE_BUILD_TYPE=dev --build-arg WEBAPP_BUILD_TYPE=docker_frontm --build-arg DOMAIN=$2"
        ;;
    dev_olg)
        build_args="--build-arg EDGE_BUILD_TYPE=dev --build-arg WEBAPP_BUILD_TYPE=docker_olg  --build-arg DOMAIN=$2"
        ;;
    prod_frontm)
        build_args="--build-arg EDGE_BUILD_TYPE=prod --build-arg WEBAPP_BUILD_TYPE=docker_frontm --build-arg DOMAIN=$2"
        ;;
    prod_olg)
        build_args="--build-arg EDGE_BUILD_TYPE=prod --build-arg WEBAPP_BUILD_TYPE=docker_olg --build-arg DOMAIN=$2"
        ;;
    *)
        echo "Unknown build type: $1 or domain type: $2"
        exit 1
        ;;
esac

echo "Building images"
echo "Using build args: ${build_args}"
docker-compose build --no-cache ${build_args}
docker-compose pull mongo redis

echo "Exporting images"
docker image tag mongo:4.4.6 mongo-frontm
docker image tag redis:alpine redis-frontm
docker save edge webapp mongo-frontm redis-frontm -o ./out/out.tar

zip -r $OUT ./out

echo "Build generated $OUT" 
 
~                   

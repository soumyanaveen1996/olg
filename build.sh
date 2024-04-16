#!/bin/bash

DEFAULT_BUILD_TYPE="dev_frontm"


input_build_type=${1:-$DEFAULT_BUILD_TYPE}
input_builddomain_type=${2:-$DEFAULT_BUILDDOMAIN_TYPE}

echo "input_build_type = ${input_build_type}"
echo "input_builddomain_type = ${input_builddomain_type}"

case ${input_build_type} in
    dev_frontm)
        build_args="--build-arg EDGE_BUILD_TYPE=dev --build-arg WEBAPP_BUILD_TYPE=docker_frontm --build-arg DOMAIN=${input_builddomain_type}"
        ;;
    dev_olg)
        build_args="--build-arg EDGE_BUILD_TYPE=dev --build-arg WEBAPP_BUILD_TYPE=docker_olg --build-arg DOMAIN=${input_builddomain_type}"
        ;;
    prod_frontm)
        build_args="--build-arg EDGE_BUILD_TYPE=prod --build-arg WEBAPP_BUILD_TYPE=docker_frontm --build-arg DOMAIN=${input_builddomain_type}"
        ;;
    prod_olg)
        build_args="--build-arg EDGE_BUILD_TYPE=prod --build-arg WEBAPP_BUILD_TYPE=docker_olg --build-arg DOMAIN=${input_builddomain_type}"
        ;;
    *)
        echo "Unknown build type: ${input_build_type} or domain type: ${input_builddomain_type}"
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
                     

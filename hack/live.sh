#!/bin/sh

# Check if docker is running
docker_state=$(docker info >/dev/null 2>&1)
if [[ $? -ne 0 ]]; then
    echo "Docker does not seem to be running, run it first and retry"
    exit 1
fi

# Set tag for docker image
export TAG="latest"
echo $1
if [ $1 ] ; then
  TAG=$1
fi

# Set docker port
export dPort=3000
echo $1
if [ $1 ] ; then
  dPort=$1
fi

docker container run -it -p $dPort:$dPort -p 35729:35729 -v $(pwd):/react-social qolzam/react-social:$TAG
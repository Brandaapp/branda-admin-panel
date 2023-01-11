#!/bin/bash
#///////////////////////////////////////////////////////////////////////////////////////////////////////#
#
# creates docker container of mongodb database and runs tests using containerized mongo instance
#
# learn docker: https://www.youtube.com/watch?v=gAkwW2tuIqE&t=401s&ab_channel=Fireship 
#
# Prerequisites: docker
# you can check if docker is installed with "docker --version"
#
# installing docker: 
#
# MacOS: brew install docker
# if you don't have homebrew, get it! Its a package manager for Mac (think npm but bigger)
# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
#
# Windows: ? (google it)
#
# Linux: sudo apt install docker
# snap install docker 
# apt install docker.io
#
#///////////////////////////////////////////////////////////////////////////////////////////////////////#

name=mongo_test_server

# checks if docker is installed
if ! sudo docker --version > /dev/null 
then
    echo "Error: Docker is not installed"
    exit 1
fi

# pulls mongo image from docker
sudo docker pull mongo > /dev/null 2>&1

# deletes any previous containers with the same name
sudo docker rm -f "$name" > /dev/null 2>&1

# starts container, or if does not exist, will create it and run it
if ! sudo docker run -p 8080:27017 --name "$name" -d mongo > /dev/null
then 
    echo "Failed to connect to docker container running mongodb instance"
    exit 1
fi

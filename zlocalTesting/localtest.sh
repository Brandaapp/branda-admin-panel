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
(sudo docker --version > /dev/null && \

# pulls mongo image from docker
sudo docker pull mongo > /dev/null 2>&1 ; \

# deletes any previous containers with the same name
sudo docker rm -f "$name" > /dev/null 2>&1 ; \
# starts container, or if does not exist, will create it and run it
# ignore the error messages: Should be connected at part 8080
sudo docker run -p 8080:27017 --name "$name" -d mongo > /dev/null && \

# enter the container ISSUE: script ends once entering the 
# gain access to the mongo shell
echo "Connected at http://localhost:8080" && \
echo "Running tests:\n" && \

# TODO: run tests

node ./zlocalTesting/runTests.mjs && \
    
echo "\nTests complete" && \
# end container process and delete container
sudo docker stop "$name" > /dev/null && \
sudo docker rm -f "$name" > /dev/null) || "An issue has happened, please check that you have docker installed"
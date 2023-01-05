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
#
#///////////////////////////////////////////////////////////////////////////////////////////////////////#

name=mongo_test_server

# pulls mongo image from docker
sudo docker pull mongo | \

# deletes any previous containers with the same name
sudo docker rm -f "$name" | \
# starts container, or if does not exist, will create it and run it
# ignore the error messages: Should be connected at part 8080
sudo docker start "$name" || sudo docker run -p 8080:27017 --name "$name" -d mongo && \

# enter the container ISSUE: script ends once entering the 
# gain access to the mongo shell
echo "Connected at http://localhost:8080"
sleep 10

#TODO: make mongo avaliable outside the container
    
# TODO: run tests

# end container process
sudo docker stop "$name"
sudo docker rm -f "$name"
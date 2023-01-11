# end container process and delete container
name=mongo_test_server

if ! sudo docker stop "$name" > /dev/null
then 
    echo "Error stopping mongo container"
    exit 1
fi

if ! sudo docker rm -f "$name" > /dev/null
then
    echo "Error deleting mongo container"
    exit 1
else
    exit 0
fi
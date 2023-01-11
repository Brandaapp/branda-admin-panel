#!/bin/bash

if ! sh zlocalTesting/startMongoServer.sh
then
    echo "Error starting Dockerized Mongo Server"
    exit 1
fi

if ! node zlocalTesting/runAllTests.mjs
then
    echo 'Error running Tests'
    exit 1
fi

if ! sh zlocalTesting/endMongoServer.sh
then
    echo 'Error stopping dockerized mongo server'
    exit 1
else
    echo 'Success'
    exit 0
fi

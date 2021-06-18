#!/bin/sh


if [ $1 == "test" ]
then
   npm run test
elif [ $1 == "start" ]
then
   if [ -n "$(docker images -q backend-test-karan_string-format:latest)" ]
   then
      docker rmi --force backend-test-karan_string-format
   fi
   docker-compose up
elif [ $1 == "dev" ]
then
   npm run dev
else
    echo "try again with proper param (test, dev, start)"
fi
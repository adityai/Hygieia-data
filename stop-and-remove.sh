#!/bin/bash
echo 'Stopping all docker containers...'
docker stop $(docker ps -a -q)
echo 'Removing all docker containers...'
docker rm $(docker ps -a -q)
echo 'Removing mongo db folder...'
rm -rf mongo/
echo 'Done!'

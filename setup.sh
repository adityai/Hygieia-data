#!/bin/bash
echo 'Creating Mongo DB container and starting...'
docker-compose up -d mongodb
sleep 7
echo 'Creating Mongo DB user...'
docker exec mongodb mongo localhost/admin  --eval 'db.getSiblingDB("dashboard").createUser({user: "db", pwd: "dbpass", roles: [{role: "readWrite", db: "dashboard"}]})'
echo 'Creating Hygieia API and starting...'
docker-compose up -d
echo 'Running Add Dashboard core scripts...'
node utilities/add-dashboard.js
echo 'Running Add Data scripts...'
node utilities/add-data.js
echo 'Done!'
echo 'Next steps:  From Hygieia/UI, run gulp serve for development'

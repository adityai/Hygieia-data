# Hygieia-data
This repos sets up mock data for [Hygieia](https://github.com/capitalone/Hygieia).  It uses docker containers authorized by [Liatrio](https://hub.docker.com/u/liatrio/), setups up the Mongo DB and loads up data for 30 days.

## Collector Data
Data exists for:
* Builds
* Commits
* Code Quality

## Docker compose for API + DB
These scripts use docker compose to create containers for the Mongo DB + Hygieia API only.  Use Hygieia's UI for active development.

### Setup
Run `setup.sh` which will create a mongodb docker container, create admin user account and run data creation scripts.

### Stop and Remove
When done, or if you want to reload with active current data, run `stop-and-remove.sh`.

### Connect to Mongo Docker container
Execute `connect-mongo.sh` to connect to the mongo db container directly.   Type in `mongo` to get the mongo shell and run your own commands. 

# Hygieia-data
This repos sets up mock data for [Hygieia](https://github.com/capitalone/Hygieia).  It uses docker containers authored by [Liatrio](https://hub.docker.com/u/liatrio/), sets up a Mongo DB container and loads up data for 30 days.  It also will fire up the Hygieia API for use in your development or local run.

## Setup
Run `npm i` to install the node modules needed.

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

## Dashboard properties
These docker containers have one shared dashboard properties file for easy setup.  If collector development is desired, you can use the docker containers from [Liatrio](https://hub.docker.com/u/liatrio/) and edit your docker compose file.

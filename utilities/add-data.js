var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Mongo = require('./mongo');
var Builds = require('../collections/builds');
var Commits = require('../collections/commits');
var CodeQuality = require('../collections/code-quality');

var url = 'mongodb://localhost:27017/dashboard';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  noDaysBack = 90;
  insertBuilds(noDaysBack, db, function() {
    insertCommits(noDaysBack, db, function() {
      insertCodeQuality(db, function() {
        db.close();
      });
    });
  });

});

var insertBuilds = function(noDaysBack, db, callback) {
  Mongo.createCollection('builds', db, function() {
    Builds.buildDocuments(noDaysBack, function(documents) {
      console.log('Builds to insert:', documents.length);
      Mongo.insertDocuments('builds', documents, db, function() {
        callback(true);
      });
    });
  });
}

var insertCommits = function(noDaysBack, db, callback) {
  Mongo.createCollection('commits', db, function() {
    Commits.buildDocuments(noDaysBack, function(documents) {
      console.log('Commits to insert:', documents.length);
      Mongo.insertDocuments('commits', documents, db, function() {
        callback(true);
      });
    });
  });
}

var insertCodeQuality = function(db, callback) {
  Mongo.createCollection('code_quality', db, function() {
    CodeQuality.buildDocuments(function(documents) {
      Mongo.insertDocuments('code_quality', documents, db, function() {
        callback(true);
      });
    });
  });
}

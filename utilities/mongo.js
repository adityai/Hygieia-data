var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var Mongo = {
  createCollection: function(collection, db, callback) {
    // Get the documents collection
    db.createCollection(collection, function(err, result) {
      callback(true);
    });
  },
  findDocuments: function(collection, db, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.dir(docs);
      callback(docs);
    });
  },
  insertDocuments: function(collectionName, documents, db, callback) {
    // Get the documents collection
    var collection = db.collection(collectionName);

    // Insert some documents
    collection.insertMany(documents, function(err, result) {
      assert.equal(err, null);
      console.log("Inserted " + result.result.n + " documents into the " + collectionName + " collection");
      callback(result);
    });
  },
  insertOne: function(collectionName, document, db, callback) {
    // Get the documents collection
    var collection = db.collection(collectionName);

    // Insert some documents
    collection.insertOne(document, function(err, result) {
      assert.equal(err, null);
      console.log("Inserted " + result.result.n + " documents into the " + collectionName + " collection");
      callback(result);
    });
  }
};

module.exports = Mongo;

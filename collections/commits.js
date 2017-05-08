var faker = require('faker');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectId;
var Long = require('mongodb').Long;

var Commits = {
  buildDocuments: function(noDaysBack, callback) {
    var docs = [];
    for(var i=0; i<=noDaysBack; i++) {
      var numberCommits = faker.random.number({
        'min': 0,
        'max': 10
      });
      for (var no=0; no<=numberCommits; no++) {
        var document = this.getDocument(no, i);
        docs.push(document);
      }
    }
    callback(docs);
  },
  getDocument: function(no, daysBack) {
    daysBack = Math.abs(daysBack) * -1;
    var docTime = moment().add(daysBack, 'days').add(no, 'hours').unix();
    docTime = docTime + "000";
    var docTimestamp = new Long.fromString(docTime);

    return {
      "collectorItemId" : new ObjectId("5888dc69c9e77c00060fa18c"),
      "timestamp" : docTimestamp,
      "scmUrl" : "https://github.com/scm/my-product.git",
      "scmBranch" : "master",
      "scmRevisionNumber" : faker.random.uuid(),
      "scmCommitLog" : faker.random.words(),
      "scmAuthor" : faker.name.findName(),
      "scmParentRevisionNumbers" : [
        faker.random.uuid()
      ],
      "scmCommitTimestamp" : docTimestamp,
      "numberOfChanges" : new Long(1)
    };
  }
};
module.exports = Commits;

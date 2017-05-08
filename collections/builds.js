var faker = require('faker');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectId;
var Long = require('mongodb').Long;

var Builds = {
  buildDocuments: function(noDaysBack, callback) {
    var docs = [], buildNo = 0;
    for(var i=0; i<=noDaysBack; i++) {
      var numberBuilds = faker.random.number({
        'min': 0,
        'max': 10
      });
      for (var no=0; no<=numberBuilds; no++) {
        buildNo++;
        var document = this.getDocument(no, buildNo, i);
        docs.push(document);
      }
    }
    callback(docs);
  },
  getDocument: function(no, buildNo, daysBack) {
    var name = faker.name.findName();
    daysBack = Math.abs(daysBack) * -1;
    var buildTime = moment().add(daysBack, 'days').add(no, 'hours').unix();
    var duration = faker.random.number({
      'min': 2000,
      'max': 3000
    });;
    var endTime = buildTime + duration;
    buildTime = buildTime + "000";
    endTime = endTime + "000";
    duration = new Long(duration);
    // console.log('Build No: ', buildNo, 'Build time: ', buildTime);
    var commitTimestamp = new Long.fromString(buildTime);
    var startTime = commitTimestamp;
    endTime = new Long.fromString(endTime);

    return {
      "collectorItemId" : new ObjectId("58b60f4acff47e000750eec4"),
      "timestamp" : commitTimestamp,
      "number": buildNo,
      "buildUrl" : "https://jenkins.com/job/test-job/1/",
      "startTime" : startTime,
      "endTime" : endTime,
      "duration" : duration,
      "buildStatus" : "Success",
      "startedBy" : name,
      "log" : faker.random.words(),
      "codeRepos" : [
          {
              "url" : "https://github.com/scm/my-product",
              "branch" : "master",
              "type" : "GIT"
          }
      ],
      "sourceChangeSet" : [
          {
              "scmRevisionNumber" : faker.random.uuid(),
              "scmCommitLog" : faker.random.words(),
              "scmAuthor" : name,
              "scmCommitTimestamp" : commitTimestamp,
              "numberOfChanges" : new Long(1)
          }
        ]
    };
  }
};
module.exports = Builds;

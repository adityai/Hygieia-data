var faker = require('faker');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectId;
var Long = require('mongodb').Long;

var CodeQuality = {
  buildDocuments: function(callback) {
    var documents = this.getDocuments();
    callback(documents);
  },
  getDocuments: function() {
    var docTime = moment().unix();
    docTime = docTime + "000";
    var docTimestamp = new Long.fromString(docTime);

    return [
    {
      "_class" : "com.capitalone.dashboard.model.CodeQuality",
      "collectorItemId" : new ObjectId("5887e6fe52faff0006af6c37"),
      "timestamp" : docTimestamp,
      "name" : "my-product",
      "url" : "https://sonarqube.com/dashboard/index/20352",
      "type" : "StaticAnalysis",
      "version" : "1.0",
      "metrics" : [
          {
            "name" : "blocker_violations",
            "value" : new Long(1),
            "formattedValue" : "1",
            "status" : "Warning"
          },
          {
            "name" : "major_violations",
            "value" : new Long(4),
            "formattedValue" : "4",
            "status" : "Ok"
          },
          {
            "name" : "ncloc",
            "value" : new Long(2798),
            "formattedValue" : "2,798",
            "status" : "Ok"
          },
          {
            "name" : "violations",
            "value" : new Long(22),
            "formattedValue" : "22",
            "status" : "Ok"
          },
          {
            "name": "violations_density",
            "value": new Long(93.1),
            "formattedValue": "93.1%",
            "status": "Warning",
            "statusMessage": "Rules compliance < 95"
          },
          {
            "name" : "line_coverage",
            "value" : new Long(74.7),
            "formattedValue" : "74.7%",
            "status" : "Warning"
          },
          {
            "name" : "sqale_index",
            "value" : new Long(400),
            "formattedValue" : "6h 40min",
            "status" : "Ok"
          },
          {
            "name" : "critical_violations",
            "value" : new Long(2),
            "formattedValue" : "2",
            "status" : "Ok"
          },
          {
            "name": "test_failures",
            "value": new Long(0),
            "formattedValue": "0",
            "status": "Ok"
          },
          {
            "name": "test_success_density",
            "value": new Long(100),
            "formattedValue": "100.0%",
            "status": "Ok"
          },
          {
            "name": "tests",
            "value": new Long(79),
            "formattedValue": "79",
            "status": "Ok"
          },
          {
            "name": "test_errors",
            "value": new Long(1),
            "formattedValue": "1",
            "status": "Warning",
            "statusMessage": "Errors > 0"
          }
        ]
      },
      {
        "_class" : "com.capitalone.dashboard.model.CodeQuality",
        "collectorItemId" : new ObjectId("5887e6fe52faff0006af6c37"),
        "timestamp" : docTimestamp,
        "name" : "my-product",
        "url" : "https://sonarqube.com/dashboard/index/20352",
        "type" : "SecurityAnalysis",
        "version" : "1.1",
        "metrics" : [
          {
            "name": "critical",
            "value" : new Long(41),
            "formattedValue": "41",
            "status": "Alert"
          },
          {
            "name": "minor",
            "value" : new Long(5),
            "formattedValue": "5",
            "status": "Ok"
          },
          {
            "name": "blocker",
            "value" : new Long(6),
            "formattedValue": "6",
            "status": "Alert"
          },
          {
            "name": "major",
            "value" : new Long(12),
            "formattedValue": "12",
            "status": "Warning"
          }
        ]
      }
    ];
  }
};
module.exports = CodeQuality;

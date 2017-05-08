var MongoClient = require('mongodb').MongoClient;
var DBRef = require('mongodb').DBRef;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');
var Mongo = require('../utilities/mongo');
var moment = require('moment');

var name = 'My Product';
var url = 'mongodb://localhost:27017/dashboard';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  // Insert collectors
  Mongo.createCollection('collectors', db, function() {
    var collectors = getCollectors(name);
    Mongo.insertDocuments('collectors', collectors, db, function() {

      // Insert components
      Mongo.createCollection('components', db, function() {
        var component = getComponent(name);
        Mongo.insertOne('components', component, db, function() {

          // Insert dashboard
          Mongo.createCollection('dashboards', db, function() {
            var dashboard = getDashboard(name);
            Mongo.insertOne('dashboards', dashboard, db, function() {

              // Insert collector items
              Mongo.createCollection('collector_items', db, function() {
                var items = getCollectorItems(name);
                Mongo.insertDocuments('collector_items', items, db, function() {
                  db.close();
                });
              });
            });
          });
        });
      });
    });
  });
});

var getCollectors = function(name) {
  var lastUpdated = moment().unix() + 1000;
  return [
    { "_id" : new ObjectId("5887e6a4c9e77c00077802e5"), "_class" : "com.capitalone.dashboard.model.Collector", "name" : "Product", "collectorType" : "Product", "enabled" : true, "online" : true, "lastExecuted" : 0 },
    { "_id" : new ObjectId("5887e6c0cff47e0006503788"), "_class" : "com.capitalone.dashboard.model.HudsonCollector", "buildServers" : [ "https://jenkins.com/" ], "niceNames" : [ "" ], "name" : "Hudson", "collectorType" : "Build", "enabled" : true, "online" : true, "lastExecuted" : lastUpdated },
    { "_id" : new ObjectId("5887e6fcd601800006640ea5"), "_class" : "com.capitalone.dashboard.model.Collector", "name" : "Github", "collectorType" : "SCM", "enabled" : true, "online" : true, "lastExecuted" : lastUpdated },
    { "_id" : new ObjectId("5887e6fc52faff0006af6c27"), "_class" : "com.capitalone.dashboard.model.SonarCollector", "sonarServers" : [ "https://sonarqube.com" ], "name" : "Sonar", "collectorType" : "CodeQuality", "enabled" : true, "online" : true, "lastExecuted" : lastUpdated }
  ]

  // { "_id" : "5887e6fcdc0e82000696288f", "_class" : "com.capitalone.dashboard.model.UDeployCollector", "udeployServers" : [ "https://udeploy.com" ], "name" : "UDeploy", "collectorType" : "Deployment", "enabled" : true, "online" : true, "lastExecuted" : 1489781870000 },
  // { "_id" : "5887e6fc4cedfd0006eaa27d", "_class" : "com.capitalone.dashboard.model.FeatureCollector", "name" : "Jira", "collectorType" : "ScopeOwner", "enabled" : true, "online" : true, "lastExecuted" : 1489781870000 }
};

var getCollectorItems = function(name) {
  return [
    {
      "_id" : new ObjectId("5887e715c9e77c0006d44abe"),
      "_class" : "com.capitalone.dashboard.model.CollectorItem",
      "description" : name,
      "enabled" : false,
      "pushed" : false,
      "collectorId" : new ObjectId("5887e6a4c9e77c00077802e5"),
      "lastUpdated" : 0,
      "options" : { "dashboardId" : new ObjectId("5887e714c9e77c0006d44abd") }
    }
  ]
}

var getComponent = function(name) {
  var lastUpdated = moment().day(-30).unix() + 1000;

  return {
  	"_id" : new ObjectId("5888dc44c9e77c00060fa189"),
  	"_class" : "com.capitalone.dashboard.model.Component",
  	"name" : name,
  	"collectorItems" : {
  		"Build" : [
  			{
  				"_id" : new ObjectId("58b60f4acff47e000750eec4"),
  				"description" : "build-master",
  				"enabled" : true,
  				"pushed" : false,
  				"collectorId" : new ObjectId("5887e6c0cff47e0006503788"),
  				"lastUpdated" : lastUpdated,
  				"options" : {
  					"jobName" : "my-product/build-master",
  					"jobUrl" : "https://jenkins.com/job/my-product/job/build-master/",
  					"instanceUrl" : "https://jenkins.com"
  				}
  			}
      ],
      "SCM" : [
        {
          "_id" : new ObjectId("5888dc69c9e77c00060fa18c"),
          "enabled" : true,
          "pushed" : false,
          "collectorId" : new ObjectId("5887e6fcd601800006640ea5"),
          "lastUpdated" : 0,
          "options" : {
            "scm" : "Github",
            "branch" : "master",
            "url" : "https://github.com/scm/my-product.git"
          }
        }
      ],
      "CodeQuality" : [
        {
          "_id" : new ObjectId("5887e6fe52faff0006af6c37"),
          "description" : "my-product",
          "enabled" : true,
          "pushed" : false,
          "collectorId" : new ObjectId("5887e6fc52faff0006af6c27"),
          "lastUpdated" : 0,
          "options" : {
            "projectName" : "my-product",
            "projectId" : "17609",
            "instanceUrl" : "https://sonarqube.com"
          }
        }
      ]
  	}
  };

  // "Deployment" : [
  //   {
  //     "_id" : "5887f05d52faff00062d1525",
  //     "description" : name,
  //     "enabled" : true,
  //     "pushed" : false,
  //     "collectorId" : "5887e6fcdc0e82000696288f",
  //     "lastUpdated" : 0,
  //     "options" : {
  //       "applicationId" : "394ac3a3-3a64-4e46-8164-ebf9f0b71350",
  //       "applicationName" : name,
  //       "instanceUrl" : "https://updeploy.com/"
  //     }
  //   }
  // ],
  // "ScopeOwner" : [
  //   {
  //     "_id" : "58a63148d6018000067cb1a1",
  //     "description" : name,
  //     "enabled" : true,
  //     "pushed" : false,
  //     "collectorId" : "5887e6fc4cedfd0006eaa27d",
  //     "lastUpdated" : 0,
  //     "options" : {
  //       "teamId" : "11205",
  //       "changeDate" : "",
  //       "assetState" : "Active",
  //       "isDeleted" : "False"
  //     },
  //     "_class" : "com.capitalone.dashboard.model.ScopeOwnerCollectorItem"
  //   }
  // ],
}

var getDashboard = function(name) {
  return {
    "_id": new ObjectId("5887e714c9e77c0006d44abd"),
    "_class" : "com.capitalone.dashboard.model.Dashboard",
  	"template" : "capone",
  	"title" : name,
  	"widgets" : [
  		{
  			"_id" : new ObjectId("5888dc73c9e77c00060fa18e"),
  			"name" : "build",
  			"componentId" : new ObjectId("5888dc44c9e77c00060fa189"),
  			"options" : {
  				"id" : "build0",
  				"buildDurationThreshold" : 3,
  				"consecutiveFailureThreshold" : 5
  			}
  		},
      {
        "_id" : new ObjectId("5888dc69c9e77c00060fa18d"),
        "name" : "repo",
        "componentId" : new ObjectId("5888dc44c9e77c00060fa189"),
        "options" : {
          "id" : "repo0",
          "scm" : {
            "name" : "Github",
            "value" : "Github"
          },
          "branch" : "master",
          "url" : "https://github.com/scm/srv/my-product.git"
        }
      },
      {
        "_id" : new ObjectId("5888dc7ac9e77c00060fa18f"),
        "name" : "codeanalysis",
        "componentId" : new ObjectId("5888dc44c9e77c00060fa189"),
        "options" : {
          "testJobNames" : [ ],
          "id" : "codeanalysis0"
        }
      }
  	],
  	"owner" : "liatrio",
  	"type" : "Team",
  	"application" : {
  		"name" : name,
  		"components" : [
          new DBRef("components", new ObjectId("5888dc44c9e77c00060fa189"))
  		]
  	}
  };

  // {
  //   "_id" : "5888dc8ac9e77c00060fa190",
  //   "name" : "deploy",
  //   "componentId" : "5888dc44c9e77c00060fa189",
  //   "options" : {
  //     "id" : "deploy0"
  //   }
  // },
  // {
  //   "_id" : "58ac9ca0c9e77c000642a48c",
  //   "name" : "feature",
  //   "componentId" : "5888dc44c9e77c00060fa189",
  //   "options" : {
  //     "id" : "feature0",
  //     "teamName" : "Any",
  //     "teamId" : "Any",
  //     "projectName" : "Jira - " + name,
  //     "projectId" : "11205",
  //     "showStatus" : {
  //       "kanban" : true,
  //       "scrum" : false
  //     },
  //     "estimateMetricType" : "hours",
  //     "sprintType" : "kanban",
  //     "listType" : "issues"
  //   }
  // },
  // {
  //   "_id" : "58adce34c9e77c0006b195d8",
  //   "name" : "pipeline",
  //   "options" : {
  //     "mappings" : {
  //       "dev" : "dev",
  //       "qa" : "qa",
  //       "int" : "int",
  //       "perf" : "perf",
  //       "prod" : "prod"
  //     },
  //     "id" : "pipeline0"
  //   }
  // }
}

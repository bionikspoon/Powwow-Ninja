'use strict';

// Production specific configuration
// =================================
//noinspection OverlyComplexBooleanExpressionJS
module.exports = {
  // Server IP //:off
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,//:on

  // Server port //:off
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,//:on

  // MongoDB connection options
  mongo: { //:off
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/powwow'
  } //:on
};

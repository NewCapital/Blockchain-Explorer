/**
 * Created by Ori Braun on 2/9/2019.
 */

var mysql = require("mysql");
var express = require('express');
var app = express();
var mySqlConnectionString = require("./mySqlConnectionString.js");
var settings = mySqlConnectionString.mySqlConnection.connectionString.development;
console.log("process.env.production",process.env.production);
if (process.env.production) {
    settings = mySqlConnectionString.mySqlConnection.connectionString.production;
}
var mysqlConnectionProvider = {
    getSqlConnection : function() {
        var connection = mysql.createConnection(settings);
        connection.connect(function(error) {
           if (error) {
               // throw error;
               console.log(error);
               return;
           }
           console.log("mysql connection success");
        });
        // connection.end();
        return connection;
    },
    closeSqlConnection : function(currentConnection) {
        currentConnection.end(function(error) {
            if (error) {
                // throw error;
                console.log(error);
                return;
            }
            console.log("mysql connection closed");
        });
        return currentConnection;
    }
};

module.exports.mysqlConnectionProvider = mysqlConnectionProvider;
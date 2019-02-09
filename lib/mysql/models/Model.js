/**
 * Created by Ori Braun on 2/9/2019.
 */

var connectionProvider = require("./../connection/mySqlConnectionProvider.js");
var sqlHelper = require("../../helpers/sql.js");
var tableName = "";
var Model = {
    runSql : function(sqlStatement, callback) {
        var connection = connectionProvider.mysqlConnectionProvider.getSqlConnection();
        var obj = {
            err : 0 ,
            errMessage : ""
        };
        var data = [];
        if (connection) {
            connection.query(sqlStatement, function(err, rows, fields) {
                if (err) {
                    obj.err = 1;
                    obj.errMessage = err;
                } else {
                    rows.forEach(function (row) {
                        data.push(row);
                    });
                }
                obj.data = data;
                callback(obj);
            });
        }
        connectionProvider.mysqlConnectionProvider.closeSqlConnection(connection);
    },
    getAll : function(callback) {
        console.log("getAll");
        var connection = connectionProvider.mysqlConnectionProvider.getSqlConnection();
        var obj = {
            err : 0 ,
            errMessage : ""
        };
        var query = new sqlHelper.Sql();
        query.select("*");
        query.from(tableName);
        // query to the database and get the records
        if (connection) {
            connection.query(query.get(), function (err, rows) {

                if (err) {
                    obj.err = 1;
                    obj.errMessage = err;
                }

                // send records as a response
                // console.log(rows);
                if (rows) {
                    obj.entities = rows;
                }
                callback(obj);
            });
        }
        connectionProvider.mysqlConnectionProvider.closeSqlConnection(connection);
    },
    insert : function(columns, values, callback) {
        var connection = connectionProvider.mysqlConnectionProvider.getSqlConnection();
        var obj = {
            err : 0 ,
            errMessage : ""
        };
        var query = new sqlHelper.Sql();
        query.insert(tableName,columns, values);
        // query to the database and get the records
        if (connection) {
            connection.query(query.get(), function (err, rows) {

                if (err) {
                    obj.err = 1;
                    obj.errMessage = err;
                }

                // send records as a response
                // console.log(rows);
                if (rows) {
                    obj.data = rows;
                }
                callback(obj);
            });
        }
        connectionProvider.mysqlConnectionProvider.closeSqlConnection(connection);
    },
    update : function(keys, values, condition, callback) {
        var connection = connectionProvider.mysqlConnectionProvider.getSqlConnection();
        var obj = {
            err : 0 ,
            errMessage : ""
        };
        var query = new sqlHelper.Sql();
        query.update(tableName);
        query.set(keys,values);
        query.where(condition);
        // query to the database and get the records
        if (connection) {
            connection.query(query.get(), function (err, rows) {

                if (err) {
                    obj.err = 1;
                    obj.errMessage = err;
                }

                // send records as a response
                // console.log(rows);
                if (rows) {
                    obj.data = rows;
                }
                callback(obj);
            });
        }
        connectionProvider.mysqlConnectionProvider.closeSqlConnection(connection);
    },
    delete : function(condition,callback) {
        var connection = connectionProvider.mysqlConnectionProvider.getSqlConnection();
        var obj = {
            err : 0 ,
            errMessage : ""
        };
        var query = new sqlHelper.Sql();
        query.delete(tableName);
        query.where(condition);
        // query to the database and get the records
        if (connection) {
            connection.query(query.get(), function (err, rows) {

                if (err) {
                    obj.err = 1;
                    obj.errMessage = err;
                }

                // send records as a response
                // console.log(rows);
                if (rows) {
                    obj.data = rows;
                }
                callback(obj);
            });
        }
        connectionProvider.mysqlConnectionProvider.closeSqlConnection(connection);
    },
    setTable: function(table) {
        tableName = table;
    },
};

exports.Model = Model;

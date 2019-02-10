/**
 * Created by Ori Braun on 2/9/2019.
 */

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
});

con.connect(function(err) {
    if (err) {
        console.log(err.code)
    };
    console.log("Connected!");
    obj.getIps(function(results){
        console.log(results);
    })
});

var obj = {
    getIps: function(cb) {
        var sql = "SELECT * FROM table";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("err: " + err);
                cb(false)
            } else {
                console.log("Result: " + result);
                cb(result);
            }
        });
    }
}

module.exports = obj;
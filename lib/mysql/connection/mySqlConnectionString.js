/**
 * Created by Ori Braun on 2/9/2019.
 */

var mySqlConnectionString = {
    connectionString : {
        development : {
            host : "104.248.255.39",
            user : "twinsdb",
            password : "OAkw5CSfui2z390ZOpqQ6om3E",
            database : "twinsdb"
        },
        production : {
            host : "104.248.255.39",
            user : "twinsdb",
            password : "OAkw5CSfui2z390ZOpqQ6om3E",
            database : "twinsdb"
        }
    }
};

exports.mySqlConnection = mySqlConnectionString;

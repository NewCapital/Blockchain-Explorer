/**
 * Created by Ori Braun on 2/9/2019.
 */

var connectionProvider = require("./../connection/mySqlConnectionProvider.js");
var sqlHelper = require("../../helpers/sql.js");
var tableName = "twins_peer_list T";
var ModelClass = require("./Model");
ModelClass.Model.setTable(tableName);
module.exports = {
    getAllIps : function(callback) {
        ModelClass.Model.getAll(callback);
    },
};

// ipsModel.getAllIps(function(results) {
//     var ips = [];
//     for(var i in results.entities) {
//         ips.push(results.entities[i].ip);
//     }
//     console.log(ips);
// })

// module.exports = ipsModel;
/**
 * Created by Ori Braun on 2/9/2019.
 */

var Sql = (function () {
    function Sql() {
        this._str = "";
    }
    Sql.prototype.select = function (str) {
        this._str += "SELECT " + str + " ";
    };
    Sql.prototype.from = function (table) {
        this._str += "FROM " + table + " ";
    };
    Sql.prototype.where = function (str) {
        this._str += "WHERE " + str + " ";
    };
    Sql.prototype.and_where = function (str) {
        this._str += "AND " + str + " ";
    };
    Sql.prototype.or_where = function (str) {
        this._str += "OR " + str + " ";
    };
    Sql.prototype.having = function (str) {
        this._str += "HAVING " + str + " ";
    };
    Sql.prototype.or_having = function (str) {
        this._str += "OR " + str + " ";
    };
    Sql.prototype.and_having = function (str) {
        this._str += "AND " + str + " ";
    };
    Sql.prototype.limit = function (limit, offset) {
        this._str += "LIMIT " + limit + " ";
        if(offset) {
            this._str += "OFFSET " + offset + " ";
        }
    };
    Sql.prototype.group_by = function (group_by) {
        this._str += "GROUP BY " + group_by + " ";
    };
    Sql.prototype.order_by = function (order_by) {
        this._str += "ORDER BY " + order_by + " ";
    };
    Sql.prototype.join = function (table, cond, type) {
        this._str += type + " JOIN " + table + " ON " + cond + " ";
    };
    Sql.prototype.union = function () {
        this._str += " UNION ";
    };
    Sql.prototype.union_all = function () {
        this._str += " UNION ALL ";
    };
    Sql.prototype.set = function (keys, values) {
        this._str += "SET ";
        for(var i = 0; i < keys.length; i++) {
            this._str += keys[i] + " = " + values[i];
            if(i < keys.length - 1) {
                this._str += ", ";
            }
        }
        this._str += " ";
    };
    Sql.prototype.insert = function (table, columns, values) {
        this._str += "INSERT INTO " + table + " ";
        if(columns.length) {
            this._str += "( " + columns.join(",")  + " )";
        }
        this._str += "VALUES ( " + values.join(",")  + " )";
        this._str += " ";
    };
    Sql.prototype.update = function (table) {
        this._str += "UPDATE " + table + " ";
    };
    Sql.prototype.delete = function (table) {
        this._str += "DELETE FROM " + table + " ";
    };
    Sql.prototype.truncate = function (table) {
        this._str += "TRUNCATE TABLE " + table + " ";
    };
    Sql.prototype.get = function () {
        return this._str;
    };
    return Sql;
}());
exports.Sql = Sql;

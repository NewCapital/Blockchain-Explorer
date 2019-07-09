var request = require('request');

var base_url = 'https://api.new.capital/v1';

function get_summary(coin, exchange, cb) {
    var req_url = base_url + '/ticker?symbol=' + exchange.toUpperCase() + '_' + coin.toUpperCase();
    request({uri: req_url, json: true}, function (error, response, body) {
        if (error) {
            return cb(error, null);
        } else {
            if (body.msg) {
                return cb(body.msg, null)
            } else {
                var obj = {
                    "symbol":"BTC_TWINS",
                    "priceChange":"999894",
                    "priceChangePercent":"5.55493395",
                    "lastPrice":"19000000",
                    "bidPrice":"17000001",
                    "askPrice":"19000000",
                    "openPrice":"18000106",
                    "highPrice":"19999999",
                    "lowPrice":"17111258",
                    "volume":"0.48373279",
                    "quoteVolume":"8665407.82712580",
                    "openTime":1562415072,
                    "closeTime":1562487564,
                    "firstId":362,
                    "lastId":419,
                    "count":58
                }
                body['last'] = 100000000 /  parseInt(body['lastPrice']) / 100000000; // price  btc/twins
                return cb (null, body);
            }
        }
    });
}

function get_trades(coin, exchange, cb) {
    var req_url = base_url + '/trades?symbol=' + exchange.toUpperCase() + '_' + coin.toUpperCase();
    request({uri: req_url, json: true}, function (error, response, body) {
        if (response.statusCode === 200) {
            var obj = [
                {
                    "id":419,
                    "price":"19000000",
                    "qty":"0.00001603",
                    "quoteQty":"304.56999998",
                    "time":1562487564
                }
            ]
            return cb (null, body);
        } else {
            return cb(body.msg, null);
        }
    });
}

function get_orders(coin, exchange, cb) {
    var req_url = base_url + '/depth?symbol=' + exchange.toUpperCase() + '_' + coin.toUpperCase();
    request({uri: req_url, json: true}, function (error, response, body) {
        if (response.statusCode === 200) {
            var obj = {
                "bids": [
                    ["17000001", "0.00143253"]
                ],
                "asks": [
                    ["19000000", "0.04293187"]
                ]
            }
            var orders = body;
            var buys = [];
            var sells = [];
            if (orders['bids'].length > 0){
                for (var i = 0; i < orders['bids'].length; i++) {
                    var order = {
                        amount: parseFloat(orders.bids[i][0]).toFixed(8),
                        price: parseFloat(orders.bids[i][1]).toFixed(8),
                        //  total: parseFloat(orders.buy[i].Total).toFixed(8)
                        // Necessary because API will return 0.00 for small volume transactions
                        // timestamp: orders.bids[i].timestamp,
                        // date: new Date(orders.bids[i].timestamp * 1000),
                        total: (parseFloat(orders.bids[i][0]).toFixed(8) * parseFloat(orders.bids[i][1])).toFixed(8)
                    }
                    buys.push(order);
                }
                buys.sort(function(a, b) { // desc
                    return b.price - a.price;
                })
            }
            if (orders['asks'].length > 0) {
                for (var x = 0; x < orders['asks'].length; x++) {
                    var order = {
                        amount: parseFloat(orders.asks[x][0]).toFixed(8),
                        price: parseFloat(orders.asks[x][1]).toFixed(8),
                        //    total: parseFloat(orders.sell[x].Total).toFixed(8)
                        // Necessary because API will return 0.00 for small volume transactions
                        // timestamp: orders.asks[i].timestamp,
                        // date: new Date(orders.asks[i].timestamp * 1000),
                        total: (parseFloat(orders.asks[x][0]).toFixed(8) * parseFloat(orders.asks[x][1])).toFixed(8)
                    }
                    sells.push(order);
                }
                sells.sort(function(a, b) { // asc
                    return a.price- b.price;
                })
            }
            return cb(null, buys, sells);
        } else {
            return cb(body.msg, [], []);
        }
    });
}

module.exports = {
    get_data: function(coin, exchange, cb) {
        var error = null;
        get_orders(coin, exchange, function(err, buys, sells) {
            if (err) { error = err; }
            get_trades(coin, exchange, function(err, trades) {
                if (err) { error = err; }
                get_summary(coin, exchange, function(err, stats) {
                    if (err) { error = err; }
                    return cb(error, {buys: buys, sells: sells, chartdata: [], trades: trades, stats: stats});
                });
            });
        });
    },
    get_all_trades: function(coin, exchange, cb) {
        var error = null;
        get_trades(coin, exchange, function(err, trades) {
            if (err) { error = err; }
            return cb(error, {trades: trades});
        });
    },
    get_latest_data:  function(coin, exchange, cb) {
        var error = null;
        get_orders(coin, exchange, function(err, buys, sells) {
            if (err) { error = err; }
            get_summary(coin, exchange, function(err, stats) {
                if (err) { error = err; }
                return cb(error, {buys: buys, sells: sells, stats: stats});
            });
        });
    },
};

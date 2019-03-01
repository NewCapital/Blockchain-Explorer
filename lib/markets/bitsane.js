var request = require('request');

var base_url = 'https://bitsane.com/api/public';

function get_summary(coin, exchange, cb) {
  var req_url = base_url + '/ticker?pairs=' + coin.toUpperCase() + '_' + exchange.toUpperCase();
  request({uri: req_url, json: true}, function (error, response, body) {
    if (error) {
      return cb(error, null);
    } else {
      if (body.message) {
        return cb(body.message, null)
      } else {
        var obj =  {
            "last": "last price",
            "lowestAsk": "lowest ask price",
            "highestBid": "highest bid price",
            "percentChange": "daily percentage price change",
            "baseVolume": "base currency daily volume",
            "quoteVolume": "quote currency daily volume",
            "high24hr": "highest daily price",
            "low24hr": "lowest daily price",
            "euroEquivalent": "daily volume in EUR equivalent",
            "bitcoinEquivalent": "daily volume in BTC equivalent"
        }
        return cb (null, body[coin + '_' + exchange]);
      }
    }
  });
}

function get_trades(coin, exchange, since, limit, cb) {
  var req_url = base_url + '/trades?pair=' + coin + '_' + exchange + '&since=' + since + '&limit=' + limit;
  request({uri: req_url, json: true}, function (error, response, body) {
    if (body.statusText == 'Success') {
      var obj = [
          {
              "tid": "trade id",
              "timestamp": "time when trade has been created",
              "price": "trade price",
              "amount": "trade amount"
          }
      ]
      return cb (null, body.result);
    } else {
      return cb(body.message, null);
    }
  });
}

function get_orders(coin, exchange, cb) {
  var req_url = base_url + '/orderbook?pair='  + coin + '_' + exchange + '&limit_bids=&limit_asks=';
  request({uri: req_url, json: true}, function (error, response, body) {
    if (body.statusText == 'Success') {
      var obj = {
            "bids": [
                {
                    "price": "order price",
                    "amount": "order amount",
                    "timestamp": "order create time"
                }
            ],
            "asks": [
                {
                    "price": "order price",
                    "amount": "order amount",
                    "timestamp": "order create time"
                }
            ]
        }
      var orders = body.result;
      var buys = [];
      var sells = [];
      if (orders['bids'].length > 0){
          for (var i = 0; i < orders['bids'].length; i++) {
            var order = {
              amount: parseFloat(orders.bids[i].amount).toFixed(8),
              price: parseFloat(orders.bids[i].price).toFixed(8),
              //  total: parseFloat(orders.buy[i].Total).toFixed(8)
              // Necessary because API will return 0.00 for small volume transactions
              total: (parseFloat(orders.bids[i].amount).toFixed(8) * parseFloat(orders.bids[i].price)).toFixed(8)
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
                amount: parseFloat(orders.asks[x].amount).toFixed(8),
                price: parseFloat(orders.asks[x].price).toFixed(8),
                //    total: parseFloat(orders.sell[x].Total).toFixed(8)
                // Necessary because API will return 0.00 for small volume transactions
                total: (parseFloat(orders.asks[x].amount).toFixed(8) * parseFloat(orders.asks[x].price)).toFixed(8)
            }
            sells.push(order);
        }
        sells.sort(function(a, b) { // asc
            return a.price- b.price;
        })
      }
      return cb(null, buys, sells);
    } else {
      return cb(body.message, [], []);
    }
  });
}

module.exports = {
    get_data: function(coin, exchange, cb) {
        var error = null;
        get_orders(coin, exchange, function(err, buys, sells) {
          if (err) { error = err; }
          var since = 0;
          var limit = 50;
          get_trades(coin, exchange, since, limit, function(err, trades) {
            if (err) { error = err; }
            get_summary(coin, exchange, function(err, stats) {
              if (err) { error = err; }
              return cb(error, {buys: buys, sells: sells, chartdata: [], trades: trades, stats: stats});
            });
          });
        });
    },
    get_all_trades: function(coin, exchange, since, limit, cb) {
        var error = null;
        get_trades(coin, exchange, since, limit, function(err, trades) {
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

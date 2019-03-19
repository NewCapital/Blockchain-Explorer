var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var MarketsHistorySchema = new Schema({
  market: { type: String },
  buys: { type: Array, default: [] },
  sells: { type: Array, default: [] },
});

module.exports = mongoose.model('Markets_history', MarketsHistorySchema);
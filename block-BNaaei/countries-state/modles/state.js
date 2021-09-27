const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  name: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
  population: Number,
  area: String,
  neighbouring_states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
});

module.exports = mongoose.model('State', countrySchema);

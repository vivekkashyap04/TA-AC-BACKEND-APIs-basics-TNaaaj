const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: { type: String, required: true },
  states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
  continent: String,
  population: Number,
  religion: [String],
  neighbouring_country: [{ type: Schema.Types.ObjectId, ref: 'Country' }],
  area: String,
});

module.exports = mongoose.model('Country', countrySchema);

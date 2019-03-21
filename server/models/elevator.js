const mongoose = require('mongoose');

const { Schema } = mongoose;

const elevatorSchema = new Schema({
  elevatorId: Number,
  etage: Number,
});

const Elevator = mongoose.model('Elevator', elevatorSchema);

module.exports = Elevator;
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  description: {
    type: String,
    maxLength: 255
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

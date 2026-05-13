const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Chairs', 'Beds', 'Tables', 'Cabinets'], required: true },
  price: { type: Number, required: true },
  description: String,
  image: String, // Path to the furniture image
  tag: { type: String, enum: ['Featured', 'Special', 'Popular'] }
});

module.exports = mongoose.model('Product', productSchema);

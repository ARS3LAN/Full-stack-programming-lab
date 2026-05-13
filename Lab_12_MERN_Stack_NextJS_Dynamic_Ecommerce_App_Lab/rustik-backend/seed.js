require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./Product');

// Sample data matching your schema and the image
const sampleProducts = [
  { name: 'Elite Collection Woven Chair', category: 'Chairs', price: 134.99, tag: 'Featured', image: '[Image Placeholder]' },
  { name: 'Classic Wooden Bed', category: 'Beds', price: 134.99, tag: 'Featured', image: '[Image Placeholder]' },
  { name: 'Reclaimed Wood Table', category: 'Tables', price: 134.99, tag: 'Popular', image: '[Image Placeholder]' },
  { name: 'Vintage Cabinet', category: 'Cabinets', price: 134.99, tag: 'Special', image: '[Image Placeholder]' },
  { name: 'Modern Bookshelf', category: 'Cabinets', price: 134.99, tag: 'Popular', image: '[Image Placeholder]' },
  { name: 'Leather Lounge Chair', category: 'Chairs', price: 134.99, tag: 'Special', image: '[Image Placeholder]' }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Clearing old data...');
    await Product.deleteMany({}); // Clears the collection so we don't get duplicates
    
    console.log('Inserting sample products...');
    await Product.insertMany(sampleProducts);
    
    console.log('Data successfully seeded!');
    mongoose.connection.close();
  })
  .catch(err => console.error('Error seeding data:', err));
const mongoose = require('mongoose');

// Define the Poster schema
const posterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,    
    default:99
  },
  imageUrl: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a 'User' model for sellers
    required: true
  },
  category: {
    type: String, // Define your categories
    required: true,
    default:"Movies"
  }
,
//   condition: {
//     type: String,
//     enum: ['New', 'Used', 'Collectible'],
//     required: true
//   },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a Poster model based on the schema
const Poster = mongoose.model('Poster', posterSchema);

module.exports = Poster;

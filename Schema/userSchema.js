const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        // Check if the email format is valid
        return /\S+@\S+\.\S+/.test(v);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Check if the password meets your criteria (e.g., at least 8 characters)
        return v.length >= 8;
      },
      message: 'Password must be at least 8 characters long',
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  googleUid : {
    type:String
  },
  profilePicture: {
    type: String, // Assuming the profile picture will be stored as a URL in AWS S3
    default: 'https://your-default-profile-picture-url.com/default.jpg', // Default picture URL
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'], // Define the possible roles here
    default: 'buyer', // Set a default role (e.g., 'buyer') if none is specified
  },
    deliveryAddresses: [
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: Number, required: true },
      street: { type: String, required: true },
      city: { type: String},
      state: { type: String, required: true},
      zip: { type: String, required: true },
      country: { type: String, required: true },
      isDefault: { type: Boolean, default: false }
    }
  ],
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
  favoritePosters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Poster',
    },
  ],
  sellerDetails: {
    isSeller: {
      type: Boolean,
      default: false,
    },
     isVerified: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },

    storeName: String,
    description: String,
    contactNumber: String,
    category: [String],
    gstNumber: String,
    upiId: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    console.log('this.password', this.password);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

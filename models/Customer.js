// models/Customer.js

import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  memberNumber: {
    type: Number,
    required: true,
    unique: true, // Ensures member numbers are unique
  },
  interests: {
    type: String,
    required: false, // Make it optional if desired
  },
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;

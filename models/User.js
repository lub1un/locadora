const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  birthday_date: Date,
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']  // Validação com Regex
  },
  password: {
    type: String,
    required: true
  },
  permission_type: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  phones: [String],
  address: String,
  house_number: String,
});

module.exports = mongoose.model('User', userSchema);

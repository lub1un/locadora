const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email já registrado.');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    birthday_date: req.body.birthday_date,
    email: req.body.email,
    password: hashedPassword,
    permission_type: req.body.permission_type,
    phones: req.body.phones,
    address: req.body.address,
    house_number: req.body.house_number
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { registerUser };

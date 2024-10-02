const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { rentMovie } = require('../controllers/rentController');
const checkToken = require('../middlewares/check_token');
const checkRole = require('../middlewares/check_role');
const viaCep = require('../middlewares/via_cep');

router.post('/register', viaCep, registerUser);
router.post('/rent', checkToken, rentMovie);
router.post('/admin', checkToken, checkRole('admin'), (req, res) => {
  res.send('Área de administração');
});

module.exports = router;

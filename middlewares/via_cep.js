const axios = require('axios');

async function viaCep(req, res, next) {
  const { cep } = req.body;
  if (!cep) return res.status(400).send('CEP é obrigatório');

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      return res.status(400).send('CEP inválido');
    }
    req.body.address = response.data.logradouro;
    next();
  } catch (error) {
    return res.status(500).send('Erro ao consultar o CEP');
  }
}

module.exports = viaCep;

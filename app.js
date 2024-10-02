const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config(); // Carrega as variáveis do arquivo .env

const app = express();
app.use(express.json());

// Função assíncrona para conectar ao banco de dados
async function startServer() {
  try {
    // Conexão com o banco de dados (sem as opções deprecated)
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('Conectado ao banco de dados!');

    // Configuração da porta
    const port = process.env.PORT || 3000;
    app.use('/api', routes);

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

// Chama a função para iniciar o servidor
startServer();

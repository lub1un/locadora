const mongoose = require('mongoose');
const moment = require('moment');
const User = require('../models/User');
const Movie = require('../models/Movie');
const Rented = require('../models/Rented');

// Função para alugar um filme
async function rentMovie(req, res) {
  try {
    const userId = req.user.id; // Assume que você está usando um middleware para definir o usuário autenticado
    const { movieId } = req.body;

    // Obter dados do usuário
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Obter dados do filme
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }

    // Calcular a idade do usuário
    const userBirthday = moment(user.birthday_date);
    const age = moment().diff(userBirthday, 'years');

    // Verificar se a idade do usuário é adequada para a classificação do filme
    if ((movie.classification === 'Maior16' && age < 16) || (movie.classification === 'Maior18' && age < 18)) {
      return res.status(403).json({ message: 'Idade inadequada para alugar este filme.' });
    }

    // Registrar o aluguel
    const rent = new Rented({
      rente_by: userId,
      movie_rented: movieId,
      rent_date: new Date(),
      return_date: null, // Você pode definir uma lógica para calcular a data de retorno
    });

    await rent.save();

    res.status(200).json({ message: 'Filme alugado com sucesso!', rent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao alugar o filme.' });
  }
}

module.exports = { rentMovie };

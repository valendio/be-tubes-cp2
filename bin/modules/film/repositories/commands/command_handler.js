
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const addNewFilm = async (payload) => {
  const film = new Film(db);
  const postCommand = async (payload) => film.addFilm(payload);
  return postCommand(payload);
};

const getFilmList = async () => {
  const movie = new Movie(db);
  const getListCommand = async () => movie.getAllFilms();
  return getListCommand();
};

module.exports = {
  addNewFilm,
  getFilmList,
};
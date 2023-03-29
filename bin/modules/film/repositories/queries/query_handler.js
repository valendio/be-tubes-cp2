const Film = require("./domain");
const Mongo = require("../../../../helpers/databases/mongodb/db");
const config = require("../../../../infra/configs/global_config");
const db = new Mongo(config.get("/mongoDbUrl"));
const film = new Film(db);

const getFilm = async (filmId) => {
  const getData = async () => {
    const result = await film.viewFilm(filmId);
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getFilm,
};
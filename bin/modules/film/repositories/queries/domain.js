
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');

class Film {

  constructor(db){
    this.query = new Query(db);
  }

  async viewFilm(filmId) {
    const film = await this.query.findById(filmId);
    if (film.err) {
      return wrapper.error(new NotFoundError('Can not find film'));
    }
    const { data } = film;
    return wrapper.data(data);
  }

}

module.exports = Film;

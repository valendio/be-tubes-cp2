const assert = require('assert');
const sinon = require('sinon');

const command = require('../../../../../../bin/modules/user/repositories/commands/command');
const Mongo = require('../../../../../../bin/helpers/databases/mongodb/db');

describe('User-command', () => {

  describe('insertOneUser', () => {
    const queryResult = {
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'username': 'alifsndev',
        'password': '8789ad457ac341e4fc4cad32'
      },
      'message': 'Your Request Has Been Processed',
      'code': 200
    };

    it('should success to insert data to db', async() => {
      sinon.stub(Mongo.prototype, 'insertOne').resolves(queryResult);
      const res = await command.insertOneUser({});
      assert.equal(res.data.username, queryResult.data.username);
    });
  });

});

// const User = require('../../../../../../bin/modules/user/repositories/queries/domain');
// const query = require('../../../../../../bin/modules/user/repositories/queries/query');
// const sinon = require('sinon');
// const assert = require('assert');


// describe('viewUser', () => {

//   it('should return user data', async() => {

//     let queryResult = {
//       'err': null,
//       'data': {
//         '_id': '5bac53b45ea76b1e9bd58e1c',
//         'username': 'alifsndev',
//         'password': '8789ad457ac341e4fc4cad32'
//       },
//       'message': 'Your Request Has Been Processed',
//       'code': 200
//     };

//     sinon.stub(query, 'findById').resolves(queryResult);

//     const userId = '5bac53b45ea76b1e9bd58e1c';
//     const user = new User();
//     const result = await user.viewUser(userId);

//     assert.equal(result.code, 200);

//   });
// });

const Query = require("../queries/query");
const Command = require("./command");
const wrapper = require("../../../../helpers/utils/wrapper");
const logger = require("../../../../helpers/utils/logger");

class Product {
  constructor(db) {
    this.command = new Command(db);
    this.query = new Query(db);
  }
  
  async create(payload) {
    const ctx = "domain-postProduct";

    const result = await this.command.insertProduct(payload);
    if (result.err) {
      logger.log(ctx, "error", "error");
      return wrapper.error(new InternalServerError("Failed to insert product"));
    }
    return wrapper.data(result);
  }

  async delete(id) {
    const ctx = "domain-deleteProduct";
    
    const { data: result } = await this.command.deleteOneProduct(id);
    if (result.err) {
      logger.log(ctx, "error", "error");
      return wrapper.error(new InternalServerError("Failed to delete product"));
    }
    return wrapper.data(result);

  
  }

async update(id,payload) {
  const ctx = "domain-updateProduct";
  const { data: result } = await this.command.updateOneProduct(id ,payload);
  return wrapper.data(result);
}




  // async generateCredential(payload) {
  //   const ctx = 'domain-generateCredential';
  //   const { username, password } = payload;
  //   const user = await this.query.findOneUser({ username });
  //   if (user.err) {
  //     logger.log(ctx, user.err, 'user not found');
  //     return wrapper.error(new NotFoundError('user not found'));
  //   }
  //   const userId = user.data._id;
  //   const userName = user.data.username;
  //   const pass = await commonUtil.decrypt(user.data.password, algorithm, secretKey);
  //   if (username !== userName || pass !== password) {
  //     return wrapper.error(new UnauthorizedError('Password invalid!'));
  //   }
  //   const data = {
  //     username,
  //     sub: userId
  //   };
  //   const token = await jwtAuth.generateToken(data);
  //   return wrapper.data(token);
  // }

  // async register(payload) {
  //   const { username, password, isActive } = payload;
  //   const user = await this.query.findOneUser({ username });

  //   if (user.data) {
  //     return wrapper.error(new ConflictError('user already exist'));
  //   }

  //   const chiperPwd = await commonUtil.encrypt(password, algorithm, secretKey);
  //   const data = {
  //     username,
  //     password: chiperPwd,
  //     isActive
  //   };

  //   const { data:result } = await this.command.insertOneUser(data);
  //   return wrapper.data(result);

  // }


}

module.exports = Product;

const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");
const project = require("../../package.json");
const basicAuth = require("../auth/basic_auth_helper");
const jwtAuth = require("../auth/jwt_auth_helper");
const wrapper = require("../helpers/utils/wrapper");
const userHandler = require("../modules/user/handlers/api_handler");
const productHandler = require("../modules/product/handlers/api_handler");
const productHandlerMongo = require("../modules/product_mongo/handlers/api_handler");
const mongoConnectionPooling = require("../helpers/databases/mongodb/connection");
const mysqlConnectionPooling = require("../helpers/databases/mysql/connection");

function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version,
  });

  this.server.serverKey = "";
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ["*"],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ["Authorization"],
    exposeHeaders: ["Authorization"],
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  // // required for basic auth
  this.server.use(basicAuth.init());

  // anonymous can access the end point, place code bellow
  this.server.get("/", (req, res) => {
    wrapper.response(
      res,
      "success",
      wrapper.data("Index"),
      "This service is running properly"
    );
  });

  //CONTENT USER 
  
  this.server.post(
    "/api/users/v1",
    basicAuth.isAuthenticated,
    userHandler.postDataLogin
  );

  this.server.get("/api/users/v1", jwtAuth.verifyToken, userHandler.getUser);

  this.server.post(
    "/api/users/v1/register",
    basicAuth.isAuthenticated,
    userHandler.registerUser
  );

  // CONTENT MONGODB

  this.server.post(
    "/api/products/v1",
    jwtAuth.verifyToken,
    productHandlerMongo.createProduct
  );

  this.server.get(
    "/api/products/getAllProducts",
    jwtAuth.verifyToken,
    productHandlerMongo.getAllProduct
  );

  this.server.get(
    "/api/products/getProductById/:id",
    jwtAuth.verifyToken,
    productHandlerMongo.getProductById
  );

  this.server.del(
    "/api/products/deleteProduct/:id",
    jwtAuth.verifyToken,
    productHandlerMongo.deleteProduct
  )

  this.server.put(
    "/api/products/updateProduct/:id",
    jwtAuth.verifyToken,
    productHandlerMongo.updateProduct
  )

  this.server.get(
    "/api/products/pagination/:page",
    jwtAuth.verifyToken,
    productHandlerMongo.pagination
  )

  //CONTENT MYSQL

  // this.server.post(
  //   "/api/products/v1",
  //   jwtAuth.verifyToken,
  //   productHandler.createProduct
  // );

  // this.server.get(
  //   "/api/products/getAllProducts",
  //   jwtAuth.verifyToken,
  //   productHandler.getAllProducts,
  // )

  // this.server.get(
  //   "/api/products/getproductById/:id",
  //   jwtAuth.verifyToken,
  //   productHandler.getProductById,
  // )

  // this.server.get(
  //   "/api/products/getproductByIdCategories/:id_categories",
  //   jwtAuth.verifyToken,
  //   productHandler.getProductByIdCategories,
  // )

  // this.server.get(
  //   "/api/products/pagination/:page",
  //   jwtAuth.verifyToken,
  //   productHandler.pagination,
  // );

  // this.server.del(
  //   "/api/products/deleteProduct/:id",
  //   jwtAuth.verifyToken,
  //   productHandler.deleteProduct,
  // );

  // this.server.put(
  //   "/api/products/updateProduct/:id",
  //   jwtAuth.verifyToken,
  //   productHandler.UpdateProduct,
  // )

  // Initiation MYSQL Server
  mysqlConnectionPooling.getConnection();

  //Initiation MONGODB Server
  mongoConnectionPooling.init();

}

module.exports = AppServer;

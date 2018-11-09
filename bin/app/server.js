
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const jwtAuth = require('../auth/jwt_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const userHandler = require('../modules/user/handlers/api_handler');

const crossOrigin = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  return next();
};

const cors = corsMiddleware({
  preflightMaxAge: 5, // Optional
  origins: ['*'],
  allowHeaders: ['Origin, X-Requested-With, Content-Type, Accept, OPTIONS'],
  exposeHeaders: ['OPTIONS']
});

function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

  this.server.serverKey = '';
  this.server.pre(cors.preflight);
  this.server.use(cors.actual);
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for basic auth
  this.server.use(basicAuth.init());
  this.server.use(crossOrigin);

  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });

  // authenticated client can access the end point, place code bellow
  this.server.post('/api/v1/register', basicAuth.isAuthenticated, userHandler.postDataRegister);
  this.server.post('/api/v1/login', basicAuth.isAuthenticated, userHandler.postDataLogin);
  this.server.get('/api/v1/me', jwtAuth.verifyToken, userHandler.getUser);
  this.server.put('/api/v1/me', jwtAuth.verifyToken, userHandler.postDataUpdateUser);
}

module.exports = AppServer;

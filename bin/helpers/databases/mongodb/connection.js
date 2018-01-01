'use strict';

const Mongo = require('mongodb').MongoClient;
const wrapper = require('../../utils/wrapper');
const validate = require("validate.js");
const Emitter = require('../../events/event_emitter');
const config = require('../../../infra/configs/global_config');

let connectionPool = [];
const connection = () => 
{
    const connectionState = {index:null,config: '',db: null};
    return connectionState;    
}
const init = () => {
    addConnectionPool();
    createConnectionPool();
}

const addConnectionPool = () => {
    const connectionMongoCoreDOS = connection();
    const connectionMongoProductES = connection();
    const connectionMongoProductView = connection();
    const connectionMongoPriceView = connection();
    const connectionMongoStockView = connection();
    ////const connectionMongoEventLog = connection();
    ///const connectionMongoCoreDOSLocal = connection();
    ///const connectionMongoProductESLocal = connection();
    ///const connectionMongoProductViewLocal = connection();
    connectionMongoCoreDOS.index = 0;
    connectionMongoProductES.index = 1;
    connectionMongoProductView.index = 2;
    connectionMongoPriceView.index = 3;
    connectionMongoStockView.index = 4;
    ////connectionMongoEventLog.index = 5;
    ///connectionMongoCoreDOSLocal.index = 0;
    ///connectionMongoProductESLocal.index = 1;
    ///connectionMongoProductViewLocal.index = 2;
    ///connectionMongoEventLogLocal.index = 5;
    connectionMongoCoreDOS.config = config.getMongoCoreDOS();
    connectionMongoProductES.config = config.getMongoProductES();
    connectionMongoProductView.config = config.getMongoProductView();
    connectionMongoPriceView.config = config.getMongoPriceView();
    connectionMongoStockView.config = config.getMongoStockView();
    ////connectionMongoEventLog.config = config.getMongoEventLog();
    ///connectionMongoCoreDOSLocal.config = config.getMongoCoreDOSLocal();
    ///connectionMongoProductESLocal.config = config.getMongoProductESLocal();
    ///connectionMongoProductViewLocal.config = config.getMongoProductViewLocal();
    ///connectionPool.push(connectionMongoCoreDOSLocal);
    connectionPool.push(connectionMongoCoreDOS);
    connectionPool.push(connectionMongoProductES);
    connectionPool.push(connectionMongoProductView);
    connectionPool.push(connectionMongoPriceView);
    connectionPool.push(connectionMongoStockView);
    ////connectionPool.push(connectionMongoEventLog);
    ///connectionPool.push(connectionMongoProductESLocal);
    ///connectionPool.push(connectionMongoProductViewLocal);
}

const createConnectionPool = async () => {
    connectionPool.map(async (currentConnection,index) => {
        const result = await createConnection(currentConnection.config);
        if(result.err){
            connectionPool[index].db = currentConnection;
        }else{
            connectionPool[index].db = result.data;
        }
    });
}

const createConnection = async (config) => {
    const options = {poolSize:50,keepAlive:15000,socketTimeoutMS:15000,connectTimeoutMS:15000};
    try{
        const connection = await Mongo.connect(config,options);
        return wrapper.data(connection);
    }catch(err){
        console.log(err);
        return wrapper.error(err,err.message,503);
    }
}

const ifExistConnection = async (config) => {
    let state = {};
    connectionPool.map((currentConnection,index) => {
        if(currentConnection.config===config){
            state = currentConnection;
        }
    });
    if(validate.isEmpty(state)){
        return wrapper.error('Connection Not Exist','Connection Must be Created Before',404);
    }else{
        return wrapper.data(state);
    }
}

const isConnected = async (state) => {
    const connection = state.db;
    if(!connection.serverConfig.isConnected()){
        return wrapper.error('Connection Not Found','Connection Must be Created Before',404,state);
    }else{
        return wrapper.data(state);
    }
}

const getConnection = async (config) => {
    let connectionIndex;
    const checkConnection = async () => {
        const result = await ifExistConnection(config);
        if(result.err){
            return result;
        }else{
            const connection = await isConnected(result.data);
            connectionIndex = result.data.index;
            return connection;
        }
    }
    const result = await checkConnection();
    if(result.err){
        const state = await createConnection(config);
        if(state.err){
            return wrapper.data(connectionPool[connectionIndex]);
        }else{
            connectionPool[connectionIndex].db = state.data;
            return wrapper.data(connectionPool[connectionIndex]);
        }
    }else{
        return result;
    }
}

module.exports = {
    init: init,
    getConnection: getConnection   
}
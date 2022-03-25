const dotenv = require('dotenv');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
dotenv.config({path: './config/config.env'});

const host = process.env.HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

const dbOptions = {
    connectionLimit : 10,
    host            : host,
    user            : user,
    password        : password,
    database        : database,
    port        	: dbPort
};

const sessionOptions = {
    clearExpired: true,
	checkExpirationInterval: 900000,
	expiration: 86400000,
	createDatabaseTable: true,
	endConnectionOnClose: true,
	charset: 'utf8mb4_bin',
	schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
};

const pool  = mysql.createPool(dbOptions);
const sessionStore = new MySQLStore(sessionOptions, pool);

module.exports = {
    pool,
    sessionStore
};
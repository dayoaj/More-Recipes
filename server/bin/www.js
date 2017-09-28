// This will be our application entry. We'll setup our server here.
import http from 'http';
//const http = require('http');
import app from '../server';
//const app = require('../server'); // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
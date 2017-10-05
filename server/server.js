import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Controller from './controllers';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.use(Controller);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});



export default app;

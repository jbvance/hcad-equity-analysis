var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const config = require('./dbconfig');
var router = express.Router();
const { getData } = require('./hcad_controller');
const { createPdf } = require('./createPdf');
const HttpError = require('./http-error');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((req, res, next) => {
  console.log('Middleware');
  next();
});

router.get('/pdf', createPdf);

router.post('/pdf', createPdf);

router.route('/data').get((request, response) => {
  getData('0.76', '1.41', '0.76').then((data) => {
    response.json(data);
  });
});

router.route('/data/:accountId').get((req, res, next) => {
  console.log('ACCOUNT ID', req.params.accountId);
  next();
});

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred.' });
});

var port = process.env.PORT || 5000;
var server = app.listen(port, function () {
  console.log('Server is running..');
});

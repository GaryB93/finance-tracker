const express = require('express');

const app = express();
const PORT = 3000;

// IMPORT ROUTE HANDLERS
const apiRouter = require('./routes/api');

// HANDLE PARSING REQUEST BODY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DEFINE ROUTE HANDLERS
app.use('/api', apiRouter);

// CATCH-ALL ROUTE HANDLER FOR ANY REQUESTS TO AN UNKNOWN ROUTE
app.use((req, res) => {
  return res.status(404).send('Page not found');
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
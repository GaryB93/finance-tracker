// const { findCacheDir } = require('webpack-dev-server');
const db = require('../models/financeModels');

const financeController = {};

// GET INCOME AND EXPENSES FOR CURRENT MONTH TO DISPLAY ON HOME PAGE
financeController.getMonth = (req, res, next) => {
  const queryString = `SELECT * FROM items WHERE itemdate = '` + req.params.date + `'`;

  db.query(queryString)
    .then(data => {
      res.locals.message = data.rows;
      return next();
    })
    .catch(err => {
      const errorObj = {
        log: 'financeController.getMonth middleware error',
        status: 501,
        message: 'Unable to get month'
      }
      return next(errorObj);
    })
}

// GET FINANCIAL HISTORY BY THE MONTH FOR THE HISTORY PAGE
financeController.getHistory = (req, res, next) => {
  const queryString = `SELECT * FROM items`;

  db.query(queryString)
    .then(data => {
      res.locals.message = data.rows;
      return next();
    })
    .catch(err => {
      const errorObj = {
        log: 'financeController.getHistory middleware error',
        status: 501,
        message: 'Unable to get history'
      }
      return next(errorObj);
    })
}

// GET INCOME ITEMS FOR CURRENT MONTH
financeController.getIncome = (req, res, next) => {
  
  const queryString = `
  SELECT description, amount, id 
  FROM items 
  WHERE (type = 'income') AND (itemdate LIKE '2023-04%')
  `;

  db.query(queryString)
    .then(data => {
      res.locals.message = data.rows;
      return next();
    })
    .catch(err => {
      const errorObj = {
        log: 'financeController.getIncome middleware error',
        status: 501,
        message: 'Unable to get income'
      }
      return next(errorObj);
    })
}

// GET EXPENSE ITEMS FOR CURRENT MONTH
financeController.getExpenses = (req, res, next) => {
  const values = req.params.date;

  const queryString = `
  SELECT description, amount, id 
  FROM items 
  WHERE type = 'expense' AND itemdate = $1
  `;

  db.query(queryString, [values])
    .then(data => {
      res.locals.message = data.rows;
      return next();
    })
    .catch(err => {
      const errorObj = {
        log: 'financeController.getIncome middleware error',
        status: 501,
        message: 'Unable to get income'
      }
      return next(errorObj);
    })
}

// ADDS INCOME OR EXPENSE ITEM TO DATABASE
financeController.addItem = (req, res, next) => {
  const { item, amount, date, type } = req.body;
  const values = [item, amount, date, type];

  const queryString = `
  INSERT INTO items (description, amount, itemdate, type, user_id)
  VALUES ($1, $2, $3, $4, 1)`;

  db.query(queryString, values)
    .then(data => {
      res.locals.message = data.rows;
      return next();
    })
    .catch(err => {
      const errorObj = {
        log: 'financeController.addItem middleware error',
        status: 501,
        message: 'Unable to add item'
      }
      return next(errorObj);
    })
}

// DELETE INCOME OR EXPENSE ITEM FROM DATABASE
financeController.deleteItem = (req, res, next) => {

  const queryString = `
  DELETE FROM items
  WHERE id = $1`;

  db.query(queryString, [req.params.id])
    .then(data => {
      res.locals.message = 'Item successfully deleted';
      return next();
    })
    .catch(err => {
      const errorObj = {
        log: 'financeController.deleteItem middleware error',
        status: 501,
        message: 'Unable to delete item'
      }
      return next(errorObj);
    })
}

module.exports = financeController;
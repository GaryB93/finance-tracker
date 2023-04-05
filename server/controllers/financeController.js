const { findCacheDir } = require('webpack-dev-server');
const db = require('../models/financeModels');

const financeController = {};

// GET INCOME AND EXPENSES FOR CURRENT MONTH TO DISPLAY ON HOME PAGE
financeController.getMonth = (req, res, next) => {
  const queryString = `SELECT * FROM items`;

  db.query(queryString)
    .then(data => {
      res.locals.message = data.rows;
      return next();
    })
    .catch(err => {
      return next(err);
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
      return next(err);
    })
}

// GET INCOME ITEMS FOR CURRENT MONTH
financeController.getIncome = (req, res, next) => {
  const queryString = `
  SELECT description, amount, item_id 
  FROM items 
  WHERE type = 'income'
  `;

  db.query(queryString)
    .then(data => {
      res.locals.message = data.rows;
      return next();
    })
    .catch(err => {
      return next(err);
    })
}

// GET EXPENSE ITEMS FOR CURRENT MONTH
financeController.getExpenses = (req, res, next) => {
  const queryString = `
  SELECT description, amount, item_id 
  FROM items 
  WHERE type = 'expense'
  `;

  db.query(queryString)
    .then(data => {
      res.locals.message = data.rows;
      return next();
    })
    .catch(err => {
      return next(err);
    })
}

// ADDS INCOME OR EXPENSE ITEM TO DATABASE
financeController.addItem = (req, res, next) => {
  const { item, amount, type } = req.body;
  const values = [item, amount, type];

  const queryString = `
  INSERT INTO items (description, amount, type, user_id)
  VALUES ($1, $2, $3, 1)`;

  db.query(queryString, values)
    .then(data => {
      res.locals.message = data.rows;
      return next();
    })
    .catch(err => {
      return next(err);
    })
}

// DELETE INCOME OR EXPENSE ITEM FROM DATABASE
financeController.deleteItem = (req, res, next) => {

  const queryString = `
  DELETE FROM items
  WHERE item_id = $1`;

  db.query(queryString, [req.params.id])
    .then(data => {
      res.locals.message = 'Item successfully deleted';
      return next();
    })
    .catch(err => {
      return next(err);
    })
}

module.exports = financeController;
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
  const queryString = ``;

  try {
    // db.query(queryString)
    //   .then(data => {
    //     res.locals.history = data.rows;
    //     next();
    //   });
    res.locals.message = 'Made it to getHistory middleware';
    return next();
  }
  catch {
    const error = {
      log: 'financeController.getHistory',
      message: 'getHistory did not work'
    };
    next(error);
  }
}

// GET INCOME ITEMS FOR CURRENT MONTH
financeController.getIncome = (req, res, next) => {
  const queryString = ``;

  try {
    // db.query(queryString)
    //   .then(data => {
    //     res.locals.income = data.rows;
    //     next();
    //   });
    res.locals.message = 'Made it to getIncome middleware';
    return next();
  }
  catch {
    const error = {
      log: 'financeController.getIncome',
      message: 'getIncome did not work'
    };
    next(error);
  }
}

// GET EXPENSE ITEMS FOR CURRENT MONTH
financeController.getExpenses = (req, res, next) => {
  const queryString = ``;

  try {
    // db.query(queryString)
    //   .then(data => {
    //     res.locals.expenses = data.rows;
    //     next();
    //   });
    res.locals.message = 'Made it to getExpenses middleware';
    return next();
  }
  catch {
    const error = {
      log: 'financeController.getExpenses',
      message: 'getExpenses did not work'
    };
    next(error);
  }
}

// ADDS INCOME OR EXPENSE ITEM TO DATABASE
financeController.addItem = (req, res, next) => {
  const queryString = ``;

  try {
    // db.query(queryString)
    //   .then(data => {
    //     res.locals.item = data.rows;
    //     next();
    //   });
    res.locals.message = 'Made it to addItem middleware';
    return next();
  }
  catch {
    const error = {
      log: 'financeController.addItem',
      message: 'addItem did not work'
    };
    next(error);
  }
}

module.exports = financeController;
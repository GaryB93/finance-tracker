const express = require('express');

const financeController = require('../controllers/financeController');

const router = express.Router();

router.get('/',
  financeController.getMonth,
  (req, res) => res.status(200).json(res.locals.message)
);

router.get('/history',
  financeController.getHistory,
  (req, res) => res.status(200).json(res.locals.message)
);

router.get('/income',
  financeController.getIncome,
  (req, res) => res.status(200).json(res.locals.message)
);

router.get('/expenses',
  financeController.getExpenses,
  (req, res) => res.status(200).json(res.locals.message)
);

router.post('/items',
  financeController.addItem,
  (req, res) => res.status(200).json(res.locals.message)
);

router.post('/delete/:id',
  financeController.deleteItem,
  (req, res) => res.status(200).json(res.locals.message)
);

module.exports = router;
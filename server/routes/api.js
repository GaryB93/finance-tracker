const express = require('express');

const financeController = require('../controllers/financeController');

const router = express.Router();

router.get('/month/:date',
  financeController.getMonth,
  (req, res) => res.status(200).json(res.locals.message)
);

router.get('/history',
  financeController.getHistory,
  (req, res) => res.status(200).json(res.locals.message)
);

router.get('/income/:date',
  financeController.getIncome,
  (req, res) => res.status(200).json(res.locals.message)
);

router.get('/expenses/:date',
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
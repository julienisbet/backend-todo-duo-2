const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Todo = require('../models/Todo');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const data = await Todo.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

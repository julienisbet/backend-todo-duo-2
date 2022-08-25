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
  })
  .put('/:id', authenticate, async (req, res, next) => {
    try {
      console.log(req.body);
      const data = await Todo.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next (e);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const data = await Todo.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

const { Router } = require('express');
const UserService = require('../services/UserService');
const OneDayInMs = 1000 * 60 * 60 * 24;
const jwt = require('jsonwebtoken');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      console.log(user);
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.SECURE_COOKIES === 'true',
        sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
        maxAge: OneDayInMs,
      })
        .json(user);
    } catch (e) {
      next(e);
    }
  });


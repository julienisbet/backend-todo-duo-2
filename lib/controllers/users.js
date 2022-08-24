const { Router } = require('express');
const UserService = require('../services/UserService');
const OneDayInMs = 1000 * 60 * 60 * 24;
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
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
  })

  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await UserService.signIn({ email, password });
      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: OneDayInMs,
      }).json({ Message: 'Welcome Princess' });
    } catch (e) {
      next(e);
    }
  })

  .get('/me', authenticate, async (req, res) => {
    res.json(req.user);
  })

  .delete('/sessions', async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.SECURE_COOKIES === 'true',
      sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
      maxAge: OneDayInMs
    }).status(204).send();
  });

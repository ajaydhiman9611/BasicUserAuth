const api = require("express").Router();
var userHandlers = require('../controllers/user.controller.js');

api.post('/tasks', userHandlers.loginRequired, userHandlers.profile);
api.post('/auth/register', userHandlers.register);
api.post('/auth/sign_in', userHandlers.sign_in);

module.exports = api;
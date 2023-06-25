const { model } = require('mongoose');
const { getUsers, getUserById, createUser } = require('../controllers/users');

const usersRoutes = require('express').Router();

usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/:userId', getUserById);
usersRoutes.post('/users', createUser);

model.exports = usersRoutes;
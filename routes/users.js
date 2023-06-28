const usersRoutes = require('express').Router();

const { getUsers, getUserById, createUser, updateUserInfo, updateUserAvatar } = require('../controllers/users');

usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/:_id', getUserById);
usersRoutes.post('/users', createUser);
usersRoutes.patch('/users/me', updateUserInfo);
usersRoutes.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRoutes;
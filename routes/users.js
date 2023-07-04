const usersRoutes = require('express').Router();

const { login, getUsers, getUserById, createUser, updateUserInfo, updateUserAvatar, getMyUser } = require('../controllers/users');

usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/:_id', getUserById);
usersRoutes.post('/singup', createUser);
usersRoutes.patch('/users/me', updateUserInfo);
usersRoutes.patch('/users/me/avatar', updateUserAvatar);
usersRoutes.post('/signin', login);
usersRoutes.get('/users/me', getMyUser);

module.exports = usersRoutes;
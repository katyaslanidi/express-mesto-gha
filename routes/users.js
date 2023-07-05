const usersRoutes = require('express').Router();

const { registration, login, getUsers, getUserById, updateUserInfo, updateUserAvatar, getMyUser } = require('../controllers/users');

usersRoutes.post('/singup', registration);
usersRoutes.post('/signin', login);
usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/:_id', getUserById);
usersRoutes.patch('/users/me', updateUserInfo);
usersRoutes.patch('/users/me/avatar', updateUserAvatar);
usersRoutes.get('/users/me', getMyUser);

module.exports = usersRoutes;
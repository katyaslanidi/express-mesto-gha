const usersRoutes = require('express').Router();

const { getUsers, getUserById, updateUserInfo, updateUserAvatar, getMyUser } = require('../controllers/users');
const { getUserByIdValidation, updateUserInfoValidation, updateUserAvatarValidation } = require('../middlewares/validation');

usersRoutes.get('/users/:_id', getUserByIdValidation, getUserById);
usersRoutes.patch('/users/me', updateUserInfoValidation, updateUserInfo);
usersRoutes.patch('/users/me/avatar', updateUserAvatarValidation, updateUserAvatar);

usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/me', getMyUser);

module.exports = usersRoutes;
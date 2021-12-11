const { validateRegister, validateEdit } = require('../../validation/userValidation');
const {
    registerUser,
    getUsers,
    getUserById,
    getUserByWallet,
    updateUser,
    deleteUser,
    loginUser
} = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', validateRegister, registerUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/wallet/:wallet', getUserByWallet);
router.put('/:id', validateEdit, updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

module.exports = router;
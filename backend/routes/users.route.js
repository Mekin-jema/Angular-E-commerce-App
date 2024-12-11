import express from 'express';
import {
    addUser,
    deleteUser,
    getAllUsers,
    getTotalNumberOfUsers,
    getUsersById,
    login,
    register,
    updateUser
} from '../controllers/user.controller.js';

const router = express.Router();
router.get(`/get-all-users`, getAllUsers);

router.get('/get-single-user/:id', getUsersById);

router.post('/add-user/', addUser);

router.put('/update-user/:id', updateUser);

router.post('/login', login);

router.post('/register', register);

router.delete('/delete-user/:id', deleteUser);

router.get(`/get-total-users`, getTotalNumberOfUsers);

export default router;

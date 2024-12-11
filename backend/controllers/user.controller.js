import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
    try {
        const userList = await User.find().select('-passwordHash');

        if (!userList) {
            res.status(500).json({ success: false });
        }
        res.send(userList);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export const getUsersById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');

        if (!user) {
            res.status(500).json({ message: 'The user with the given ID was not found.' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export const addUser = async (req, res) => {
    try {
        const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } =
            req.body;
        let user = new User({
            name,
            email,
            passwordHash: bcrypt.hashSync(password, 10),
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country
        });
        user = await user.save();

        if (!user) return res.status(400).send('the user cannot be created!');

        res.send(user);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userExist = await User.findById(req.params.id);
        let newPassword;
        if (req.body.password) {
            newPassword = bcrypt.hashSync(req.body.password, 10);
        } else {
            newPassword = userExist.passwordHash;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                passwordHash: newPassword
            },
            { new: true }
        );

        if (!user) return res.status(400).send('the user cannot be created!');

        res.send(user);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const secret = process.env.secret;
        if (!user) {
            return res.status(400).send('The user not found');
        }

        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                { expiresIn: '1d' }
            );

            res.status(200).send({ user: user.email, token: token });
        } else {
            res.status(400).send('password is wrong!');
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } =
            req.body;
        let user = new User({
            name,
            email,
            passwordHash: bcrypt.hashSync(password, 10),
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country
        });
        user = await user.save();

        if (!user) return res.status(400).send('the user cannot be created!');

        res.send(user);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        User.findByIdAndDelete(req.params.id)
            .then((user) => {
                if (user) {
                    return res.status(200).json({ success: true, message: 'the user is deleted!' });
                } else {
                    return res.status(404).json({ success: false, message: 'user not found!' });
                }
            })
            .catch((err) => {
                return res.status(500).json({ success: false, error: err.message });
            });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
export const getTotalNumberOfUsers = async (req, res) => {
    try {
        const userCount = await User.countDocuments();

        if (!userCount) {
            res.status(500).json({ success: false });
        }
        res.send({
            userCount: userCount
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

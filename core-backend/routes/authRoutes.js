// core-backend/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router(); // <-- THIS LINE IS CRUCIAL

// --- Helper function to generate a JWT ---
const generateToken = (id, roles) => {
    return jwt.sign(
        { id, roles },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// --- Public Route: Register a new user ---
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }
    try {
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'User with that email or username already exists' });
        }
        const user = await User.create({ username, email, password });
        if (user) {
            res.status(201).json({
                message: 'User registered successfully!',
                userId: user._id,
                username: user.username,
                email: user.email
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// --- Public Route: Authenticate user & get token ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials (email or password)' });
        }
        const token = generateToken(user._id, user.roles);
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            token: token
        });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

module.exports = router; 
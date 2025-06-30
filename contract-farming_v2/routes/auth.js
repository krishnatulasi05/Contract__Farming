const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// @route POST /api/auth/register
// @desc Register a new user
// @access Public
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        console.log("Request Body:", req.body);

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user instance
        user = new User({
            name,
            email,
            password,
            role,
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        // Create and sign a JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        console.log("JWT Secret:", process.env.JWT_SECRET);
        console.log("Payload:", payload);

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'defaultsecret', // Fallback secret
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error('Error signing JWT:', err);
                    return res.status(500).send('Server error');
                }
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route POST /api/auth/login
// @desc Authenticate user and get token
// @access Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Request Body:", req.body);

        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and sign a JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        console.log("JWT Secret:", process.env.JWT_SECRET);
        console.log("Payload:", payload);

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'defaultsecret', // Fallback secret
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error('Error signing JWT:', err);
                    return res.status(500).send('Server error');
                }
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

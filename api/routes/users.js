import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
const router = new Router();


function createToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    };
    const options = {
        expiresIn: 1000 * 60 * 60 * 24
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
}

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.status(200).json({ data: users });
});

router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        user.password = bcrypt.hashSync(user.password, 12);
        const newUser = await User.insert(user);
        res.status(201).json({ data: newUser });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Email already taken' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.find({ username });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = createToken(user);
            res.status(200).json({ data: token });
        } else {
            res.status(401).json({ error: 'Wrong credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
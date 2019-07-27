import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
const router = new Router();

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

export default router;
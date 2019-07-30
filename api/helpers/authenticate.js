import jwtDecode from 'jwt-decode';
import User from '../models/User';


export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'You need to login first' });
        }

        const decoded = jwtDecode(token);
        const user = await User.get(decoded.id);
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized!' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const artistsOnly = (req, res, next) => {
    try {
        const { user } = req;
        if (user && user.role === 'artist') {
            next();
        } else {
            return res.status(401).json({ error: 'Unauthorized!' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};    
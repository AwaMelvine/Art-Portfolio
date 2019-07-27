import validator from 'validator';

export const validateRegister = (req, res, next) => {
    const user = req.body;
    const errors = [];

    if (user.username && validator.isEmpty(user.username)) {
        errors.push({ username: 'Username required' });
    }

    if (user.password && validator.isEmpty(user.password)) {
        errors.push({ password: 'Password required' });
    }

    if (user.email && validator.isEmpty(user.email)) {
        errors.push({ email: 'Email required' });
    }

    if (user.email && !validator.isEmail(user.email)) {
        errors.push({ email: 'Email is invalid' });
    }

    if (user.password && user.passwordConf && !validator.equals(user.password, user.passwordConf)) {
        errors.push({ passwordConf: 'The two passwords do not match' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    delete user.passwordConf;
    next();
};

export const validateLogin = (req, res, next) => {
    const user = req.body;
    const errors = [];

    if (!user.username || validator.isEmpty(user.username)) {
        errors.push({ username: 'Username required' });
    }

    if (!user.password || validator.isEmpty(user.password)) {
        errors.push({ password: 'Password required' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};
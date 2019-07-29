import validator from 'validator';
import Post from '../models/Post';

export const validateCreate = (req, res, next) => {
    const post = req.body;
    const errors = [];


    if (!post.title || validator.isEmpty(post.title)) {
        errors.push({ title: 'Title required' });
    }

    if (!post.description || validator.isEmpty(post.description)) {
        errors.push({ description: 'Description required' });
    }

    const user_id = Number.parseInt(post.user_id, 10);
    if (!Number.isInteger(user_id)) {
        errors.push({ user_id: 'Valid user ID required' });
    }

    if (!post.image || validator.isEmpty(post.image)) {
        errors.push({ image: 'Post image required' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

export const validateUpdate = (req, res, next) => {
    const post = req.body;
    const errors = [];

    if (!req.body || (!post.title && !post.user_id && !post.description && !post.image)) {
        errors.push({ global: 'Post data required' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    req.post = post;
    next();
};

export const validatePostId = async (req, res, next) => {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isInteger(id)) {
        const post = await Post.get(id);
        if (post) {
            req.post = post; // eslint-disable-line
            next();
        } else {
            return res.status(404).json({ errors: "There's no post with that id" });
        }
    } else {
        return res.status(400).json({ errors: "invalid post id" });
    }

};
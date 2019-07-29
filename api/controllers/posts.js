import Post from '../models/Post';


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.get();
        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.get(id);
        res.status(200).json({ data: post });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const addPost = async (req, res) => {
    try {
        const post = await Post.insert(req.body);
        res.status(201).json({ data: post });
    } catch (error) {
        if (error.code === '23505' && error.constraint === 'posts_title_unique') {
            return res.status(400).json({ errors: { title: 'Post title already exists' } })
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.update(id, req.body);
        res.status(200).json({ data: post });
    } catch (error) {
        if (error.code === '23505' && error.constraint === 'posts_title_unique') {
            return res.status(400).json({ errors: { title: 'Post title already exists' } })
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const count = await Post.remove(id);
        res.status(200).json({ data: count });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
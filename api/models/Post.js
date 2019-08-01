import "@babel/polyfill";
import db from '../db/dbConfig';

const table = 'posts';

export default {
    async get(id = null) {
        if (id) {
            const post = await db.select('posts.*', 'users.username')
                .from('posts')
                .leftJoin('likes', 'posts.id', 'likes.post_id')
                .leftJoin('users', 'posts.user_id', 'users.id')
                .count('likes.post_id', { as: 'likes' })
                .groupBy('posts.id', 'users.username').where({ 'posts.id': id }).first();
            return post;
        }
        const posts = await db.select('posts.*', 'users.username')
            .from('posts')
            .leftJoin('likes', 'posts.id', 'likes.post_id')
            .leftJoin('users', 'posts.user_id', 'users.id')
            .count('likes.post_id', { as: 'likes' })
            .groupBy('posts.id', 'users.username');
        return posts;
    },

    async find(columns) {
        const posts = await db.select('posts.*', 'users.username')
            .from('posts')
            .leftJoin('likes', 'posts.id', 'likes.post_id')
            .leftJoin('users', 'posts.user_id', 'users.id')
            .count('likes.post_id', { as: 'likes' })
            .groupBy('posts.id', 'users.username').where(columns).first();
        return posts;
    },

    async insert(post) {
        const [newPost] = await db(table).insert(post).returning('*');
        return newPost;
    },

    async update(id, changes) {
        const updatedPost = await db(table).where({ id }).update(changes).returning('*');
        return updatedPost;
    },

    async remove(id) {
        const count = await db(table).where({ id }).del();
        return count;
    }
};
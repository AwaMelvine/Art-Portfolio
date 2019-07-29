import "@babel/polyfill";
import db from '../db/dbConfig';

const table = 'posts';

export default {
    async get(id = null) {
        if (id) {
            const post = await db(table).where({ id }).first();
            return post;
        }
        const posts = await db(table);
        return posts;
    },

    async find(columns) {
        return await db(table).where(columns).first();
    },

    async insert(post) {
        const [newPost] = await db(table).insert(post).returning('*');
        return newPost;
    },

    async update(id, changes) {
        return await db(table).where({ id }).update(changes).returning('*');
    },

    async remove(id) {
        return await db(table).where({ id }).del();
    }
};
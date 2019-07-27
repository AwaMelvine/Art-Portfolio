import "@babel/polyfill";
import db from '../db/dbConfig';

const table = 'users';

export default {
    async get(id = null) {
        if (id) {
            const user = await db(table).where({ id }).first();
            return user;
        }
        const users = await db(table);
        return users;
    },

    async find(columns) {
        return await db(table).where(columns).first();
    },

    async insert(user) {
        const [newUser] = await db(table).insert(user).returning('*');
        return newUser;
    },

    async update(id, changes) {
        return await db(table).where({ id }).update(changes);
    },

    async remove(id) {
        return await db(table).where({ id }).del();
    }
};
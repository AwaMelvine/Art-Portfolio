import db from '../db/dbConfig';

const table = 'users';

export default {
    async get(id = null) {
        if (id) {
            return await db(table).where({ id }).first();
        }
        return db(table);
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
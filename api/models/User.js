import db from '../db/dbConfig'

const table = 'users';

export default {
    async find(id = null) {
        if (id) {
            return await db(table).where({ id }).first();
        }
        return db(table);
    },

    async insert(user) {
        await db(table).insert(user);
        return this.find();
    },

    async update(id, changes) {
        return await db(table).where({ id }).update(changes);
    },

    async remove(id) {
        return await db(table).where({ id }).del();
    }
};
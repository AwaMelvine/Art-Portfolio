import "@babel/polyfill";
import User from '../models/User';
import db from '../db/dbConfig';


const user = {
    id: 1,
    role: 'admin',
    username: 'Melvine',
    email: 'melvine@melvine.com',
    password: 'mel'
};

const artist = {
    id: 2,
    role: 'artist',
    username: 'Awa',
    email: 'awa@awa.com',
    password: 'mel'
};


const changes = {
    username: 'Awa Melvine',
    email: 'melvine@awa.com',
};



beforeAll(async () => {
    await db.raw('TRUNCATE TABLE users CASCADE');
});

afterAll(async () => {
    await db.raw('TRUNCATE TABLE users CASCADE');
});

describe('User Model', () => {
    it('gets an array of all users', async () => {
        await User.insert(user);
        const users = await User.get();
        expect(users.length).toBe(1);
    });
    it('gets a user by Id', async () => {
        const createdUser = await User.get(1);
        expect(createdUser.email).toBe(user.email);
    });
    it('creates a new user', async () => {
        await User.insert(artist);
        const users = await User.get();
        expect(users.length).toBe(2);
    });
    it('updates user info', async () => {
        await User.update(2, changes);
        const updatedUser = await User.get(2);
        expect(updatedUser.username).toEqual(changes.username);
    });
    it('deletes a user', async () => {
        await User.remove(3);
        const users = await User.get();
        expect(users.length).toBe(2);
    });
    xit('gets a user\'s posts given the user id', async () => {

    });
    xit('upvotes a post', async () => {

    });
    xit('downvotes a post', async () => {

    });
})
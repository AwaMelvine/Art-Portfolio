import "@babel/polyfill";
import User from '../models/User';
import db from '../db/dbConfig';

const admin = {
    role: 'user',
    username: 'John',
    email: 'john@john.com',
    password: 'mel'
};

const artist = {
    role: 'artist',
    username: 'Awa',
    email: 'awa@awa.com',
    password: 'mel'
};

const user = {
    role: 'admin',
    username: 'Melvine',
    email: 'melvine@melvine.com',
    password: 'mel'
};

const changes = {
    username: 'Melvine Awa',
    email: 'melvine@awa.com',
};



beforeAll(async () => {
    await db('users').truncate();
    await User.insert(admin);
    await User.insert(artist);
});

afterAll(async () => {
    await db('users').truncate();
});

describe('User Model', () => {
    it('gets an array of all users', async () => {
        const users = await User.get();
        expect(users.length).toBe(2);
    });
    it('gets a user by Id', async () => {
        const user = await User.get(1);
        expect(user.email).toBe('john@john.com');
    });
    it('creates a new user', async () => {
        await User.insert(user);
        const users = await User.get();
        expect(users.length).toBe(3);
    });
    it('updates user info', async () => {
        await User.update(3, changes);
        const updatedUser = await User.get(3);
        expect(updatedUser.username).toEqual('Melvine Awa');
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
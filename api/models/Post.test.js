import "@babel/polyfill";
import Post from '../models/Post';
import Like from '../models/Like';
import User from '../models/User';
import db from '../db/dbConfig';
import faker from 'faker';

const user = {
    id: 1,
    role: 'admin',
    username: 'Melvine',
    email: 'melvine@melvine.com',
    password: 'mel'
};

const firstPost = {
    id: 1,
    title: 'This is the first post',
    user_id: 1,
    description: 'This is the description of the first post.',
    image: faker.image.food()
};

const secondPost = {
    id: 2,
    title: 'This is the second post',
    user_id: 1,
    description: 'This is the description of the second post.',
    image: faker.image.food()
};

const changes = {
    title: 'Second post (updated)',
    description: 'This is the (Updated) description of the second post.'
};

beforeAll(async () => {
    await db.raw('TRUNCATE TABLE users CASCADE');
    await db.raw('TRUNCATE TABLE posts CASCADE');
    await User.insert(user);
});

afterAll(async () => {
    await db.raw('TRUNCATE TABLE users CASCADE');
    await db.raw('TRUNCATE TABLE posts CASCADE');
});

describe('Post Model', () => {
    it('gets an array of all posts', async () => {
        await Post.insert(firstPost);
        const posts = await Post.get();
        expect(posts.length).toBe(1);
    });
    it('gets a post by Id', async () => {
        const createdPost = await Post.get(1);
        expect(createdPost.title).toBe(firstPost.title);
    });
    it('creates a new post', async () => {
        await Post.insert(secondPost);
        const posts = await Post.get();
        expect(posts.length).toBe(2);
    });
    it('updates post info', async () => {
        await Post.update(2, changes);
        const updatedPOST = await Post.get(2);
        expect(updatedPOST.title).toEqual(changes.title);
    });
    it('deletes a post', async () => {
        await Post.remove(2);
        const posts = await Post.get();
        expect(posts.length).toBe(1);
    });
    it('likes a post', async () => {
        const likes = await Like.like({ user_id: user.id, post_id: firstPost.id });
        expect(likes[0].count).toEqual('1');
    });
    it('unlikes a post', async () => {
        const likes = await Like.like({ user_id: user.id, post_id: firstPost.id });
        expect(likes[0].count).toEqual('0');
    });
});
import "@babel/polyfill";
import faker from 'faker';
import server from '../server';
import request from 'supertest';
import db from "../db/dbConfig";
import Post from "../models/Post";
import User from "../models/User";


const user = {
    id: 1,
    role: 'artist',
    username: 'Melvine',
    email: 'melvine@melvine.com',
    password: 'mel',
    passwordConf: 'mel'
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

let token = '';


beforeEach(async () => {
    await db.raw('TRUNCATE TABLE users CASCADE');
    await db.raw('TRUNCATE TABLE posts CASCADE');
});

afterEach(async () => {
    await db.raw('TRUNCATE TABLE users CASCADE');
    await db.raw('TRUNCATE TABLE posts CASCADE');
});

describe('Post Endpoints', () => {
    describe('[POST]: /api/posts Endpoint: ', () => {
        it('creates a new post', () => {
            return request(server)
                .post('/api/register')
                .send(user)
                .then(res => {
                    token = res.body.data.token;
                    return request(server)
                        .post('/api/posts')
                        .send(firstPost)
                        .set('Authorization', token)
                        .expect(201)
                        .then(res => {
                            expect(res.body.data.title).toEqual(firstPost.title);
                        });
                });
        });
        it('returns an error if user unauthorized', () => {
            return request(server)
                .post('/api/posts')
                .send(firstPost)
                .set('Authorization', token)
                .expect(401)
                .then(res => {
                    expect(res.body.error).toEqual('Unauthorized!');
                });
        });

        it('returns a json response', () => {
            return request(server)
                .post('/api/register')
                .send(user)
                .then(res => {
                    token = res.body.data.token;
                    return request(server)
                        .post('/api/posts')
                        .send(firstPost)
                        .set('Authorization', token)
                        .expect(201)
                        .expect('Content-Type', /json/);
                });
        });

        it('returns an error if no title provided', () => {
            const postNoTitle = { ...firstPost };
            delete postNoTitle.title;
            return request(server)
                .post('/api/register')
                .send(user)
                .then(res => {
                    token = res.body.data.token;
                    return request(server)
                        .post('/api/posts')
                        .send(postNoTitle)
                        .set('Authorization', token)
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .then(res => {
                            expect(res.body.errors[0].title).toEqual('Title required');
                        });
                });
        });

        it('returns an error if no user_id provided', () => {
            const postNoUserId = { ...firstPost, title: 'Some unique title' };
            delete postNoUserId.user_id;
            return request(server)
                .post('/api/register')
                .send(user)
                .then(res => {
                    token = res.body.data.token;
                    return request(server)
                        .post('/api/posts')
                        .send(postNoUserId)
                        .set('Authorization', token)
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .then(res => {
                            expect(res.body.errors[0].user_id).toEqual('Valid user ID required');
                        });
                });
        });

        it('returns an error if no description provided', () => {
            const postNoDescription = { ...firstPost, title: 'Some other unique title' };
            delete postNoDescription.description;
            return request(server)
                .post('/api/register')
                .send(user)
                .then(res => {
                    token = res.body.data.token;
                    return request(server)
                        .post('/api/posts')
                        .send(postNoDescription)
                        .set('Authorization', token)
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .then(res => {
                            expect(res.body.errors[0].description).toEqual('Description required');
                        });
                });
        });

        it('returns an error if no image provided', () => {
            const postNoImage = { ...firstPost };
            delete postNoImage.image;
            return request(server)
                .post('/api/register')
                .send(user)
                .then(res => {
                    token = res.body.data.token;
                    return request(server)
                        .post('/api/posts')
                        .send(postNoImage)
                        .set('Authorization', token)
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .then(res => {
                            expect(res.body.errors[0].image).toEqual('Post image required');
                        });
                });
        });



    });

    describe('[GET]: /api/posts Endpoints', () => {
        it('returns a json object', () => {
            return request(server)
                .get('/api/posts')
                .expect(200)
                .expect('Content-Type', /json/);
        });
        it('returns array of all available posts', async () => {
            const newUser = { ...user };
            delete newUser.passwordConf;
            await User.insert(newUser);
            await Post.insert(firstPost);
            return request(server)
                .get('/api/posts')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body.data.length).toEqual(1);
                });
        });
    });

    describe('[GET]: /api/posts/:id get by id', () => {
        it('returns a post given the post id', async () => {
            const newUser = { ...user };
            delete newUser.passwordConf;
            await User.insert(newUser);
            await Post.insert(firstPost);
            return request(server)
                .get(`/api/posts/1`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body.data.title).toEqual(firstPost.title);
                });
        });
        it('returns an error if invalid id provided', async () => {
            const newUser = { ...user };
            delete newUser.passwordConf;
            await User.insert(newUser);
            await Post.insert(firstPost);
            return request(server)
                .get(`/api/posts/gibberishId`)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body.errors).toEqual('invalid post id');
                });
        });
    });

});
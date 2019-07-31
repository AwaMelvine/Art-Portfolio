import "@babel/polyfill";
import server from '../server';
import request from 'supertest';
import db from "../db/dbConfig";

const firstUser = {
    role: 'artist',
    username: 'Awa',
    email: 'awa@awa.com',
    passwordConf: 'mel',
    password: 'mel',
};
const secondUser = {
    role: 'user',
    username: 'John',
    email: 'john@john.com',
    password: 'mel',
    passwordConf: 'mel'
};


beforeAll(async () => {
    await db('users').truncate();
})

describe('Auth Endpoints', () => {
    describe('Register Endpoint: ', () => {
        it('responds with json', () => {
            return request(server)
                .post('/api/register')
                .send(firstUser)
                .expect(201)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);
        });
        it('creates a user and return user with token', done => {
            return request(server)
                .post('/api/register')
                .send(secondUser)
                .expect(201)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then((res) => {
                    expect(res.body.data.email).toEqual(secondUser.email);
                    done();
                });
        });

        it('returns an error if no username provided', done => {
            const userNoUsername = { ...firstUser, email: 'unique@email.com' };
            delete userNoUsername.username;
            return request(server)
                .post('/api/register')
                .send(userNoUsername)
                .expect(400)
                .then(res => {
                    expect(res.body.errors[0].username).toEqual('Username required');
                    done();
                })
        });

        it('returns an error if no email provided', done => {
            const userNoEmail = { ...firstUser };
            delete userNoEmail.email;
            return request(server)
                .post('/api/register')
                .send(userNoEmail)
                .expect(400)
                .then(res => {
                    expect(res.body.errors[0].email).toEqual('Email required');
                    done();
                })
        });

        it('returns an error if no password provided', done => {
            const userNoPassword = { ...firstUser };
            delete userNoPassword.password;
            return request(server)
                .post('/api/register')
                .send(userNoPassword)
                .expect(400)
                .then(res => {
                    expect(res.body.errors[0].password).toEqual('Password required');
                    done();
                })
        });

        it('returns an error if the two passwords do not match', done => {
            const userPasswordsNoMatch = { ...firstUser };
            userPasswordsNoMatch.password = 'different';
            return request(server)
                .post('/api/register')
                .send(userPasswordsNoMatch)
                .expect(400)
                .then(res => {
                    expect(res.body.errors[0].passwordConf).toEqual('The two passwords do not match');
                    done();
                })
        });
    });

});
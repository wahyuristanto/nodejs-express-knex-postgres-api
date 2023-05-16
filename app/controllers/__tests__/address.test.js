const request = require('supertest')

const knex = require('../../knex')
const app = require('../../app')


describe('User', () => {
    describe('GET /api/users/:uid', () => {
        test('returns 401 when not authenticated', async () => {
            const response = await request(app)
                .get('/api/users/testUid')
                .expect(401)
        })

        test('GET returns 200 and a required user object', async () => {
            const response = await request(app)
                .get('/api/users/testUid')
                .set('Authorization', 'testIdToken')
                .expect(200)
            expect(response.body.uid).toBe('testUid')
        })
    })

    describe('/api/users/create', () => {
        test('returns 400 when there is no uid in the req.body', async () => {
            const response = await request(app)
                .put('/api/users/create')
                .expect(400)
        })

        test('returns 200 and an id of the new db entity', async () => {
            const response = await request(app)
                .put('/api/users/create')
                .send({
                    uid: 'testNewUid'
                })
                .expect(201)
            expect(response.body.id).not.toBeNull()
        })
    })

    describe('/api/users/update', () => {
        test('returns 401 when not authenticated', async () => {
            const response = await request(app)
                .put('/api/users/update')
                .expect(401)
        })

        test('returns 400 when request body is an empty object ', async () => {
            const response = await request(app)
                .put('/api/users/update')
                .set('Authorization', 'testIdToken')
                .expect(400)
        })

        test('updates the correct db record and return 200', async () => {
            const response = await request(app)
                .put('/api/users/update')
                .send({
                    registration_token: 'updated token'
                })
                .set('Authorization', 'testIdToken')
                .expect(200)
            const dbData = await knex('users').where({ uid: 'testUid' })
            expect(dbData[0].registration_token).toBe('updated token')
        })
    })
})


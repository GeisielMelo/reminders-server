import request from 'supertest'
import App from '../../src/app'
import database from '../../src/database'

describe('API RESPONSE', () => {
  let server: App
  let authToken: string
  let userId: string

  const email: string = `dev${Math.floor(Date.now() / 1000)}@email.com`
  const password: string = 'dev'

  beforeAll(() => {
    server = new App()
    server.listen(3000)
  })

  afterAll(() => {
    database.disconnect()
  })

  // User
  test('Should return 422 for the /users route on invalid input.', async () => {
    const response = await request(server.app).post('/users').send({
      email: '',
      password: '',
    })

    expect(response.status).toBe(422)
  })

  test('Should return 201 for the /users route when creating a user.', async () => {
    const response = await request(server.app).post('/users').send({
      email,
      password,
    })

    expect(response.status).toBe(201)
    userId = response.body._id
  })

  test('Should return 422 for the /users route when the user already exists.', async () => {
    const response = await request(server.app).post('/users').send({
      email,
      password,
    })

    expect(response.status).toBe(422)
  })

  // Auth
  test('Should return 200 for the /auth/sign-in route when the user submits credentials.', async () => {
    const response = await request(server.app).post('/auth/sign-in').send({
      email,
      password,
    })

    expect(response.status).toBe(200)
    authToken = response.body.token
  })

  test('Should return 404 for the /auth/sign-in route on invalid input.', async () => {
    const response = await request(server.app).post('/auth/sign-in').send({
      email: '',
      password: '',
    })

    expect(response.status).toBe(404)
  })

  // User
  test('Should return 200 for the /user:id route when requesting user data.', async () => {
    const response = await request(server.app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send()

    expect(response.status).toBe(200)
  })

  test('Should return 401 for the /user:id route when ID do not match with a decoded Token.', async () => {
    const response = await request(server.app).get(`/users/${userId}`).send()

    expect(response.status).toBe(401)
  })

  // Repository
  test('Should return 404 for the /repositories route when has no repository to update.', async () => {
    const response = await request(server.app)
      .patch('/repositories')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        id: userId,
        notes: [{ note: 'Bom Dia!', labels: ['Family'] }],
        labels: ['House', 'Job', 'Family'],
        archived: [],
      })

    expect(response.status).toBe(404)
  })

  test('Should return 201 for the /repositories route when creating a repository.', async () => {
    const response = await request(server.app)
      .post('/repositories')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        id: userId,
      })
    expect(response.status).toBe(201)
  })

  test('Should return 422 for the /repositories route when the repository already exists.', async () => {
    const response = await request(server.app)
      .post('/repositories')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        id: userId,
      })
    expect(response.status).toBe(422)
  })

  test('Should return 401 for the /repositories route when ID do not match with a decoded Token.', async () => {
    const response = await request(server.app)
      .post('/repositories')
      .set('Authorization', `Bearer 1234567890`)
      .send({
        id: userId,
      })
    expect(response.status).toBe(401)
  })

  test('Should return 200 for the /repositories/:id route when requesting repository data.', async () => {
    const response = await request(server.app)
      .get(`/repositories/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        id: userId,
      })

    expect(response.status).toBe(200)
  })

  test('Should return 200 for the /repositories route when updating the repository.', async () => {
    const response = await request(server.app)
      .patch('/repositories')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        id: userId,
        notes: [{ note: 'Bom Dia!', labels: ['Family'] }],
        labels: ['House', 'Job', 'Family'],
        archived: [],
      })

    expect(response.status).toBe(200)
  })

  test('Should return 401 for the /auth/sign-out route when has no token.', async () => {
    const response = await request(server.app).delete('/auth/sign-out').send()

    expect(response.status).toBe(401)
  })

  // Auth
  test('Should return 200 for the /auth/sign-out route when signing out and invalidating the token.', async () => {
    const response = await request(server.app)
      .delete('/auth/sign-out')
      .set('Authorization', `Bearer ${authToken}`)
      .send()

    expect(response.status).toBe(200)
  })
})

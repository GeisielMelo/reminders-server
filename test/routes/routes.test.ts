import request from 'supertest'
import App from '../../src/app'

describe('API SUCCESS RESPONSE', () => {
  let server: App
  let authToken: string
  let userId: string

  const email: string = 'dev10@email.com'
  const password: string = 'dev'

  beforeAll(() => {
    server = new App()
    server.listen(3000)
  })

  test('Should return 201 for the /users route when creating a user.', async () => {
    const response = await request(server.app).post('/users').send({
      email,
      password,
    })

    expect(response.status).toBe(201)
    userId = response.body._id
  })

  test('Should return 200 for the /auth/sign-in route when the user submits credentials.', async () => {
    const response = await request(server.app).post('/auth/sign-in').send({
      email,
      password,
    })

    expect(response.status).toBe(200)
    authToken = response.body.token
  })

  test('Should return 200 for the /user:id route when requesting user data.', async () => {
    const response = await request(server.app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send()

    expect(response.status).toBe(200)
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

  test('Should return 200 for the /auth/sign-out route when signing out and invalidating the token.', async () => {
    const response = await request(server.app)
      .delete('/auth/sign-out')
      .set('Authorization', `Bearer ${authToken}`)
      .send()

    expect(response.status).toBe(200)
  })
})

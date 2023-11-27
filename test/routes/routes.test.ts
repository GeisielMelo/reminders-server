import request from 'supertest'
import App from '../../src/app'

describe('Testes', () => {
  let server: App

  beforeAll(() => {
    server = new App()
    server.listen(3000)
  })

  test('Deve retornar 200 para rota /auth/sign-in', async () => {
    const response = await request(server.app).post('/auth/sign-in').send({
      email: 'dev@dev.dev',
      password: 'dev',
    })

    expect(response.status).toBe(200)
  })

  test('Deve retornar 200 para rota /auth/sign-out', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTY5OTgyODgzOCwiZXhwIjoxNzAwNDMzNjM4fQ.zu6y4TeX38jtYG6eZNCcE_EJ0w48SnfeL9vsUy-AE6Y'

    const response = await request(server.app)
      .delete('/auth/sign-out')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
  })
})

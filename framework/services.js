// контроллёр
import supertest from 'supertest'
import config from './config.js'

const { url } = config
let token

const user = {
  create: ({ userName, password }) => {
    return supertest(url).post('/Account/v1/User').send({
      userName,
      password,
    })
  },

  token: payload => {
    return supertest(url)
      .post('/Account/v1/GenerateToken')
      .set('Accept', 'application/json')
      .send(payload)
  },

  authorization: payload => {
    return supertest(url)
      .post('/Account/v1/Authorized')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
  },

  info: ({ userId, token }) => {
    return supertest(url)
      .get(`/Account/v1/User/${userId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    // .send(payload)
  },

  delete: ({ userId, token }) => {
    return supertest(url)
      .delete(`/Account/v1/User/${userId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    // .send()
  },
}

export default user

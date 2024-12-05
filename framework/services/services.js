// контроллёр
import supertest from 'supertest'
import config from '../config/config.js'

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
     
  },

  delete: ({ userId, token }) => {
    return supertest(url)
      .delete(`/Account/v1/User/${userId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
     
  },
}

const bookService = {
   getBooks: async () => {
    const response = await supertest(url).get('/BookStore/v1/Books')
    return {
      headers: response.headers,
      status: response.status,
      data: response.body
    }
  },

  createBook: async ({ userId, isbns, token}) => {
    const payload = {
      userId,
      collectionOfIsbns: isbns.map(isbn => ({ isbn }))
    }

    const response = await supertest(url)
  .post(`/BookStore/v1/Books`)
  .set('Authorization', `Bearer ${token}`)
  .set('Accept', 'application/json')
  .send(payload)
return {
  headers: response.headers,
  status: response.status,
  data: response.body
}}

}


// export { books, user } as default
export {  bookService, user };
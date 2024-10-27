const url = 'https://bookstore.demoqa.com'

describe('Тесты создания пользователя на букстор', () => {
  it('Создание пользователя успешно', async () => {
    const response = await fetch(`${url}/Account/v1/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'bobywn',
        password: '123Abcdef!',
      }),
    })
    console.log('response.status', response.status)
    const data = await response.json()
    console.log(data.username)

    expect(response.status).toEqual(201)
    expect(data.username).toBe('bobywn')
  })

  // второй тест
  it('Создание пользователя c ошибкой, логин уже используется', async () => {
    const response = await fetch(`${url}/Account/v1/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'Zelibo',
        password: '123456789Abcdef!',
      }),
    })
    const data = await response.json()
    expect(response.status).toEqual(406)
    expect(data.message).toBe('User exists!')
  })

  // третий тест
  it('Создание пользователя c ошибкой,  пароль не подходит', async () => {
    const response = await fetch(`${url}/Account/v1/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'user1234',
        password: '1234',
      }),
    })
    const data = await response.json()
    expect(response.status).toEqual(400)
    expect(data.message).toContain(
      'Passwords must have at least one non alphanumeric character',
    )
  })
})

describe('Тесты получения токена на букстор', () => {
  it('Получение токена успешно', async () => {
    const getToken = await fetch(`${url}/Account/v1/GenerateToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'bob',
        password: '123Abcdef!',
      }),
    })

    const data = await getToken.json()
    console.log('status', getToken.status)
    console.log('data.token', data)
    expect(data.status).toBe('Success')
    expect(typeof data.token).toEqual('string')
  })

  it('Получение токена с ошибкой', async () => {
    const getToken = await fetch(`${url}/Account/v1/GenerateToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: '123abc',
        password: '123abc',
      }),
    })

    const data = await getToken.json()
    console.log('status', getToken.status)
    console.log('data.token', data)
    expect(data.status).toBe('Failed')
  })
})

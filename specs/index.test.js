import user from '../framework/services'
import config from '../framework/config'

// в переменные положим значения после создания пользователя
let MyUserID = ''
let MyToken = ''

describe('Создание пользователя', () => {
  test('Успешная создание', async () => {
    const res = await user.create(config.credential)
    expect(res.status).toBe(201)
    expect(res.body.userID).toBeTruthy()
    MyUserID = res.body.userID
    return MyUserID
  })
})

describe('Авторизация', () => {
  test('Успешная авторизация', async () => {
    const res = await user.authorization(config.credential)
    expect(res.status).toBe(200)
  })

  test('Неуспешная авторизация, неверный пароль', async () => {
    const res = await user.authorization({
      userName: config.credential.userName,
      password: 'string123@',
    })
    expect(res.body.code).toBe('1207')
    expect(res.body.message).toBe('User not found!')
    expect(res.status).toBe(404)
  })
})

describe('Токен авторизации', () => {
  test('Получили токен - успешно', async () => {
    const res = await user.token(config.credential)
    expect(res.body.result).toBe('User authorized successfully.')
    expect(res.status).toBe(200)
    expect(res.body.token).toBeTruthy()
    MyToken = res.body.token
    // console.log('MyToken успешно получен, ', MyToken)
    return MyToken
  })
})

describe('Получение информации о пользователе', () => {
  test('Успешное получение информации', async () => {
    const responseInfo = await user.info({
      userId: MyUserID,
      token: MyToken,
    })
    expect(responseInfo.status).toBe(200)
  })
})

describe('Удаление пользователя', () => {
  test('Успешное удаление', async () => {
    const responseDelete = await user.delete({
      userId: MyUserID,
      token: MyToken,
    })
    expect(responseDelete.status).toBe(204)
    const responseInfo = await user.info({
      userId: MyUserID,
      token: MyToken,
    })
    console.log(responseInfo.body)
    expect(responseInfo.status).toBe(401)
    expect(responseInfo.body.message).toBe('User not found!')
  })
})

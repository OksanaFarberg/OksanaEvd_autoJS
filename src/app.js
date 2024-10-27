/**
 * Проверка имени пользователя
 * @param {string} name
 * @returns {boolean}
 */

export const nameIsValid = name =>
  !!name && name.length >= 2 && /^[a-zA-Z]+$/.test(name)

/**
 * Удаление пробелов из строки
 *
 * @param {string} text
 * @returns {string}
 */

export const fullTrim = text => (text || '').replace(/\s/g, '')

/**
 * Подсчёт суммы заказа
 *
 * @param {[{quantity: number, name?: string, price: number}]} items
 * @param {number} discount
 * @example getTotal([{ price: 10, quantity: 10 }]) // 100
 * @example getTotal([{ price: 10, quantity: 1 }]) // 10
 * @example getTotal([{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }]) // 100
 * @example getTotal([{ price: 10, quantity: 0 }], { price: 10, quantity: 9 }) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 10) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 100) // 0
 */
export const getTotal = (items = [], discount = 0) => {
  if (typeof discount !== 'number') {
    throw new Error('Скидка должна быть числом')
  }
  if (discount < 0) {
    throw new Error('Процент скидки не может быть отрицательным')
  }
  if (discount >= 100) {
    throw new Error('Процент скидки не может быть больше 100')
  }

  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)
  return total - (total * discount) / 100
}

// Домашняя работа 7 - объекты и массивы
const scores = {
  Anna: 10,
  Olga: 1,
  Ivan: 5,
}

function getScore(obj) {
  let sum = 0
  for (const kluch in obj) {
    sum += obj[kluch]
  }
  console.log(sum)
}
getScore(scores) // 16

// а теперь через метод reduce тоже самое
/**
 * Сумма всех значений в объекте
 *
 * @param {number} item
 * @returns {number}
 */
function getScore2(obj) {
  // Берем все значения из объекта и суммируем,сумму кладем в переменную sum
  const sum = Object.values(obj).reduce((acc, item) => {
    return acc + item
  }, 0)
  console.log(sum)
}
getScore2(scores) // 16

import { getTotal, nameIsValid, fullTrim } from '../../src/app.js'

// проверю что функции заимпортировались корректно

describe('Проверка импорта функций', () => {
  test('импорт функции GetTotal прошел ок', () => {
    expect(getTotal).toBeDefined()
    expect(typeof getTotal).toBe('function')
  })
  test('импорт функции nameIsValid прошел ок', () => {
    expect(nameIsValid).toBeDefined()
    expect(typeof nameIsValid).toBe('function')
  })
  test('импорт функции fullTrim прошел ок', () => {
    expect(fullTrim).toBeDefined()
    expect(typeof fullTrim).toBe('function')
  })
})

// Проведу тесты по функции GetTotal

describe('тесты по функции GetTotal', () => {
  test('первый тест - передам значения 90 и 2, жду 180 в итоге', () => {
    const result = getTotal([{ price: 90, quantity: 2 }])
    expect(result).toBe(180)
  })
  test('второй тест, передам значения 1 и 100, жду 100 в итоге', () => {
    const result = getTotal([{ price: 1, quantity: 100 }])
    expect(result).toBe(100)
  })
  test('третий тест, передам значения 5 и 2, и еще 4 и 2 жду 18 в итоге', () => {
    const result = getTotal([
      { price: 5, quantity: 2 },
      { price: 4, quantity: 2 },
    ])
    expect(result).toBe(18)
  })
  test('четвертый тест, передам значения 2 и 100, скидка 10, жду 180 в итоге', () => {
    const result = getTotal([{ price: 2, quantity: 100 }], 10)
    expect(result).toBe(180)
  })
})

// теперь обработаю ошибки по функции GetTotal
describe('по функции GetTotal проверяем передачу ошибок', () => {
  test('передали отрицательное значение скидки', () => {
    expect(() => {
      getTotal([{ price: 2, quantity: 100 }], -10)
    }).toThrow()
  })
  test('передали значение скидки более 100%', () => {
    expect(() => {
      getTotal([{ price: 2, quantity: 100 }], 100500)
    }).toThrow()
  })
  test('значение скидки не число', () => {
    expect(() => {
      getTotal([{ price: 2, quantity: 100 }], 'abcdef')
    }).toThrow()
  })
})

// Параметризованный тест
describe('Параметризированный тест GetTotal', () => {
  test.each([
    [{ price: 2, quantity: 100 }, 10, 180],
    [{ price: 20, quantity: 3 }, 5, 57],
    [{ price: 555, quantity: 10 }, 40, 3330],
    [{ price: 1234, quantity: 654 }, 60, 322814.4],
    [{ price: 200, quantity: 1 }, 0, 200],
    [{ price: 2, quantity: 100 }, 'ABCDEF', 'error'],
    [{ price: 2, quantity: 100 }, 150060, 'error'],
    [{ price: 2, quantity: 100 }, -40, 'error'],
  ])(
    'передаем целую таблицу с разными ценами/кол-ом/скидкой',
    (item, discount, total) => {
      if (total === 'error') {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(() => {
          getTotal([item], discount)
        }).toThrow()
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(getTotal([item], discount)).toBe(total)
      }
    },
  )
})

// Новая функция -новые кейсы

/* Проверка имени пользователя
 * @param {string} name
 * @returns {boolean}
export const nameIsValid = (name) =>
  !!name && name.length >= 2 && /^[a-z]+$/.test(name); */

describe('тесты функции nameIsValid', () => {
  test('первый тест - передали просто имя', () => {
    const returns = nameIsValid('Kirill')
    expect(returns).toBeTruthy()
  })
  test('второй тест - длинное имя', () => {
    const returns = nameIsValid('Efrosinyaasoooorrrr')
    expect(returns).toBeTruthy()
  })
  test('третий тест - имя из 1 буквы', () => {
    const returns = nameIsValid('R')
    expect(returns).toBeFalsy()
  })
  test('третий тест - имя из букв и цифр', () => {
    const returns = nameIsValid('Rew123')
    expect(returns).toBeFalsy()
  })
  test('четвертый тест -  передали не строку, а число', () => {
    const returns = nameIsValid(244)
    expect(returns).toBeFalsy()
  })
})

// Третья функция - последний блок тестов

/**
 * Удаление пробелов из строки
 *
 * @param {string} text
 * @returns {string}
 * export const fullTrim = (text) => (text || "").replace(/\s/g, "");
 */

describe('тесты функции fullTrim', () => {
  test('first test - передали корректно 3 слова 2 пробела', () => {
    const res = fullTrim('первый и второй')
    expect(typeof res).toBe('string')
  })
  test('second test - передали 2 пробела 1 слово', () => {
    const res = fullTrim('первый  ')
    expect(typeof res).toBe('string')
  })
  test('third test - передали  цифры символы и пробелы', () => {
    const res = fullTrim('23424 !!//  Ж23 ')
    expect(typeof res).toBe('string')
  })
  test('4 test - передали без пробелов', () => {
    const res = fullTrim('первый')
    expect(typeof res).toBe('string')
  })
  test('5 test - передали число и ловим ошибку', () => {
    expect(() => {
      fullTrim(834)
    }).toThrow()
  })
  test('6 test - передали true булевое значение', () => {
    expect(() => {
      fullTrim(true)
    }).toThrow()
  })
})

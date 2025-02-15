import { bookService, user } from "../framework/services/services";
import config from "../framework/config/config";
import { books } from "../framework/fixtures/Books";

describe("Тесты  book- ов через supertest", () => {
  // в переменные запишем значения после создания пользователя
  let MyUserID = "";
  let MyToken = "";

  const [book1, book2] = books;
  const isbn = book1.isbn;
 
 // получим токен и сохраним его в переменную

  beforeAll(async () => {
      test("Получили токен - успешно", async () => {
      const res = await user.token(config.credential);
      expect(res.body.result).toBe("User authorized successfully.");
      expect(res.status).toBe(200);
      MyToken = res.body.token;
    console.log('MyToken успешно получен, ', MyToken)
    });
  })
  describe("Создание книги", () => {
    test("Успешное создание книги", async () => {
      if (MyToken) {
        // console.log("Токен получен -", MyToken);
        console.log("ISBN получен -", isbn);
      }
      const responseCreateBook = await bookService.createBook({
        userId: MyUserID,
        isbns: [isbn],
        token: MyToken,
      });

      expect(responseCreateBook.status).toBe(201);
      
    });


  test("Отсутствие токена", async () => {
    const responseCreateBook = await bookService.createBook({
      userId: MyUserID,
      isbns: [isbn],
      token: null,
    });

    expect(responseCreateBook.status).toBe(401); 
  });

  test("Неверный ISBN", async () => {
    const invalidIsbn = "0002100001200010101";
    const responseCreateBook = await bookService.createBook({
      userId: MyUserID,
      isbns: [invalidIsbn],
      token: MyToken,
    });

    expect(responseCreateBook.status).toBe(400);
  });

  test("Пустой массив ISBN", async () => {
    const emptyArrayIsbn = [];
    const responseCreateBook = await bookService.createBook({
      userId: MyUserID,
      isbns: emptyArrayIsbn,
      token: MyToken,
    });

    expect(responseCreateBook.status).toBe(400); 
  });

  });
  describe("Получение информации о книге", () => {
    test("Успешное получение информации о книге", async () => {
      const responseInfoBook = await bookService.getInfoBook({
        isbn,
        token: MyToken,
      });
      // console.log("получаем инфу о книге", responseInfoBook.data);
      expect(responseInfoBook.status).toBe(200);
    });
  });



  describe("Обновление книги", () => {
    test("Успешное обновление книги", async () => {
      const responseUpdateBook = await bookService.updateBook({
        userId: MyUserID,
        isbn,
        newIsbn: book2.isbn,
        token: MyToken,
      });
     
      // console.log("обновляшка книги", responseUpdateBook.data);
      expect(responseUpdateBook.status).toBe(200);
    });
  });

  describe("Удаление книги", () => {
    test("Успешное удаление книги", async () => {
      const responseDeleteBook = await bookService.deleteBook({
        userId: MyUserID,
        isbn: book2.isbn,
        token: MyToken,
      });
      // console.log("удаление книги", responseDeleteBook.data);
      expect(responseDeleteBook.status).toBe(204);
    });
  });


})

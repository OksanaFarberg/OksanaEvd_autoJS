import { bookService, user } from "../../framework/services/services";
import config from "../../framework/config/config";
import { books } from "../../framework/fixtures/Books";

describe("Создание/ Обновление / Удаление книги", () => {
  // в переменные запишем значения после создания пользователя
  let MyUserID = "";
  let MyToken = "";

  const [book1, book2] = books;
  const isbn = book1.isbn;
  const incorrectIsbn = 12345;

  // получим токен и сохраним его в переменную

  beforeAll(async () => {
    const responseCreate = await user.create(config.credential);
    MyUserID = responseCreate.body.userID;
    const res = await user.token(config.credential);
    MyToken = res.body.token;
    // console.log("MyToken успешно получен, ", MyToken);
  });

  describe("Создание книги", () => {
    test("Успешное создание книги", async () => {
      const responseCreateBook = await bookService.createBook({
        userId: MyUserID,
        isbns: [isbn],
        token: MyToken,
      });
      expect(responseCreateBook.status).toBe(201);
    });

    test("Книга не создана, нет токена", async () => {
      const responseCreateBook = await bookService.createBook({
        userId: MyUserID,
        isbns: [isbn],
        token: null,
      });
     
      expect(responseCreateBook.status).toBe(401);
      expect(responseCreateBook.data.message).toContain("User not authorized");
    });

    test("Книга не создана, Неверный ISBN", async () => {
      
      const responseCreateBook = await bookService.createBook({
        userId: MyUserID,
        isbns: [incorrectIsbn],
        token: MyToken,
      });
      expect(responseCreateBook.status).toBe(400);
      expect(responseCreateBook.data.message).toContain(
        "ISBN supplied is not available"
      );
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
       expect(responseInfoBook.status).toBe(200);
    });

    test("Неуспешное получение инфо, Неверный ISBN", async () => {
      const responseInfoBook = await bookService.getInfoBook({
        isbn: incorrectIsbn,
        token: MyToken,
      });
      expect(responseInfoBook.status).toBe(400);
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

      expect(responseUpdateBook.status).toBe(200);
    });

    test("Неуспешное обновление книги, Неверный ISBN", async () => {
      const responseUpdateBook = await bookService.updateBook({
        userId: MyUserID,
        isbn:  incorrectIsbn,
        newIsbn: book2.isbn,
        token: MyToken,
      });

      expect(responseUpdateBook.status).toBe(400);
      expect(responseUpdateBook.data.message).toContain(
        "ISBN supplied is not available"
      );
    });
  });

  describe("Удаление книги", () => {
    test("Успешное удаление книги", async () => {
      const responseDeleteBook = await bookService.deleteBook({
        userId: MyUserID,
        isbn: book2.isbn,
        token: MyToken,
      });

      expect(responseDeleteBook.status).toBe(204);
    });

    test("Неуспешное удаление книги, не передали userID", async () => {
      const responseDeleteBook = await bookService.deleteBook({
        userId: null,
        isbn,
        token: MyToken,
      });

      expect(responseDeleteBook.status).toBe(401);
      expect(responseDeleteBook.data.message).toContain("User Id not correct!");
    });
  });

  // --------------------
  // Удаляем аккаунт после тестов
  afterAll(async () => {
    await user.delete({
      userId: MyUserID,
      token: MyToken,
    });
  });
});

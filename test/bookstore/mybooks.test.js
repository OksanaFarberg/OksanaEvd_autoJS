import { bookService, user } from "../../framework/services/services";
import config from "../../framework/config/config";
import { books } from "../../framework/fixtures/Books";

describe("Тесты  book- ов через supertest", () => {
  // в переменные запишем значения после создания пользователя
  let MyUserID = "";
  let MyToken = "";

  const [book1, book2] = books;
  const isbn = book1.isbn;

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
      // console.log("книга создана", responseCreateBook.data);
      expect(responseCreateBook.status).toBe(201);
    });
 

    test("КНига не создана, нет токена", async () => {
      const responseCreateBook = await bookService.createBook({
        userId: MyUserID,
        isbns: [isbn],
        token: null,
      });
     // console.log("книга несоздана", responseCreateBook.data);

      expect(responseCreateBook.status).toBe(401);
      expect(responseCreateBook.data.message).toContain('User not authorized');
    });

    test("Книга не создана, Неверный ISBN", async () => {
      const invalidIsbn = "0002100001200010101";
      const responseCreateBook = await bookService.createBook({
        userId: MyUserID,
        isbns: [invalidIsbn],
        token: MyToken,
      });
// console.log("книга не создана ИСБН", responseCreateBook.data);
      expect(responseCreateBook.status).toBe(400);
      expect(responseCreateBook.data.message).toContain('ISBN supplied is not available')
   });

 
});
  //   describe("Получение информации о книге", () => {
  //     test("Успешное получение информации о книге", async () => {
  //       const responseInfoBook = await bookService.getInfoBook({
  //         isbn,
  //         token: MyToken,
  //       });
  //       // console.log("получаем инфу о книге", responseInfoBook.data);
  //       expect(responseInfoBook.status).toBe(200);
  //     });
  //   });

  //   describe("Обновление книги", () => {
  //     test("Успешное обновление книги", async () => {
  //       const responseUpdateBook = await bookService.updateBook({
  //         userId: MyUserID,
  //         isbn,
  //         newIsbn: book2.isbn,
  //         token: MyToken,
  //       });

  //       // console.log("обновляшка книги", responseUpdateBook.data);
  //       expect(responseUpdateBook.status).toBe(200);
  //     });
  //   });

  //   describe("Удаление книги", () => {
  //     test("Успешное удаление книги", async () => {
  //       const responseDeleteBook = await bookService.deleteBook({
  //         userId: MyUserID,
  //         isbn: book2.isbn,
  //         token: MyToken,
  //       });
  //       // console.log("удаление книги", responseDeleteBook.data);
  //       expect(responseDeleteBook.status).toBe(204);
  //     });
  //   });

  // ----------------
  // Удаляем аккаунт
  afterAll(async () => {
    await user.delete({
      userId: MyUserID,
      token: MyToken,
   
    });
  });
});
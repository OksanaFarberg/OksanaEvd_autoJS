
import { user } from "../../framework/services/services";
import config from "../../framework/config/config";
describe("Создание/Авторизация/Удаление аккаунта", () => {
  // в переменные запишем значения после создания пользователя
  let MyUserID = "";
  let MyToken = "";

  describe("Создание пользователя", () => {
    test("Успешное создание", async () => {
      const res = await user.create(config.credential);
      console.log("MyUserID получили-", res.body.userID);

      expect(res.status).toBe(201);
      expect(res.body.userID).toBeTruthy();
      MyUserID = res.body.userID;
    });

    test("Неуспешное создание, пароль несоответствует требованиям", async () => {
      const res = await user.create({
        userName: "string",
        password: "123",
      });
      // console.log('неуспешное создание',res.body);
      expect(res.status).toBe(400);
      expect(res.body.message).toContain(
        "Passwords must have at least one non alphanumeric character"
      );
    });

    test("Неуспешное создание, пользователь уже существует", async () => {
      const res = await user.create(config.credential);
      console.log("неуспешное создание", res.body);

      expect(res.status).toBe(406);
      expect(res.body.message).toBe("User exists!");
    });
  });

  describe("Авторизация", () => {
    test("Успешная авторизация", async () => {
      const res = await user.authorization(config.credential);
      expect(res.status).toBe(200);
    });

    test("Неуспешная авторизация, неверный пароль", async () => {
      const res = await user.authorization({
        userName: config.credential.userName,
        password: "string123@",
      });
      expect(res.body.code).toBe("1207");
      expect(res.body.message).toBe("User not found!");
      expect(res.status).toBe(404);
    });
  });

  describe("Токен авторизации", () => {
    test("Получили токен - успешно", async () => {
      const res = await user.token(config.credential);
      expect(res.body.result).toBe("User authorized successfully.");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("Success");
      MyToken = res.body.token;
      console.log("MyToken успешно получен, = ", MyToken);
    });

    test("Получение токена неуспешно, неверные данные пользователя", async () => {
      const invalidCreds = {
        userName: "invalidUsername",
        password: "InvalidPass!",
      };
      const response = await user.token(invalidCreds);

      expect(response.body.status).toBe("Failed");
      expect(response.body.result).toBe("User authorization failed.");
    });
  });

  describe("Удаление пользователя", () => {
    test("Успешное удаление", async () => {
      const responseDelete = await user.delete({
        userId: MyUserID,
        token: MyToken,
      });
      expect(responseDelete.status).toBe(204);
      // Проверим, что пользователь удален
      const responseInfo = await user.info({
        userId: MyUserID,
        token: MyToken,
      });
      console.log(responseInfo.body);
      expect(responseInfo.status).toBe(401);
      expect(responseInfo.body.message).toBe("User not found!");
    });
test("Неуспешное удаление, неверный токен", async () => {
  const responseDelete = await user.delete({
    userId: MyUserID,
    token: "invalidToken",
  });
  console.log(responseDelete.body);
  expect(responseDelete.status).toBe(200);
  expect(responseDelete.body.message).toBe("User Id not correct!");
})
  });
});

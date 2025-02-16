import dotenv from "dotenv";

// Загружаем переменные окружения из .env файла
dotenv.config();

const config = {
  url: "https://bookstore.demoqa.com", // URL остается фиксированным
  credential: {
    userName: process.env.USERNAME || "its_my_login01", // Если USERNAME не задано, используем дефолтное значение
    password: process.env.PASSWORD || "123456Aabc@", // Если PASSWORD не задано, используем дефолтное значение
  },
};

export default config;

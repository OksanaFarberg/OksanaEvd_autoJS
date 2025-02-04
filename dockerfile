# Dockerfile
FROM node:20.11

# установим рабочий каталог
WORKDIR /app

# копируем и устанавливаем зависимости внутрь контейнера
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# # создадим dockerfile
# $ docker build -t otus-qajs .
# $ docker run -v "$(pwd)/reports:/app/reports" -it otus-qajs bash
# $ npm test // npm test specs/last_lessons_hw/tale.test.js

# $ exit
# $ docker run otus-qajs npm test -- -i tale.test.js
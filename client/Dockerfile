# Ниже идут инструкции по сборке Docker-образа

# 1. Создаем приложение React
# FROM node:20.11.1-alpine
FROM node:20.11.1-alpine as build
WORKDIR /usr/src/app
# Копирование файлов package*.json в контейнер
# (в папку app) и установка зависимостей
COPY package.json package-lock.json ./
RUN npm install
# Копирование приложения в контейнер (в папку app)
COPY . ./
# Запускаем
RUN npm run build

# 2. Разворачиваем приложение React на Nginx
FROM nginx:stable-alpine
# Копирование с указанием откуда и куда
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000

# 3. Запуск сервера
# Инструкция CMD отличается от инструкции RUN тем, что 
# она выполняет команды во время запуска контейнера,
# а не в момент сборки образа:
CMD ["nginx", "-g", "daemon off;"]

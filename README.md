1. Скопировать и переименовать .env.sample в .env в корневой папке
2. Скопировать и переименовать .env.sample в .env в папке ./client
3. docker-compose build
4. docker-compose up
5. интерфейс на 80 порту на nginx

 Для запуска без докера 

1. Скопировать и переименовать .env.sample в .env.local в корневой папке
2. npm ci
3. npm run start
4. Скопировать и переименовать .env.sample в .env в папке ./client
5. cd ./client
6. npm ci
7. npm start
5. интерфейс на 3000 порту
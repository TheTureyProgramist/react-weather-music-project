FROM alpine:latest

# Інсталюємо утиліти та сертифікати, які потрібні для завантаження
RUN apk add --no-cache ca-certificates unzip wget micro

# Створюємо робочу директорію
WORKDIR /pb

# Завантажуємо офіційний реліз PocketBase (версія 0.22.14, як у тебе на комп'ютері)
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.14/pocketbase_0.22.14_linux_amd64.zip

# Розпаковуємо завантажений архів у поточну папку і видаляємо zip-файл
RUN unzip pocketbase_0.22.14_linux_amd64.zip && rm pocketbase_0.22.14_linux_amd64.zip

# Відкриваємо порт 8080 для Render
EXPOSE 8080

# Запускаємо сервер PocketBase, направляючи базу даних на наш майбутній підключений диск (/pb_data)
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8080", "--dir=/pb_data"]
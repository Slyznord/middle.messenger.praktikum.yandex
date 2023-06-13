FROM ubuntu:18.04
# Обновление пакетов и установка curl для установки нужной версии node js
RUN apt update && apt install curl -y
# Скачиввание nodejs нужной версии
RUN curl -sL https://deb.nodesource.com/setup_14.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt install nodejs -y
WORKDIR /var/www/middle.messenger.praktikum.yandex
EXPOSE 3000
CMD npm -v
CMD npm i && npm run serve

FROM node:19-alpine

ENV APP_PORT=3000
ENV NODE_ENV=production

WORKDIR /app

COPY ./dist/apps/backend .

EXPOSE ${APP_PORT}

RUN npm install --production

# RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express

CMD node ./main.js

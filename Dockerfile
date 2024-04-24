FROM node:20.12.2-alpine

WORKDIR /app
RUN mkdir src
RUN npm install -g tsx

COPY package.json .
COPY yarn.lock .
RUN yarn install
EXPOSE 8000
CMD npm run dev

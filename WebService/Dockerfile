FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm i
EXPOSE 80
COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]
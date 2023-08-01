FROM node:19

WORKDIR /app

RUN npm install -g serve

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["serve", "-s", "build"]

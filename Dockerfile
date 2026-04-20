FROM node:18

WORKDIR /app

# copy package.json from root
COPY package*.json ./
RUN npm install

# copy backend code
COPY backend/ ./backend

EXPOSE 3000

CMD ["node", "backend/server.js"]
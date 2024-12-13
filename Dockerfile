FROM 18.19.0-alpine3.19
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["node","app.js"]
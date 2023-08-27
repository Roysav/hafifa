FROM node

WORKDIR /app/
COPY . /app/

RUN npm install

ARG DB_URL

CMD [ "npm", "run", "start" ]

EXPOSE 3000
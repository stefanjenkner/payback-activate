FROM node:20.4.0-alpine

RUN apk add --no-cache chromium chromium-chromedriver

ENV CHROMEDRIVER_FILEPATH=/usr/bin/chromedriver

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV HEADLESS_CHROME=1

CMD ["npm", "run", "wdio"]
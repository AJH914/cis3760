FROM cypress/browsers:chrome67-ff57
WORKDIR /app

COPY package.json .
COPY package-lock.json .

ENV CI=1
RUN npm ci

RUN npx cypress verify
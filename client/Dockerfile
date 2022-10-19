FROM node:latest AS builder

WORKDIR /src

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# delete default nginx assets
RUN rm -rf ./*

# copy React assets to html folder
COPY --from=builder /src/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
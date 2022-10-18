FROM node:10 AS builder

WORKDIR /src

COPY . .

RUN yarn install
RUN yarn build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# delete default nginx assets
RUN rm -rf ./*

# copy React assets to html folder
COPY --from=builder /src/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
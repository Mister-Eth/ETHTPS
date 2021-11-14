# Stage 1
FROM node:15-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build:prod
# RUN ng build --prod --build-optimizer=true --aot=true --output-hashing=all --extract-css=true --named-chunks=false --vendor-chunk=true

# Stage 2
FROM nginx:1-alpine
COPY --from=build-step /app/dist/Prostor /usr/share/nginx/html

EXPOSE 8080


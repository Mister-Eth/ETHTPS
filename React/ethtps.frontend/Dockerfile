FROM node:alpine

WORKDIR /app
COPY ./ ./app
RUN npm i
EXPOSE 3006
ENV NODE_OPTIONS=--openssl-legacy-provider
CMD ["npm", "run", "start"]

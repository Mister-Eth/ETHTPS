FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 3006
ENV NODE_OPTIONS=--openssl-legacy-provider
CMD ["npm", "run", "start"]

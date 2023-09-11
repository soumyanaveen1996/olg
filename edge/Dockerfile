FROM node
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 4001

CMD [ "node", "server.js" ]
FROM node:18

# Working directory be app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

# Installing dependencies
RUN npm install --silent

# copy local files to app folder
COPY . .

# Exports
EXPOSE 3000

CMD ["npm","start"]
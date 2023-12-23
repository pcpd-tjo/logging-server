#FROM ubuntu:latest
#ENV NODE_VERSION=20.10.0
#USER root
#RUN apt-get update
#RUN apt-get install -y curl
#RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
#ENV NVM_DIR=/root/.nvm
#RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
#RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
#RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
#ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
#RUN node --version
#RUN npm --version
#
#ENV NODE_ENV=production
#WORKDIR /usr/src/bot
#COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
#COPY . .
#EXPOSE 3000
#
#RUN apt-get update -y
#RUN apt-get install -y python3
#RUN apt install -y python3-pip
#
#CMD ["npm", "start"]

# Use the official Node.js image with version 20
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "run", "start"]
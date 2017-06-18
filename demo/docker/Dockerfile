FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Read and install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm install express
RUN npm install body-parser
RUN npm install express-jsonstream

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
EXPOSE 5601
EXPOSE 9200

# Create command to start app'
CMD [ "wait" ]
CMD [ "npm", "start" ]

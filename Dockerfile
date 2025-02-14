FROM node:20.18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

RUN npm install

COPY ./ .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev" ,"--", "--host"]
#CMD [ "npm", "run", "serve", "-s", "dist" ]

FROM node:20.18-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

RUN npm install

COPY ./ .

RUN sed -i 's/localhost:5173/172.16.1.45:8080/g' src/Context/utils/globalContext.jsx

RUN npm run build

FROM nginx:latest as final

COPY --from=builder /app/dist /usr/share/nginx/html

#COPY ./nginx /etc/nginx/conf.d/api.conf
#COPY ./nginx /etc/nginx/templates/proxy.conf.template
#COPY ./nginx /etc/nginx/conf.d/default.conf
COPY ./nginx /etc/nginx/templates/default.conf.template

EXPOSE 80

FROM node:18 as build

WORKDIR /app

# Copy package files
COPY package.json ./
RUN npm install --force

# Copy the rest of the application
COPY . ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
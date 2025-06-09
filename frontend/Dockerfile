FROM node:18 as build

WORKDIR /app

# Copy package files
COPY package.json ./
RUN npm install --force

# Copy the rest of the application
COPY . ./

# Build with no API URL so it uses relative paths
RUN REACT_APP_API_URL="" npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the built app
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config as a template
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Add entrypoint script
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
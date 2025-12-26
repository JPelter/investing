FROM --platform=linux/amd64 node:25 AS builder
COPY . .
RUN npm install
RUN npm run build

# NOW BUILD THE ACTUAL NGINX SERVER!
FROM --platform=linux/amd64 nginx:1.29.4
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
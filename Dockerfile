# image is building from nginx
FROM nginx:1.27.2-alpine

# local package .json and where we would like to save it, which is the current working directory
COPY src /usr/share/nginx/html
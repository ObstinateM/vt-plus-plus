FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html
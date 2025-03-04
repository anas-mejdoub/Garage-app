FROM nginx:latest

RUN apt-get update && apt-get install -y nodejs npm


COPY conf.d/app.conf /etc/nginx/conf.d/

# WORKDIR /var/www/html

COPY script.sh .

EXPOSE 80
# RUN npm install
# RUN npm run dev &
# 
# CMD ["nginx", "-g", "daemon off;"]

CMD ["bash", "./script.sh"]
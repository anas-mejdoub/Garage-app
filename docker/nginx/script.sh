#!/bin/bash

# cp -r ../../* .
cd /var/www/html
npm install
npm run dev &

exec nginx -g 'daemon off;'
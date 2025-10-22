# Gunakan image nginx rasmi
FROM nginx:alpine

# Salin semua fail HTML dari folder semasa ke folder nginx untuk serve
COPY . /usr/share/nginx/html

# Ekspos port 80
EXPOSE 80

# Jalankan nginx di foreground
CMD ["nginx", "-g", "daemon off;"]

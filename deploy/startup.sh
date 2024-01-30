#!/bin/sh

# 提权
# chmod +x startup.sh
# ./startup.sh

# 需要传输的文件
# temp/dist.tar.gz

# 部署前端服务
cd /ainiteam/quick/web/nginx/html
tar -zcvf backup_quick-web."$(date '+%Y%m%d%H%M%S')".tar.gz dist
rm -rf dist
cd temp
tar -zxvf dist.tar.gz -C /ainiteam/quick/web/nginx/html
cd /ainiteam/quick/web/nginx/html

rm -rf /ainiteam/quick/web/nginx/conf.d
mkdir /ainiteam/quick/web/nginx/conf.d
rm -rf /ainiteam/quick/web/nginx/ssl
mkdir /ainiteam/quick/web/nginx/ssl

cp -f default.conf /ainiteam/quick/web/nginx/conf.d/default.conf
cp -f quick.ainiteam.com.key /ainiteam/quick/web/nginx/ssl/quick.ainiteam.com.key
cp -f quick.ainiteam.com.pem /ainiteam/quick/web/nginx/ssl/quick.ainiteam.com.pem
rm -rf temp



# 启动防火墙，放行3101端口
systemctl start firewalld
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent
firewall-cmd --reload
firewall-cmd --list-ports
systemctl restart docker

# 通过容器启动前端服务
# docker-compose pull
# docker-compose build --no-cache
# docker stop quick-web
# docker rm quick-web
docker-compose down
docker-compose up -d
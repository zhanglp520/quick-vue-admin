#提权
# chmod +x ./deploy/build.sh
# ./deploy/build.sh

#前端打包
cd /var/lib/jenkins/workspace/quick-web
npm config set registry https://registry.npm.taobao.org
npm config get registry
node -v
npm -v
pnpm -v
pnpm install
pnpm run build
rm -rf temp
mkdir temp
mv dist /var/lib/jenkins/workspace/quick-web/temp
cp ./deploy/docker-compose.yml /var/lib/jenkins/workspace/quick-web/temp/docker-compose.yml
cp ./deploy/default.conf /var/lib/jenkins/workspace/quick-web/temp/default.conf
cp ./deploy/quick.ainiteam.com.key /var/lib/jenkins/workspace/quick-web/temp/quick.ainiteam.com.key
cp ./deploy/quick.ainiteam.com.pem /var/lib/jenkins/workspace/quick-web/temp/quick.ainiteam.com.pem
cd temp
tar -zcvf dist.tar.gz *
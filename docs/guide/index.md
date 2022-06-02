# 使用 vite 搭建 vue3 项目

## 安装 node

下载安装：

http://nodejs.cn/download/

注意：由于需要使用 Vite 故此需要 Node.js 版本 12+

如果多个项目使用不同的 node 版本，可以使用 nvm node 版本管理

## 安装 vite2

官网地址：

https://vitejs.cn/guide/

为什么使用 vite？

vite 是一种新型前端构建工具，模块热更新和 rollup 构建指令

特点：（优点）

1.服务器启动特别快；（极速启动）

2.轻量快速热重载；（HMR 模块热重载）

3.支持 TS、jsx，css 等；

安装命令：

```
npm init vite@latest
```

还可以指定模板

```
npm init vite@latest 项目名称 --template vue
```

### 常见错误

错误 1：

Network: use `--host` to expose

解决方案：

vite.config.js 配置 server 节点

```
export default defineConfig({
  plugins: [vue()],
  server:{
    host:'0.0.0.0'
  }
})
```

错误 2：

npm run build 报错 Cannot access ambient const enums when the '--isolatedModules' flag is provided

解决方案：

tsconfig.json 中 isolatedModules 设置为 false 不推荐，暂时使用此方式，后期研究官方参数

错误 3：
warning package.json: No license field
$ vue-tsc --noEmit && vite build

解决方案：

package.json 中配置如下两个参数

```
"license": "ISC",
"private": true,
```

## volar 插件

volar 插件改名为 Vue Language Features (Volar)

## 安装 vue-router4

注意：vue 要求使用 vue-router 版本 4+

安装

```
npm install vue-router@4 --save
```

## 安装 vuex

注意：vue 要求使用 vuex 版本 4+

安装

```
npm install vue-router@4 --save
```

## 安装 element-plus

```
npm install element-plus --save
```

全局导入

按需导入（推荐）

参考官网配置

## 配置国际化

安装

```
npm install vue-i18n@next
```

## 安装 axios

安装命令

```
npm install --save axios vue-axios

```

## 安装 mock

方案一：

假数据：data 中，json 文件或 js 文件

方案二：

本地 mock 服务

安装命令

```
npm install mockjs
```

方案三：

远程 mock 服务 apipost、postman 等工具提供的 mock 服务

## 安装 eslint 及配置 eslint

安装 eslint

```
npm install eslint --save-dev
```

安装 eslint-plugin-vue 插件

```
npm install eslint-plugin-vue
```

安装 eslint-config-airbnb-base 插件

```
npx install-peerdeps --dev eslint-config-airbnb-base
```

安装 prettier 插件

```
npm install --save-dev eslint-plugin-prettier
```

安装 prettier

```
npm install --save-dev --save-exact prettier
```

安装 eslint-config-prettier 插件

```
npm install --save-dev eslint-config-prettier
```

## 配置 git 提交验证 eslint 规范

package.json 配置如下，以下两个方案均一样。

```
  ...
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "lint": "eslint --ext .js,.vue,.ts, src",
    "lint-fix": "npm run lint --fix"
  },
  ...
```

方案一:husky

安装

```
npm i husky -D
```

配置

```
npx husky install
npm set-script prepare "husky install"
npx husky add .husky/pre-commit "npm test"
```

修改 pre-commit 文件

```
npm test 更改为

npm run lint-fix
git add
```

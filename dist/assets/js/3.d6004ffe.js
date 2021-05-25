(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{367:function(t,s,a){t.exports=a.p+"assets/img/1.35073d10.png"},368:function(t,s,a){t.exports=a.p+"assets/img/2.bff2b793.png"},369:function(t,s,a){t.exports=a.p+"assets/img/3.0dadc6a1.png"},370:function(t,s,a){t.exports=a.p+"assets/img/4.d7f0bc90.png"},371:function(t,s,a){t.exports=a.p+"assets/img/5.2d5a9f5c.png"},372:function(t,s,a){t.exports=a.p+"assets/img/6.1f096b85.png"},373:function(t,s,a){t.exports=a.p+"assets/img/7.b2ae74c3.png"},374:function(t,s,a){t.exports=a.p+"assets/img/8.a2ff7d7a.png"},375:function(t,s,a){t.exports=a.p+"assets/img/9.4c2e1feb.png"},376:function(t,s,a){t.exports=a.p+"assets/img/centos.18697def.png"},406:function(t,s,a){"use strict";a.r(s);var e=a(28),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"言叶之庭"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#言叶之庭"}},[t._v("#")]),t._v(" 言叶之庭")]),t._v(" "),e("p",[t._v("这里主要是我个人服务器部署，以及搭建动态网站的点点滴滴记录")]),t._v(" "),e("p",[t._v("大部分涉及到的是运维相关知识~")]),t._v(" "),e("h2",{attrs:{id:"服务器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#服务器"}},[t._v("#")]),t._v(" 服务器")]),t._v(" "),e("p",[t._v("操作系统主要为 ubuntu 18.04 LTS，ubuntu操作较为简便，且可以安装图形化版本，适合个人，CentOS（redhat社区版）更适合做大服务器  "),e("a",{attrs:{href:"https://www.centos.org/centos-linux/",target:"_blank",rel:"noopener noreferrer"}},[t._v("centOS下载"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("这里不多做解释相关Linux基础知识 ，如果看不懂，请看本章后半段 "),e("strong",[t._v("虚拟机教程")])]),t._v(" "),e("p",[t._v("常用开放端口，比如80(web)、443(https)、21(ftp)、22(ssh)、3306(mysql)等")]),t._v(" "),e("h3",{attrs:{id:"一、使用docker构建-vue-应用镜像"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一、使用docker构建-vue-应用镜像"}},[t._v("#")]),t._v(" 一、使用docker构建 Vue 应用镜像")]),t._v(" "),e("h4",{attrs:{id:"获取-nginx-镜像"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#获取-nginx-镜像"}},[t._v("#")]),t._v(" 获取 Nginx 镜像")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("service docker start  //记得启动docker\ndocker pull nginx\n")])])]),e("ul",[e("li",[e("p",[t._v("Docker镜像（Image）一个特殊的文件系统。Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。 镜像不包含任何动态数据，其内容在构建之后也不会被改变。")])]),t._v(" "),e("li",[e("p",[t._v("Docker 镜像名称由 REPOSITORY 和 TAG 组成 [REPOSITORY[:TAG]]，TAG默认为 latest。")])])]),t._v(" "),e("h4",{attrs:{id:"创建-nginx-config配置文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建-nginx-config配置文件"}},[t._v("#")]),t._v(" 创建 Nginx Config配置文件")]),t._v(" "),e("p",[t._v("在项目根目录下创建 nginx 文件夹，该文件夹下新建文件 default.conf：")]),t._v(" "),e("div",{staticClass:"language-nginx extra-class"},[e("pre",{pre:!0,attrs:{class:"language-nginx"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("listen")]),t._v("       "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server_name")]),t._v("  localhost"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#charset koi8-r;")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("access_log")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("var"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("log"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nginx"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("host"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("access"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log  main"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("error_log")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("var"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("log"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nginx"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("error"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log  error"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("root")]),t._v("   "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("usr"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("share"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nginx"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("html"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("html "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("htm"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#error_page  404              /404.html;")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#redirect server error pages to the static page /50x.html")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("error_page")]),t._v("   "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("500")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("502")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("503")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("504")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),t._v("x"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("html"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),t._v("x"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("html "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("root")]),t._v("   "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("usr"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("share"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nginx"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("html"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])]),e("p",[t._v("该配置文件定义了首页的指向为 /usr/share/nginx/html/index.html，所以我们可以一会把构建出来的 index.html 文件和相关的静态资源放到 /usr/share/nginx/html 目录下。")]),t._v(" "),e("h4",{attrs:{id:"创建-dockerfile-文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建-dockerfile-文件"}},[t._v("#")]),t._v(" 创建 Dockerfile 文件")]),t._v(" "),e("p",[e("a",{attrs:{href:"./docker"}},[t._v("怎么新建Dockerfile文件")])]),t._v(" "),e("div",{staticClass:"language-nginx extra-class"},[e("pre",{pre:!0,attrs:{class:"language-nginx"}},[e("code",[t._v("FROM nginx\nCOPY dist"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("usr"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("share"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nginx"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("html"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("\nCOPY nginx"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("default"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("conf "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("etc"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nginx"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("conf"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("d"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("default"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("conf\n")])])]),e("ul",[e("li",[t._v("自定义构建镜像的时候基于 Dockerfile 来构建。")]),t._v(" "),e("li",[t._v("FROM nginx 命令的意思该镜像是基于 nginx:latest 镜像而构建的。")]),t._v(" "),e("li",[t._v("COPY dist/ /usr/share/nginx/html/ 命令的意思是将项目根目录下 dist 文件夹下的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下。")]),t._v(" "),e("li",[t._v("COPY nginx/default.conf /etc/nginx/conf.d/default.conf 命令的意思是将 Nginx 目录下的 default.conf 复制到 etc/nginx/conf.d/default.conf，用本地的 default.conf 配置来替换 Nginx 镜像里的默认配置。")])]),t._v(" "),e("h4",{attrs:{id:"基于该-dockerfile-构建-vue-应用镜像"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基于该-dockerfile-构建-vue-应用镜像"}},[t._v("#")]),t._v(" 基于该 Dockerfile 构建 Vue 应用镜像")]),t._v(" "),e("p",[t._v("运行命令（注意不要少了最后的 “.” ）：")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("docker build -t vuenginxcontainer "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n")])])]),e("p",[t._v("-t 是给镜像命名，. 是基于当前目录的 Dockerfile 来构建镜像。\n"),e("img",{staticStyle:{zoom:"67%"},attrs:{src:a(367),alt:"1"}})]),t._v(" "),e("p",[t._v("查看本地镜像，运行命令：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("docker image ls | grep vuenginxcontainer\n")])])]),e("p",[e("img",{attrs:{src:a(368),alt:"2"}})]),t._v(" "),e("p",[t._v("到此时我们的 Vue 应用镜像 vuenginxcontainer 已经成功创建。接下来，我们基于该镜像启动一个 Docker 容器。")]),t._v(" "),e("h4",{attrs:{id:"启动-vue-app-容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#启动-vue-app-容器"}},[t._v("#")]),t._v(" 启动 Vue app 容器")]),t._v(" "),e("p",[t._v("Docker 容器Container： 镜像运行时的实体。镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等 。")]),t._v(" "),e("p",[t._v("基于 vuenginxcontainer 镜像启动容器，运行命令：")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("docker run "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-p "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),t._v(":80 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-d --name vueApp "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\nvuenginxcontainer\n")])])]),e("ul",[e("li",[t._v("docker run 基于镜像启动一个容器")]),t._v(" "),e("li",[t._v("-p 3000:80 端口映射，将宿主的3000端口映射到容器的80端口")]),t._v(" "),e("li",[t._v("-d 后台方式运行")]),t._v(" "),e("li",[t._v("--name 容器名，查看 Docker 进程")])]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("docker "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ps")]),t._v("   //显示所有容器\n")])])]),e("p",[e("img",{attrs:{src:a(369),alt:"3"}})]),t._v(" "),e("p",[t._v("可以发现名为 vueApp 的容器已经运行起来。此时访问 http://localhost:3000 应该就能访问到该 Vue 应用：\n"),e("img",{attrs:{src:a(370),alt:"4"}})]),t._v(" "),e("p",[t._v("目前为止，已经通过 Docker 容器部署了一个静态资源服务，可以访问到静态资源文件。")]),t._v(" "),e("p",[e("strong",[t._v("注意如果用了vue-router的history模式，要配个默认主页防止nginx或者其他服务端找不到路由直接报404。vue的dockerfile在官方文档里是有示例")])]),t._v(" "),e("h3",{attrs:{id:"二、使用docker构建node容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二、使用docker构建node容器"}},[t._v("#")]),t._v(" 二、使用docker构建Node容器")]),t._v(" "),e("p",[t._v("再部署一个 Node 的容器来提供接口服务。")]),t._v(" "),e("h4",{attrs:{id:"express-服务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#express-服务"}},[t._v("#")]),t._v(" Express 服务")]),t._v(" "),e("p",[t._v("用 Node.js web 框架 Express 来写一个服务，注册一个返回 json 数据格式的路由 Server.js：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("'use strict';\n\nconst express = require('express');\n\nconst PORT = 8080;\nconst HOST = '0.0.0.0';\n\nconst app = express();\napp.get('/', (req, res) => {\nres.send('Hello world\\n');\n});\n\napp.get('/json', (req, res) => {\nres.json({\n    code: 0,\n    data :'This is message from node container'\n})\n});\n\napp.listen(PORT, HOST);\nconsole.log(`Running on http://${HOST}:${PORT}`);\n")])])]),e("p",[t._v("运行该 Express 应用需要 Node 环境，我们基于 Node 镜像来构建一个新镜像。")]),t._v(" "),e("h4",{attrs:{id:"获取-node-镜像"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#获取-node-镜像"}},[t._v("#")]),t._v(" 获取 Node 镜像")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("docker pull node\n")])])]),e("h4",{attrs:{id:"编写-dockerfile-将-express-应用-docker-化"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#编写-dockerfile-将-express-应用-docker-化"}},[t._v("#")]),t._v(" 编写 Dockerfile 将 Express 应用 Docker 化")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('FROM node\n\nWORKDIR /usr/src/app\n\nCOPY package*.json ./\n\nRUN npm install\n\nCOPY . .\n\nEXPOSE 8080\nCMD [ "npm", "start" ]\n')])])]),e("p",[t._v("构建镜像的时候 node_modules 的依赖直接通过 RUN npm install 来安装，项目中创建一个 .dockerignore文件来忽略一些直接跳过的文件：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("node_modules\nnpm-debug.log\n")])])]),e("h4",{attrs:{id:"构建-nodewebserver-镜像"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#构建-nodewebserver-镜像"}},[t._v("#")]),t._v(" 构建 NodeWebServer 镜像")]),t._v(" "),e("p",[t._v("运行构建命令：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("docker build -t nodewebserver .\n")])])]),e("h4",{attrs:{id:"启动-nodeserver-容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#启动-nodeserver-容器"}},[t._v("#")]),t._v(" 启动 NodeServer 容器")]),t._v(" "),e("p",[t._v("基于刚刚构建的 NodeWebServer 镜像 启动一个名为 NodeServer 的容器来提供接口服务8080端口，并映射宿主的5000端口：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("docker run \\\n-p 5000:8080 \\\n-d --name nodeserver \\\nnodewebserver\n")])])]),e("p",[t._v("查看当前 Docker 进程：")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("docker "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ps")]),t._v("\n")])])]),e("p",[e("img",{attrs:{src:a(371),alt:"5"}})]),t._v(" "),e("p",[t._v("可以发现 NodeServer 的容器也正常的运行起来。访问以下 http://localhost:5000/json 能访问到前面写的 json 数据。")]),t._v(" "),e("img",{staticStyle:{zoom:"67%"},attrs:{src:a(372),alt:"6"}}),t._v(" "),e("p",[t._v("到目前为止，后端接口服务也正常启动了。只需最后把页面请求的接口转发到后端接口服务就能调通接口。")]),t._v(" "),e("h3",{attrs:{id:"跨域转发"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#跨域转发"}},[t._v("#")]),t._v(" 跨域转发")]),t._v(" "),e("p",[t._v("想要将 vueApp 容器 上的请求转发到 NodeServer 容器上。首先需要知道 NodeServer 容器的 IP 地址和端口，目前已知 NodeServer 容器内部服务监听在 8080 端口，还需要知道 IP 即可。")]),t._v(" "),e("h4",{attrs:{id:"查看-nodeserver-容器的-ip-地址"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-nodeserver-容器的-ip-地址"}},[t._v("#")]),t._v(" 查看 NodeServer 容器的 IP 地址")]),t._v(" "),e("p",[t._v("查看容器内部 IP 有多种方式，这里提供两种：")]),t._v(" "),e("p",[t._v("1、进入容器内部查看：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("docker exect -it 02277acc3efc bash\n")])])]),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("cat")]),t._v(" /etc/hosts\n")])])]),e("img",{staticStyle:{zoom:"67%"},attrs:{src:a(373),alt:"7"}}),t._v(" "),e("p",[t._v("2、docker inspect [ containerId ] 直接查看容器信息：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("docker inspect 02277acc3efc\n")])])]),e("p",[t._v("在其中找到 Networks 相关配置信息：")]),t._v(" "),e("img",{attrs:{src:a(374),alt:"8"}}),t._v(" "),e("p",[t._v("记录下 Node 服务容器对应的 IP，一会儿配置 Nginx 转发的时候会用到。")]),t._v(" "),e("h4",{attrs:{id:"修改-nginx-配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#修改-nginx-配置"}},[t._v("#")]),t._v(" 修改 Nginx 配置")]),t._v(" "),e("p",[t._v("Nginx 配置 Location 指向 Node 服务 default.conf （前端想要了解的Nginx，关于 Nginx 的配置已经 Location 的具体写法可以参考《"),e("a",{attrs:{href:"https://juejin.im/post/5cbe89b6f265da0373718707",target:"_blank",rel:"noopener noreferrer"}},[t._v("一文弄懂 Nginx 的 Location 匹配"),e("OutboundLink")],1),t._v("》）。")]),t._v(" "),e("p",[t._v("添加一条重写规则，将 /api/{path} 转到目标服务的 /{path} 接口上。\n在前面的 nginx/default.conf 文件中加入：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("location /api/ {\nrewrite  /api/(.*)  /$1  break;\nproxy_pass http://172.17.0.2:8080;\n} \n")])])]),e("p",[t._v("修改完了之后意识到一个问题：vueApp 容器是基于 vuenginxcontainer 这个镜像运行的，而在一开始构建镜像的时候是将 Nginx 配置 default.conf 直接构建进去了。因此如果需要修改 default.conf 还得再重新构建一个新的镜像，再基于新镜像来运行新的容器。")]),t._v(" "),e("h3",{attrs:{id:"改进"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#改进"}},[t._v("#")]),t._v(" 改进")]),t._v(" "),e("p",[t._v("能不能每次修改配置文件后直接重启容器就能让新配置生效，答案当然是有。")]),t._v(" "),e("p",[t._v("在构建镜像的时候 不把 Nginx 配置复制到镜像中，而是直接挂载到宿主机上，每次修改配置后，直接重启容器即可。")]),t._v(" "),e("h4",{attrs:{id:"修改-dockerfile-文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#修改-dockerfile-文件"}},[t._v("#")]),t._v(" 修改 Dockerfile 文件")]),t._v(" "),e("p",[t._v("把 vueclidemo 项目下的 Dockerfile 修改一下：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("FROM nginx\nCOPY dist/  /usr/share/nginx/html/\nCOPY nginx/default.conf /etc/nginx/conf.d/default.conf\n")])])]),e("p",[t._v("将 COPY nginx/default.conf /etc/nginx/conf.d/default.conf 命令删除，Nginx 配置都通过挂载命令挂载在宿主机上。再看 COPY dist/ /usr/share/nginx/html/ 命令，如果每次构建的项目 dist/ 下的内容变动都需要重新走一遍构建新镜像再启动新容器的操作，因此这条命令也可以删除，使用挂载的方式来启动容器。")]),t._v(" "),e("h4",{attrs:{id:"重新运行-vue-应用容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#重新运行-vue-应用容器"}},[t._v("#")]),t._v(" 重新运行 Vue 应用容器")]),t._v(" "),e("p",[t._v("直接基于 Nginx 镜像来启动容器 vuenginxnew，运行命令：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("docker run \\\n-p 3000:80 \\\n-d --name vuenginxnew \\\n--mount type=bind,source=$HOME/SelfWork/docker/vueclidemo/nginx,target=/etc/nginx/conf.d \\\n--mount type=bind,source=$HOME/SelfWork/docker/vueclidemo/dist,target=/usr/share/nginx/html \\\nnginx\n")])])]),e("ul",[e("li",[t._v("--mount type=bind,source={sourceDir},target={targetDir} 将宿主机的 sourceDir 挂载到容器的 targetDir 目录上。")]),t._v(" "),e("li",[t._v("此处运行的命令较长，如果每次重新输入难免麻烦，我们可以将完整的命令保存到一个 shell 文件 vueapp.sh 中，然后直接执行 sh vueapp.sh。")])]),t._v(" "),e("p",[t._v("这样就能每次修改了 Nginx 配置或者重新构建了 Vue 应用的时候，只需重启容器就能立马生效。")]),t._v(" "),e("p",[t._v("此时我们再访问 http://localhost:3000/api/json 能看到接口能正常返回，说明转发生效了。")]),t._v(" "),e("p",[e("img",{attrs:{src:a(375),alt:"9"}})]),t._v(" "),e("p",[t._v("至此接口服务的转发也调通了。")]),t._v(" "),e("h4",{attrs:{id:"配置负载均衡"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置负载均衡"}},[t._v("#")]),t._v(" 配置负载均衡")]),t._v(" "),e("p",[t._v("后端服务一般都是双机或者多机以确保服务的稳定性。我们可以再启动一个后端服务容器，并修改 Nginx 的配置来优化资源利用率，最大化吞吐量，减少延迟，确保容错配置。")]),t._v(" "),e("p",[t._v("基于前面『启动 Vue app 容器』章节的类似操作，新启动一个容器，并基于『Express 服务』章节类似的操作，查看到新容器的 IP（172.17.0.3）。")]),t._v(" "),e("p",[t._v("修改一下 nginx/default.conf（新增 upstream ，修改 location /api/ 中的 proxy_pass）：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("upstream backend {\n  server 172.17.0.2:8080;\n  server 172.17.0.3:8080;\n}\n\n……\n\nlocation /api/ {\n  rewrite  /api/(.*)  /$1  break;\n  proxy_pass backend;\n} \n")])])]),e("h3",{attrs:{id:"写在后面"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#写在后面"}},[t._v("#")]),t._v(" 写在后面")]),t._v(" "),e("p",[t._v("不习惯命令行的同学可以选用 Kitematic 来管理 Docker 容器的状态、数据目录和网络。所有对容量的操作都可以可视化的操作，这里就不做过多介绍了，有兴趣的同学可以自行体验下。")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://juejin.cn/post/6844903837774397447",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考原文"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("a",{attrs:{href:"https://blog.51cto.com/dadonggg/1957691",target:"_blank",rel:"noopener noreferrer"}},[e("strong",[t._v("更多：JAVA项目如何通过Docker实现持续部署")]),e("OutboundLink")],1)]),t._v(" "),e("hr"),t._v(" "),e("h2",{attrs:{id:"虚拟机教程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#虚拟机教程"}},[t._v("#")]),t._v(" 虚拟机教程")]),t._v(" "),e("h3",{attrs:{id:"_1-新建centos7-虚拟机"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-新建centos7-虚拟机"}},[t._v("#")]),t._v(" 1.新建centOS7 虚拟机")]),t._v(" "),e("p",[e("img",{attrs:{src:a(376),alt:"image-20210510131501899"}})]),t._v(" "),e("p",[e("code",[t._v("ping 127.0.0.1")]),t._v("    然后   "),e("code",[t._v("ping www.baidu.com")]),t._v("\t测试虚拟机能否正常联网")]),t._v(" "),e("p",[t._v("如果百度ping不通，说明没有IP或者你没有启用联网功能，此时请更改网络配置文件")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("vi")]),t._v(" /etc/sysconfig/network-scripts/ifcfg-ens33  //用vi编辑器打开网络配置文件\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("ONBOOT")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("no-----"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("ONBOOT"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("yes\t//修改这一项，即 开机启动该网卡\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("service")]),t._v(" network restart\t\t//网络重启\n")])])]),e("p",[t._v("关于vim编辑器的使用： 打开后按a或者i才能进入编辑模式，编辑完后按esc退出编辑模式，变成命令模式，然")]),t._v(" "),e("p",[t._v("​\t后再输入：即可跳转至末行，最后输入x命令即可保存。")]),t._v(" "),e("p",[t._v("#注："),e("code",[t._v("vi /etc/sysconfig/network-scripts/ifcfg-ens33")]),t._v("   网络配置文件名可能会有不同，在输入到ifcfg时，可以连续按两下tab键，获取提示，比如我的机器 为 ifcfg-ens33")]),t._v(" "),e("p",[t._v("完整网络配置内容如下：")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("TYPE")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("Ethernet\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("BOOTPROTO")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("static              "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#静态连接")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("NAME")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("ens33\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("UUID")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("1f093d71-07de-4ca5-a424-98e13b4e9532 \n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("DEVICE")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("ens33 \n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("ONBOOT")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("yes                    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#网络设备开机启动 ")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("IPADDR")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.168")]),t._v(".0.101          "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#192.168.59.x, x为3~255. ")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("NETMASK")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("255.255")]),t._v(".255.0         "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#子网掩码 ")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("GATEWAY")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.168")]),t._v(".66.2          "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#网关IP")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("DNS1")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.168")]),t._v(".66.2\n")])])]),e("h3",{attrs:{id:"_2-远程连接及建立ftp"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-远程连接及建立ftp"}},[t._v("#")]),t._v(" 2.远程连接及建立ftp")]),t._v(" "),e("h4",{attrs:{id:"xshell连接虚拟机"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#xshell连接虚拟机"}},[t._v("#")]),t._v(" Xshell连接虚拟机")]),t._v(" "),e("p",[t._v("在虚拟机中输入 "),e("code",[t._v("ifconfig")]),t._v("，显示虚拟机ip地址")]),t._v(" "),e("p",[t._v("然后在Xshell中新建会话，ssh协议，22端口，输入虚拟机root账号密码，即可维持连接登录")]),t._v(" "),e("h4",{attrs:{id:"安装vsftpd-ftp服务端-或xftp"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装vsftpd-ftp服务端-或xftp"}},[t._v("#")]),t._v(" 安装vsftpd（ftp服务端） 或Xftp")]),t._v(" "),e("p",[t._v("安装好vsftpd后，发现root用户怎么都访问不了ftp")]),t._v(" "),e("p",[t._v("修改以下两个文件，将其中的root字段删除")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("vi")]),t._v(" /etc/vsftpd/ftpusers\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("vi")]),t._v(" /etc/vsftpd/user_list\n")])])]),e("p",[t._v("然后重启vsftpd服务，ok，问题解决。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("service")]),t._v(" vsftpd restart\n")])])]),e("p",[e("a",{attrs:{href:"./vsftpd"}},[t._v("深入vsftpd配置")])]),t._v(" "),e("h4",{attrs:{id:"安装filezilla-client-多线程ftp客户端"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装filezilla-client-多线程ftp客户端"}},[t._v("#")]),t._v(" 安装FileZilla Client（多线程ftp客户端）")]),t._v(" "),e("p",[t._v("根据虚拟机ip地址，添加站点，然后关闭"),e("strong",[t._v("selinux")]),t._v("限制")]),t._v(" "),e("p",[t._v("先运行"),e("code",[t._v("getsebool -a | grep ftp")]),t._v(" (查看selinux里有哪些关于ftp的)")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("allow_ftpd_anon_write –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\nallow_ftpd_full_access –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\nallow_ftpd_use_cifs –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\nallow_ftpd_use_nfs –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\nftp_home_dir –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\nftpd_connect_db –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\nhttpd_enable_ftp_server –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\nsftpd_anon_write –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\nsftpd_enable_homedirs –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\nsftpd_full_access –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\nsftpd_write_ssh_home –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\ntftp_anon_write –"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" off\n")])])]),e("p",[t._v("接下来我们allow_ftpd_anon_write  、 allow_ftpd_full_access 这两个ON掉。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("setsebool -P allow_ftpd_anon_write on \nsetsebool -P allow_ftpd_full_access on\n")])])]),e("p",[t._v("即可实现文件上传下载")]),t._v(" "),e("h3",{attrs:{id:"_3-配置docker环境"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-配置docker环境"}},[t._v("#")]),t._v(" 3.配置Docker环境")]),t._v(" "),e("h4",{attrs:{id:"docker详细介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker详细介绍"}},[t._v("#")]),t._v(" "),e("a",{attrs:{href:"./docker"}},[t._v("Docker详细介绍")])]),t._v(" "),e("h4",{attrs:{id:"windows版本"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#windows版本"}},[t._v("#")]),t._v(" windows版本")]),t._v(" "),e("p",[t._v("如果想在本地windows环境直接使用docker，可以下载 docker桌面版应用，")]),t._v(" "),e("p",[t._v("该应用是基于 WSL2（windows的linux子系统），来实现在windows环境即可操作linux命令，同时可以通过vscode远程连接生成的后端linux-docker环境  "),e("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/windows/wsl/tutorials/wsl-containers",target:"_blank",rel:"noopener noreferrer"}},[t._v("WSL2的Docker远程容器入门"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("但是WSL2需要开启Hyper-V和Device/Credential Guard服务，会造成与VMware冲突，不能启动虚拟机（新版本好像已经解决该冲突）")]),t._v(" "),e("p",[t._v("ps：如果已经存在上述冲突问题，可使用如下方法解决")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("WIN+R打开运行，然后输入services.msc回车;\n找到 HV主机服务，双击打开设置为禁用；\n打开Windows PowerShell（管理员）;\n运行命令：bcdedit /set hypervisorlaunchtype off；\n然后重启\n")])])]),e("p",[t._v("因为WSL2占用内存较大，我使用的是在VM虚拟机centos系统中直接配置docker环境")]),t._v(" "),e("h4",{attrs:{id:"centos版本"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#centos版本"}},[t._v("#")]),t._v(" centOS版本")]),t._v(" "),e("p",[t._v("docker的安装要求64位系统且内核版本大于3.10。所以如果是centos的话，必须安装CentOS7.0或以上版本。")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("yum -y update // 全系统的软件版本升级\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("uname")]),t._v(" -r  //3.10.0-1160.el7.x86_64 查看内核版本\n")])])]),e("p",[t._v("安装方法")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("yum "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -y yum-utils\t//yum安装依赖包工具\nyum-config-manager "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\t\t//设置阿里云镜像仓库\n    --add-repo "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo\nyum makecache fast\t\t\t//更新yum源后更新索引，生成缓存提高搜索速度，yum clean all可清除\nyum "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" docker-ce docker-ce-cli containerd.io\t//安装docker引擎\nsystemctl start docker\t\t//启动docker\ndocker run hello-world\t\t//验证是否可用\ndocker version\t\t//查看docker版本\n")])])]),e("h4",{attrs:{id:"配置centos下阿里云镜像加速"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置centos下阿里云镜像加速"}},[t._v("#")]),t._v(" 配置centos下阿里云镜像加速")]),t._v(" "),e("p",[t._v("修改daemon配置文件")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" -p /etc/docker\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("tee")]),t._v(" /etc/docker/daemon.json "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<-")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'EOF\'\n{\n  "registry-mirrors": ["https://ytvgdcuq.mirror.aliyuncs.com"]\n}\nEOF')]),t._v("\nsystemctl daemon-reload\nsystemctl restart docker\n")])])]),e("h4",{attrs:{id:"卸载docker"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#卸载docker"}},[t._v("#")]),t._v(" 卸载docker")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("yum remove docker-ce docker-ce-cli containerd.io\t//卸载依赖\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" -rf /var/lib/docker \t\t//删除资源\n")])])]),e("h3",{attrs:{id:"_4-自助git服务-私人仓库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-自助git服务-私人仓库"}},[t._v("#")]),t._v(" 4.自助git服务，私人仓库")]),t._v(" "),e("p",[t._v("Gogs 轻量级，图形化的git服务，方便不超过5个人的小团队在上面同步下项目，那么gogs就非常好了。安装便捷，托管/issue/wiki都有，使用简单，学习迅速，足够使用")]),t._v(" "),e("p",[e("a",{attrs:{href:"./gogs"}},[t._v("gogs使用方法")])]),t._v(" "),e("p",[t._v("gitlab 集成比较强的ci/cd功能，也支持自家omnibus懒人包的docker安装，gitlab集成jenkins和自己设置webhook也方便，功能很多。确点是很重，最少需要服务器4G以上运行内存，")]),t._v(" "),e("h2",{attrs:{id:"更多"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#更多"}},[t._v("#")]),t._v(" 更多")]),t._v(" "),e("p",[t._v("新手推荐使用： "),e("a",{attrs:{href:"https://www.bt.cn/",target:"_blank",rel:"noopener noreferrer"}},[t._v("宝塔面板"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("外链："),e("a",{attrs:{href:"https://www.zhihu.com/question/20463581/answer/51381121",target:"_blank",rel:"noopener noreferrer"}},[t._v("如何搭建个人独立博客"),e("OutboundLink")],1)]),t._v(" "),e("h5",{attrs:{id:"推荐一些我遇到的觉得好看的个人博客网站"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#推荐一些我遇到的觉得好看的个人博客网站"}},[t._v("#")]),t._v(" 推荐一些我遇到的觉得好看的个人博客网站：")]),t._v(" "),e("p",[t._v("MRJU ： https://mrju.cn/")]),t._v(" "),e("p",[t._v("蔡 ：http://aka.cjzblog.top/")]),t._v(" "),e("p",[t._v("柏荧的博客：http://qiubaiying.vip/")])])}),[],!1,null,null,null);s.default=r.exports}}]);
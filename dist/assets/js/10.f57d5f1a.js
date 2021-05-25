(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{365:function(e,a,t){e.exports=t.p+"assets/img/dockertag.823ccb83.png"},366:function(e,a,t){e.exports=t.p+"assets/img/docker.387c35f8.png"},403:function(e,a,t){"use strict";t.r(a);var s=t(28),r=Object(s.a)({},(function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h2",{attrs:{id:"docker"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker"}},[e._v("#")]),e._v(" Docker")]),e._v(" "),s("h2",{attrs:{id:"docker基本命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker基本命令"}},[e._v("#")]),e._v(" docker基本命令")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("service")]),e._v(" docker start\t\t//开启docker服务\nsystemctl restart docker\t//重启docker\n")])])]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker search ubuntu  \t\t//搜索镜像\ndocker pull                 //下载镜像\ndocker images     \t        // 查看下载的镜像\ndocker "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("ps")]),e._v("                   //查看正在运行的容器\ndocker "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("ps")]),e._v(" -a                // 查看容器列表\n\ndocker re/start unbuntu    //重启/开启容器ubuntu\ndocker stop ubuntu    \t   //停止容器ubuntu\ndocker attach ubuntu \t   //连接容器ubuntu\ndocker "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("rm")]),e._v(" ubuntu \t\t   //删除容器\ndocker rmi ubuntu \t\t   //删除镜像\n\ndocker run -it --name myubuntu -p "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("80")]),e._v(":8080 -p "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("22")]),e._v(":22 ubuntu /bin/bash  //创建并使用镜像\n\ndocker "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("exec")]),e._v(" -it a62 /bin/bash   //进入container_id为a62的容器\n")])])]),s("p",[e._v("Docker 的tag更加灵活，")]),e._v(" "),s("p",[e._v("Docker 将文件等信息的变动抽象为一次次的commit，每一次commit以后可能走向不同的分支，")]),e._v(" "),s("p",[e._v("当我们完成Docker file的构建后，会生成一串无规则的字符串代表此次生成的ID，")]),e._v(" "),s("p",[e._v("此时，tag的作用就是为他创建一个友好的名称，方便我们对镜像库的管理")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker tag medicean/vulapps:c_cmseasy_1 pentest:v1   //命名tag\n")])])]),s("p",[s("img",{attrs:{src:t(365),alt:"img"}})]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker run -d -it pentest:v1 \t    //启动进程，并守护进程  -d用来开启后台守护进程\ndocker "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("exec")]),e._v(" -it 88f /bin/bash\t\t//进入镜像中的shell\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("service")]),e._v(" --status-all\t\t\t\t//查看开启的服务\n")])])]),s("p",[e._v("​")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("docker restart 容器ID    //重启\n")])])]),s("p",[e._v("如果直接建立容器，不映射端口的话，只能通过docker的IP访问网站。")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v(" docker run -d -it -p "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("8080")]),e._v(":80 pentest:v1\t//端口映射\n")])])]),s("p",[e._v("就能直接通过虚拟机ip加端口访问")]),e._v(" "),s("p",[e._v("进入容器")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker attach 容器ID\ndocker "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("exec")]),e._v(" -it 容器ID /bin/bash \n")])])]),s("p",[e._v("退出容器")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("exit")]),e._v("  或\nCtrl+P+Q\n")])])]),s("h3",{attrs:{id:"新建一个docker镜像"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#新建一个docker镜像"}},[e._v("#")]),e._v(" 新建一个Docker镜像")]),e._v(" "),s("h4",{attrs:{id:"_1-新建一个目录和一个dockerfile"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-新建一个目录和一个dockerfile"}},[e._v("#")]),e._v(" 1.新建一个目录和一个Dockerfile")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# mkdir suui")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# cd suui")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# touch Dockerfile")]),e._v("\n")])])]),s("p",[e._v("用文本编辑器打开Dockerfile文件，我喜欢用nano，因为简单操作，也可以用vim")]),e._v(" "),s("p",[e._v("Dockerfile中每一条指令都创建镜像的一层，例如：")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# This is a comment ")]),e._v("\nFROM ubuntu:14.04 \nMAINTAINER  Docker Newbee "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("newbee@docker.com"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" \nRUN "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("apt-get")]),e._v(" -qq update \nRUN "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("apt-get")]),e._v(" -qqy "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" ruby ruby-dev \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#RUN gem install suui")]),e._v("\n")])])]),s("p",[e._v("Dockerfile基本的语法是")]),e._v(" "),s("div",{staticClass:"language-markdown extra-class"},[s("pre",{pre:!0,attrs:{class:"language-markdown"}},[s("code",[e._v("使用  #来注释    \nFROM 指令告诉 Docker 使用哪个镜像作为基础 \n接着是维护者的信息   \nRUN 开头的指令会在创建中运行，比如安装一个软件包，在这里使用apt-get来安装了一些软件\n")])])]),s("p",[e._v("每一个指令都会在镜像上创建一个新的层，每一个指令的前缀都必须是大写的。")]),e._v(" "),s("p",[e._v("第一条FROM，指定使用哪个镜像源")]),e._v(" "),s("p",[e._v("RUN 指令告诉docker 在镜像内执行命令，安装了什么…")]),e._v(" "),s("h4",{attrs:{id:"_2-编写完成dockerfile后可以使用docker-build-来生成镜像"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-编写完成dockerfile后可以使用docker-build-来生成镜像"}},[e._v("#")]),e._v(" 2.编写完成Dockerfile后可以使用docker build 来生成镜像")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# docker build -t newuser/ubuntu:v3 . ")]),e._v("\n")])])]),s("p",[e._v("其中 -t 标记来添加tag，指定新的镜像的用户信息。“.”是Dockerfile所在的路径（当前目录），也可以替换为一个具体的 Dockerfile的路径。")]),e._v(" "),s("p",[e._v("通俗来讲：\n-t ：指定要创建的目标镜像名\n. ：Dockerfile 文件所在目录，可以指定Dockerfile 的绝对路径")]),e._v(" "),s("p",[e._v("可以看到 build进程在执行操作。")]),e._v(" "),s("p",[e._v("它要做的第一件事情就是上传这个Dockerfile 内容，因为所有的操作都要 依据Dockerfile来进行。")]),e._v(" "),s("p",[e._v("然后Dockfile中的指令被一条一条的执行。每一步都创建了一个新的容器，在容器中执行指令并提交修改。")]),e._v(" "),s("p",[e._v("当所有的指令都执行完毕之后，返回了最终的镜像 id。")]),e._v(" "),s("p",[e._v("所有的中间步骤所产生的容器都被删除和清理了。")]),e._v(" "),s("p",[e._v("新的镜像创建完之后我们就可以使用`docker images来查看，然后就可以使用该镜像了")]),e._v(" "),s("p",[e._v("*注意一个镜像不能超过127层")]),e._v(" "),s("p",[e._v("Docker 允许你在容器内运行应用程序， 使用 docker run 命令来在容器内运行一个应用程序。")]),e._v(" "),s("p",[e._v("输出Hello world,输入命令 "),s("code",[e._v('docker run ubuntu:14.04 /bin/echo "Hello world"')])]),e._v(" "),s("div",{staticClass:"language-markdown extra-class"},[s("pre",{pre:!0,attrs:{class:"language-markdown"}},[s("code",[e._v('各个参数解析：\ndocker: Docker 的二进制执行文件。\n\nrun:与前面的 docker 组合来运行一个容器。\n\nubuntu:14.04指定要运行的镜像，Docker首先从本地主机上查找镜像是否存在，如果不存在，Docker 就会从镜像仓库 Docker Hub 下载公共镜像。\n\n/bin/echo "Hello world": 在启动的容器里执行的命令\n\n以上命令完整的意思可以解释为：Docker 以 ubuntu14.04镜像创建一个新容器，然后在容器里执行 bin/echo "Hello world"，然后输出结果。\n')])])]),s("h4",{attrs:{id:"_3-运行交互式的容器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-运行交互式的容器"}},[e._v("#")]),e._v(" 3.运行交互式的容器")]),e._v(" "),s("p",[e._v("通过docker的两个参数 -i -t，让docker运行的容器实现”对话”的能力")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker run -i -t ubuntu:14.04 /bin/bash\n")])])]),s("p",[e._v("各个参数解析：")]),e._v(" "),s("div",{staticClass:"language-markdown extra-class"},[s("pre",{pre:!0,attrs:{class:"language-markdown"}},[s("code",[e._v("-t:在新容器内指定一个伪终端或终端。\n-i:允许你对容器内的标准输入 (STDIN) 进行交互。\n")])])]),s("p",[e._v("可以使用ls查看当前目录下的文件，cat /proc/version查看当前系统的版本信息")]),e._v(" "),s("p",[e._v("运行exit命令或者使用CTRL+D来退出容器")]),e._v(" "),s("h4",{attrs:{id:"_4-后台模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-后台模式"}},[e._v("#")]),e._v(" 4.后台模式")]),e._v(" "),s("p",[e._v("使用以下命令创建一个以进程方式运行的容器")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker run -d ubuntu:14.04 /bin/sh -c "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"while true; do echo hello world; sleep 1; done"')]),e._v("\n")])])]),s("h4",{attrs:{id:"_5-停止容器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-停止容器"}},[e._v("#")]),e._v(" 5.停止容器")]),e._v(" "),s("p",[e._v("使用"),s("code",[e._v("docker stop")]),e._v("来停止容器")]),e._v(" "),s("hr"),e._v(" "),s("p",[s("a",{attrs:{href:"https://linux.cn/article-9541-1.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("如何创建一个docker镜像"),s("OutboundLink")],1),e._v(" "),s("a",{attrs:{href:"https://linux.cn/article-9551-1.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("如何使用Dockerhub"),s("OutboundLink")],1)]),e._v(" "),s("h3",{attrs:{id:"将容器的状态保存为镜像"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#将容器的状态保存为镜像"}},[e._v("#")]),e._v(" 将容器的状态保存为镜像")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker commit c43c web1  //容器ID，镜像名\n")])])]),s("p",[e._v("更为标准的如下：")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" docker commit -m "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Added json gem"')]),e._v(" -a "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Docker Newbee"')]),e._v(" 0b2616b0e5a8 ouruser/sinatra:v2\n//其中，-m 来指定提交的说明信息，跟我们使用的版本控制工具一样；-a 可以指定更新的用户信息；\n//之后是用来创建镜像的容器的 ID；最后指定目标镜像的仓库名和 tag 信息。创建成功后会返回这个镜像的 ID 信息。\n")])])]),s("p",[e._v("将主机/www/runoob目录拷贝到容器96f7f14e99ab的/www目录下。")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("cp")]),e._v(" /www/runoob 96f7f14e99ab:/www/\n")])])]),s("p",[e._v("将主机/www/runoob目录拷贝到容器96f7f14e99ab中，目录重命名为www。")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("cp")]),e._v(" /www/runoob 96f7f14e99ab:/www\n")])])]),s("p",[e._v("将容器96f7f14e99ab的/www目录拷贝到主机的/tmp目录中。")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("cp")]),e._v("  96f7f14e99ab:/www /tmp/\n")])])]),s("h3",{attrs:{id:"存储镜像"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#存储镜像"}},[e._v("#")]),e._v(" 存储镜像")]),e._v(" "),s("p",[e._v("如果要导出镜像到本地文件，可以使用 docker save 命令。")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker save -o web.tar web1\n")])])]),s("h4",{attrs:{id:"通过dockerhub上传你构建的镜像"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#通过dockerhub上传你构建的镜像"}},[e._v("#")]),e._v(" "),s("a",{attrs:{href:"https://hub.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[s("strong",[e._v("通过dockerHub上传你构建的镜像")]),s("OutboundLink")],1)]),e._v(" "),s("h2",{attrs:{id:"什么是docker"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是docker"}},[e._v("#")]),e._v(" 什么是Docker")]),e._v(" "),s("p",[e._v("Docker是一个进程，一启动就两个进程，一个服务，一个守护进程。占用资源非常少，启动速度非常快，1s。\n一台机器上vm虚拟机能开启3到10个实例。而ocker可以开启100到10000个容器。")]),e._v(" "),s("p",[e._v("docker会自动给docker容器配置一个虚拟ip地址")]),e._v(" "),s("h3",{attrs:{id:"从应用架构角度理解docker"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#从应用架构角度理解docker"}},[e._v("#")]),e._v(" 从应用架构角度理解Docker")]),e._v(" "),s("p",[e._v("刚开始，你只需要写一个Node.js程序，挂载一个静态网站；")]),e._v(" "),s("p",[e._v("然后，你做了一个用户账号系统，这时需要数据库了，比如说MySQL;")]),e._v(" "),s("p",[e._v("后来，为了提升性能，你引入了Memcached缓存；")]),e._v(" "),s("p",[e._v("终于有一天，你决定把前后端分离，这样可以提高开发效率；当用户越来越多，你又不得不使用Nginx做反向代理; 对了，随着功能越来越多，你的应用依赖也会越来越多…")]),e._v(" "),s("p",[e._v("总之，你的应用架构只会越来越复杂。不同的组件的安装，配置与运行步骤各不相同，于是你不得不写一个很长的文档给新同事，只为了让他搭建一个"),s("strong",[e._v("开发环境")]),e._v("。")]),e._v(" "),s("p",[e._v("使用Docker的话，你可以为不同的组件逐一编写Dockerfile，分别构建镜像，然后运行在各个容器中。")]),e._v(" "),s("p",[e._v("这样做，将复杂的架构统一了，所有组件的安装和运行步骤统一为几个简单的命令:")]),e._v(" "),s("ul",[s("li",[e._v("构建Docker镜像: docker build")]),e._v(" "),s("li",[e._v("上传Docker镜像: docker push")]),e._v(" "),s("li",[e._v("下载Docker镜像: docker pull")]),e._v(" "),s("li",[e._v("运行Docker容器: docker run")])]),e._v(" "),s("h3",{attrs:{id:"从应用部署角度理解docker"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#从应用部署角度理解docker"}},[e._v("#")]),e._v(" 从应用部署角度理解Docker")]),e._v(" "),s("p",[e._v("通常，你会有"),s("strong",[e._v("开发")]),e._v("，"),s("strong",[e._v("测试")]),e._v("和"),s("strong",[e._v("生产")]),e._v("服务器，对于某些应用，还会需要进行"),s("strong",[e._v("构建")]),e._v("。")]),e._v(" "),s("p",[e._v("不同步骤的依赖会有一些不同，并且在不同的服务器上执行。")]),e._v(" "),s("p",[e._v("如果手动地在不同的服务器上安装依赖，是件很麻烦的事情。")]),e._v(" "),s("p",[e._v("比如说，当你需要为Node.js应用添加一个新的npm模块，或者升级一下Node.js，是不是得重复操作很多次？")]),e._v(" "),s("p",[e._v("友情提示一下，手动敲命令是极易出错的，有些失误会导致致命的后果（参考Gitlab误删数据库与AWS的S3故障）。")]),e._v(" "),s("p",[e._v("如果使用Docker的话，"),s("strong",[e._v("开发")]),e._v("、"),s("strong",[e._v("构建")]),e._v("、"),s("strong",[e._v("测试")]),e._v("、"),s("strong",[e._v("生产")]),e._v("将全部在Docker容器中执行，你需要为不同步骤编写不同的Dockerfile。")]),e._v(" "),s("p",[e._v("当依赖变化时，仅需要稍微修改Dockerfile即可。结合构建工具"),s("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//jenkins.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Jenkins"),s("OutboundLink")],1),e._v("，就可以将整个部署流程自动化。")]),e._v(" "),s("p",[e._v("另一方面，Dockerfile将Docker镜像描述得非常精准，能够保证很强的一致性。")]),e._v(" "),s("p",[e._v("比如，操作系统的版本，Node.js的版本，NPM模块的版本等。")]),e._v(" "),s("p",[e._v("这就意味着，在本地开发环境运行成功的镜像，在"),s("strong",[e._v("构建")]),e._v("、"),s("strong",[e._v("测试")]),e._v("、"),s("strong",[e._v("生产")]),e._v("环境中也没有问题。")]),e._v(" "),s("p",[e._v("还有，不同的Docker容器是依赖于不同的Docker镜像，这样他们互不干扰。")]),e._v(" "),s("p",[e._v("比如，两个Node.js应用可以分别使用不同版本的Node.js。")]),e._v(" "),s("h3",{attrs:{id:"从集群管理角度理解docker"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#从集群管理角度理解docker"}},[e._v("#")]),e._v(" 从集群管理角度理解Docker")]),e._v(" "),s("p",[e._v("架构规模越来越大的时候，你有必要引入集群了。")]),e._v(" "),s("p",[e._v("这就意味着，服务器由1台变成了多台，同一个应用需要运行多个备份来分担负载。")]),e._v(" "),s("p",[e._v("当然，你可以手动对集群的功能进行划分: Nginx服务器，Node.js服务器，MySQL服务器，测试服务器，生产服务器…这样做的好处是简单粗暴；也可以说财大气粗，因为资源闲置会非常严重。")]),e._v(" "),s("p",[e._v("还有一点，每次新增节点的时候，你就不得不花大量时间进行安装与配置，这其实是一种低效的重复劳动。")]),e._v(" "),s("p",[e._v("下载Docker镜像之后，Docker容器可以运行在集群的任何一个节点。")]),e._v(" "),s("p",[e._v("一方面，各个组件可以共享主机，且互不干扰；")]),e._v(" "),s("p",[e._v("另一方面，也不需要在集群的节点上安装和配置任何组件。")]),e._v(" "),s("p",[e._v("至于整个Docker集群的管理，业界有很多成熟的解决方案，例如"),s("a",{attrs:{href:"https://link.zhihu.com/?target=http%3A//mesos.apache.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Mesos"),s("OutboundLink")],1),e._v("，"),s("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//kubernetes.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kubernetes"),s("OutboundLink")],1),e._v("与"),s("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//github.com/docker/swarm",target:"_blank",rel:"noopener noreferrer"}},[e._v("Docker Swarm"),s("OutboundLink")],1),e._v("。")]),e._v(" "),s("p",[e._v("这些集群系统提供了"),s("strong",[e._v("调度")]),e._v("，"),s("strong",[e._v("服务发现")]),e._v("，"),s("strong",[e._v("负载均衡")]),e._v("等功能，让整个集群变成一个整体。")]),e._v(" "),s("p",[s("strong",[e._v("docker可以产生基础镜像，每加一层新的内容也形成新的镜像。每个镜像都可以去在加新的内容。变化无穷，复用资源。")]),e._v(" "),s("img",{attrs:{src:t(366),alt:"docker"}})]),e._v(" "),s("p",[e._v("docker安装其它产品有两种方式\n方式一：通过拉取事先别人做好的镜像\n方式二：通过Dockerfile来构建新的镜像")]),e._v(" "),s("p",[s("a",{attrs:{href:"https://blog.fundebug.com/2017/03/27/nodejs-docker/",target:"_blank",rel:"noopener noreferrer"}},[e._v(" 参考文章：当 Node.js 遇见Docker  "),s("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=r.exports}}]);
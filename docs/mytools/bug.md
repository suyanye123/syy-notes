## 这里记录一些遇到的奇奇怪怪的bug

#### 1.npm install不成功

可以先看下npm install的执行过程：

- 发出npm install命令

- npm 向 registry 查询模块压缩包的网址

- 下载压缩包，存放在~/.npm(本地NPM缓存路径)目录

- 解压压缩包到当前项目的node_modules目录

实际上说一个模块安装以后，本地其实保存了两份。一份是 ~/.npm 目录下的压缩包，另一份是 node_modules 目录下解压后的代码。但是，运行 npm install 的时候，只会检查 node_modules 目录，而不会检查 ~/.npm 目录。如果一个模块在 ~./npm 下有压缩包，但是没有安装在 node_modules 目录中，npm 依然会从远程仓库下载一次新的压缩包。

我们想利用已经在缓存中之前已经备份的模块实现离线模块安装的的 cache 机制已经在V5的时候重写了，缓存将由 npm 来全局维护不再需要开发人员操心，离线安装时将不再尝试连接网络，而是降级尝试从缓存中读取，或直接失败。就是如果你 offline ，npm将无缝地使用您的缓存。

执行npm cache clean --force（有些人这样还是没有用的话，删除package-lock.json再重新尝试一下即可）
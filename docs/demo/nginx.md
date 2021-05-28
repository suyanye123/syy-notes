# Linux安装Nginx正确方式

> 本文出处[shenyifengtk.github.io](https://shenyifengtk.github.io/2019/07/19/Linux安装Nginx正确方式/) 如有转载，请说明出处

如果你和我一样，作为一个苦逼的Java后台除了实现实现一大堆项目功能，还要兼顾项目的部署，运维工作。在新的服务器上安装新Nginx，在安装之前看下网上的教程,面对五花八门的教程，各式各样的安装方法，心里总会嘀咕什么方式才是最好的，或者说什么方法才是最适合自己的？下面我们一起来分析Nginx各种安装方式，分别适合于那种情况。

### 使用系统二进制源方式安装

在Ubuntu/Debian系

```bash
sudo apt-get install nginx
```

或者RedHat/CentOS系

```bash
sudo yum install nginx 
```

这种方式最简单的，最快捷的方式，但是不是最好的方式，下面我们来说这种主要问题。

优点

- 所有安装二进制依赖已经处理好了，不用担心兼容性问题，开箱即用
- Nginx的连接配置，用户权限这个都不用处理，已经帮你写好这块了
- 不用担心Nginx Bug维护升级问题，直接获取最新系统就可以了
- 卸载简单，直接一个命令即可
- 日志维护简单，自动截断当天日志，压缩保存

缺点

- 不能自主选择安装版本
- 不能自主选择编译的模块
- 扩展功能变得很麻烦，需要重新编译
- 目类结构复杂，配置文件在`/etc/`下，部署文件在`/var/www`
- 重启服务，修改配置都需要root权限
- 性能差一点编译安装

如果你是一个Linux新手，绝对推荐使用这中方式安装，不用考虑编译依赖问题，直接安装完就可以使用。但是如果你这个服务器是用于生产环境正在开发逐步完善的过程，不推荐使用这种方式。将来可能会添加第三方模块，到时肯定要编译安装(下面会说到)。在重启服务器的时候，不要使用root用户，而是使用`sudo`短暂获取root。如果你这条服务器都是用来部署一些静态文件，主要做一些web空间，平常主要用ftp工具部署文件，用这种方式肯定没什么问题的。

### 编译安装

优缺点，我就不写了，基本就是上面的颠倒过来就可以了。使用这种方法安装，都必须懂一点Linux编译知识，Linux中度用户才可以驾驭。我看见网上大多数教程，都是将编译依赖直接装在`/usr/local/`这种方式并不好。如果将来我们要卸载这些依赖，发现非常麻烦。并不是直接在目类下直接删除就可以完事的，有些Linux发行版本，会将安装文件，写入配置文件中，这些配置文件有不知道哪里找。如果依赖版本影响到其他软件，怎么处理版本问题。我们只想安装Nginx，结果延申出一大堆问题。

##### 编译环境准备

在开始之前，保证你的Linux准备了gcc、make、wget,g++ 这些软件。 创建一个目类用来存放下载文件,进入目录中下载依赖库源文件

下载`openssl`主要用于ssl模块加密，支持htps

```bash
wget https://www.openssl.org/source/openssl-1.0.2s.tar.gz
```

下载`pcre`来实现对地址重定向，地址重写功能和localtion指令以及正则表达式的支持

```bash
wget https://ftp.pcre.org/pub/pcre/pcre-8.43.tar.gz
```

下载`zlib` gzip压缩模块

```bash
wget https://zlib.net/zlib-1.2.11.tar.gz
```

下载Nginx

```bash
wget http://nginx.org/download/nginx-1.20.1.tar.gz
```

使用tar 解压所有的文件

```bash
ls *.tar.gz | xargs -n1 tar xzvf  
```

##### 编译选项

使用`./configure`设置各种Nginx参数的脚本，包括源和配置文件的路径，编译器选项，连接处理方法和模块列表。该脚本通过创建编译代码和安装Nginx开源所需的Makefile来完成。

| 参数                    | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| --prefix=<PATH>         | Nginx安装目录，以及有其他配置脚本选项的路径设置的所有相对路径的基本位置。默认值`/usr/local/nginx` |
| --sbin-path=<PATH       | Nginx二进制执行文件的名称，默认值:`<prefix>/sbin/nginx`      |
| --conf-path=<PATH>      | Nginx配置文件的名称。但是，您可以通过在nginx命令行上使用选项指定其他文件来始终在启动时覆盖此值。默认值：`<prefix> conf / nginx.conf-c <FILENAME>` |
| --pid-path=<PATH>       | nginx.pid文件的名称，用于存储nginx主进程的进程ID 。安装后，可以使用Nginx配置文件中的pid指令更改文件名的路径。默认值：`<prefix> /logs/nginx.pid` |
| --error-log-path=<PATH> | error，warn和诊断数据的日志文件的名称。安装后，可以使用Nginx配置文件中的error_log指令更改文件名。默认值：`<prefix> /logs/error.log` |
| --http-log-path=<PATH>  | HTTP服务器请求的主日志文件的名称。安装后，始终可以使用Nginx配置文件中的access_log指令更改文件名。默认值：`<prefix> /logs/access.log` |
| --user=<NAME>           | Nginx运行进程的拥有者。安装后，可以使用Nginx配置文件中的user指令更改名称。默认：`nobody` |
| --group=name            | nginx运行进程的拥有者用户组。安装后，可以使用NGINX配置文件中的user指令更改名称。默认值：--user选项设置的值 |
| --with-pcre=<PATH>      | PCRE库源代码的路径，这是位置指令和Rewrite模块中正则表达式支持所必需的 |
| --with-pcre-jit         | 使用“即时编译”支持（pcre_jit指令）构建PCRE库                 |
| --with-zlib=<PATH>      | zlib库的源代码路径，Gzip模块需要该路径                       |
| --with-http_ssl_modul   | 启用HTTPS支持                                                |
| --with-http_v2_module   | 开启 HTTP/2请求支持                                          |

还要太多编译参数我就不一一列举，有兴趣的同学可以自己去 [nginx官网](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/#sources)参看

##### 编译安装

```bash
./configure \
   --with-openssl=../openssl-1.0.2s \
   --with-pcre=../pcre-8.43 \
   --with-zlib=../zlib-1.2.11 \
   --with-pcre-jit --user=admin \
   --prefix=/home/admin/nginx \
   --with-http_ssl_module \
   --with-http_v2_module 
复制代码
```

输出以下信息，说明依赖没问题

```bash
Configuration summary
  + using PCRE library: ../pcre-8.43
  + using OpenSSL library: ../openssl-1.0.2s
  + using zlib library: ../zlib-1.2.11
  
  nginx path prefix: "/home/admin/nginx"
  nginx binary file: "/home/admin/nginx/sbin/nginx"
  nginx modules path: "/home/admin/nginx/modules"
  nginx configuration prefix: "/home/admin/nginx/conf"
  nginx configuration file: "/home/admin/nginx/conf/nginx.conf"
  nginx pid file: "/home/admin/nginx/logs/nginx.pid"
  nginx error log file: "/home/admin/nginx/logs/error.log"
  nginx http access log file: "/home/admin/nginx/logs/access.log"
  nginx http client request body temporary files: "client_body_temp"
  nginx http proxy temporary files: "proxy_temp"
  nginx http fastcgi temporary files: "fastcgi_temp"
  nginx http uwsgi temporary files: "uwsgi_temp"
  nginx http scgi temporary files: "scgi_temp"
复制代码
```

编译

```bash
make
```

安装

```bash
make install
```



##### 设置权限

因为Linux设置普通用户，不能占用1024一下的端口，直接启动nginx会出现权限不足的错误。将nginx分配给root用户，在分配特殊权限。

```bash
sudo chown root nginx
sudo chmod u+s nginx
```
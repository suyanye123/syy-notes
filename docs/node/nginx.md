# nginx基础

### **方式一：传统方法**

#### 一、启动　　

```bash
cd usr/local/nginx/sbin
./nginx
```
##### 查看nginx服务是否启动成功

```bash
ps -ef | grep nginx
```

#### 二、重启

```bash
kill -HUP 主进程号或进程号文件路径
或者使用
cd /usr/local/nginx/sbin
./nginx -s reload	//平滑重启nginx服务
```

  判断配置文件是否正确　

```bash
nginx -t -c /usr/local/nginx/conf/nginx.conf
或者
cd  /usr/local/nginx/sbin
./nginx -t
```

#### 三、关闭

```
查询nginx主进程号	ps -ef | grep nginx
从容停止  kill -QUIT 主进程号
快速停止  kill -TERM 主进程号
强制停止  kill -9 nginx
若nginx.conf配置了pid文件路径，如果没有，则在logs目录下
kill -信号类型 '/usr/local/nginx/logs/nginx.pid'
```



### **方式二：通过配置/etc/init.d/nginx文件来控制**

这里使用的是编写shell脚本的方式来处理

vi /etc/init.d/nginx (输入下面的代码)

```bash
#!/bin/bash
# nginx Startup script for the Nginx HTTP Server
# it is v.0.0.2 version.
# chkconfig: - 85 15
# description: Nginx is a high-performance web and proxy server.
#              It has a lot of features, but it's not for everyone.
# processname: nginx
# pidfile: /var/run/nginx.pid
# config: /usr/local/nginx/conf/nginx.conf
nginxd=/usr/local/nginx/sbin/nginx
nginx_config=/usr/local/nginx/conf/nginx.conf
nginx_pid=/var/run/nginx.pid
RETVAL=0
prog="nginx"
# Source function library.
. /etc/rc.d/init.d/functions
# Source networking configuration.
. /etc/sysconfig/network
# Check that networking is up.
[ ${NETWORKING} = "no" ] && exit 0
[ -x $nginxd ] || exit 0
# Start nginx daemons functions.
start() {
if [ -e $nginx_pid ];then
   echo "nginx already running...."
   exit 1
fi
   echo -n $"Starting $prog: "
   daemon $nginxd -c ${nginx_config}
   RETVAL=$?
   echo
   [ $RETVAL = 0 ] && touch /var/lock/subsys/nginx
   return $RETVAL
}
# Stop nginx daemons functions.
stop() {
        echo -n $"Stopping $prog: "
        killproc $nginxd
        RETVAL=$?
        echo
        [ $RETVAL = 0 ] && rm -f /var/lock/subsys/nginx /var/run/nginx.pid
}
# reload nginx service functions.
reload() {
    echo -n $"Reloading $prog: "
    #kill -HUP `cat ${nginx_pid}`
    killproc $nginxd -HUP
    RETVAL=$?
    echo
}
# See how we were called.
case "$1" in
start)
        start
        ;;
stop)
        stop
        ;;
reload)
        reload
        ;;
restart)
        stop
        start
        ;;
status)
        status $prog
        RETVAL=$?
        ;;
*)
        echo $"Usage: $prog {start|stop|restart|reload|status|help}"
        exit 1
esac
exit $RETVAL
```

:wq 保存并退出

设置文件的访问权限

`chmod a+x /etc/init.d/nginx`  (a+x ==> all user can execute 所有用户可执行)

这样在控制台就很容易的操作nginx了：查看Nginx当前状态、启动Nginx、停止Nginx、重启Nginx…

![img](https://img-blog.csdn.net/20160711152336282?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



同样的修改了nginx的配置文件nginx.conf，也可以使用上面的命令重新加载新的配置文件并运行，

**配置开机自启动：**

**方式一：在/etc/rc.local中配置**

可以将此命令加入到rc.local文件中，这样开机的时候nginx就默认启动了

`vi /etc/rc.local`

加入一行 /etc/init.d/nginx start 保存并退出，下次重启会生效。



**方式二：将nginx配置成自启动的服务**

1.添加至服务管理列表，并让其开机自动启动

[root@nginx ~]# chkconfig --add nginx
[root@nginx ~]# chkconfig nginx on 
[root@nginx ~]# chkconfig nginx --list 
nginx        0:关闭   1:关闭   2:启用   3:启用   4:启用   5:启用   6:关闭

**2、nginx启动、停止、无间断服务重启**

[root@example ~]# service nginx start

[root@example ~]# service nginx stop

[root@example ~]# service nginx reload

3.查看一下端口
[root@nginx ~]# netstat -ntlp | grep :80
tcp     0    0 0.0.0.0:80          0.0.0.0:*          LISTEN    3889/nginx

对于其他服务也同样适用，比如Mysql,php-fpm等等



# Nginx安装

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



# Nginx 常用配置汇总

众所周知，[Nginx](http://mp.weixin.qq.com/s?__biz=MzI0MDQ4MTM5NQ==&mid=2247513987&idx=1&sn=12676d7d16d20555aa575a83a68d914a&chksm=e918d29fde6f5b89af0ee6b65094a0f386c4f0ac361771c643bad30a90e5eb8f0892f1093bb7&scene=21#wechat_redirect) 是 Apache服务不错的替代品。其特点是占有内存少，并发能力强，事实上 [Nginx](http://mp.weixin.qq.com/s?__biz=MzI0MDQ4MTM5NQ==&mid=2247512619&idx=1&sn=de1b25b04b8c3fc03d00f183dbe96967&chksm=e918d737de6f5e21c4482299be7708b265b5b8b33f05c7dfd72197fe23bb2a1a30d9ab6bc114&scene=21#wechat_redirect) 的并发能力在同类型的网页服务器中表现较好，因此国内知名大厂例如：淘宝，京东，百度，新浪，网易，腾讯等等都在使用[Nginx](http://mp.weixin.qq.com/s?__biz=MzI0MDQ4MTM5NQ==&mid=2247509451&idx=1&sn=31082f7c17d04ff42002d988a30885e0&chksm=e918c0d7de6f49c107db26408a6199e7606e2ce746f5b949149b7f689eb2b086d318d99915b9&scene=21#wechat_redirect)网站。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c29b7607f3543c1a5f6c76554bb730f~tplv-k3u1fbpfcp-zoom-1.image)

## Nginx简介

[Nginx](http://mp.weixin.qq.com/s?__biz=MzI0MDQ4MTM5NQ==&mid=2247509016&idx=1&sn=0e6d0e99b0902a39da7fb083cb885fb0&chksm=e918c104de6f481284122ebfb704aeef803df4391f8b395b0ef730fe0de4c60f48bf8db2d060&scene=21#wechat_redirect) 是开源、高性能、高可靠的 Web 和反向代理服务器，而且支持热部署，同时也提供了 IMAP/POP3/SMTP 服务，可以不间断运行，提供热更新功能。占用内存少、并发能力强，最重要的是，[Nginx](http://mp.weixin.qq.com/s?__biz=MzI0MDQ4MTM5NQ==&mid=2247507251&idx=2&sn=82bbf6075d50f9b5172dc61d950af762&chksm=e918b82fde6f31393185eb26a5f8fd03ef5f4d9a4aeb894c79c52923ceafccc611cf927b8310&scene=21#wechat_redirect) 是免费的并可以商业化，配置使用都比较简单。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27f48a91a4a94f439fede65a67051237~tplv-k3u1fbpfcp-zoom-1.image)

##### Nginx 特点

- 高并发、高性能
- 模块化架构使得它的扩展性非常好
- 异步非阻塞的事件驱动模型这点和 Node.js 相似
- 无需重启可不间断运行
- 热部署、平滑升级
- 完全开源，生态好

##### Nginx 最重要的几个使用场景：

- 静态资源服务
- 反向代理服务，包括缓存、负载均衡等
- API 服务，OpenResty

## 基础配置

#### 去掉不用的 Nginx 模块

```
./configure --without-module1 --without-module2 --without-module3例如：./configure --without-http_dav_module --withouthttp_spdy_module#注意事项：配置指令是由模块提供的。确保你禁用的模块不包含你需要使用的指令！在决定禁用模块之前，应该检查Nginx文档中每个模块可用的指令列表。
复制代码
```

#### Nginx 版本的平滑升级与回滚

[1分钟搞定 Nginx 版本的平滑升级与回滚](https://mp.weixin.qq.com/s?__biz=MzI0MDQ4MTM5NQ==&mid=2247488666&idx=1&sn=91c77bddd39679e395ba05ee4eed1d65&chksm=e91b7186de6cf8906151518fed5c9f01df850b4677fe0974a210869d71f75372e6c76ae4732a&scene=21#wechat_redirect)

#### 进程相关的配置

```
worker_processes 8;#Nginx 进程数，建议按照CPU数目来指定，一般为它的倍数 (如,2个四核的CPU计为8)。worker_rlimit_nofile 65535;  #一个Nginx 进程打开的最多文件描述符数目worker_connections 65535;#每个进程允许的最多连接数
复制代码
```

#### 监听端口

```
server {        
	listen       80;   #监听端口        
	server_name  www.mingongge.com;  #域名信息        
	location / {            
	root   /www/www;   #网站根目录            
	index  index.html index.htm;  #默认首页类型            
	deny 192.168.2.11;   #禁止访问的ip地址，可以为all            
	allow 192.168.3.44； #允许访问的ip地址，可以为all        
	}        
}           
```

小技巧补充：域名匹配的四种写法

```
精确匹配：server_name www.mingongge.com ;
左侧通配：server_name *.mingongge.com ;
右侧统配：server_name www.mingongge.* ;
正则匹配：server_name ~^www\.mingongge\.*$ ;
匹配优先级：精确匹配 > 左侧通配符匹配 > 右侧通配符匹配 > 正则表达式匹配
```

#### 配置 Nginx 状态页面

```
[root@proxy ~]# cat /usr/local/nginx/conf/nginx.conf… …
location /NginxStatus {      stub_status           on;      
access_log            on;      
auth_basic            "NginxStatus";      
auth_basic_user_file  conf/htpasswd;        }… …
[root@proxy ~]# /usr/local/nginx/sbin/nginx -s reload

```

#### Nginx 日志（访问与错误日志管理）

```
error_log  /var/log/nginx/error.log warn;#配置错误日志的级别及存储目录
events {    worker_connections  1024;}
http {..................    log_format  main '$remote_addr - $remote_user [$time_local] "$request" '                      
'$status $body_bytes_sent "$http_referer" '                      
'"$http_user_agent" "$http_x_forwarded_for"';    #配置日志的模式    
access_log  /var/log/nginx/access.log main;    #配置访问日志存储目录
}
```

以上配置只是Nginx自身关于日志的基本配置，在实际生产环境中，我们需要收集日志、分析日志，才定更好的去定位问题，推荐给大家：[超强干货！通过filebeat、logstash、rsyslog 几种方式采集 nginx 日志](https://mp.weixin.qq.com/s?__biz=MzI0MDQ4MTM5NQ==&mid=2247494581&idx=1&sn=cea78b2ae58fdf4066d926dd104bfdcb&chksm=e9188ea9de6f07bf3494df490ed22388bb9a37e90d1f804b3387ce7317c0d735d9e04449d513&token=526214436&lang=zh_CN&scene=21#wechat_redirect)

#### http 相关的配置

```
http {    
	sendfile  on                  #高效传输文件的模式 一定要开启    
	keepalive_timeout   65        #客户端服务端请求超时时间 
}
```

#### 静态资源配置

```
server {  
	listen 80;  server_name mingongge.com;  
	location /static {        root /wwww/web/web_static_site;   }
}
```

也可以使用下面的方法

```
location /image { alias /web/nginx/static/image/;}注意:使用alias末尾一定要添加/,并且它只能位于location中
```

#### 反向代理

比如生产环境（同一台服务中）有不同的项目，这个就比较实用了，用反向代理去做请示转发。

```
http {.............    upstream product_server{        127.0.0.1:8081;    }    upstream admin_server{        127.0.0.1:8082;    }    upstream test_server{        127.0.0.1:8083;    }server {        #默认指向product的server  location / {      proxy_pass http://product_server;      }  location /product/{      proxy_pass http://product_server;     }  location /admin/ {      proxy_pass http://admin_server;     }  location /test/ {      proxy_pass http://test_server;      }    }}
```

更多关于 [Nginx 实践：location 路径匹配](https://mp.weixin.qq.com/s?__biz=MzI0MDQ4MTM5NQ==&mid=2247494640&idx=2&sn=3dff37a670abfaf7b64d7bfa798d5f5b&chksm=e9188eecde6f07fad24d3f05853b0b1a029ce44ff43194364ef0510e7613c113ef7b0e39aae9&token=526214436&lang=zh_CN&scene=21#wechat_redirect)

#### 负载均衡

```
upstream server_pools {   server 192.168.1.11:8880   weight=5;  server 192.168.1.12:9990   weight=1;  server 192.168.1.13:8989   weight=6;  #weigth参数表示权值，权值越高被分配到的几率越大}server {    listen 80;   server_name mingongge.com;  location / {      proxy_pass http://server_pools;    }}
```

#### 代理相关的其它配置

```
proxy_connect_timeout 90;  #nginx跟后端服务器连接超时时间(代理连接超时)proxy_send_timeout 90;     #后端服务器数据回传时间(代理发送超时)proxy_read_timeout 90;     #连接成功后,后端服务器响应时间(代理接收超时)proxy_buffer_size 4k;      #代理服务器（nginx）保存用户头信息的缓冲区大小proxy_buffers 4 32k;      #proxy_buffers缓冲区proxy_busy_buffers_size 64k;     #高负荷下缓冲大小（proxy_buffers*2）proxy_temp_file_write_size 64k;  #设定缓存文件夹大小proxy_set_header Host $host; proxy_set_header X-Forwarder-For $remote_addr;  #获取客户端真实IP
```

## 高级配置

#### 重定向配置

```
location / { return 404; #直接返回状态码}location / { return 404 "pages not found"; #返回状态码 + 一段文本}location / { return 302 /blog ; #返回状态码 + 重定向地址}location / { return https://www.mingongge.com ; #返回重定向地址}
```

示例如下

```
server { listen 80;server_name www.mingongge.com;return 301 http://mingongge.com$request_uri;}server {listen 80; server_name www.mingongge.com; location /cn-url {    return 301 http://mingongge.com.cn;    }}server{  listen 80;  server_name mingongge.com; # 要在本地hosts文件进行配置  root html;  location /search {   rewrite ^/(.*) https://www.mingongge.com redirect;  }    location /images {   rewrite /images/(.*) /pics/$1;  }    location /pics {   rewrite /pics/(.*) /photos/$1;  }    location /photos {    }}
```

#### 设置缓冲区容量上限

这样的设置可以阻止缓冲区溢出攻击（同样是Server模块）

```
client_body_buffer_size 1k;client_header_buffer_size 1k;client_max_body_size 1k;large_client_header_buffers 2 1k;#设置后，不管多少HTTP请求都不会使服务器系统的缓冲区溢出了
```

#### 限制最大连接数

在http模块内server模块外配置limit_conn_zone，配置连接的IP,在http，server或location模块配置limit_conn，能配置IP的最大连接数。

```
limit_conn_zone $binary_remote_addr zone=addr:5m;limit_conn addr 1;
```

#### Gzip压缩

```
gzip_types  #压缩的文件类型 text/plain text/css  application/json  application/x-javascript  text/xml application/xml  application/xml+rss  text/javascriptgzip on;#采用gzip压缩的形式发送数据gzip_disable "msie6"#为指定的客户端禁用gzip功能gzip_static;#压缩前查找是否有预先gzip处理过的资源gzip_proxied any;#允许或者禁止压缩基于请求和响应的响应流gzip_min_length  1000;#设置对数据启用压缩的最少字节数gzip_comp_level 6;#设置数据的压缩等级
```

#### 缓存配置

```
open_file_cache#指定缓存最大数目以及缓存的时间open_file_cache_valid#在open_file_cache中指定检测正确信息的间隔时间open_file_cache_min_uses   #定义了open_file_cache中指令参数不活动时间期间里最小的文件数open_file_cache_errors     #指定了当搜索一个文件时是否缓存错误信息location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$#指定缓存文件的类型        {        expires 3650d;               #指定缓存时间        }        location ~ .*\.(js|css)?$        {        expires 3d;                             }
```

#### SSL 证书配及跳转HTTPS配置

```
server {      listen 192.168.1.250:443 ssl;      server_tokens off;      server_name mingonggex.com www.mingonggex.com;      root /var/www/mingonggex.com/public_html;      ssl_certificate /etc/nginx/sites-enabled/certs/mingongge.crt;      ssl_certificate_key /etc/nginx/sites-enabled/certs/mingongge.key;      ssl_protocols TLSv1 TLSv1.1 TLSv1.2;}# Permanent Redirect for HTTP to HTTPSserver {  listen 80;  server_name mingongge.com; https://$server_name$request_uri;}
```

#### 流量镜像功能

```
location / {    mirror /mirror;    proxy_pass http://backend;}location = /mirror {    internal;    proxy_pass http://test_backend$request_uri;}
```

#### 限流功能

流量限制配置两个主要的指令，`limit_req_zone`和`limit_req`

```
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;server {    location /login/ {        limit_req zone=mylimit;        proxy_pass http://my_upstream;    }}
```

更多、更详细的限流配置请参考：[葵花宝典！一文搞定 Nginx 限流配置](https://mp.weixin.qq.com/s?__biz=MzI0MDQ4MTM5NQ==&mid=2247495030&idx=1&sn=7d9281730e380c612c4b8c3cf3399295&chksm=e918886ade6f017c754650aee18acb8215873848253042a417bb28acccf61456b31a0dc342e4&token=526214436&lang=zh_CN&scene=21#wechat_redirect)

#### Nginx常用的内置变量

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2f30837caf64bdf818533ad67145491~tplv-k3u1fbpfcp-zoom-1.image)

## 安全配置

#### 禁用server_tokens项

server_tokens在打开的情况下会使404页面显示Nginx的当前版本号。这样做显然不安全，因为黑客会利用此信息尝试相应Nginx版本的漏洞。只需要在nginx.conf中http模块设置server_tokens off即可，例如：

```
server {    listen 192.168.1.250:80;    Server_tokens off;    server_name mingongge.com www.mingongge.com;    access_log /var/www/logs/mingongge.access.log;    error_log /var/www/logs/mingonggex.error.log error;    root /var/www/mingongge.com/public_html;    index index.html index.htm;}#重启Nginx后生效：复制代码
```

#### 禁止非法的HTTP User Agents

User Agent是HTTP协议中对浏览器的一种标识，禁止非法的User Agent可以阻止爬虫和扫描器的一些请求，防止这些请求大量消耗Nginx服务器资源。

为了更好的维护，最好创建一个文件，包含不期望的user agent列表例如/etc/nginx/blockuseragents.rules包含如下内容：

```
map $http_user_agent $blockedagent {    default 0;    ~*malicious 1;    ~*bot 1;    ~*backdoor 1;    ~*crawler 1;    ~*bandit 1;}复制代码
```

然后将如下语句放入配置文件的server模块内

```
include /etc/nginx/blockuseragents.rules;并加入if语句设置阻止后进入的页面：复制代码
```

#### 阻止图片外链

```
location /img/ {      valid_referers none blocked 192.168.1.250;        if ($invalid_referer) {          return 403;      }}复制代码
```

#### 封杀恶意访问

[挺带劲！通过 Nginx 来实现封杀恶意访问](https://mp.weixin.qq.com/s?__biz=MzI0MDQ4MTM5NQ==&mid=2247513987&idx=1&sn=12676d7d16d20555aa575a83a68d914a&chksm=e918d29fde6f5b89af0ee6b65094a0f386c4f0ac361771c643bad30a90e5eb8f0892f1093bb7&scene=21&cur_album_id=1463291332122017795#wechat_redirect)

#### 禁掉不需要的 HTTP 方法

一些web站点和应用，可以只支持GET、POST和HEAD方法。在配置文件中的 serve r模块加入如下方法可以阻止一些欺骗攻击

```
if ($request_method !~ ^(GET|HEAD|POST)$) {    return 444;}复制代码
```

#### 禁止 SSL 并且只打开 TLS

尽量避免使用SSL，要用TLS替代，以下配置可以放在Server模块内

```
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;复制代码
```

通过这一系列的配置之后，相信你的Nginx服务器足够应付实际生产需求了。

也欢迎大家积极留言补充这份常用配置清单，以便它更完整、更完善。



# docker安装nginx并配置映射

1. 下载镜像，并复制默认配置

2. 停止删除容器

3. 生成启动文件 - start.sh

4. 运行start.sh 启动mynginx

5. 访问`http://192.168.3.27/`可以访问到nginx默认页面

6. 配置反向代理

### 1.下载镜像，并复制默认配置

```bash
docker run --name mynginx -d nginx
创建主机挂载配置文件
mkdir -p ~/i/apps/nginx/{conf,conf.d,html,logs}
复制默认配置
docker cp mynginx:/etc/nginx/nginx.conf ~/i/apps/nginx/conf/nginx.conf

docker cp mynginx:/etc/nginx/conf.d/default.conf ~/i/apps/nginx/conf.d/default.conf

docker cp mynginx:/usr/share/nginx/html/index.html ~/i/apps/nginx/html/index.html

```

要想查询默认配置可以：

```bash
docker run -i -t nginx /bin/bash：查看所有文件夹
cat /etc/nginx/nginx.conf：查看nginx.conf文件内容然后拷贝出来
cat /etc/nginx/conf.d/default.conf：查看default.conf文件内容然后拷贝出来
/usr/share/nginx/html：默认首页文件夹html路径
/var/log/nginx：日志文件路径
```



### 2.停止删除容器

`docker rm -f mynginx`

### 3.生成启动文件 - start.sh

```bash
[root@master ~]# cd ~/i/apps/nginx/
[root@master nginx]# ls
conf  conf.d  html  logs
[root@master nginx]# cat <<EOF > start.sh
#!/bin/bash
NGINX_DIR=`pwd`
docker stop mynginx
   docker rm mynginx
   docker run -d \\
    --restart always \\
    -p 80:80 \\
    --name mynginx \\
    -v \${NGINX_DIR}/html:/usr/share/nginx/html \\
    -v \${NGINX_DIR}/conf/nginx.conf:/etc/nginx/nginx.conf \\
    -v \${NGINX_DIR}/conf.d:/etc/nginx/conf.d \\
 -v \${NGINX_DIR}/logs:/var/log/nginx \\
 nginx
EOF
```

说明：

-d: 后台运行容器；
--name: 指定容器名；
-p: 指定服务运行的端口；
-v: 映射目录或文件；

### 4.运行start.sh 启动mynginx

```bash
[root@master nginx]# sh start.sh 
Error response from daemon: No such container: mynginx
Error: No such container: mynginx
5a23fe9288535c0141afb5b55c7c907e8c0a108dcda8fe486fb02028975ad5bb
```

### 5.访问http://192.168.3.27/可以访问到nginx默认页面

### 6.配置反向代理

```bash
[root@master nginx]# cd conf.d/
[root@master conf.d]# ls
default.conf
[root@master conf.d]# vi www.wanfei.com.conf
复制
server {
    listen  80;
    server_name  www.wanfei.com;
    access_log /var/log/nginx/wanfei.access.log main;
    error_log /var/log/nginx/wanfei.error.log error;
    location / {
        proxy_set_header  Host  $http_host;
        proxy_set_header  X-Real-IP  $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass  http://127.0.0.1:80;
    }
}
```


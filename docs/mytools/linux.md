# Linux常用指令

### 寻找文件

```bash
 find / -name config.php
```

### 解压

```bash
tar zxvf xxx.tar.g 		//解压xxx压缩包文件
```

x : 从 tar 包中把文件提取出来。

z : 表示 tar 包是被 gzip 压缩过的，所以解压时需要用 gunzip 解压。

v : 显示详细信息。

``` 
whereis xxx		//查找xxx是否存在，以及文件位置
```

### 端口

#### **1、Centos 查看端口占用**

比如查看 80 端口占用情况使用如下命令：

```
lsof -i tcp:80
```

#### **2、列出所有端口**

```
netstat -ntlp
```

#### **3、开启端口（以 80 端口为例）**

**3.1 方法一：**

```bash
#写入修改
/sbin/iptables -I INPUT -p tcp --dport 80 -j ACCEPT
#保存修改
/etc/init.d/iptables save
#重启防火墙，修改生效
service iptables restart
```

**3.2 方法二：**

```bash
#打开配置文件加入如下语句:
vi /etc/sysconfig/iptables
#添加
-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
#重启防火墙，修改生效
service iptables restart
```

#### **4、关闭端口**

**4.1 方法一：**

```bash
#写入修改
/sbin/iptables -I INPUT -p tcp --dport 80 -j DROP
#保存修改
/etc/init.d/iptables save
#重启防火墙，修改生效
service iptables restart
```

**4.2 方法二：**

```bash
#打开配置文件
vi /etc/sysconfig/iptables
#添加
-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j DROP
#重启防火墙，修改完成
service iptables restart
```

#### **5、查看端口状态**

```
/etc/init.d/iptables status
```

### 安装

```bash
#安装yarn
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum install yarn

#安装node14.x
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs

#安装vi
apt-get update	#更新源
apt-get install vim		#下载安装vim
```

### CentOS7防火墙

```bash
#查看firewall的状态
firewall-cmd --state

#开放80端口
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --permanent --add-port=8080-8085/tcp

#查看防火墙的开放的端口
firewall-cmd --permanent --list-ports

#重启防火墙(修改配置后要重启防火墙)
firewall-cmd --reload

#最后可以输入相应的ip地址查看tomcat是否启动

```


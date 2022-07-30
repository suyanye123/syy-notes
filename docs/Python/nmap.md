# Nmap

## 安装

> 官方下载路径：https://nmap.org/download.html



## nmap主要功能

（1）检测主机是否在线。例如，列出响应TCP和/或ICMP请求或打开特定端口的主机。

（2）扫描指定主机/主机列表端口开放状态，枚举目标主机上的开放端口，常用。

（3）检测主机运行服务类型及版本，检测远程设备上的网络服务以确定应用程序名称和版本号。

（4）检测操作系统版本和设备类型 ，确定网络设备的操作系统和硬件特性。

（5）可与脚本进行脚本交互，使用Nmap脚本引擎（NSE）和Lua编程语言。



## nmap命令

 namp [ 扫描类型 ] [ 通用选项 ] [ 扫描目标 ]

###  **扫描类型：**

 **-sT：**TCP connect()扫描，这是最基本的TCP扫描方式。connect()是一种系统调用，由操作系统提供，用来打开一个连接。如果目标端口有程序监听， connect()就会成功返回，否则这个端口是不可达的。这项技术最大的优点是，你勿需root权限。任何UNIX用户都可以自由使用这个系统调用。这种扫描很容易被检测到，在目标主机的日志中会记录大批的连接请求以及错误信息。 

 **-sS：**TCP同步扫描(TCP SYN)，因为不必全部打开一个TCP连接，所以这项技术通常称为半开扫描(half-open)。你可以发出一个TCP同步包(SYN)，然后等待回应。如果对方返回SYN|ACK(响应)包就表示目标端口正在监听；如果返回RST数据包，就表示目标端口没有监听程序；如果收到一个SYN|ACK包，源主机就会马上发出一个RST(复位)数据包断开和目标主机的连接，这实际上有我们的操作系统内核自动完成的。这项技术最大的好处是，很少有系统能够把这记入系统日志。不过，你需要root权限来定制SYN数据包。

 **-sU：**UDP扫描，发送0字节UDP包，快速扫描Windows的UDP端口如果你想知道在某台主机上提供哪些UDP(用户数据报协议,RFC768)服务，可以使用这种扫描方法。nmap首先向目标主机的每个端口发出一个0字节的UDP包，如果我们收到端口不可达的ICMP消息，端口就是关闭的，否则我们就假设它是打开的。

 **-sP：**ping扫描，有时你只是想知道此时网络上哪些主机正在运行。通过向你指定的网络内的每个IP地址发送ICMP echo请求数据包，nmap就可以完成这项任务。注意，nmap在任何情况下都会进行ping扫描，只有目标主机处于运行状态，才会进行后续的扫描。如果你只是想知道目标主机是否运行，而不想进行其它扫描，才会用到这个选项。

 **-sA：**ACK扫描 TCP ACK扫描，当防火墙开启时，查看防火墙有未过滤某端口，这项高级的扫描方法通常用来穿过防火墙的规则集。通常情况下，这有助于确定一个防火墙是功能比较完善的或者是一个简单的包过滤程序，只是阻塞进入的SYN包。这种扫描是向特定的端口发送ACK包(使用随机的应答/序列号)。如果返回一个RST包，这个端口就标记为unfiltered状态。如果什么都没有返回，或者返回一个不可达ICMP消息，这个端口就归入filtered类。注意，nmap通常不输出unfiltered的端口，所以在输出中通常不显示所有被探测的端口。显然，这种扫描方式不能找出处于打开状态的端口。

 **-sW：**滑动窗口扫描，这项高级扫描技术非常类似于ACK扫描，除了它有时可以检测到处于打开状态的端口，因为滑动窗口的大小是不规则的，有些操作系统可以报告其大小。 

 **-sR：**RPC扫描，和其他不同的端口扫描方法结合使用。

**-sV** 系统版本检测
**-sX**  Xmas扫描，设置FIN 、PSH和URG标志位
**-sF**  FIN 扫描，只设置TCP FIN 标志位
**-sN**  Null 扫描，不设置任何标志位。 隐蔽扫描，很多情况下Null扫描与Xmas扫描恰好相反，因为Null扫描不会标记任何数据包，若目标主机的相应端口是关闭的，会响应一个RST数据包，若目标端口是开放的则不会响应任何信息。

**–scanflags**  指定TCP标识位（设置URG, ACK, PSH,RST,SYN,FIN位）

 **-b：**FTP反弹攻击(FTP Bounce attack) 外网用户通过FTP渗透内网

### **通用选项**

 **-P0：**nmap扫描前不Ping目标主机。在扫描之前，不必ping主机。有些网络的防火墙不允许ICMP echo请求穿过，使用这个选项可以对这些网络进行扫描。

 **-PT：**nmap扫描前使用TCP ACK包确定主机是否在运行（-PT默认80。扫描之前，使用TCP ping确定哪些主机正在运行。nmap不是通过发送ICMP echo请求包然后等待响应来实现这种功能，而是向目标网络(或者单一主机)发出TCP ACK包然后等待回应。如果主机正在运行就会返回RST包。只有在目标网络/主机阻塞了ping包，而仍旧允许你对其进行扫描时，这个选项才有效。对于非 root用户，我们使用connect()系统调用来实现这项功能。使用-PT 来设定目标端口。默认的端口号是80，因为这个端口通常不会被过滤。　　

 **-PS：** nmap使用TCP SYN包进行扫描。对于root用户，这个选项让nmap使用SYN包而不是ACK包来对目标主机进行扫描。如果主机正在运行就返回一个RST包(或者一个SYN/ACK包)。

  **-PI：**nmap进行Ping扫描。设置这个选项，让nmap使用真正的ping(ICMP echo请求)来扫描目标主机是否正在运行。使用这个选项让nmap发现正在运行的主机的同时，nmap也会对你的直接子网广播地址进行观察。直接子网广播地址一些外部可达的IP地址，把外部的包转换为一个内向的IP广播包，向一个计算机子网发送。这些IP广播包应该删除，因为会造成拒绝服务攻击(例如 smurf)。

 **-PB：**结合-PT和-PI功能，这是默认的ping扫描选项。它使用ACK(-PT)和ICMP(-PI)两种扫描类型并行扫描。如果防火墙能够过滤其中一种包，使用这种方法，你就能够穿过防火墙。

 **-O：**Nmap扫描TCP/IP指纹特征，确定目标主机系统类型。

 **-I：**反向标志扫描，扫描监听端口的用户

 **-f：**分片发送SYN、FIN、Xmas、和Null扫描的数据包

 **-v：**冗余模式扫描，可以得到扫描详细信息

 **-oN：** 扫描结果重定向到文件

 **-resume：**使被中断的扫描可以继续

 **-iL：**-iL,扫描目录文件列表

 **-p：**-p 指定端口或扫描端口列表及范围，默认扫描1-1024端口和/usr/share/nmap/nmap-services文件中指定端口。-p例：23；20-30,139,60000-这个选项让你选择要进行扫描的端口号的范围。例如，-p 23表示：只扫描目标主机的23号端口。-p 20-30,139,60000-表示：扫描20到30号端口，139号端口以及所有大于60000的端口。

### 时序选项

-T0  偏执的：非常非常慢，用于IDS逃逸
-T1  猥琐的：相当慢，用于IDS逃逸
-T2  有礼貌的：降低速度以消耗更小的带宽，比默认慢十倍
-T3  普通的：默认，根据目标的反应自动调整时间模式
-T4  野蛮的：假定处在一个很好的网络环境，请求可能会淹没目标
-T5  疯狂的：非常野蛮，很可能会淹没目标端口或是漏掉一些开放端口

### **扫描目标**

 扫描目标通常为IP地址或IP列表

  192.168.10.1

 192.168.10.0/24

 192.168.*.*



## 端口分类和扫描端口状态分析

**1、端口分类**

 公认端口（well-known port）：从0至1024，最常用端口，通常与协议绑定，你在 /etc/services 里面可以看到这种映射关系；

 注册端口（registered port）：从1025至49151，这些端口已经注册到服务协议上；

 动态或私有端口（dynamic/private port）：从49152至65535。

 另外，端口还与协议相关；比如：UDP端口53通常用于DNS查询、TCP端口53通常用于DNS记录迁移。

**2、扫描结果端口状态说明**

 open：目标端口开启。

 closed：目标端口关闭。

 filtered：通常被防火墙拦截，无法判断目标端口开启与否。

 unfiltered：目标端口可以访问，但无法判断开启与否。

 open | filtered：无法确定端口是开启还是filtered。

 closed | filtered：无法确定端口是关闭还是filtered。





## nmap工具使用FAQ

 **1、使用UDP扫描端口状态速度非常慢，如何加快扫描速度？**

  在/proc/sys/net/ipv4目录下，将icmp_ratemask的值改为0（默认为6168），操作步骤如下：

 Step1：cat /proc/sys/net/ipv4/icmp_ratemask，记录数值，通常为6168。

 Step2：echo "0" > /proc/sys/net/ipv4/icmp_ratemask。不需要重启系统。

 Step:3：nmap扫描，完成后执行Step3回复。

 Step4：echo "6168" > /proc/sys/net/ipv4/icmp_ratemask。



## 基本场景

#### 1.在网络中寻找所有在线主机

```
nmap -sP 192.168.2.*  //仅ping，有时候有的主机会禁ping
nmap -PS 192.168.2.0/24	//使用TCP SYN(半隐身)发现活跃主机 root?
```

#### 2.Ping 指定范围内的 IP 地址

```
nmap -sP 192.168.1.100-254	//Ping扫描
nmap -sn -v targetip	//同Ping扫描
```

#### 3.列出开放了指定端口(80)的主机列表(connect扫描，oG输出日志)

```
nmap -sT -p 80 -oG – 192.168.2.* | grep open
```

#### 4.获取指定远程主机的系统类型及开放端口

```
nmap -sS -P0 -sV -O <target>	//这里的 < target > 可以是单一 IP, 或主机名，或域名，或子网 target.example.com/24
-sS TCP SYN 扫描 (又称半开放,或隐身扫描,不记入日志)
-P0 同 -Pn，跳过主机发现，不进行ping扫描，直接执行后续操作
-sV 系统版本检测
-O  操作系统检测

nmap -sS -P0 -A -v < target >	//全面进攻性扫描（包括各种主机发现、端口扫描、版本扫描、OS扫描及默认脚本扫描）
-A 同时打开操作系统指纹和版本检测
-v 详细输出扫描情况.

nmap -sS -sV -n -p1-65535 -oX tcp.xml 192.168.1.0	//TCP扫描端口
-sS 半隐身 -sV系统版本检测 -n #禁止DNS反向解析，如果单纯扫描一段IP，该选项可以大幅度减少目标主机响应时间
-p 指定端口 -oX 输出日志 

nmap -sS -sU -n -p1-65535 -oX udp.xml 192.168.1.0	//UDP方式扫描端口
-sS 半隐身  -sU UDP扫描	-n 禁止DNS反向解析
```

#### 5.在某段子网上查找未占用的 IP

```
nmap -T4 -sP 192.168.2.0/24 && egrep “00:00:00:00:00:00″ /proc/net/arp
```

#### 6.只扫描指定IP范围

```
只扫描指定的IP范围，有时用于对这个Internet进行取样分析。nmap将寻找Internet上所有后两个字节是.2.3、.2.4、.2.5的 IP地址上的WEB服务器。如果你想发现更多有意思的主机，你可以使用127-222，因为在这个范围内有意思的主机密度更大。
nmap -v --randomize_hosts -p 80 *.*.2.3-5

列出company.com网络的所有主机，让nmap进行扫描。注意：这项命令在GNU/Linux下使用。如果在其它平台，你可能要使用 其它的命令/选项。
host -l company.com | cut -d -f 4 | ./nmap -v -iL -
```

**在局域网上扫找 Conficker 蠕虫病毒**

```
nmap -PN -T4 -p139,445 -n -v –script=smb-check-vulns –script-args safe=1 192.168.0.1-254
```

**扫描网络上的恶意接入点 （rogue APs）.**

```
nmap -A -p1-85,113,443,8080-8100 -T4 –min-hostgroup 50 –max-rtt-timeout
2000 –initial-rtt-timeout 300 –max-retries 3 –host-timeout 20m
–max-scan-delay 1000 -oA wapscan 10.0.0.0/8
```

**使用诱饵扫描方法来扫描主机端口**

```
sudo nmap -sS 192.168.0.10 -D 192.168.0.2
```

**为一个子网列出反向DNS记录**

```
nmap -R -sL 209.85.229.99/27 | awk ‘{if($3==”not”)print”(“$2″) no PTR”;else print$3″ is “$2}’ | grep ‘(‘
```

**显示网络上共有多少台 [Linux](https://www.linuxprobe.com/) 及 Win 设备?**

```
sudo nmap -F -O 192.168.0.1-255 | grep “Running: ” > /tmp/os; echo “$(cat /tmp/os | grep Linux \
| wc -l) Linux device(s)”; echo “$(cat /tmp/os | grep Windows | wc -l) Window(s) device”
```



#### 工具自带的十种：

```html
第一种：Intense scan	(nmap -T4 -A -v) 深度扫描
-T4 加快执行速度
-A 操作系统及版本探测
-v 显示详细的输出

第二种：Intense scan plus UDP (nmap -sS -sU -T4 -A -v)	SYN加UDP 深度扫描
-sS  TCP SYN 扫描
-sU  UDP 扫描

第三种：Intense scan,all TCP ports (nmap -p 1-65536 -T4 -A -v) 	全扫描
扫描所有TCP端口，范围在1-65535，试图扫描所有端口的开放情况，速度比较慢。	-p 指定端口扫描范围

第四种：Intense scan,no ping (nmap -T4 -A -v -Pn)
非ping 深度扫描 

第五种：Ping scan (nmap -sn) Ping 扫描，容易被防火墙屏蔽，导致无扫描结果

第六种：Quick scan (nmap -T4 -F)	快速的扫描
-F 快速模式。

第七种：Quick scan plus (nmap -sV -T4 -O -F --version-light) 快速扫描加强模式
-sV 探测端口及版本服务信息。
-O 开启OS检测
--version-light 设定侦测等级为2。

第八种：Quick traceroute (nmap -sn --traceroute)	路由跟踪
-sn Ping扫描，关闭端口扫描
-traceroute 显示本机到目标的路由跃点。

第十种：Slow comprehensive scan
(nmap -sS -sU -T4 -A -v -PE -PP -PS80,443,-PA3389,PU40125 -PY -g 53 --script all)
慢速全面扫描。
```





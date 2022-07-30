# Nessus详细使用教程

## 一、Nessus简介

Nessus号称是世界上最流行的漏洞扫描程序，全世界有超过75000个组织在使用它。该工具提供完整的电脑漏洞扫描服务，并随时更新其漏洞数据库。Nessus不同于传统的漏洞扫描软件，Nessus可同时在本机或远端上遥控，进行系统的漏洞分析扫描。Nessus也是渗透测试重要工具之一

## 二、Nessus安装

(1)下载软件包

进入官网下载

[https://www.tenable.com/downloads/nessus](https://link.zhihu.com/?target=https%3A//www.tenable.com/downloads/nessus)

![img](https://pic2.zhimg.com/80/v2-9ea3091368d9d21f6033f79b9b71c2b9_720w.jpg)

(2)选择I agree

![img](https://pic4.zhimg.com/80/v2-44f8fdf4dfdaa3ece6745fdbaec07437_720w.jpg)

(3)将下载的软件包拖到Kali中

![img](https://pic4.zhimg.com/80/v2-39e66df1c804eed5c3c280883772d92b_720w.jpg)

(4)安装Nessus

![img](https://pic3.zhimg.com/80/v2-dc89a40c46b6d8bfc16c144881baae46_720w.jpg)

(5)启动Nessus

![img](https://pic3.zhimg.com/80/v2-e096dc1dddb971ec5a4824be553d11da_720w.png)

(6)查看Kali的IP

![img](https://pic4.zhimg.com/80/v2-629d42fc46c187a1b1314610b5bd8f3f_720w.jpg)

(7)在物理机上进行连接

**[https://kali](https://link.zhihu.com/?target=https%3A//kali)的IP地址:8834**

![img](https://pic1.zhimg.com/80/v2-26ee81d0b8b5322b05d2075821879380_720w.jpg)

(8)获取激活码(邮箱一定写正确，否则收不到激活码)

或者输入这个网址查询激活码

[http://www.tenable.com/products/nessus/nessus-plugins/obtain-an-activation-code](https://link.zhihu.com/?target=http%3A//www.tenable.com/products/nessus/nessus-plugins/obtain-an-activation-code)

![img](https://pic1.zhimg.com/80/v2-f22286dfb446d52c51f1639993d33528_720w.jpg)

(9)输入激活码

![img](https://pic2.zhimg.com/80/v2-0c00419f3f99ba9546b86716b0a28811_720w.jpg)

(10)注册一个账号

![img](https://pic4.zhimg.com/80/v2-4b3b1a0f6d2670b202b9d2718081f367_720w.jpg)

(11)开始读条

![img](https://pic4.zhimg.com/80/v2-99dca3b488127e1e2a753ce3f3a1b15b_720w.jpg)

(12)提示下载失败

![img](https://pic1.zhimg.com/80/v2-6804e01c5b41ed1aafbd35a6ff858164_720w.jpg)

(13)回到kali上输入下面这条命令

**/opt/nessus/sbin/nessuscli update**

![img](https://pic2.zhimg.com/80/v2-7768879873b2d3f0a0b8fa0489a1afbd_720w.jpg)

开始下载插件

网速一定要好！网速一定要好！网速一定要好！重要的话说三遍！！！

然后开启漫长的等待

(14)重新安装Nessus

![img](https://pic2.zhimg.com/80/v2-5a3673c27b8ed0b67e795937f0c7a665_720w.jpg)

(15)重新启动Nessus

![img](https://pic4.zhimg.com/80/v2-86a1127110fe6337e4a01fe1f56e766f_720w.png)

(16)又开始读条

![img](https://pic3.zhimg.com/80/v2-160a16d906fd13387913bd4229a71d92_720w.jpg)

第一次读条特别特别慢，请耐心等待。

(17)然后进入用户名密码进入Nessus，查看是否有插件

![img](https://pic2.zhimg.com/80/v2-d430c8d09cfd8bcfe941e872d214a1e9_720w.jpg)

## 三、Nessus配置

1.常规设置介绍

![img](https://pic4.zhimg.com/80/v2-59984d70faf43463215c66f439b51e1f_720w.jpg)

![img](https://pic1.zhimg.com/80/v2-b731d46353cf07f32bb93fa48999f9f0_720w.jpg)

![img](https://pic2.zhimg.com/80/v2-fbdb217d9071fed153e50fe0a064dc25_720w.jpg)

![img](https://pic4.zhimg.com/80/v2-9f15960d70910ed1082f73bdecf64f97_720w.jpg)

![img](https://pic2.zhimg.com/80/v2-32c1b75a33091092e402cc596d4c5651_720w.jpg)

![img](https://pic4.zhimg.com/80/v2-71b7f843e08b632169907f3cc17c8353_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-b686eefdde6268a93173afddce6eec6e_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-44cfb0564d5d6dcd4830564fe11f749e_720w.jpg)

![img](https://pic1.zhimg.com/80/v2-5b183df3caf13e1e03a78180d20bf4e0_720w.jpg)

![img](https://pic4.zhimg.com/80/v2-ebc35e90c9377fb8084e05691adf398f_720w.jpg)

## 四、Nessus使用

1.扫描Windows主机

选择好要扫描的内容及插件后，点击save，然后点击开始扫描

![img](https://pic1.zhimg.com/80/v2-875bf0e3ccb74734e998768156706884_720w.png)

查看扫描结果

![img](https://pic1.zhimg.com/80/v2-826f398fe6deb95d0194cf06864b5c00_720w.jpg)

查看详情

![img](https://pic3.zhimg.com/80/v2-a839c480ba2b6dde39a1c848d738919a_720w.jpg)

2.扫描Linux主机

选择好要扫描的内容及插件后，点击save，然后点击开始扫描

![img](https://pic2.zhimg.com/80/v2-f7d5ebd1389fbf2be10a33e7ef6a66f1_720w.jpg)

查看扫描结果

![img](https://pic3.zhimg.com/80/v2-12ecdfe2bd28cf7a595d41fa4df0aee2_720w.jpg)

查看详情

![img](https://pic4.zhimg.com/80/v2-f6009d4b8b56ec968c99021b7a67ed23_720w.jpg)
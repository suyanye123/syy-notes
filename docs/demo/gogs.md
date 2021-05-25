# Gogs安装及使用

首先打开命令行，输入

```text
wget https://dl.gogs.io/0.11.91/gogs_0.11.91_linux_amd64.zip
```

这里我的服务器使用的阿里云的 Centos，最低配置的，平时就放点自己做的项目啥的。当然如果你是别的系统，或者选择不用 wget。也可以去 Gogs 官网去把远吗包 down 下来传给服务器。

下一步：解压

```text
unzip gogs_0.11.91_linux_amd64.zip
```

然后。然后就没有然后了。到这一步，安装就结束了。有够简单吧！

下一步：运行

```text
./gogs/gogs web
```

这时，访问服务器的 3000 端口，就会看到下面的页面。

![img](https://pic2.zhimg.com/80/v2-9a6535177cf5e11e04bbf5aa60969f09_720w.jpg)

这一步是要配置 Gogs 服务器，配置以后才能使用。

为了方便，我就选了最简单的配置：

![img](https://pic2.zhimg.com/80/v2-fc9e364dfaa3ad6219f6ccacf2d3975d_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-962549031b8226d1a9070eabb55255d6_720w.jpg)

然后安装，页面就会跳到：

![img](https://pic1.zhimg.com/80/v2-de1f99c10dd44d29bc59e6e4cfa2c72c_720w.jpg)

至此。Gogs 代码服务器安装配置好了，并且可以使用了。

当然，这里展示的是 linux 下的安装。如果你是想要在 window 下搭建其实也一样，就是不把 localhost 替换为自己的域名就好。

因为我的实在服务器运行的。因此还需要把 Gogs 配置为系统服务。不然 shell 一关，Gogs 也会停止运行。

具体步骤如下：

执行：

```text
cp ./gogs/scripts/systemd/gogs.service /etc/systemd/system/gogs.service
vi /etc/systemd/system/gogs.service
```

将文件修改为：

![img](https://pic1.zhimg.com/80/v2-bfeb27721fe8728bc8e0040718ef12d0_720w.jpg)

这里主要是修改的访问用户和访问文件夹。我用的是 root 用户，root 文件夹。因为这样比较方便，当然如果你有需要，也可以单独配置用户。

这样一个简单的代码服务器就搭建完毕。当然除了这种安装方式，官方也提供了其他安装方式：

![img](https://pic1.zhimg.com/80/v2-409db22b546cb7c6a8fcec2f4c7f9488_720w.jpg)

这里用的二进制安装。

安装完成后，就开始撸代码了。新建仓库，将本地代码添加一个源：

```text
git remote add gogs http://yinchengnuo.com:3000/yinchengnuo/mockApiNode.git
```

执行 git remote -v

```text
gogs    http://yinchengnuo.com:3000/yinchengnuo/mockApiNode.git (fetch)
gogs    http://yinchengnuo.com:3000/yinchengnuo/mockApiNode.git (push)
origin  https://github.com/yinchengnuo/mockApiNode.git (fetch)
origin  https://github.com/yinchengnuo/mockApiNode.git (push)
```

在 package.json 添加指令：

```text
"push": "git add . && git commit -m 'publish' && git push gogs master --force && git push origin master --force"
```

执行：

```text
npm run push
```

代码服务器上就有代码了：

![img](https://pic3.zhimg.com/80/v2-a1ccb69655de5b9f9aa0cbdc9df6d57e_720w.jpg)

接下来，添加 webHook：

![img](https://pic3.zhimg.com/80/v2-5ab5a8f2785d7ba46095441131863052_720w.jpg)

最后一步，更改服务器代码 origin：

![img](https://pic3.zhimg.com/80/v2-50dd6ffb0962e500d4b0c766b7950322_720w.png)



当然，webHook 里填写的地址的接口是之前已经写好的：

```js
    router.post("/gitHook", async (ctx) => { // github hook
        execSync('git reset --hard && git pull origin master --force')
        ctx.body = ""
    })
```

就这么简单。

当然，在实际的工作中。无论是处理代码服务器用户，还是 webHook 等，该限权的要限权，该加密的要加密，一定不能忽视安全问题。这里只是作为一个前端小白在这里的一点尝试与摸索的记录，希望能够对你所有帮助。
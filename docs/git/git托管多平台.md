# 将一个项目同时托管至gitee和github

##### 方法1：直接修改git文件中config文件

```js
[remote "origin"]
url = git@gitee.com:yourAccount.git
fetch = +refs/heads/:refs/remotes/origin/
url = git@github.com:yourAccount.git
```

如果不想用命令行，可以直接编辑该文件，添加对应的remote及url即可

------

##### 方法2：使用命令行

```js
//先添加第一个仓库
git remote add origin git@gitee.com:yourAccount.git
//再添加第二个仓库：
git remote set-url --add origin git@github.com:yourAccount.git
//如果还有其他，则可以像添加第二个一样继续添加其他仓库。
//然后使用下面命令提交：
git push origin --all
```


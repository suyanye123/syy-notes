---
sidebarDepth: 3
---

# Git
- [官网](https://git-scm.com/)
- [Git 学习教程](https://learngitbranching.js.org/?locale=zh_CN)
- [Github](https://github.com/git/git)
- [Windows 版 Github](https://github.com/git-for-windows/git)
- [Windows 版下载镜像站](https://npm.taobao.org/mirrors/git-for-windows/)
- [下载技巧 - 使用 jsdelivr 加速 Github 仓库资源](https://github.com/maomao1996/daily-notes/issues/7)

## 常用API

### 初始化

```markdown
# 新建一个目录，将其初始化为 Git 仓库
git init [project-name]

# 下载一个项目和它的整个代码历史
git clone [url]

# 显示当前的Git配置
git config --list

# 设置提交代码时的用户信息
git config [--global] user.name "名称"
git config [--global] user.email "邮箱地址"

# 添加指定文件或指定目录到暂存区
git add [文件路径 / 目录路径]

# 添加所有文件到暂存区
git add .

# 停止追踪指定文件并保留在工作区
git rm --cached [文件路径]

# 删除工作区文件并且提交到暂存区
git rm [文件路径]

# 提交暂存区到仓库区
git commit -m [提交信息]

# 替换上一次 commit（如无代码改动，就重写上一次 commit 的提交信息）
git commit --amend -m [提交信息]
```



### 分支

```markdown
# 列出所有本地分支
git branch

# 列出所有远程分支
git branch -r

# 列出所有本地分支和远程分支
git branch -a

# 新建一个分支，但依然停留在当前分支
git branch [分支名]

# 新建一个分支，并切换到该分支
git checkout -b [分支名]

# 新建一个分支，指向指定commit
git branch [分支名] [commit id]

# 新建一个分支，与指定的远程分支建立追踪关系
git branch --track [分支名] [远程分支名]

# 新建一个空白分支
git checkout --orphan [分支名]

# 切换到指定分支，并更新工作区
git checkout [分支名]

# 切换到上一个分支
git checkout -

# 合并指定分支到当前分支
git merge [分支名]

# 删除分支
git branch -d [分支名]

# 删除远程分支
git push origin --delete [分支名]
git branch -dr [remote/分支名]
```

### tag相关

```markdown
# 列出所有 tag
git tag

# 根据当前 commit 创建一个 tag
git tag [tag]

# 根据指定 commit 创建一个 tag
git tag [tag] [commit id]

# 删除本地 tag
git tag -d [tag]

# 删除远程 tag
git push origin :refs/tags/[tagName]

# 查看 tag 信息
git show [tag]

# 提交指定tag
git push [remote] [tag]

# 提交所有tag
git push [remote] --tags

# 新建一个分支，指向某个tag
git checkout -b [分支名] [tag]

```

### 重置

```markdown
# 强行推送当前分支到远程仓库，即使有冲突
git push [remote] --force

# 推送所有分支到远程仓库
git push [remote] --all

# 重置暂存区的指定文件，与上一次 commit 保持一致，但工作区不变
git reset [文件路径]

# 重置暂存区与工作区，与上一次 commit 保持一致
git reset --hard

# 重置当前分支的指针为指定 commit，同时重置暂存区，但工作区不变
git reset [commit id]

# 重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致
git reset --hard [commit id]

# 重置当前 HEAD 为指定 commit，但保持暂存区和工作区不变
git reset --keep [commit id]

# 新建一个 commit，用来撤销指定 commit 后者的所有变化都将被前者抵消，并且应用到当前分支
git revert [commit id]

# 暂时将未提交的变化移除，稍后再移入
git stash
git stash pop
```

### 小技巧

```markdown
# 显示变更的文件
git status

# 显示当前分支的版本历史
git log

# 显示commit历史，以及每次commit发生变更的文件
git log --stat

# 搜索提交历史，根据关键词
git log -S [keyword]

# 显示某个文件的版本历史，包括文件改名
git log --follow [文件路径]
git whatchanged [文件路径]

# 显示指定文件相关的每一次diff
git log -p [文件路径]

# 显示过去5次提交
git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
git blame [file]

# 显示暂存区和工作区的差异
git diff

# 显示工作区与当前分支最新 commit 之间的差异
git diff HEAD

# 显示今天你写了多少行代码
git diff --shortstat "@{0 day ago}"

# 显示当前分支的最近几次提交
git reflog

# 下载远程仓库的所有变动
git fetch [remote]

# 显示所有远程仓库
git remote -v

# 显示某个远程仓库的信息
git remote show [remote]

# 增加一个新的远程仓库，并命名
git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
git pull [remote] [branch]

# 上传本地指定分支到远程仓库
git push [remote] [branch]


```

[参考地址：阮一峰 -- 常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

------



## 拓展

### 1. git托管多平台

##### 方法1：直接修改git文件中config文件

```js
[remote "origin"]
url = git@gitee.com:yourAccount.git
fetch = +refs/heads/:refs/remotes/origin/
url = git@github.com:yourAccount.git
```

如果不想用命令行，可以直接编辑该文件，添加对应的remote及url即可



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





### 2. Git Hooks

Git Hooks 就是在 Git 执行特定事件（如commit、push、receive等）时触发运行的脚本，类似于“钩子函数”，没有设置可执行的钩子将被忽略。

在项目的 .git/hooks 目录中，有一些 .sample 结尾的钩子示例脚本，如果想启用对应的钩子，只需手动删除后缀，即可。（删除某一个 hook 的后缀 .sample 即可启用该 hook 脚本，默认是不启用的。）

【但是，我们一般不去改动 .git/hooks 里面的文件，因为我们使用 husky 】

lint-staged，一个仅仅过滤出 Git 代码暂存区文件(被 git add 的文件)的工具；这个很实用，因为我们如果对整个项目的代码做一个检查，可能耗时很长，如果是老项目，要对之前的代码做一个代码规范检查并修改的话，这可能就麻烦了呀，可能导致项目改动很大。

所以这个 lint-staged，对团队项目和开源项目来说，是一个很好的工具，它是对个人要提交的代码的一个规范和约束。

husky v4版本`package.json` 文件中配置 如下：

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.{js,vue}": ["prettier --write", "eslint --cache --fix", "git add"]
}
```

##### husky 升级到 v6 后配置变动（更新至2021年） 

第 1 步： `npx husky-init && yarn`

第 2 步：
修改已自动生成的 ./husky/pre-commit 钩子

```json
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged --verbose
```

创建 ./husky/commit-msg 钩子 `npx husky add .husky/commit-msg "npm test"`
并修改为

```json
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn commitlint --config .commitlintrc.js --edit $1
```

（自行新建commit-msg文件，会还需要设置可执行文件模式，所以采用先 `husky add` 再手动修改的方式）

第 3 步：清理 package.json 中 husky 字段内容

PS：仅删除husky配置，`lint-staged`配置不用删除， 参考 [ husky更新配置 ](https://zhuanlan.zhihu.com/p/356924268)





### 3. Github Actions

[ Github Actions ](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html) 提供一个 Actions 市场，这是它另一个优势，可以复用别人提供的 action，减少编写 workflow 文件工作量

相关的 steps如下，第一步是准备 Github Pages 相关的静态资源，第二步是借助 GitHub Pages Deploy Action 自动一步部署静态资源至 gh-pages 分支，简单快捷。

```yaml
- name: Init Github pages
    run: |
    mv ./candelas/.git $GITHUB_WORKSPACE
    mv ./candelas ./hexo-theme-unit-test/themes
    cd ./hexo-theme-unit-test
    npx hexo clean
    npx hexo config theme candelas
    npx hexo new page categories
    cp ./themes/candelas/.github/resources/categories.md ./source/categories/index.md
    npx hexo generate
    mv ./public $GITHUB_WORKSPACE
- name: Deploy
    uses: JamesIves/github-pages-deploy-action@3.1.5
    with:
    ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
    BRANCH: gh-pages
    FOLDER: public
```

我们选用一个别人已经写好的 action复用即可，这里选的是[ JamesIves ](JamesIves/github-pages-deploy-action@4.1.1)

需要注意的是，截止至2021年，JamesIves已升至V4版本，相关配置有所改变，不再需要填写环境密钥

我的workflows配置如下：

```yaml
name: Build and Deploy
# 触发条件: push 到 master 分支后
on:
  push:
    branches:
      - master
# 任务
jobs:
  build-and-deploy:
    # 服务器环境：最新版 ubuntu
    runs-on: ubuntu-latest
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2.3.1
        with:
          persist-credentials: false
      # 安装依赖及打包    
      - name: Install and Build
        run: |
          npm install
          npm run build
      # 部署
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.1
        with:
          # GitHub Pages 读取的分支
          branch: gh-pages
          # 静态文件所在目录
          folder: dist

```





### 4.  gh-pages插件

用于将代码自动提交到 github 的 gh-pages 分支，如果没有则创建该分支

1. 安装 `gh-pages`

```sh
yarn add -D gh-pages
# OR npm install -D gh-pages
```

2. 在 `package.json` 中添加如下脚本

```json
"deploy": "gh-pages -d dist -m deploy",
"deploy:build": "npm run build && npm run deploy"
```

3. 运行 `deploy` 脚本
```sh
yarn deploy
# OR npm run deploy
```

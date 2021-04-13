---
sidebarDepth: 2
---

# Git

## 常用API



## 拓展

### 1.将一个项目同时托管至gitee和github

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

### 2.githooks

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


# 配置

## 1.换行格式问题

配置eslint后运行项目有如下警告（换行格式问题）：
![在这里插入图片描述](https://www.freesion.com/images/613/9355d82ec3928d0678decdfd0028fe25.png)
运行（可以自动修复这些问题）：

```shell
npm run lint --fix
```

![在这里插入图片描述](https://www.freesion.com/images/501/267e1119e2c88a3b18e01fa5aa49386d.png)

参考：[eslint-plugin-prettier/issues/114](https://github.com/prettier/eslint-plugin-prettier/issues/114)

**原因**
在window系统中，clone代码下来，会自动把换行符LF(linefeed character) 转换成回车符CRLF(carriage-return character)。这时候我们本地的代码都是回车符。

![在这里插入图片描述](https://www.freesion.com/images/53/55d4a939939c1a5d3a7fcfeefcaba825.png)

- 如果没有加eslint，提交代码的时候，项目的仓库默认是Linux环境下提交的代码，就会提示将会覆盖换行符为LF。
- 使用了eslint并有进行规则配置或者prettier的.prettierrc有进行配置结尾换行符，那么就会直接在开发环境中进行验证。就会提示上述错误（警告）。

![在这里插入图片描述](https://www.freesion.com/images/695/ee6ad0b17bed174adc4f016c7d244cc7.png)



我们可以配置.prettierrc文件不进行检查每一行换行的格式，但是这就违背了我们使用eslint的初衷：

```json
"endOfLine": "auto",
```

所以最好是把这个格式统一一下，在window系统（老旧的mac可能跟windows一样）可以使用git执行以下命令关掉自动转化（git默认是打开的）：

```shell
git config --global core.autocrlf false
```




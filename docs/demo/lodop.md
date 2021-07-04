# 用cLodop实现自动打印

1.引入LodopFuncs.js（可去LodopFuncs官网下载）

```js
<script src="LodopFuncs.js" type="text/javascript" charset="utf-8"></script>
```

2.打印局部页面，以“printarea”命名元素ID
3、打印按钮添加点击事件

```js
$(".print-btn").on("click", function() {
		// 打印初始化
		var LODOP = getLodop();
		
		LODOP.PRINT_INIT("打印商品标签");
		// 设置纸张大小
		LODOP.SET_PRINT_PAGESIZE(0,2100,2970,"商品标签");
		// 设置字体
		LODOP.SET_PRINT_STYLE("FontSize", 16);
 		// 设置加粗
 		LODOP.SET_PRINT_STYLE("Bold", 1);
		// 增加超文本项
		LODOP.ADD_PRINT_HTM("5mm", "5mm", 2100, 2970, document.getElementById("printarea").innerHTML);
		// 打印预览
		LODOP.PREVIEW();
	})

```

https://www.cnblogs.com/mamimi/p/9641528.html

vue中怎么打印  https://blog.csdn.net/weixin_41888813/article/details/85061178?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-11.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-11.control

https://blog.csdn.net/weixin_45115705/article/details/102717637


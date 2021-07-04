# 	uniapp数据可视化

记录一下我在做uniapp小程序数据可视化的经历

查了一番，在uniapp中使用的图表插件基本就是uchart或者echart

uchart是Dcloud市场里排名前几的插件，echart就不用多过介绍了

## 1.uCharts的使用方法

### 方法一，文件体积超小，但较麻烦

1.将核心文件 u-charts.js 拷贝到自己的components目录下

![img](https://img2020.cnblogs.com/blog/2138872/202103/2138872-20210326090953005-1217092385.png)

 2、在需要使用的页面引入组件

```
import uCharts from '@/components/u-charts/u-charts.js';
```

3、模板写法：

然后实例化  u-charts.js  中暴露出的方法

```
showLineA(canvasId,chartData){
                canvaLineA=new uCharts({
                    $this:_self,
                    canvasId: canvasId,
                    type: 'line',
                    fontSize:11,
                    padding:[15,20,0,15],
                    legend:{
                        show:true,
                        padding:5,
                        lineHeight:11, // 控制标题的行高
                        margin:0, // 控制标题的margin
                    },
                    dataLabel:true,
                    dataPointShape:true,
                    background:'#FFFFFF',
                    pixelRatio:_self.pixelRatio,
                    categories: chartData.categories,
                    series: chartData.series,
                    animation: true,
                    xAxis: {
                        type:'grid',
                        gridColor:'#CCCCCC',
                        gridType:'dash',
                        dashLength:8,
            boundaryGap:'justify'
                    },
                    yAxis: {
                        gridType:'dash',
                        gridColor:'#CCCCCC',
                        dashLength:8,
                        splitNumber:5,
                        format:(val)=>{return val.toFixed(0)+'元'}
                    },
                    width: _self.cWidth*_self.pixelRatio,
                    height: _self.cHeight*_self.pixelRatio,
                    extra: {
                        line:{
                            type: 'curve'
                        }
                    }
                });
                //下面是默认选中索引
                let cindex=3;
                //下面是自定义文案
                let textList=[{text:'我是一个标题',color:null},{text:'自定义1：值1',color:'#2fc25b'},{text:'自定义2：值2',color:'#facc14'},　　　　　　　　　　　　　　　　　　{text:'自定义3：值3',color:'#f04864'}];
                //下面是event的模拟,tooltip的Y坐标值通过这个mp.changedTouches[0].y控制
                let tmpevent={mp:{changedTouches:[{x: 0, y: 80}]}};
                setTimeout(()=>{
                    canvaLineA.showToolTip( tmpevent , {
                        index:cindex,
                        textList:textList
                    });
                },200)
            },
            touchLineA(e) {
                canvaLineA.touchLegend(e);
                canvaLineA.showToolTip(e, {
                    format: function (item, category) {
                        return category + ' ' + item.name + ':' + item.data 
                    }
                });
            },
```

数据模型中拷贝以下参数

```
data() {
            return {
                cWidth:'',
                cHeight:'',
                pixelRatio:1,
                textarea:''
            }
        },
```



6、在实际项目中，我们是从后台获取数据存入chartData中，并调用实例化方法。这里我们先在数据模型中给出chartData的默认值，并在onLoad中调用实例化方法

```
onLoad(options) {
            this.showLineA("canvasLineA",this.chartData)
        },
```

chartData数据示例：

```
{
    "categories":["2012","2013","2014","2015","2016","2017"],
    "series":[
        {"name":"成交量A","data":[35,8,25,37,4,20]}
    ]
}
```

7、在onLoad生命周期函数中初始化cWidth和cHeight，来控制图标的宽和高

```
this.cWidth=uni.upx2px(750);
this.cHeight=uni.upx2px(500);
```

8、定义canvaLineA

```
var canvaLineA=null;
```

效果如下图所示

![img](https://img2020.cnblogs.com/blog/2138872/202103/2138872-20210326102255168-1847390591.png)

 完整代码如下：

注意：v2.0版本后，需要自行获取canvas的绘图上下文并传入opts.context！

```
<template>
    <view class="container">
        <view class="qiun-charts" >
            <!--#ifndef MP-ALIPAY -->
            <canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
            <!--#endif-->
        </view>
    </view>
</template>

<script>
    import uCharts from '@/components/u-charts/u-charts.js';　　
    var canvaLineA=null;
    export default {
        data(){
            return {
                cWidth:'',
                cHeight:'',
                pixelRatio:1,
                textarea:'',
                chartData:{
                    "categories":["2012","2013","2014","2015","2016","2017"],
                    "series":[
                        {"name":"成交量A","data":[35,8,25,37,4,20]}
                    ]
                }
            }
        },
        onLoad(options) {
            console.log(options)this.cWidth = uni.upx2px(720);
            this.cHeight = uni.upx2px(420);
            this.showLineA("canvasLineA",this.chartData)
        },
        methods:{
            showLineA(canvasId,chartData){
                canvaLineA=new uCharts({
                    $this:this,
                    canvasId: canvasId,
                    type: 'line',
                    fontSize:11,
                    padding:[15,20,0,15],
                    legend:{
                        show:true,
                        padding:5,
                        lineHeight:11,
                        margin:0,
                    },
                    dataLabel:true,
                    dataPointShape:true,
                    background:'#FFFFFF',
                    pixelRatio:this.pixelRatio,
                    categories: chartData.categories,
                    series: chartData.series,
                    animation: true,
                    xAxis: {
                        type:'grid',
                        gridColor:'#CCCCCC',
                        gridType:'dash',
                        dashLength:8,
            boundaryGap:'justify'
                    },
                    yAxis: {
                        gridType:'dash',
                        gridColor:'#CCCCCC',
                        dashLength:8,
                        splitNumber:5,
                        format:(val)=>{return val.toFixed(0)+'元'}
                    },
                    width: this.cWidth*this.pixelRatio,
                    height: this.cHeight*this.pixelRatio,
                    extra: {
                        line:{
                            type: 'curve'
                        }
                    }
                });
                //下面是默认选中索引
                let cindex=3;
                //下面是自定义文案
                let textList=[{text:'我是一个标题',color:null},
                {text:'自定义1：值1',color:'#2fc25b'},
                {text:'自定义2：值2',color:'#facc14'},　　　　　　　　　　　　　　　　　　				 {text:'自定义3：值3',color:'#f04864'}];
                //下面是event的模拟,tooltip的Y坐标值通过这个mp.changedTouches[0].y控制
                let tmpevent={mp:{changedTouches:[{x: 0, y: 80}]}};
                setTimeout(()=>{
                    canvaLineA.showToolTip( tmpevent , {
                        index:cindex,
                        textList:textList
                    });
                },200)
            },
            touchLineA(e) {
                canvaLineA.touchLegend(e);
                canvaLineA.showToolTip(e, {
                    format: function (item, category) {
                        return category + ' ' + item.name + ':' + item.data 
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .qiun-charts{
        width: 750upx; 
        height:500upx;
        background-color: #FFFFFF;
        }
    .charts{
        width: 750upx; 
        height:500upx;
        background-color: #FFFFFF;
        }
</style>
```

`touchLegend(e)` 图例点击交互事件

`showToolTip(e)` 图表中展示数据详细内容

 legend中的两个属性position和float来修改标题的位置：

```
legend:{
                        show:true,
                        padding:5,
                        lineHeight:11,
                        margin:0,
                        position: 'top',
                        float: 'right'
                    },
```

dataLabel属性用来修改曲线上是否显示数组，值为true表示显示数据，值为false表示隐藏数据

dataPointShape属性用来控制曲线上是否显示点。值为true表示显示点，值为false表示隐藏点

xAxis.labelCount：默认series.data.length，X轴可见区域`标签数量`（即X轴数刻度标签单屏幕限制显示的数量）

boundaryGap：折线图、区域图起画点结束点方法：center为单元格中间起画，justify为0点起画即两端对齐

当值为justify时是这样的：

![img](https://img2020.cnblogs.com/blog/2138872/202103/2138872-20210326160851192-172288973.png)

 

 toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。toFixed(0)表示小数位数为0.

```
<template>
	<view class="qiun-columns">
		<view class="qiun-charts" >
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
	</view>
</template>

<script>
	// 引入uCharts 方法组件。
	import uCharts from '@/components/u-charts/u-charts.js';
	// 定义全局变量
	var _self;
	var canvaLineA=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
			}
		},
		// 页面加载执行的函数
		onLoad() {
			_self = this;
			// uni.upx2px(750) 这是uni-app自带的自适应，以750的尺寸为基准。动态变化
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			// 获取数据，发请求
			getServerData(){
				uni.request({
					// 请求地址
					url: 'https://www.ucharts.cn/data.json',
					// 请求参数
					data:{
					},
					// 请求成功的回调函数
					success: function(res) {
						console.log(res.data.data.LineA,res.data.data.LineA.categories)
						let LineA={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						// 自己可以定义数据
						/*
						let LineA={categories:[],series:[]};
						LineA.categories=['2010','2012','2014','2016','2018','2020'];
						LineA.series=[{
							name:"南京",
							data:[12,15,10,18,6,13],
							color:'#409eff'
						},{
							name:"苏州",
							data:[15,6,13,18,8,14],
							color:'#e6a23c'
						},{
							name:"无锡",
							data:[13,12,13,16,9,10],
							color:'#f56c6c'
						}];
						*/ 
						LineA.categories=res.data.data.LineA.categories;
						LineA.series=res.data.data.LineA.series;
						// 找到id为canvasLineA的块
						_self.showLineA("canvasLineA",LineA);
					},
					// 请求失败的回调函数
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			// 展示图标的函数 接收参数，一个块的id,一个数据
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					// 图标类型
					type: 'line',
					fontSize:11,
					legend:{show:true},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					// x轴显示的内容
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8
					},
					// y轴显示的内容
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)+'元'}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
				
			},
			// 点击图表显示的内容
			touchLineA(e) {
				// 使用声明的变量canvaLineA
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			}
		}
	}
</script>

<style scoped>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>

```

### 方法二，使用官方默认配置组件

官方提供了默认配置模板

首先，将插件里的uni_modules目录复制到src目录，即src/uni_modules

然后页面中直接按下面用法直接调用即可，无需在页面中注册组件qiun-data-charts

居然不需要任何引入，就可以直接用，我和我的小伙伴们当时都惊呆了！

```
<view class="qiun-columns">
<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
<view class="qiun-title-dot-light">基本折线图</view>
</view>
<view class="qiun-charts" >
<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
</view>
</view>
```

当需要更改图表的样式时，可以在线配置，然后直接复制即可

在线配置：https://demo.ucharts.cn/#/

uchart常见问题：https://demo.ucharts.cn/#/



------



## 2.使用echart

### 方法1：

用webview内嵌HTML

1：创建一个HTML文件，粘贴下面代码、放到static文件夹下面作为静态资源
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<!-- 引入 ECharts 文件 -->
		<script src="https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js"></script>
	</head>
	<body style="margin-top: 70px;">
		<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
		<div id="main" style="width: 350px;height:250px;"></div>
	</body>
	<script type="text/javascript">
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));

		// 指定图表的配置项和数据
		var option = {
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: [8, 9, 9, 9, 12, 13, 10],
				type: 'line'
			},{
				data: [2, 3, 4, 5, 6, 7, 16],
				type: 'line'
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	</script>
</html>
```
2：在vue文件里面引入此HTML

<web-view src="/static/html/mine-k.html"></web-view>

3：此时图表已经出来了，这时你可以替换成你所需要的图

### 方法2：

https://blog.csdn.net/wxh958548129/article/details/107520566
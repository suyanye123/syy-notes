---
sidebarDepth: 2
---

# 时间戳

## 获取当前时间戳

##### 第一种方法：(这种方法只精确到秒)

```javascript
var timestamp = Date.parse(new Date());
```

##### 第二种方法：(精确到毫秒)

```javascript
var timestamp=new Date().getTime()；
```

------

## 时间戳转化为年月日小时分钟

```js
var date = new Date(newDate);
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
if (month < 10) {
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}
var hours = date.getHours();
if(hours < 10){
hours = "0" + hours;
}
var minutes = date.getMinutes();
if(minutes < 10){
minutes = "0" + minutes;
}

var nowDate = year + "-" + month + "-" + day+ " "+ hours + ":" + minutes;
```



## [Moment.js](http://momentjs.cn/)

##### 	日期格式化

```js
moment().format('MMMM Do YYYY, h:mm:ss a'); // 四月 29日 2021, 11:13:36 上午
```

##### 	相对时间

```
moment("20111031", "YYYYMMDD").fromNow(); // 9 年前
moment("20120620", "YYYYMMDD").fromNow(); // 9 年前
moment().startOf('day').fromNow();        // 11 小时前
moment().endOf('day').fromNow();          // 13 小时内
moment().startOf('hour').fromNow();       // 14 分钟前
```


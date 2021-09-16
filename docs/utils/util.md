## **1.加载js || css || style**

```js
  const loadRes = function(name, type, fn) { // 加载js || css || style
  let ref
  if (type === 'js') { // 外部js
    ref = document.createElement('script')
    ref.setAttribute('type', 'text/JavaScript')
    ref.setAttribute('src', name)
  } else if (type === 'css') { // 外部css
    ref = document.createElement('link')
    ref.setAttribute('rel', 'stylesheet')
    ref.setAttribute('type', 'text/css')
    ref.setAttribute('href', name)
  } else if (type === 'style') { // style
    ref = document.createElement('style')
    ref.innerhtml = name
  }
  if (typeof ref !== 'undefined') {
    document.getElementsByTagName('head')[0].appendChild(ref)
    ref.onload = function() { // 加载完成执行
      typeof fn === 'function' && fn()
    }
  }
}
```

## 2.获取url参数

```js
const getUrlParam = function(name) { // 获取url参数
  let reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.href.substr(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return undefined
}
```



## 3.本地存储

```js
const store = { // 本地存储
  set: function(name, value, day) { // 设置
    let d = new Date()
    let time = 0
    day = (typeof(day) === 'undefined' || !day) ? 1 : day // 时间,默认存储1天
    time = d.setHours(d.getHours() + (24 * day)) // 毫秒
    localStorage.setItem(name, JSON.stringify({
      data: value,
      time: time
    }))
  },
  get: function(name) { // 获取
    let data = localStorage.getItem(name)
    if (!data) {
      return null
    }
    let obj = JSON.parse(data)
    if (new Date().getTime() > obj.time) { // 过期
      localStorage.removeItem(name)
      return null
    } else {
      return obj.data
    }
  },
  clear: function(name) { // 清空
    if (name) { // 删除键为name的缓存
      localStorage.removeItem(name)
    } else { // 清空全部
      localStorage.clear()
    }
  }
}
```



## 4.cookie操作【set，get，del】

```js
const cookie = { // cookie操作【set，get，del】
  set: function(name, value, day) {
    let oDate = new Date()
    oDate.setDate(oDate.getDate() + (day || 30))
    document.cookie = name + '=' + value + ';expires=' + oDate + "; path=/;"
  },
  get: function(name) {
    let str = document.cookie
    let arr = str.split('; ')
    for (let i = 0; i < arr.length; i++) {
      let newArr = arr[i].split('=')
      if (newArr[0] === name) {
        return newArr[1]
      }
    }
  },
  del: function(name) {
    this.set(name, '', -1)
  }
}
```



## 5.Js获取元素样式【支持内联】

```js
const getRealStyle = function(obj, styleName) { // Js获取元素样式【支持内联】
  var realStyle = null
  if (obj.currentStyle) {
    realStyle = obj.currentStyle[styleName]
  } else if (window.getComputedStyle) {
    realStyle = window.getComputedStyle(obj, null)[styleName]
  }
  return realStyle
}
```



## 6.时间格式化

```js
const formatDate = function(fmt, date) { // 时间格式化 【'yyyy-MM-dd hh:mm:ss',时间】
  if (typeof date !== 'object') {
    date = !date ? new Date() : new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
```



## 7.原生ajax操作

```js
const ajax = function(conf) { // ajax操作
  let url = conf.url,
    data = conf.data,
    senData = [], // 封装后的数据
    async = conf.async !== undefined ? conf.async : true, // ture为异步请求
      type = conf.type || 'get', // 默认请求方式get
      dataType = conf.dataType || 'json',
      contenType = conf.contenType || 'application/x-www-form-urlencoded',
      success = conf.success,
      error = conf.error,
      isForm = conf.isForm || false, // 是否formdata
      header = conf.header || {}, // 头部信息
      xhr = '' // 创建ajax引擎对象
  if (data == null) {
    senData = ''
  } else if (typeof data === 'object' && !isForm) { // 如果data是对象，转换为字符串
    for (var k in data) {
      senData.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    }
    senData = senData.join('&')
  } else {
    senData = data
  }
  try {
    xhr = new ActiveXObject('microsoft.xmlhttp') // IE内核系列浏览器
  } catch (e1) {
    try {
      xhr = new XMLHttpRequest() // 非IE内核浏览器
    } catch (e2) {
      if (error != null) {
        error('不支持ajax请求')
      }
    }
  };
  xhr.open(type, type !== 'get' ? url : url + '?' + senData, async)
  if (type !== 'get' && !isForm) {
    xhr.setRequestHeader('content-type', contenType)
  }
  for (var h in header) {
    xhr.setRequestHeader(h, header[h])
  }
  xhr.send(type !== 'get' ? senData : null)
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        if (dataType === 'json' && success != null) {
          let res = ''
          try {
            res = eval('(' + xhr.responseText + ')')
          } catch (e) {
            console.log(e)
          }
          success(res) // 将json字符串转换为js对象
        };
      } else {
        if (error != null) {
          error('通讯失败!' + xhr.status)
        }
      }
    }
  }
}
```



## 8.fetch请求的封装

```js
const fetch = function(url, setting) { // fetch请求的封装
  let opts = { // 设置参数的初始值
    method: (setting.method || 'GET').toUpperCase(), // 请求方式
    headers: setting.headers || {}, // 请求头设置
    credentials: setting.credentials || true, // 设置cookie是否一起发送
    body: setting.body || {},
    mode: setting.mode || 'no-cors', // 可以设置 cors, no-cors, same-origin
    redirect: setting.redirect || 'follow', // follow, error, manual
    cache: setting.cache || 'default' // 设置 cache 模式 (default, reload, no-cache)
  }
  let dataType = setting.dataType || 'json' // 解析方式
  let data = setting.data || '' // 参数
  let paramsFormat = function(obj) { // 参数格式
    var str = ''
    for (var i in obj) {
      str += `${i}=${obj[i]}&`
    }
    return str.split('').slice(0, -1).join('')
  }

  if (opts.method === 'GET') {
    url = url + (data ? `?${paramsFormat(data)}` : '')
  } else {
    setting.body = data || {}
  }
  return new Promise((resolve, reject) => {
    fetch(url, opts).then(async res => {
      let data = dataType === 'text' ? await res.text() : dataType === 'blob' ? await res.blob() : await res.json()
      resolve(data)
    }).catch(e => {
      reject(e)
    })
  })
}
```



## 9.设备判断：android、ios、web

```js
const isDevice = function() { // 判断是android还是ios还是web
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/iPhone\sOS/i) === 'iphone os' || ua.match(/iPad/i) === 'ipad') { // ios
    return 'iOS'
  }
  if (ua.match(/Android/i) === 'android') {
    return 'Android'
  }
  return 'Web'
}
```



## 10.判断是否为微信

```js
const isWx = function() { // 判断是否为微信
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  }
  return false
}
```



## 11.文本复制功能

```js
const copyTxt = function(text, fn) { // 复制功能
  if (typeof document.execCommand !== 'function') {
    console.log('复制失败，请长按复制')
    return
  }
  var dom = document.createElement('textarea')
  dom.value = text
  dom.setAttribute('style', 'display: block;width: 1px;height: 1px;')
  document.body.appendChild(dom)
  dom.select()
  var result = document.execCommand('copy')
  document.body.removeChild(dom)
  if (result) {
    console.log('复制成功')
    typeof fn === 'function' && fn()
    return
  }
  if (typeof document.createRange !== 'function') {
    console.log('复制失败，请长按复制')
    return
  }
  var range = document.createRange()
  var div = document.createElement('div')
  div.innerhtml = text
  div.setAttribute('style', 'height: 1px;fontSize: 1px;overflow: hidden;')
  document.body.appendChild(div)
  range.selectNode(div)
  var selection = window.getSelection()
  console.log(selection)
  if (selection.rangeCount > 0) {
    selection.removeAllRanges()
  }
  selection.addRange(range)
  document.execCommand('copy')
  typeof fn === 'function' && fn()
  console.log('复制成功')
}
```



## 12.判断是否是一个数组

```js
const isArray = function(arr) { // 判断是否是一个数组
  return Object.prototype.toString.call(arr) === '[object Array]'
}
```



## 13.判断两个数组是否相等

```js
const arrayEqual = function(arr1, arr2) { //判断两个数组是否相等
  if (arr1 === arr2) return true;
  if (arr1.length != arr2.length) return false;
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
```



## 14.时间与时间戳转换

```js
const stamp = { // 时间，时间戳转换
  getTime: function(time) { // 时间转10位时间戳
    let date = time ? new Date(time) : new Date()
    return Math.round(date.getTime() / 1000)
  },
  timeToStr: function(time, fmt) { // 10位时间戳转时间
    return new Date(time * 1000).pattern(fmt || 'yyyy-MM-dd')
  }
}
```



## 15.常用正则验证

```js
const checkStr = function(str, type) { // 常用正则验证，注意type大小写
  switch (type) {
    case 'phone': // 手机号码
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str)
    case 'tel': // 座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
    case 'card': // 身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
    case 'pwd': // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(str)
    case 'postal': // 邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str)
    case 'QQ': // QQ号
      return /^[1-9][0-9]{4,9}$/.test(str)
    case 'email': // 邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
    case 'money': // 金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str)
    case 'URL': // 网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
    case 'IP': // IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str)
    case 'date': // 日期时间
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
        /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
    case 'number': // 数字
      return /^[0-9]$/.test(str)
    case 'english': // 英文
      return /^[a-zA-Z]+$/.test(str)
    case 'chinese': // 中文
      return /^[\u4E00-\u9FA5]+$/.test(str)
    case 'lower': // 小写
      return /^[a-z]+$/.test(str)
    case 'upper': // 大写
      return /^[A-Z]+$/.test(str)
    case 'HTML': // HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str)
    default:
      return true
  }
}
```



## 16.是否为PC端

```js
const isPC = function() { // 是否为PC端
  let userAgentInfo = navigator.userAgent
  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}
```



## 17.去除字符串空格

```js
const trim = function(str, type) { // 去除空格， type:  1-所有空格  2-前后空格  3-前空格 4-后空格
  type = type || 1
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '')
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '')
    case 3:
      return str.replace(/(^\s*)/g, '')
    case 4:
      return str.replace(/(\s*$)/g, '')
    default:
      return str
  }
}
```



## 18.字符串大小写转换

```js
const changeCase = function(str, type) { // 字符串大小写转换 type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
  type = type || 4
  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/g, function(word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
      })
    case 2:
      return str.replace(/\b\w+\b/g, function(word) {
        return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
      })
    case 3:
      return str.split('').map(function(word) {
        if (/[a-z]/.test(word)) {
          return word.toUpperCase()
        } else {
          return word.toLowerCase()
        }
      }).join('')
    case 4:
      return str.toUpperCase()
    case 5:
      return str.toLowerCase()
    default:
      return str
  }
}
```



## 19.过滤html[代码](http://www.fly63.com/tag/代码)

```js
const filterTag = function(str) { // 过滤html代码(把<>转换)
  str = str.replace(/&/ig, '&')
  str = str.replace(/</ig, '<')
  str = str.replace(/>/ig, '>')
  str = str.replace(' ', ' ')
  return str
}
```



## 20.生成随机数范围

```js
const random = function(min, max) { // 生成随机数范围
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * ((max + 1) - min))
  } else {
    return null
  }
}
```



## 21.阿拉伯数字转中文大写数字

```js
const numberToChinese = function(num) { // 将阿拉伯数字翻译成中文的大写数字
  let AA = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十')
  let BB = new Array('', '十', '百', '仟', '萬', '億', '点', '')
  let a = ('' + num).replace(/(^0*)/g, '').split('.')
  let k = 0
  let re = ''
  for (let i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$').test(a[0])) {
          re = BB[4] + re
        }
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0) {
      re = AA[0] + re
    }
    if (a[0].charAt(i) !== 0) {
      re = AA[a[0].charAt(i)] + BB[k % 4] + re
    }
    k++
  }
  if (a.length > 1) { // 加上小数部分(如果有小数部分)
    re += BB[6]
    for (let i = 0; i < a[1].length; i++) {
      re += AA[a[1].charAt(i)]
    }
  }
  if (re === '一十') {
    re = '十'
  }
  if (re.match(/^一/) && re.length === 3) {
    re = re.replace('一', '')
  }
  return re
}
```



## 22.原生dom操作

```js
const dom = {
  $: function(selector) {
    let type = selector.substring(0, 1)
    if (type === '#') {
      if (document.querySelecotor) return document.querySelector(selector)
      return document.getElementById(selector.substring(1))
    } else if (type === '.') {
      if (document.querySelecotorAll) return document.querySelectorAll(selector)
      return document.getElementsByClassName(selector.substring(1))
    } else {
      return document['querySelectorAll' ? 'querySelectorAll' : 'getElementsByTagName'](selector)
    }
  },
  hasClass: function(ele, name) { /* 检测类名 */
    return ele.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'))
  },
  addClass: function(ele, name) { /* 添加类名 */
    if (!this.hasClass(ele, name)) ele.className += ' ' + name
  },
  removeClass: function(ele, name) { /* 删除类名 */
    if (this.hasClass(ele, name)) {
      let reg = new RegExp('(\\s|^)' + name + '(\\s|$)')
      ele.className = ele.className.replace(reg, '')
    }
  },
  replaceClass: function(ele, newName, oldName) { /* 替换类名 */
    this.removeClass(ele, oldName)
    this.addClass(ele, newName)
  },
  siblings: function(ele) { /* 获取兄弟节点 */
    console.log(ele.parentNode)
    let chid = ele.parentNode.children,
      eleMatch = []
    for (let i = 0, len = chid.length; i < len; i++) {
      if (chid[i] !== ele) {
        eleMatch.push(chid[i])
      }
    }
    return eleMatch
  },
  getByStyle: function(obj, name) { /* 获取行间样式属性 */
    if (obj.currentStyle) {
      return obj.currentStyle[name]
    } else {
      return getComputedStyle(obj, false)[name]
    }
  },
  domToStirng: function(htmlDOM) { /* DOM转字符串 */
    var div = document.createElement('div')
    div.appendChild(htmlDOM)
    return div.innerHTML
  },
  stringToDom: function(htmlString) { /* 字符串转DOM */
    var div = document.createElement('div')
    div.innerHTML = htmlString
    return div.children[0]
  }
}
```



## 23.判断图片加载完成

```js
const imgLoadAll = function(arr, callback) { // 图片加载
  let arrImg = []
  for (let i = 0; i < arr.length; i++) {
    let img = new Image()
    img.src = arr[i]
    img.onload = function() {
      arrImg.push(this)
      if (arrImg.length == arr.length) {
        callback && callback()
      }
    }
  }
}
```



## 24.音频加载完成操作

```js
const loadAudio = function(src, callback) { // 音频加载
  var audio = new Audio(src)
  audio.onloadedmetadata = callback
  audio.src = src
}
```



## 25.光标所在位置插入字符

```js
const insertAtCursor = function(dom, val) { // 光标所在位置插入字符
  if (document.selection) {
    dom.focus()
    let sel = document.selection.createRange()
    sel.text = val
    sel.select()
  } else if (dom.selectionStart || dom.selectionStart == '0') {
    let startPos = dom.selectionStart
    let endPos = dom.selectionEnd
    let restoreTop = dom.scrollTop
    dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length)
    if (restoreTop > 0) {
      dom.scrollTop = restoreTop
    }
    dom.focus()
    dom.selectionStart = startPos + val.length
    dom.selectionEnd = startPos + val.length
  } else {
    dom.value += val
    dom.focus()
  }
}
```



## 26.图片地址转base64

```js
const getBase64 = function(img) { //传入图片路径，返回base64，使用getBase64(url).then(function(base64){},function(err){}); 
  let getBase64Image = function(img, width, height) { //width、height调用时传入具体像素值，控制大小,不传则默认图像大小
    let canvas = document.createElement("canvas");
    canvas.width = width ? width : img.width;
    canvas.height = height ? height : img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    let dataURL = canvas.toDataURL();
    return dataURL;
  }
  let image = new Image();
  image.crossOrigin = '';
  image.src = img;
  let deferred = $.Deferred();
  if (img) {
    image.onload = function() {
      deferred.resolve(getBase64Image(image));
    }
    return deferred.promise();
  }
}
```



## 27.base64图片下载功能

```js
const downloadFile = function(base64, fileName) { //base64图片下载功能
  let base64ToBlob = function(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {
      type: contentType
    });
  };
  let aLink = document.createElement('a');
  let blob = base64ToBlob(base64); //new Blob([content]);
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true); //initEvent不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
}
```



## 28.浏览器是否支持webP格式图片

```js
const isSupportWebP = function() { //判断浏览器是否支持webP格式图片
  return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
}
```



## 29.url参数转对象

```js
const parseQueryString = function(url) { //url参数转对象
  url = !url ? window.location.href : url;
  if (url.indexOf('?') === -1) {
    return {};
  }
  let search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1);
  if (search === '') {
    return {};
  }
  search = search.split('&');
  let query = {};
  for (let i = 0; i < search.length; i++) {
    let pair = search[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}
```



## 30.对象序列化【对象转url参数】

```js
const stringfyQueryString = function(obj) { //对象序列化【对象转url参数】
  if (!obj) return '';
  let pairs = [];
  for (let key in obj) {
    let value = obj[key];
    if (value instanceof Array) {
      for (let i = 0; i < value.length; ++i) {
        pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
      }
      continue;
    }
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return pairs.join('&');
}
```



## 31.H5软键盘缩回、弹起回调

```js
const h5Resize = function(downCb, upCb) { //当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化 [downCb 当软键盘弹起后，缩回的回调,upCb 当软键盘弹起的回调]
  var clientHeight = window.innerHeight;
  downCb = typeof downCb === 'function' ? downCb : function() {}
  upCb = typeof upCb === 'function' ? upCb : function() {}
  window.addEventListener('resize', () => {
    var height = window.innerHeight;
    if (height === clientHeight) {
      downCb();
    }
    if (height < clientHeight) {
      upCb();
    }
  });
}
```



## 32.[函数](http://www.fly63.com/tag/函数)防抖

```js
const debounce = function(func, wait, immediate) { 
  //函数防抖[func 函数,wait 延迟执行毫秒数,immediate true 表立即执行,false 表非立即执行,立即执行是触发事件后函数会立即执行，然后n秒内不触发事件才能继续执行函数的效果]
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait);
    }
  }
}
```



## 33.函数节流

```js
const throttle = function(func, wait ,type) { //函数节流 [func 函数 wait 延迟执行毫秒数 type 1 表时间戳版，2 表定时器版]
    if(type===1){
        let previous = 0;
    }else if(type===2){
        let timeout;
    }
    return function() {
        let context = this;
        let args = arguments;
        if(type===1){
            let now = Date.now();
            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }
    }
}
```


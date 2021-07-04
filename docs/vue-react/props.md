---
sidebarDepth: 2
---

# 深入Vue2

### 一、响应式原理

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，
并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。
Object.defineProperty 是 ES5 中一个无法 shim 的特性，
这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。
之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

但是由于javascript的限制，vue不能检测数组和对象的变化，
因为vue无法检测属性的添加或移除，所以property必须在data对象中保存，vue才能转化为响应式

```
var vm = new Vue({
  data:{
    a:1
  }
})
// `vm.a` 是响应式的
vm.b = 2
// `vm.b` 是非响应式的
```

对于已经创建的实例，vue不允许动态添加根级别的响应式property
此时可以使用Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property
或者vm.$set实例方法（全局vue.set方法的别名）



## ES5和ES6中set和get方法

ES5中
情况一：对象已经创建，需要给上面添加setget方法

```
//如果使用defineProperty定义setget，默认configurable: false，enumerable: false
        var obj={_a:0};
        Object.defineProperty(obj,"a",{
            configurable:false,
            enumerable:false,
            set:function (value) {
                this._a=value;
            },
            get:function () {
                return this._a;
            }
        });
```

情况二：当创建对象时，使用这种写法

```
//当使用对象设置setget时，configurable: true，enumerable: true
        var obj1={
            _a:0,
            set a(value){
                this._a=value;
            },
            get a(){
                return this._a;
            }
        };
        console.log(Object.getOwnPropertyDescriptor(obj1,"a"));
```

ES6种
class Box{

```
        constructor(){
            this._data=null;
        }
        set data(value){
            this._data=value;
        }
        get data(){
            return this._data;
        }
    }
```

### 二、组件之间传值

#### 1.父传子

props

#### 2.子传父

$emit

#### 3.兄弟组件

##### 通过eventBus

#### 4.祖先组件

##### inject\provide

###### 缺点：传递给后代的数据不是响应式的，除非祖先组件在注入时以响应式的方式注入数据



------

### 二、缓存

------

### 三、VueX



------

四、


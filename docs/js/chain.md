# 链式调用

接到一个需求，需要前端通过js实现，一键开启自动打印的功能



首先模拟打印事件，

但是存在一个问题，如果通过map、foreach这种类似for循环的方式去模拟，它是同步任务，会一瞬间全部执行完，不能达到模拟打印事件的目的。

所以需要使用定时器来模拟异步任务，

```js
// 打印
    print() {
      this.isworking = false;
      let query = {}; //查询参数
      getUserOrderList(query)
        .then((res) => {
          let list = res.data.result.list;
          let newlist = [];
          if (list.length == 0) {
            this.isworking = true;
          } else {
            this.isworking = false;
            list.map((item) => {
              newlist.push(item.orderId);
            });

            let i = 0;
            this.startjob = setInterval(() => {
              this.orderId = newlist[i];
              this.getOrderDetail();
              console.log(i, this.orderId);
              i += 1;
              if (i >= newlist.length) {
                clearInterval(this.startjob);
                this.startjob = null;
                this.isworking = true;
                console.log("结束了", i);
              }
            }, 2000);
          }
        })
        .catch((res) => {
          this.isworking = true;
          this.$notify({
            title: "失败",
            message: "因为" + res + "查询订单失败",
            type: "warning",
            duration: 2000,
          });
        });
    },
```

每隔10s，查询一次是否在工作中



但是存在一个问题，用setInterval存在延迟问题，然后如果延迟＋执行时间太长会造成一系列问题

从而引发我的思考，怎么通过定时器来实现链式调用呢？

```js
 setTimeout(function () {
           	console.log('干活啦');
            setTimeout(arguments.callee, 1000); //很关键的一步，使用arguments.callee调用函数自身。
        }, 1000);

```

这样能保证每次都间隔一秒执行
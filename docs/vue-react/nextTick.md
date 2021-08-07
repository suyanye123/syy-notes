# nextTick

> 定义: 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM

看完是不是有一堆问号？我们从中找出来产生问号的关键词

- 下次 DOM 更新循环结束之后?
- 执行延迟回调?
- 更新后的 DOM?

我们从上面三个疑问大胆猜想一下

- vue 更新DOM是有策略的，不是同步更新
- nextTick 可以接收一个函数做为入参
- nextTick 后能拿到最新的数据

好了，我们问题都抛出来了，先来看一下如何使用

```js
import { createApp, nextTick } from 'vue'
const app = createApp({
  setup() {
    const message = ref('Hello!')
    const changeMessage = async newMessage => {
      message.value = newMessage
      // 这里获取DOM的value是旧值
      await nextTick()
      // nextTick 后获取DOM的value是更新后的值
      console.log('Now DOM is updated')
    }
  }
})
```


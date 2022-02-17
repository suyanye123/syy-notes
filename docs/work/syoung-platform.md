# syoung-platform

### 难点及坑

#### 1.密码自动填充

> 设置autocomplete="off"在chrom中失效

```
问题：在表单的输入框中，有时候我们并不希望点击输入框时，会出现提示信息。这时，在输入框中添加属性:autocomplete="off”，一般能达到目的。而在chrom里面就失效。
失效的原因是：浏览器会根据输入框的input的type属性为password的时候，自动将用户名和密码框填充。

解决方法1：因为浏览器是否自动填充内容，根据type=password来判断的。此时先将作为密码的输入框的type设成text,当点击密码输入框的时候，将其type属性设为password,这样问题就解决了。

解决方法2：可以在不需要默认填写的input框中设置  autocomplete= "new-password"
```

```vue
 <el-input autocomplete="off"
                  v-model="modifyForm.confrimPassword"
                  :maxlength="18"
                  type="text"
                  :placeholder="$t('modifyPassword.placeholder.confirmPassword')"
                  @οnpaste="()=>{return false}"
                  @οncοntextmenu="()=>{return false}"
                  @οncοpy="''"
                  @oncut="''">
        </el-input>
```



#### 2.el-tree默认全选子节点

>  el-tree 半选状态的父节点 ，数据回显，子节点会变成全选 

element el tree 默认check-strictly 为false 也就是叶子节点和父节点是关联的状态 
所以返回的数据只要包含父节点 子节点全部选中
如果强制将check-strictly 设置为true 那我们在选在父节点的时候子节点的关联选中效果也就消失了
这种方法 不太好 所以：
逻辑：
1.获取需要返显的节点id
2.遍历 获取对应id的node
3.通过判断node isLeaf是否为子节点 true则设置选中效果

```js
 this.$nextTick(() => {
            this.checkedArr.forEach((i) => {
              //  获取对应id在el-tree上的节点，节点包含很多信息
              const node = this.$refs.tree.getNode(i)
              //判断是否是叶子节点
              if (node.isLeaf) {
                //只勾选叶子节点，当叶子节点勾满时父节点会联动自动选择
                // 接收三个参数(key/data, checked, deep)，1.勾选节点的key或data 2.节点是否选中 3.是否设置子节点，默认为false
                this.$refs.tree.setChecked(node, true)
              }
            })
          })
```




#### 3.crypto-js

```js
 // 加密算法
import CryptoJS from "crypto-js";
 showEncryptAES(str) {
    let key = "q2ck7h95a6vd3l2f";
    let iv = "q2ck7h95a6vd3l2f";
    let mode = "ECB";
    let pad = "Pkcs7";

    let options = {
      key: CryptoJS.enc.Utf8.parse(key),
      iv: CryptoJS.enc.Utf8.parse(iv || key),
      mode: CryptoJS.mode[mode],
      pad: CryptoJS.pad[pad]
    };

    str = CryptoJS.AES.encrypt(str, options.key, {
      iv: options.iv,
      mode: options.mode,
      padding: options.pad
    });

    str = str.toString();
    return str;
  },
```



#### 4.input 上传图片

input [file]标签的accept属性可用于指定上传文件的 MIME类型 。

例如，想要实现默认上传图片文件的代码，代码可如下：

```html
<input type="file" name="file" class="element" accept="image/*">
```

效果如下图所示，默认过滤掉所有非图片文件：

但是这段代码在Chrome和Safari等Webkit浏览器下却出现了响应滞慢的问题，可能要等 6~10s 才能弹出文件选择对话框。简直不能忍呀。

在IE和Firefox中使用 accept=”image/*” 属性则没有发现响应延迟的问题。

于是几经尝试后，发现是 accept=”image/*” 属性的问题，删掉它或者将 * 通配符修改为指定的MIME类型，就可以解决Webkit浏览器下的对话框显示滞慢的问题。

解决办法如下：

```html
<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
```


accept=”image/*”属性会对每一个文件都遍历一次所有的”image/*”文件类型，当文件较多时，文件的检验时间较长，这可能是Webkit的底层实现的bug。

另外，

accept=”audio/*”和 accept=”video/*” 属性 在 Webkit浏览器下也会有同样的响应延迟的问题。同理，通过将 * 通配符 修改成指定的MIME类型就可解决。

```js
   // 头像上传相关方法
    // 拍照
    showTakePhoto() {
      this.isShowTakePhoto = true
    },
    getTakePhoto(url, file) {
      this.fileToBase64(file).then((base64) => {
        this.$store.commit('CHANGE_LOADING', 1)
        this.base64 = base64
        this.$post(
          '/api/v1/face/detect',
          {
            image: base64,
          },
          this.$apis.faceService,
        )
          .then((res) => {
            this.$store.commit('CHANGE_LOADING', 0)
            if (res.status === 200) {
              this.$set(this.accountDetail, 'pictureUrl', res.data)
              this.$refs.personal_info_form.validateField(['selectProject'])
            } else {
              this.$message({
                message: res.message,
                type: 'warning',
              })
            }
          })
          .catch(() => {
            this.$store.commit('CHANGE_LOADING', 0)
          })
      })
    },
    fileToBase64(file) {
      this.$store.commit('CHANGE_LOADING', 1)
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          const result = e.target.result
          this.$store.commit('CHANGE_LOADING', 0)
          resolve(result)
        }
      })
    },
   // 上传图片
    localUpImage() {
      this.$refs.input.value = null
      this.$refs.input.click()
    },
    localChangeUpImage(e) {
      const [file] = e.target.files

      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        this.$post('/minio/upload', formData, this.$apis.orgUrl)
          .then((res) => {
            this.$store.commit('CHANGE_LOADING', 0)
            const { code, state, result } = res
            if (code === 200) {
              this.$set(this.accountDetail, 'pictureUrl', result)
              this.$refs.personal_info_form.validateField(['selectProject'])
            } else {
              this.$message({
                message: res.message,
                type: 'warning',
              })
            }
          })
          .catch(() => {
            this.$store.commit('CHANGE_LOADING', 0)
          })
        this.fileToBase64(file).then((base64) => {
          this.$store.commit('CHANGE_LOADING', 1)
          this.base64 = base64
          this.$post(
            '/api/v1/face/detect',
            {
              image: base64,
            },
            this.$apis.faceService,
          )
            .then((res) => {
              this.$store.commit('CHANGE_LOADING', 0)
              if (res.status === 200) {
                this.$set(this.accountDetail, 'pictureUrl', res.data)
                this.$refs.personal_info_form.validateField(['selectProject'])
              } else {
                this.$message({
                  message: res.message,
                  type: 'warning',
                })
              }
            })
            .catch(() => {
              this.$store.commit('CHANGE_LOADING', 0)
            })
        })
      }
    },
    // 预览+删除
    previewPhoto() {
      this.previewImages = [this.accountDetail.pictureUrl]
      this.photoPreview = true
    },
    deletePhoto() {
      this.accountDetail.pictureUrl = ''
    },
```



#### 5.表单校验

```js
  password: [
          // { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!this.accountDetail.id && !value) {
                callback(new Error('请输入密码'))
              } else {
                let reg =
                  /^(?![A-Za-z0-9]+$)(?![a-z0-9\[\]{}\|<>\,\/~;:\-=_!@#$%?^&*()+.]+$)(?![A-Za-z\[\]{}\|<>\,\/~;:\-=_!@#$%?^&*()+.]+$)(?![A-Z0-9\[\]{}\|<>\,\/~;:\-=_!@#$%?^&*()+.]+$)[a-zA-Z0-9\[\]{}\|<>\,\/~;:\-=_!@#$%?^&*()+.]{8,18}$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(
                    new Error(
                      '必须为8-18位且同时包含数字、大小写字母、特殊字符四种！',
                    ),
                  )
                }
              }
            },
            trigger: 'blur',
          },
        ],
```

#### 6.页面刷新created不执行

> 页面刷新created不执行

- 当使用路由参数时，多个路由绑定同一个组件，再切换页面时，因为多个路由都渲染同个组件，此时不会销毁再创建组件而是会复用组件，这也就导致路由参数发生变化，但是页面不会刷新的问题

解决办法：
可以通过vue-router 的钩子函数 beforeRouteEnter beforeRouteUpdate beforeRouteLeave 路由进入钩子

```js
beforeRouteEnter(to, from, next) {
// 在组件实例创建前调用
}

beforeRouteUpdate(to, from, next){
// 在当前路由改变，路由参数发生变化，组件被复用时调用
// 里面写获取刷新数据的方法
}
beforeRouteLeave(to, from, next) {
// 当离开当前组件对应的路由时调用
}
```

- 还有可能是因为在路由里设置了 keep-alive
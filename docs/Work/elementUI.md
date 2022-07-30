# element组件库相关

### 0.引入

```js
//el-ui引入 main.js
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";		//默认主题
Vue.use(ElementUI);
```

### 1.表单校验

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





### [v-if和:visible.sync的使用技巧](https://www.cnblogs.com/Leo-Do/p/13571368.html)

遇到点击按钮显示弹窗，输入部分数据后退出弹窗初始化弹窗信息的要求。

如果通过父子组件传数据的方式来实现就太麻烦了，可以通过结合v-if和:visible.sync的方式来实现：

其中，v-if控制元素的存在与否，:visible.sync控制el-dialog的显示，当我们退出弹窗时会销毁子组件的变量，实现子组件初始化，下次进入就不会携带上次输入的信息了。



### el-dialog被遮罩层挡住

1、在el-dialog标签中设置 :modal-append-to-body="false"，使遮罩层插入至 Dialog 的父元素上。

2、给position:fixed的父元素设置一个z-index，并且要比遮盖层的大。

3、el-dialog父元素不使用fixed定位。



### el-dialog 销毁子组件

```vue
 <el-dialog class="wap_con" title="入库登记" width="1000px" :destroy-on-close="true" :close-on-click-modal="false" :visible.sync="addVisible">
 </el-dialog>
```



### el-tree默认全选子节点

>  el-tree 半选状态的父节点 ，数据回显，子节点会变成全选 

element  el-tree 默认check-strictly 为false 也就是叶子节点和父节点是关联的状态 
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



### el-table 实现单选

https://www.cnblogs.com/badaoliumangqizhi/p/13427666.html

https://blog.csdn.net/weixin_38779534/article/details/103989320





### el-table 动态新增和删除一行

> 官方只提供了 el-form 的动态增删
>
> 所以这里通过el-form包裹 el-table 实现

```vue
<template>
	<div class="title1">设备信息</div>
      <el-form ref="baseForm" :model="addForm" :rules="rules" auto-complete="on">
        <el-table border style="width: 100%" ref="table-input" class="table" highlight-current-row :data="addForm.list">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="所属产品" show-overflow-tooltip align="center" min-width="180">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+scope.$index+'.spuId'" :rules="rules.spuId">
                <el-select v-model="scope.row.spuId" placeholder="请选择" clearable @change="selectSku">
                  <el-option v-for="item in skuList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column label="使用状态" show-overflow-tooltip align="center" min-width="180">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+scope.$index+'.useStatus'" :rules="rules.useStatus">
                <el-select v-model="scope.row.useStatus" placeholder="请选择" clearable @change="selectUseStatus">
                  <el-option v-for="item in useStatusList" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column label="设备编码" show-overflow-tooltip align="center" min-width="180">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+scope.$index+'.number'" :rules="rules.number">
                <el-input v-model="scope.row.number" placeholder="请输入设备编码" clearable
                  @focus="$refs.baseForm.clearValidate(`list.${scope.$index}.number`)"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column label="设备名称" show-overflow-tooltip align="center" min-width="180">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+scope.$index+'.name'" :rules="rules.name">
                <el-input v-model="scope.row.name" placeholder="请输入名称" clearable
                  @focus="$refs.baseForm.clearValidate(`list.${scope.$index}.name`)"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="" label="操作" align="center" class="handle" width="150" fixed="right">
            <template slot-scope="scope">
              <div>
                <el-link type="danger" :underline="false" @click="delLine(scope.row)">删除</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="btn_add">
          <el-link type="primary" @click="addLine()" :underline="false">添加</el-link>
        </div>
      </el-form>
</template>

<script>
data() {
    return {
       addForm: {
        accessory: "",
        contactName: "",
        contactPhone: "",
        depotId: '',
        operExplain: "",
        operStatus: "",
        operTime: "",
        type: "",
        list: [
          {
            useStatus: '',
            spuId: '',//产品id
            skuId: '',//设备id
            number: '', //设备编码
            name: '',//设备名称
            key: 0//
          }
        ]
      },  
    },
methods: {
	// 增加一个空行
    addLine() {
      const newLine =
      {
        useStatus: '',
        spuId: '',//产品id
        skuId: '',//设备id
        number: '', //设备编码
        name: '',//设备名称
        key: Date.now()
      }
      this.addForm.list.push(newLine)
    },
    // 删除指定行
    delLine(row){
          this.addForm.list = this.addForm.list.filter((ele) => {
          return ele.key !== row.key
    }
}
</script>
```


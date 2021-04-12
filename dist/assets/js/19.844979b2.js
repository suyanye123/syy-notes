(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{376:function(t,s,a){"use strict";a.r(s);var e=a(45),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"微信小程序业务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#微信小程序业务"}},[t._v("#")]),t._v(" 微信小程序业务")]),t._v(" "),a("h2",{attrs:{id:"一、实现scroll吸附贴顶效果"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、实现scroll吸附贴顶效果"}},[t._v("#")]),t._v(" 一、实现scroll吸附贴顶效果")]),t._v(" "),a("h5",{attrs:{id:"方法1-监听onpagescroll事件-滚动到指定位置添加fixed样式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法1-监听onpagescroll事件-滚动到指定位置添加fixed样式"}},[t._v("#")]),t._v(" 方法1.监听"),a("code",[t._v("onPageScroll")]),t._v("事件，滚动到指定位置添加fixed样式")]),t._v(" "),a("p",[t._v("在Vue中，监听滚动事件，打印当前的"),a("code",[t._v("scrollTop")]),t._v("\n首先，在mounted钩子中给window添加一个滚动滚动监听事件，")]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[t._v("mounted () {\n  window.addEventListener('scroll', this.handleScroll)\n},\n")])])]),a("p",[t._v("然后在方法中，添加这个"),a("code",[t._v("handleScroll")]),t._v("方法\n监听元素到顶部的距离 并判断滚动的距离如果大于了元素到顶部的距离时，设置"),a("code",[t._v("searchBar")]),t._v("为true,否则就是false")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handleScroll")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" scrollTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pageYOffset "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" offsetTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("querySelector")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#searchBar'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("offsetTop\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("scrollTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" offsetTop"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("searchBarFixed "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("searchBarFixed "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),a("p",[t._v("先写一个该元素固定到顶部的样式，"),a("code",[t._v("isFixed")]),t._v("\n然后将需要固定的元素的class与"),a("code",[t._v("searchBar")]),t._v("进行绑定，如果"),a("code",[t._v("searchBar")]),t._v("为true时，就应用这个"),a("code",[t._v("isFixed")]),t._v("样式")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("view "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"searchBar"')]),t._v(" id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"searchBar"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("p",[t._v("注意，如果离开该页面需要移除这个监听的事件，不然会报错。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("destroyed")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'scroll'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("handleScroll"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),a("h6",{attrs:{id:"存在问题-获取指定位置错误-因为上面都是图片-在图片未加载出来时获取高度-高度值不对-解决办法就是在imgae上加bindload事件-在图片加载加载完成之后再获取高度-onpagescroll事件会有延迟-导致最终效果会出现卡顿"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#存在问题-获取指定位置错误-因为上面都是图片-在图片未加载出来时获取高度-高度值不对-解决办法就是在imgae上加bindload事件-在图片加载加载完成之后再获取高度-onpagescroll事件会有延迟-导致最终效果会出现卡顿"}},[t._v("#")]),t._v(" 存在问题：获取指定位置错误，因为上面都是图片，在图片未加载出来时获取高度， 高度值不对，解决办法就是在"),a("code",[t._v("imgae")]),t._v("上加"),a("code",[t._v("bindload")]),t._v("事件，在图片加载加载完成之后再获取高度； "),a("code",[t._v("onPageScroll")]),t._v("事件会有延迟，导致最终效果会出现卡顿")]),t._v(" "),a("hr"),t._v(" "),a("h5",{attrs:{id:"方法2-通过position-sticky"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法2-通过position-sticky"}},[t._v("#")]),t._v(" 方法2.通过"),a("code",[t._v("position:sticky")])]),t._v(" "),a("p",[t._v("该元素并不脱离文档流，仍然保留元素原来在文档流中的位置；\n当元素在容器中被滚动超过指定的偏移值时，元素就会固定到容器的指定位置，也就是说如果元素设置设置"),a("code",[t._v("top:50px")]),t._v("那么在sticky元素滚动到距离相对定位元素的顶部"),a("code",[t._v("50px")]),t._v("时固定，不再向上移动；\n元素固定的相对偏移是相对于离他最近的具有滚动框的祖先元素，如果祖先元素都没有滚动框，那么就是相对于"),a("code",[t._v("viewport")]),t._v("来计算元素的偏移量")]),t._v(" "),a("h6",{attrs:{id:"tip-需要考虑父元素的高度的情况-sticky元素在到达父元素的底部时-则不会再发生定位-如果父元素并没有比sticky元素高-那么sticky元素一开始就到达了底部-就不会有定位的效果-当元素滚动到父元素的底部时sticky属性失效-如果父元素的overflow属性不是默认的visible-那么sticky属性不会生效"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tip-需要考虑父元素的高度的情况-sticky元素在到达父元素的底部时-则不会再发生定位-如果父元素并没有比sticky元素高-那么sticky元素一开始就到达了底部-就不会有定位的效果-当元素滚动到父元素的底部时sticky属性失效-如果父元素的overflow属性不是默认的visible-那么sticky属性不会生效"}},[t._v("#")]),t._v(" "),a("strong",[t._v("tip：需要考虑父元素的高度的情况，sticky元素在到达父元素的底部时，则不会再发生定位，如果父元素并没有比sticky元素高，那么sticky元素一开始就到达了底部，就不会有定位的效果，当元素滚动到父元素的底部时sticky属性失效，如果父元素的overflow属性不是默认的visible，那么sticky属性不会生效")])]),t._v(" "),a("p",[t._v("兼容性不是很好，只支持"),a("code",[t._v("FireFox")]),t._v("和"),a("code",[t._v("Safari")]),t._v("，移动端")]),t._v(" "),a("h2",{attrs:{id:"二、uniapp开通微信支付流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、uniapp开通微信支付流程"}},[t._v("#")]),t._v(" 二、uniapp开通微信支付流程")]),t._v(" "),a("h4",{attrs:{id:"_1-准备工作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-准备工作"}},[t._v("#")]),t._v(" 1.准备工作")]),t._v(" "),a("h5",{attrs:{id:"_1-开通商户-该步骤较为麻烦"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-开通商户-该步骤较为麻烦"}},[t._v("#")]),t._v(" （1）开通商户（该步骤较为麻烦）")]),t._v(" "),a("h5",{attrs:{id:"_2-微信公众平台-小程序认证-或者公众号认证"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-微信公众平台-小程序认证-或者公众号认证"}},[t._v("#")]),t._v(" （2）微信公众平台，小程序认证，或者公众号认证")]),t._v(" "),a("h5",{attrs:{id:"需填写各种信息-认证需要300元费用-认证很快"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#需填写各种信息-认证需要300元费用-认证很快"}},[t._v("#")]),t._v(" 需填写各种信息，认证需要300元费用，认证很快")]),t._v(" "),a("h5",{attrs:{id:"_3-开通小程序支付功能-appid绑定到商户"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-开通小程序支付功能-appid绑定到商户"}},[t._v("#")]),t._v(" （3）开通小程序支付功能，appid绑定到商户")]),t._v(" "),a("h6",{attrs:{id:"注意-个人类型的小程序无法开通支付功能-所以上一步小程序认证务必选择企业类型-提供企业经营证书及社会信用码等等"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#注意-个人类型的小程序无法开通支付功能-所以上一步小程序认证务必选择企业类型-提供企业经营证书及社会信用码等等"}},[t._v("#")]),t._v(" 注意：个人类型的小程序无法开通支付功能，所以上一步小程序认证务必选择企业类型，提供企业经营证书及社会信用码等等")]),t._v(" "),a("h4",{attrs:{id:"_2-前端代码实现"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-前端代码实现"}},[t._v("#")]),t._v(" 2.前端代码实现")]),t._v(" "),a("h5",{attrs:{id:"_1-发送商品信息-价格-小程序appid-opendi至后端-然后后端需返回如下参数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-发送商品信息-价格-小程序appid-opendi至后端-然后后端需返回如下参数"}},[t._v("#")]),t._v(" （1）发送商品信息，价格，小程序appid，opendi至后端，然后后端需返回如下参数")]),t._v(" "),a("h5",{attrs:{id:"_2-通过uni-request调起微信支付接口-代码如下"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-通过uni-request调起微信支付接口-代码如下"}},[t._v("#")]),t._v(" （2）通过uni.request调起微信支付接口，代码如下")])])}),[],!1,null,null,null);s.default=r.exports}}]);
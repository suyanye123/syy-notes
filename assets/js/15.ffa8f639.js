(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{386:function(t,s,a){"use strict";a.r(s);var e=a(28),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"前端小札-2-0-重构中"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前端小札-2-0-重构中"}},[t._v("#")]),t._v(" 前端小札 2.0（重构中）")]),t._v(" "),a("h2",{attrs:{id:"前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[t._v("#")]),t._v(" 前言")]),t._v(" "),a("h3",{attrs:{id:"vitepress-vite-vue-驱动的静态网站生成器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vitepress-vite-vue-驱动的静态网站生成器"}},[t._v("#")]),t._v(" "),a("a",{attrs:{href:"https://github.com/vuejs/vitepress",target:"_blank",rel:"noopener noreferrer"}},[t._v("VitePress"),a("OutboundLink")],1),t._v("：Vite & Vue 驱动的静态网站生成器")]),t._v(" "),a("p",[t._v("建议参考"),a("a",{attrs:{href:"https://vitepress.vuejs.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"vitepress新特性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vitepress新特性"}},[t._v("#")]),t._v(" VitePress新特性：")]),t._v(" "),a("p",[a("strong",[t._v("1. 使用Vue 3")])]),t._v(" "),a("p",[a("strong",[t._v("2. 在后台使用vite")])]),t._v(" "),a("ul",[a("li",[t._v("开发服务器启动更快")]),t._v(" "),a("li",[t._v("更快的热更新")]),t._v(" "),a("li",[t._v("更快的构建（内部使用汇总）")])]),t._v(" "),a("p",[a("strong",[t._v("3. 页面更轻")])]),t._v(" "),a("ul",[a("li",[t._v("不为每个请求的每个页面发送元数据。这将使页面权重与页面总数解耦。只发送当前页面的元数据。客户端导航会将新页面的组件和元数据一起获取。")]),t._v(" "),a("li",[t._v("Vue 3 tree-shaking + Rollup 代码分割。")]),t._v(" "),a("li",[t._v("不使用vue-router，因为VitePress的需求是非常简单和具体的--使用一个简单的自定义路由器（200LOC以下）来代替。")]),t._v(" "),a("li",[t._v("(WIP) i18n locale数据也要按需获取。")])]),t._v(" "),a("h3",{attrs:{id:"其他的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#其他的区别"}},[t._v("#")]),t._v(" 其他的区别")]),t._v(" "),a("p",[t._v("更多固定内容，可配置性更低。VitePress的目标是缩减当前VuePress的复杂性，并从极简主义的根源上重新出发。 面向未来：VitePress只针对支持原生ES模块导入的浏览器。它鼓励使用原生JavaScript和CSS变量进行主题设计。")]),t._v(" "),a("h2",{attrs:{id:"搭建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#搭建"}},[t._v("#")]),t._v(" 搭建")]),t._v(" "),a("h3",{attrs:{id:"定制化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#定制化"}},[t._v("#")]),t._v(" 定制化")]),t._v(" "),a("p",[t._v("可以通过.vitepress/config.js进行配置（见src/config.ts）。 您可以通过添加以下文件来开发您的自定义主题。")]),t._v(" "),a("h5",{attrs:{id:"layout-vue文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#layout-vue文件"}},[t._v("#")]),t._v(" Layout.vue文件")]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("h1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Custom Layout!"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("h1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Content")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- make sure to include markdown outlet --\x3e")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h5",{attrs:{id:"index-js文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#index-js文件"}},[t._v("#")]),t._v(" index.js文件")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Layout "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./Layout.vue'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  Layout"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("NotFound")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'custom 404'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// <- this is a Vue 3 functional component")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("enhanceApp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" router"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" siteData "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// app is the Vue 3 app instance from createApp()")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// router is VitePress' custom router (see `lib/app/router.js`)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// siteData is a ref of current site-level metadata.")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("与VuePress不同，在一个主题中唯一有固定位置的文件是index.js")]),t._v(" "),a("p",[t._v("其他的东西都是在那里导入和导出，就像在一个普通的应用程序中一样。")])])}),[],!1,null,null,null);s.default=n.exports}}]);
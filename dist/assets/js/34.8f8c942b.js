(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{419:function(t,a,e){"use strict";e.r(a);var r=e(28),s=Object(r.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"flutter"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#flutter"}},[t._v("#")]),t._v(" Flutter")]),t._v(" "),e("p",[t._v("年后入手了一款M1的macOS。")]),t._v(" "),e("p",[t._v("对于一个从来没用过Mac的人来说，一开始操作上的不适应是必然的，但是熟悉后还是真香。作为一名开发者，日常就是跑代码。就拿Node编译前端项目来说，比Windows快了可不是一点半点。")]),t._v(" "),e("p",[t._v("但是坑的就是所有你在Windows上常见的游戏、软件在Mac M1 上统统没有！")]),t._v(" "),e("p",[t._v("好了，言归正传，今天记录下M1芯片的Mac搭建 flutter 开发环境全过程：")]),t._v(" "),e("h2",{attrs:{id:"开发环境搭建准备工作"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#开发环境搭建准备工作"}},[t._v("#")]),t._v(" 开发环境搭建准备工作：")]),t._v(" "),e("p",[t._v("chrome、vs code（安装 flutter 插件）、Git。")]),t._v(" "),e("h2",{attrs:{id:"_1、flutter-安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1、flutter-安装"}},[t._v("#")]),t._v(" 1、flutter 安装")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//flutter.dev/docs/development/tools/sdk/releases%3Ftab%3Dmacos%23macos",target:"_blank",rel:"noopener noreferrer"}},[t._v("Flutter SDK releasesflutter.dev"),e("img",{attrs:{src:"https://pic4.zhimg.com/v2-d744440971931f937269e060e720f5a7_180x120.jpg",alt:"图标"}}),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("打开官网下载页，找到 macOS ，点击最新的版本下载：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-94b099e50f9731d3bbeb6cb9dde91082_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("下载完成解压会得到一个 flutter 文件夹。好了，这就是 flutter。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic4.zhimg.com/80/v2-fa7e6cbbdca9fdd69b7a11e7efdb99b3_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[e("strong",[t._v("PS：虽然 flutter 是使用 dart 语言开发，但是在使用 flutter 时并不需要安装 dart。")])]),t._v(" "),e("p",[t._v("将 flutter 放在一个文件夹里，我这里放在 Document 里了。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic4.zhimg.com/80/v2-0a3888fdc1588fa9a43f17a184e3ac73_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("这时候打开终端执行：")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("ln -s /Users/yinchengnuo/Documents/flutter/bin/flutter /usr/local/bin\n")])])]),e("p",[t._v("记得把 yinchengnuo 换成你自己的名字。")]),t._v(" "),e("p",[t._v("再执行：")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("flutter\n")])])]),e("p",[t._v("出现：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-bb3d34bed2bb4477ef83a6d9a0ba6ebe_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("就表示 flutter 安装成功。")]),t._v(" "),e("p",[e("strong",[t._v("PS：ls 那步是因为环境变量设置无效所以才将 flutter 设置成软连接的。官网上面一大堆环境变量设置其实都不是必须的，不必照做。")])]),t._v(" "),e("h2",{attrs:{id:"_2、安装xcode"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2、安装xcode"}},[t._v("#")]),t._v(" "),e("strong",[t._v("2、安装Xcode")])]),t._v(" "),e("p",[t._v("打开 App Store 搜索 Xcode 点击安装就行了。不过就是有点大，十来个G。")]),t._v(" "),e("h2",{attrs:{id:"_3、安装android-studio"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3、安装android-studio"}},[t._v("#")]),t._v(" 3、安装Android Studio")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//developer.android.google.cn/studio/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Download Android Studio and SDK tools | Android Developersdeveloper.android.google.cn"),e("img",{attrs:{src:"https://pic1.zhimg.com/v2-69c1b147e44fe5ecbe21e8f4ec04248c_180x120.jpg",alt:"图标"}}),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("点击下载即可。完成安装打开：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic4.zhimg.com/80/v2-9f0e7efa3f44e521ca4593da570b8e1f_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("点 Cancel，然后 Next：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic4.zhimg.com/80/v2-94a017e0f76710bf8fa9534bd3709463_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("Next：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic1.zhimg.com/80/v2-a1082eae6da867130f7230790d541aa8_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("Finnish：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-c1149706d61e3320e6b878f86d9b11b2_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("Android Studio 会自动安装 Android 开发 SDK，等待即可：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic1.zhimg.com/80/v2-8d1ff068c83b1b94dbc42baeb99797a0_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("Finish：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic4.zhimg.com/80/v2-e567f1dd42f36921410d75463afaf4c7_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("安装 Flutter、Dart 插件：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic1.zhimg.com/80/v2-41603f0ef1d4651a6176d0819c5cba60_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic1.zhimg.com/80/v2-fe5888276b3bf9432d01670d305bbf3c_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("Android Studio 就安装好了。")]),t._v(" "),e("h2",{attrs:{id:"_4、安装-android-licenses"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4、安装-android-licenses"}},[t._v("#")]),t._v(" 4、安装 "),e("strong",[t._v("android-licenses")])]),t._v(" "),e("p",[t._v("终端执行：")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("flutter doctor --android-licenses\n")])])]),e("p",[t._v("一路输入：y")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-228275d61b7ff9f1c181d8b862ebe01e_720w.jpg",alt:"img"}})]),t._v(" "),e("h2",{attrs:{id:"_5、安装-xcode-包管理工具"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5、安装-xcode-包管理工具"}},[t._v("#")]),t._v(" 5、安装 Xcode 包管理工具")]),t._v(" "),e("p",[t._v("终端执行：")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("sudo gem install cocoapods  \n")])])]),e("p",[t._v("即可：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic2.zhimg.com/80/v2-9d65d18a2dfc01cd5cf431dced3faddd_720w.jpg",alt:"img"}})]),t._v(" "),e("h2",{attrs:{id:"_6、安装手机模拟器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6、安装手机模拟器"}},[t._v("#")]),t._v(" 6、安装手机模拟器")]),t._v(" "),e("p",[t._v("Xcode 自带 IOS 模拟器就不说了。问题出在安卓模拟器，之前用 Windows 搭建 flutter 环境都是在 Android Studio AVD 管理里面自己装安卓模拟器，再不济也是去装个什么腾讯模拟器、夜神模拟器啥的。但是在 M1 芯片的 macOS 上统统没有，如果是 inter 芯片的可以试试。好在谷歌也注意到这个问题了，给了一个 M1 芯片上可以运行的安卓模拟器：")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//github.com/google/android-emulator-m1-preview",target:"_blank",rel:"noopener noreferrer"}},[t._v("google/android-emulator-m1-previewgithub.com"),e("img",{attrs:{src:"https://pic2.zhimg.com/v2-175fbd6a09c7e20ffe00ed68889096fd_180x120.jpg",alt:"图标"}}),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("安装即可：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic1.zhimg.com/80/v2-049277ced100fc33f0f76484b3ba4194_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("至此，flutter 环境搭建完毕。")]),t._v(" "),e("p",[t._v("终端执行：")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("flutter doctor\n")])])]),e("p",[t._v("检查：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-a9c7800fe1c51868aed7444a342c425e_720w.jpg",alt:"img"}})]),t._v(" "),e("h2",{attrs:{id:"_7、创建一个项目"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7、创建一个项目"}},[t._v("#")]),t._v(" 7、创建一个项目：")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("flutter create a_flutter\n")])])]),e("p",[e("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-17d4423084cbb663907b27e572cbc68e_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("8、运行项目：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic4.zhimg.com/80/v2-db4c0f2b83eee241a91a75abd32d2bbf_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("打开安卓模拟器后，选择设备：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic2.zhimg.com/80/v2-da53b07f272d149dc49cd441b84148d5_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("调试运行：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-10172bcc1648354e69a09216d8af12ea_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("首次运行会有点久：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-40d51f197cc9d95d5abec6441648b166_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("运行成功！安卓效果：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-c96d397fae1399cc137471c8631b3ca6_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("IOS效果：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-cb955d6827c24352055a45a1588d4752_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("web效果：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://pic1.zhimg.com/80/v2-d8c53705f8c18bed1bffc27af9cea4a0_720w.jpg",alt:"img"}})]),t._v(" "),e("p",[t._v("完！")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/366471261",target:"_blank",rel:"noopener noreferrer"}},[t._v("转自知乎"),e("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=s.exports}}]);
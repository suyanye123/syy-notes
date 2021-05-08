/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "fc637e56ce73f0aa5d80aaf18d03bcd5"
  },
  {
    "url": "assets/css/0.styles.fa044e56.css",
    "revision": "d3cb707888ffe376ecee31722655d62d"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/vue1.73016055.png",
    "revision": "730160552a2435ff54cb36dc1ec8837b"
  },
  {
    "url": "assets/img/vue2.5fc2b350.png",
    "revision": "5fc2b35060bd17e3607908b835aff606"
  },
  {
    "url": "assets/img/vue3.fed2f138.png",
    "revision": "fed2f138c308f1049cebc8743e7ed65d"
  },
  {
    "url": "assets/img/wxpay.e9f478ad.png",
    "revision": "e9f478ad2271a95f158b7335d1a057a4"
  },
  {
    "url": "assets/js/10.19367d5d.js",
    "revision": "6b63072b377f2404ce947d885838873c"
  },
  {
    "url": "assets/js/11.c34f8b47.js",
    "revision": "b7d6b9c4c40ee0c08209d7a889ef19fa"
  },
  {
    "url": "assets/js/12.d48014c8.js",
    "revision": "014b6bdf359f8e520e82daaf3a81ba35"
  },
  {
    "url": "assets/js/13.3d2dc2f2.js",
    "revision": "841ca2de66f0a2853dcffbf3c0d68720"
  },
  {
    "url": "assets/js/14.97578afe.js",
    "revision": "7a2a5baf3b707468af8b793ac2f22ddb"
  },
  {
    "url": "assets/js/15.809c69c4.js",
    "revision": "4bc4a568599d588514849ae53a4ea67c"
  },
  {
    "url": "assets/js/16.f43cadb1.js",
    "revision": "013f3db5141f7e7d09fb875a8fb46421"
  },
  {
    "url": "assets/js/17.e1d58c8a.js",
    "revision": "d640a4caf47d682de2d2375106616492"
  },
  {
    "url": "assets/js/18.0821f293.js",
    "revision": "fd22e7531dd6f1c91953ba2966bbb0c9"
  },
  {
    "url": "assets/js/19.78a7a63a.js",
    "revision": "ecaa32a59f21cfca0147c4efbe4f0d45"
  },
  {
    "url": "assets/js/2.10f82196.js",
    "revision": "795402f5e66248de9a640b27d68d74d9"
  },
  {
    "url": "assets/js/20.be8a88ab.js",
    "revision": "cb525966e5a11f1d9110b1742b1366bc"
  },
  {
    "url": "assets/js/21.1936f15f.js",
    "revision": "21c879de65285bd0fece5b5b9374c927"
  },
  {
    "url": "assets/js/22.2f33caed.js",
    "revision": "766539ff8625b55b13fbd4433007154d"
  },
  {
    "url": "assets/js/23.a26d5a8a.js",
    "revision": "76dad135fbfb00fb754d97e159eb27d1"
  },
  {
    "url": "assets/js/24.a6680db2.js",
    "revision": "d9465248263acc47dce74cc5895c8319"
  },
  {
    "url": "assets/js/25.bcfec90c.js",
    "revision": "49ef562783e1ac646dead09490690400"
  },
  {
    "url": "assets/js/26.09d0040b.js",
    "revision": "9e6d7a44fe15a75b6bba0701fa7a2006"
  },
  {
    "url": "assets/js/27.0388c595.js",
    "revision": "3b4afdf881c0d84a6aa8f7eab5826524"
  },
  {
    "url": "assets/js/28.b76628d8.js",
    "revision": "b49b1a40cb5a8bd07bb35314ff98d30a"
  },
  {
    "url": "assets/js/29.cbf0b277.js",
    "revision": "9f3e6fb47b3a48d7ce684c5bb4795322"
  },
  {
    "url": "assets/js/3.18cce45a.js",
    "revision": "e1568728d306fed5e57434024e5734bf"
  },
  {
    "url": "assets/js/30.434f7017.js",
    "revision": "6f59d65b0ef03f6cecddc96c1d0d2a71"
  },
  {
    "url": "assets/js/31.c75de533.js",
    "revision": "2423dc44e5bc903ec5672dd1ac0eb5e0"
  },
  {
    "url": "assets/js/32.61bf91ca.js",
    "revision": "3c43afcdbdb12e8466b2abf6a8df4cc7"
  },
  {
    "url": "assets/js/33.607b4337.js",
    "revision": "de321e41df63b8bbdff0283ab8f4ab73"
  },
  {
    "url": "assets/js/34.2278a201.js",
    "revision": "ddfcc870fe502474b9c86c3de070558b"
  },
  {
    "url": "assets/js/35.c688f4f7.js",
    "revision": "b225e03b1d2b1fae03d917830087d870"
  },
  {
    "url": "assets/js/36.1a50664f.js",
    "revision": "1f9f5994dfaf04937a1efe57b39a76b3"
  },
  {
    "url": "assets/js/37.ea8a9660.js",
    "revision": "c321bbc09c79433d0d11ce81ef681b08"
  },
  {
    "url": "assets/js/38.1053fe3d.js",
    "revision": "40f098a026cf99c026f6156723636311"
  },
  {
    "url": "assets/js/39.89156c8c.js",
    "revision": "7edee1a2331c51e99424ab4d4a409ce9"
  },
  {
    "url": "assets/js/4.1562b0a8.js",
    "revision": "fac3b91c06c6a40f9d64c8c695778d0d"
  },
  {
    "url": "assets/js/40.166c6525.js",
    "revision": "90af1a6f9eb3d35510c91da780a8c702"
  },
  {
    "url": "assets/js/5.d48f1ed8.js",
    "revision": "76aa72b4634120ef9120acb61e036dba"
  },
  {
    "url": "assets/js/6.c4f7e7dd.js",
    "revision": "4e126785b6ac27335a9558e9a9226565"
  },
  {
    "url": "assets/js/7.42403252.js",
    "revision": "95989333669bd9f355dea40c4719f23c"
  },
  {
    "url": "assets/js/8.4e11346a.js",
    "revision": "aa91d71d7eba4d8829ed10bfc7d54009"
  },
  {
    "url": "assets/js/9.f8950735.js",
    "revision": "80500b9083566f71da03c565e74f9c99"
  },
  {
    "url": "assets/js/app.4add9f6f.js",
    "revision": "347346a06147f9fc854e9d663c626de2"
  },
  {
    "url": "css/canvas.html",
    "revision": "7ddd62ae2b2d0573af0a1cf27ca22edb"
  },
  {
    "url": "css/layout.html",
    "revision": "e379c397ca02bd286a1219fcd3063636"
  },
  {
    "url": "css/others.html",
    "revision": "6ca27d158445ec4062bd5dc41f70715e"
  },
  {
    "url": "css/xuanran.html",
    "revision": "219b6a0a15ea082f8f1f4b9018e74382"
  },
  {
    "url": "demo/index.html",
    "revision": "80f986b32f4121aca01822b9f236cacf"
  },
  {
    "url": "demo/suUI.html",
    "revision": "46200827004a59b4d088c6cee7a1784e"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "e786636e63cdf57f98dd4ac9d6819aa7"
  },
  {
    "url": "demo/yanye.html",
    "revision": "643d5b4780059f6d7039b133ada1dfc6"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "12f1f5d8e11a21d50c55800e17db77a6"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "145a5db3b347fa04f8854ad7dfe20e25"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "d498ac4bfe6bc27fe7fefbdca0cbeea7"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "ef1da1f4f2f868c86fb15c7b6bb18a1a"
  },
  {
    "url": "git/index.html",
    "revision": "ac8cf6327449fa69b66979627fd22aa3"
  },
  {
    "url": "index.html",
    "revision": "78705fe0aeab7ca7ba703b948c094739"
  },
  {
    "url": "introduce/index.html",
    "revision": "3d137d2a2f2df0598413b66ca5875bbf"
  },
  {
    "url": "js/axios.html",
    "revision": "cea28d8f541d8ce9ab50fbd37ff7682f"
  },
  {
    "url": "js/basic.html",
    "revision": "c9a219b3f567cdbb01e031807af5e141"
  },
  {
    "url": "js/promise.html",
    "revision": "22cb4391e8f8359c06fff35e6defaf1f"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "fd962c13100027ac86a6534863d6d3e4"
  },
  {
    "url": "uniapp/index.html",
    "revision": "db81e1d05aba2ad9792cb83d2517d276"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "386eedb2d27c07b62f7da732f0387015"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "74e2115986af847c99f831986c4bf80c"
  },
  {
    "url": "utils/index.html",
    "revision": "5832274f3f6c126dcc00c7965059db2b"
  },
  {
    "url": "utils/regexp.html",
    "revision": "0b3b1c70a5aeb10e0f16f015c64a6ec0"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "ef73e11e0e78d3aa3264aeb67c3d21e6"
  },
  {
    "url": "vue/diff.html",
    "revision": "161d5a3d9ab5020ae2c55ad1f99deb39"
  },
  {
    "url": "vue/props.html",
    "revision": "cba181f05b6bd495e217d1cef0e80c7f"
  },
  {
    "url": "vue/webpack.html",
    "revision": "64217ed1f884911272ae052cfc54c4c3"
  },
  {
    "url": "webGL/index.html",
    "revision": "e57992c7146428ed49e33898e4278da9"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "f6d582fff3b00ef60266c615834c267a"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "0e702994abb510d4f329b081dee85242"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})

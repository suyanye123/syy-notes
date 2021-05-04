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
    "revision": "aff1f80920af9abfd94b07a996cd07cb"
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
    "url": "assets/js/19.5afc3939.js",
    "revision": "6f8836e4c726ee5352285fa2d7a50571"
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
    "url": "assets/js/21.f5410b90.js",
    "revision": "d656a84d17f0aa1d2c100c5cdb224fe3"
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
    "url": "assets/js/28.82dd17da.js",
    "revision": "8ab6f05e0e5cb6a75ace700849a56d2f"
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
    "url": "assets/js/39.e353f90d.js",
    "revision": "22bc54e54c844ea3033b115fb5a3be02"
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
    "url": "assets/js/app.9eab593c.js",
    "revision": "2744827c354e35c293c292ae7b3f1eb0"
  },
  {
    "url": "css/canvas.html",
    "revision": "81e7dcbef14351922ffadd425654f837"
  },
  {
    "url": "css/layout.html",
    "revision": "e5f5c86c525bf733228dc12668345e8d"
  },
  {
    "url": "css/others.html",
    "revision": "0ab8ff71d41b4847919708bc99dff327"
  },
  {
    "url": "css/xuanran.html",
    "revision": "d5d9055550a7d7b0e442494efe1db125"
  },
  {
    "url": "demo/index.html",
    "revision": "56cfc9d41c461b0621feb8ed56c43c21"
  },
  {
    "url": "demo/suUI.html",
    "revision": "f7ceff506d848f08d34ae250ce48fda4"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "8227d79714836af92a9dadb9f1610210"
  },
  {
    "url": "demo/yanye.html",
    "revision": "169832c0c8ef65a419075baef7654615"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "4eeb4938c9603cd155bb7127cd71a643"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "2f3a35b3171e87938fe9ec2e1beba304"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "6c19c390fa5099eda6b9c1a290b1de80"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "28070fd8e28d1fe8e3cbf3f627696a25"
  },
  {
    "url": "git/index.html",
    "revision": "b1388e24c407e17c8436da13e5b26ceb"
  },
  {
    "url": "index.html",
    "revision": "1ede87fab1ede1ad9569de0ad6076161"
  },
  {
    "url": "introduce/index.html",
    "revision": "f09843763ab7229dd3ba5a84b92b54a1"
  },
  {
    "url": "js/axios.html",
    "revision": "8c8c2a9fa09cf3b07a8dce2eafb1c813"
  },
  {
    "url": "js/basic.html",
    "revision": "0c884853fdbf0c5b6c8d004d1158d4e9"
  },
  {
    "url": "js/promise.html",
    "revision": "2b76a034fbdeb9e32d7c219db2ecd0e8"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "04482ec5fc9bf8481ab8a7496957f0fb"
  },
  {
    "url": "uniapp/index.html",
    "revision": "3998c1bbc040b881afb1640eeea21109"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "e3afd69b99a0b4fd0e7f978eb2b27fbc"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "0b563ae8da42da3bbcbccbb48d15d6db"
  },
  {
    "url": "utils/index.html",
    "revision": "fbff4485385a215a6f2241152c6f7624"
  },
  {
    "url": "utils/regexp.html",
    "revision": "fe3d23f8416dfc132d9b6f30801c55cf"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "cfdd81f6fed536d1fb29a9760ba0c9d4"
  },
  {
    "url": "vue/diff.html",
    "revision": "4b1a3a97a925302009e5e557dce78206"
  },
  {
    "url": "vue/props.html",
    "revision": "12586a804154bfd606fc8d00577f5d5f"
  },
  {
    "url": "vue/webpack.html",
    "revision": "44ebc8259b4f5d22cf5274e3243bbd35"
  },
  {
    "url": "webGL/index.html",
    "revision": "a556304953fd2a8f0ddfbd8c3663a68a"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "c0919eb15849df74e3b4cc22ef0b8d49"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "ca2d52ff5b87e2fdc93a99c26c775504"
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

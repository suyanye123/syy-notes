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
    "revision": "8c1b4779ce37f5b905643a5991805a53"
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
    "url": "assets/js/app.7e6773bb.js",
    "revision": "5f7c829800be5d35fa6238ba59201292"
  },
  {
    "url": "css/canvas.html",
    "revision": "222cd149e4f64dbf2b2e19c48e7caaa8"
  },
  {
    "url": "css/layout.html",
    "revision": "415003b14114f108b7d693a8b565e88a"
  },
  {
    "url": "css/others.html",
    "revision": "30cf608b7068d22c325983f2c5fb4a16"
  },
  {
    "url": "css/xuanran.html",
    "revision": "f9d0ceb84f880fa94875c317dfc9bfbf"
  },
  {
    "url": "demo/index.html",
    "revision": "76f15970e11a656fc58e41c9874258bf"
  },
  {
    "url": "demo/suUI.html",
    "revision": "f67e480413cea24c68c9bf45bb4077e1"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "82a7b3af1e563955fa8927fcbe9f0fd6"
  },
  {
    "url": "demo/yanye.html",
    "revision": "5f6f8e77cf2224730f63f2764e683033"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "2e2b3783ee40a46fc719241ad7027225"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "c15cdd65ced0c1a90ebbe8cf9d91870c"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "565889476d26a7dae3a3e631bbcaeee6"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "3106f084fcae7380d6b0349cc860e546"
  },
  {
    "url": "git/index.html",
    "revision": "a1d9500a694b7a11b51f5794ec02f4bc"
  },
  {
    "url": "index.html",
    "revision": "6f191e1df0fe2078d6453859e2254238"
  },
  {
    "url": "introduce/index.html",
    "revision": "27e501939a2808afcb2d6965039ed617"
  },
  {
    "url": "js/axios.html",
    "revision": "609c9646682fba04d8d0a8544800be9f"
  },
  {
    "url": "js/basic.html",
    "revision": "752bb38c78ff805f94e55783f73b04d3"
  },
  {
    "url": "js/promise.html",
    "revision": "869c8df3f86e55f747784c12a4116135"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "dc109e15f2115a73f2f220fe76f29b1a"
  },
  {
    "url": "uniapp/index.html",
    "revision": "e43e4e7b9e91a766472cfe9c92aaa2a3"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "be60ba1b469560007b14fffddf216884"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "1e56b6bf7cc98119e815b38de72d8ca3"
  },
  {
    "url": "utils/index.html",
    "revision": "688b40f08a77a9df08ba5dcd4b61b82c"
  },
  {
    "url": "utils/regexp.html",
    "revision": "a466db004787d4ac041fff3fa5428688"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "cc4b2dcab6332954d79e13edd823d6cc"
  },
  {
    "url": "vue/diff.html",
    "revision": "a3da3c2bc464f8f1a739366b0c744606"
  },
  {
    "url": "vue/props.html",
    "revision": "758f7463f5a7a90eeacae43f7ad9e9f9"
  },
  {
    "url": "vue/webpack.html",
    "revision": "0da4b47d04d722a0676458fc3c1c7815"
  },
  {
    "url": "webGL/index.html",
    "revision": "1f2df24e87e420b0a7c19721e03a0516"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "44e58f8f4bec8a905aff34b987d2cfe3"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "d2fc8522a986db63849a49404d1e3bdb"
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

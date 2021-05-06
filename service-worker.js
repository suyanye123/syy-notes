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
    "revision": "bfc34091afead220a357eeabdb09155d"
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
    "url": "assets/js/21.fd709f27.js",
    "revision": "93bd242aeedc64914b6aba69ba704797"
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
    "url": "assets/js/app.0784b767.js",
    "revision": "4721686ac2976806d9abf9a56c9760db"
  },
  {
    "url": "css/canvas.html",
    "revision": "d4e9c7a6d6166bde5a6170a01b5070a2"
  },
  {
    "url": "css/layout.html",
    "revision": "1a2f6e9fd9737288d37f47d29201c360"
  },
  {
    "url": "css/others.html",
    "revision": "fa61599ffb6dd90cd05e5d3138db7ef8"
  },
  {
    "url": "css/xuanran.html",
    "revision": "dc08e8384335e0f36bb5e09ee1bb6d69"
  },
  {
    "url": "demo/index.html",
    "revision": "3e9abfe0210eb1959e579bc736e1e834"
  },
  {
    "url": "demo/suUI.html",
    "revision": "70af7f803fcf7fd68c01cecc7083cb47"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "adc233c37b18306a574c3a3bb20601e0"
  },
  {
    "url": "demo/yanye.html",
    "revision": "3ea796c38419b710d131538d531d5233"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "203c1d94e0fe2136410e19143dc55262"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "99b68bbe07af062f270f0d87dcd0e65c"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "ba4a739cc03dda58b108f700d1bdf098"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "f95e8550f0aa0d25b5a81f78bc390d71"
  },
  {
    "url": "git/index.html",
    "revision": "40f3edacfda3b1b12fa4a2ae7cad4d5d"
  },
  {
    "url": "index.html",
    "revision": "1da82f5b92681edde94c032d7682a0e2"
  },
  {
    "url": "introduce/index.html",
    "revision": "05aba4b21eaf758b2f6120cb4212457c"
  },
  {
    "url": "js/axios.html",
    "revision": "b0f05b7fe2651dd6a1c9f7b738f6c4d9"
  },
  {
    "url": "js/basic.html",
    "revision": "5b0fb02fc1225376e7cd22e5d7bb92ad"
  },
  {
    "url": "js/promise.html",
    "revision": "bd5f8a80f11b592250bdc7b41355a13b"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "478d373d8892c63290ca804ad874889e"
  },
  {
    "url": "uniapp/index.html",
    "revision": "d97b55275293a00a10564f78cbe102e8"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "ffcd9bebc954301ada805851e2b3e25f"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "6013d9fe214f0142882e969222868643"
  },
  {
    "url": "utils/index.html",
    "revision": "4988c44b27422a225115228e8b1397bc"
  },
  {
    "url": "utils/regexp.html",
    "revision": "2020daadf02a00750b43603c80953826"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "d1147e61a6f88ba40e953d12c3d25360"
  },
  {
    "url": "vue/diff.html",
    "revision": "240e5a957e7f4a231c065abe92eae509"
  },
  {
    "url": "vue/props.html",
    "revision": "06cd62c4c239b28457674155beea7c59"
  },
  {
    "url": "vue/webpack.html",
    "revision": "7f2f414eedf7ecc6903d5d3334c403ce"
  },
  {
    "url": "webGL/index.html",
    "revision": "f228e0da93f87833bee9f59247bb1af5"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "1b4b6f70b05733469c0bb4cfbd0bddda"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "815b802dd5676b4a6626dc81f4bb821b"
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

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
    "revision": "07c9a20186a4632903c5645b146ef152"
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
    "url": "assets/js/12.261ab641.js",
    "revision": "9573417d128e322d3df63705c076b6d0"
  },
  {
    "url": "assets/js/13.c6baa113.js",
    "revision": "d4002b34cc860408807f19f95a2e0fb3"
  },
  {
    "url": "assets/js/14.6d1e15f4.js",
    "revision": "84bab582cd7bed4205633d23b87a8720"
  },
  {
    "url": "assets/js/15.0aa4108c.js",
    "revision": "f7c92f14de8d8be6f1f71ac1fe6932fb"
  },
  {
    "url": "assets/js/16.b156def9.js",
    "revision": "66da80b15bbc8ac742bbcb93acce280a"
  },
  {
    "url": "assets/js/17.0e302b47.js",
    "revision": "0f7c4ce7cfd330f4165b2d71b14a1253"
  },
  {
    "url": "assets/js/18.5b9faec3.js",
    "revision": "228828cb2105f442d31d6835447c1afc"
  },
  {
    "url": "assets/js/19.ff8dc3b4.js",
    "revision": "142af2d3795608b907c84b3aeab6c781"
  },
  {
    "url": "assets/js/2.10f82196.js",
    "revision": "795402f5e66248de9a640b27d68d74d9"
  },
  {
    "url": "assets/js/20.19024c12.js",
    "revision": "3d2198e1c7428baa66c0434090e93afc"
  },
  {
    "url": "assets/js/21.62ddc82b.js",
    "revision": "ed8012dcab6d4292f2098c098daf053e"
  },
  {
    "url": "assets/js/22.683c84a8.js",
    "revision": "6f52cd3e59604d88fa6552f51312d403"
  },
  {
    "url": "assets/js/23.60e09e36.js",
    "revision": "a1cc89f8d45f4de9f37e6b692e556afe"
  },
  {
    "url": "assets/js/24.eab0b905.js",
    "revision": "c82930f4347923743096d76d3ec82d3b"
  },
  {
    "url": "assets/js/25.c1f2cb0b.js",
    "revision": "3d42389993746bc27d893091e94ece5e"
  },
  {
    "url": "assets/js/26.12cc21ed.js",
    "revision": "7ca25977e156a67c663e20aec5696c09"
  },
  {
    "url": "assets/js/27.af20d861.js",
    "revision": "4e106f161b92b6ab47b3d3dcc3da5916"
  },
  {
    "url": "assets/js/28.a86fe0e9.js",
    "revision": "7923fb3895a7b89a63dfda6f0fa02310"
  },
  {
    "url": "assets/js/29.ab4b4ff9.js",
    "revision": "df5a60711d384bf509ab62c28a679a49"
  },
  {
    "url": "assets/js/3.3f4ac3dc.js",
    "revision": "55f5efbe43a62a85172f46661c21f814"
  },
  {
    "url": "assets/js/30.f4c4c07a.js",
    "revision": "c7162714d0792aff6278719bebdd77d8"
  },
  {
    "url": "assets/js/31.ac00f559.js",
    "revision": "a9c3f4eb523b1f9cf57820bab4d36bd0"
  },
  {
    "url": "assets/js/4.1562b0a8.js",
    "revision": "fac3b91c06c6a40f9d64c8c695778d0d"
  },
  {
    "url": "assets/js/5.87ef2bb9.js",
    "revision": "64b22f4aa829b936c5f1fa46f64f1f96"
  },
  {
    "url": "assets/js/6.aae53f1b.js",
    "revision": "d734b5f52ead47d3895618a00d94e4e6"
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
    "url": "assets/js/9.7a9617bc.js",
    "revision": "aab0c95364eae9306408c84a49328260"
  },
  {
    "url": "assets/js/app.1821583d.js",
    "revision": "5c0a8251259a3bd68832c57ac0bd767d"
  },
  {
    "url": "css/flex.html",
    "revision": "dd798027e2a35af9904aa8e15a8ff02a"
  },
  {
    "url": "css/index.html",
    "revision": "698f1d688827b32dc2e9b7e265593ee9"
  },
  {
    "url": "demo/index.html",
    "revision": "e023db97e75d70ee9013ae8a312c0154"
  },
  {
    "url": "demo/suUI.html",
    "revision": "8871603dfe7f046714f0d7bd56a1d833"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "b1f5dd3553bf54147a276ea59413c992"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "f58c2daf3b15e36b2b281432dcb2f50e"
  },
  {
    "url": "git/index.html",
    "revision": "6a8005c99ce057226ea5513e24d85361"
  },
  {
    "url": "index.html",
    "revision": "224a7cb743ae16a5be1cac24f420494b"
  },
  {
    "url": "interview/more.html",
    "revision": "ad882b4ef7f9d41f9d321a9201a1283a"
  },
  {
    "url": "interview/quest.html",
    "revision": "dbd2f8255f15eb3d7ba994b655487bd7"
  },
  {
    "url": "introduce/index.html",
    "revision": "df3afa0c04aef6507b27b100d4600070"
  },
  {
    "url": "js/axios.html",
    "revision": "46cb2b396595a14f2f87fd9cfbd103af"
  },
  {
    "url": "js/http.html",
    "revision": "ae31a4673abf9a4ea76d17de7473f14d"
  },
  {
    "url": "js/promise.html",
    "revision": "a83b4e613fa17defb13defbf502f0aa3"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "37a13e88f1e04c0e771599ac779d9fe1"
  },
  {
    "url": "react/index.html",
    "revision": "1ebc7d518786e62205714cb0d2d9eb2e"
  },
  {
    "url": "uniapp/index.html",
    "revision": "adbe938d7d83b331f712340eee520279"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "784ff7e2ea20afe903d29a394f10ea6a"
  },
  {
    "url": "utils/regexp.html",
    "revision": "bcdc6bca581a5355d0d5f98a75694ea0"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "585ea9493eef5f4bb1724cb55e92412e"
  },
  {
    "url": "vue/index.html",
    "revision": "dcd664b88af64d21aa59827001e65daa"
  },
  {
    "url": "vue/props.html",
    "revision": "b75407bc8dbd474e7adaa2e04a75460f"
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

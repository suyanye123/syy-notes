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
    "revision": "2061cd912d938b51922807357cc0792c"
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
    "url": "assets/js/12.e44915cb.js",
    "revision": "93a62871dbcec480066654294920e3ff"
  },
  {
    "url": "assets/js/13.e39de1c5.js",
    "revision": "33387fde1aec1862247f4f30b7ff6d35"
  },
  {
    "url": "assets/js/14.97578afe.js",
    "revision": "7a2a5baf3b707468af8b793ac2f22ddb"
  },
  {
    "url": "assets/js/15.4e4df07b.js",
    "revision": "d55b71eb204dad18d2d42e64dbb2b098"
  },
  {
    "url": "assets/js/16.8f7a7282.js",
    "revision": "779230ffcba3e82b25764ba060793054"
  },
  {
    "url": "assets/js/17.e1d58c8a.js",
    "revision": "d640a4caf47d682de2d2375106616492"
  },
  {
    "url": "assets/js/18.7211db80.js",
    "revision": "8796624421dd8d5e0de085623ca728bf"
  },
  {
    "url": "assets/js/19.f187ff6d.js",
    "revision": "b5825c91774f6eca0eb3fbce4781ffdc"
  },
  {
    "url": "assets/js/2.10f82196.js",
    "revision": "795402f5e66248de9a640b27d68d74d9"
  },
  {
    "url": "assets/js/20.a88e5e54.js",
    "revision": "c68e036e5cf6dc66c8acc5dfbd5c1aa5"
  },
  {
    "url": "assets/js/21.bead16df.js",
    "revision": "34db48aacb5663cd2ddc5d1b165adfa5"
  },
  {
    "url": "assets/js/22.c6720219.js",
    "revision": "4b07ae3cf4803636443228172283c0e6"
  },
  {
    "url": "assets/js/23.4ba4d5a7.js",
    "revision": "b15feaafd950608ba718aa609fc61b1d"
  },
  {
    "url": "assets/js/24.42510166.js",
    "revision": "59de43df42b295eafa629eede0cef6ff"
  },
  {
    "url": "assets/js/25.9937f6b4.js",
    "revision": "abe633f0cd7aaf8b5a1eadb32a2d2557"
  },
  {
    "url": "assets/js/26.3ccb938d.js",
    "revision": "4f1bf5f02e90573ae4d9166361343e40"
  },
  {
    "url": "assets/js/27.2ec61af8.js",
    "revision": "405348daba51c98ba73edf04db14aada"
  },
  {
    "url": "assets/js/28.e520da50.js",
    "revision": "3a8ff615ad06213f7334bc3e095cebab"
  },
  {
    "url": "assets/js/29.814f89c4.js",
    "revision": "936e2e755c1b45295458135f42f93c75"
  },
  {
    "url": "assets/js/3.dec9b7af.js",
    "revision": "6976b84fbd665bf0ab61537566f06900"
  },
  {
    "url": "assets/js/30.b175e563.js",
    "revision": "1ab931cb3c1345af088dac11e5cf7236"
  },
  {
    "url": "assets/js/31.d8f98e60.js",
    "revision": "a54a3089c1515a5f6f9adeeb1e0b0443"
  },
  {
    "url": "assets/js/32.50ac2650.js",
    "revision": "26d8817d22c6a5c08bfc90a1ec49fdb9"
  },
  {
    "url": "assets/js/33.1ee7e003.js",
    "revision": "b5d3e85d89aabbef019b229b2dd69768"
  },
  {
    "url": "assets/js/34.71fd4cca.js",
    "revision": "035690b33c557ffc34fb0a30f706e9ab"
  },
  {
    "url": "assets/js/35.b3defdc0.js",
    "revision": "284bedc8e965abe78fc0d325bd753e99"
  },
  {
    "url": "assets/js/36.d4cbe102.js",
    "revision": "b6c8193f0e2279f0fc4ea6f2f8c0bc7c"
  },
  {
    "url": "assets/js/37.fb1d0f97.js",
    "revision": "3167977b5c8b7d028872b4a19b2263dc"
  },
  {
    "url": "assets/js/38.8bd18c8f.js",
    "revision": "509d9ac1ccb5c609e72647a6c6723616"
  },
  {
    "url": "assets/js/39.6558b705.js",
    "revision": "41bbb831782fc54ea914d924cec6c88b"
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
    "url": "assets/js/9.fda3f484.js",
    "revision": "d6ce9da70da6aa0982a109dd1d561070"
  },
  {
    "url": "assets/js/app.3ce7ecaf.js",
    "revision": "2be16efb3fcf49854c36a02ce699f3c6"
  },
  {
    "url": "css/canvas.html",
    "revision": "637c19ffac2860e53dfad4bb7012ce53"
  },
  {
    "url": "css/index.html",
    "revision": "82a94cdbbb4089fbaeed26a8bfd6fa8e"
  },
  {
    "url": "css/others.html",
    "revision": "e7197070a39870a3c36f5957e27f143e"
  },
  {
    "url": "css/xuanran.html",
    "revision": "d17a795867d523aa8d610466b03a6b54"
  },
  {
    "url": "demo/index.html",
    "revision": "2ab075cb368e7800663ee6d5cce56990"
  },
  {
    "url": "demo/suUI.html",
    "revision": "d4a234a322bc5950eac9453013082b87"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "3e5ab2440990824c713502b029dc552e"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "60e9d378d5522edb4ab7914156e3eb93"
  },
  {
    "url": "demo/yanye.html",
    "revision": "203cfc95486d5f462d5f6fb7a78cbdce"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "2b86dedd6ac780166bdef4e2f923a6f4"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "2ea260fcfdb14050911cfac452b5cb2c"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "191bb45c619518b250809e8a6548195a"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "9006848697725e44274bcb5638064d6f"
  },
  {
    "url": "git/index.html",
    "revision": "ef9d0783c78fd49697db666cca25f94a"
  },
  {
    "url": "index.html",
    "revision": "90ddc062227a66e6219daa391527df2d"
  },
  {
    "url": "introduce/index.html",
    "revision": "a890c1c4cd30fa4f9094fca4aaaa1b68"
  },
  {
    "url": "js/axios.html",
    "revision": "8c6db03c12216d54c6fae096577f9233"
  },
  {
    "url": "js/basic.html",
    "revision": "e3c329b35e0192c7c8a982cc8a075c30"
  },
  {
    "url": "js/index.html",
    "revision": "b214dae6ee08ea45af5472e34bc1b127"
  },
  {
    "url": "js/promise.html",
    "revision": "377fdcd8487d27a89cbc11fb15ceaf27"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "281725e88521d2af81fa1f059e60984f"
  },
  {
    "url": "uniapp/index.html",
    "revision": "9d448c19a161a6d524af9954f19d077b"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "c589e97248822a05b4d4316d6b909734"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "2cea9ead4b6ada6cd698661bf3896285"
  },
  {
    "url": "utils/index.html",
    "revision": "43f62bbce791d154a0579a03a187bd17"
  },
  {
    "url": "utils/regexp.html",
    "revision": "3f244f5500e5cb3ab046c93c8a13c723"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "e4027d73dcbac9187ada8b60d58025b6"
  },
  {
    "url": "vue/index.html",
    "revision": "b8f96e332fa7e31f88937d0df4b3a4e8"
  },
  {
    "url": "vue/props.html",
    "revision": "e8a262452fd5fbd5a43c4ef0a2f4f7a0"
  },
  {
    "url": "webGL/index.html",
    "revision": "f7e165b9a2fc8d4327e947bb19c830bb"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "8a96fce8a7869f094f0a91825bc7feca"
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

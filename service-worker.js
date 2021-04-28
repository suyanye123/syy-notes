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
    "revision": "3d979e0a685a44253f20af24c873d374"
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
    "url": "assets/js/28.761331a5.js",
    "revision": "896d146ca70bc11b6c304e4a91013e05"
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
    "url": "assets/js/36.c76a8a22.js",
    "revision": "cb8be3d234636e1cb84d7d353d6b6afd"
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
    "url": "assets/js/app.cde34fad.js",
    "revision": "e6b37d17f52acdaf3ab3569b24df162b"
  },
  {
    "url": "css/canvas.html",
    "revision": "3672b8dd4d2cfc0bfcfdf076594fb060"
  },
  {
    "url": "css/index.html",
    "revision": "c8534ed0bb6ee40984fe7b6ddd8d8bb5"
  },
  {
    "url": "css/others.html",
    "revision": "51fdd06b114800828edec8b753374c85"
  },
  {
    "url": "css/xuanran.html",
    "revision": "12cf6c8e28dc07928e6d0998e00a2910"
  },
  {
    "url": "demo/index.html",
    "revision": "4deb0f9f1dae93979dd11240524431f7"
  },
  {
    "url": "demo/suUI.html",
    "revision": "9fce7d7f70af2cbd60b4bf44868eaa0a"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "bb487456690bd63033708f37a6a488ba"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "db83df4e08530d3f69de6d909b27dcf7"
  },
  {
    "url": "demo/yanye.html",
    "revision": "481a43cb0b019ae99013fc8bbac2bc7a"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "03ed34851ca6be1db53715b2bc171ebf"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "0e18032dd13ee213a5dafd5820dd2893"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "5f330427eeb98b537c8539ddda91c892"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "387686cacb30b118d3f50f7ade13ae49"
  },
  {
    "url": "git/index.html",
    "revision": "94291ded58b84913138ea19228748c44"
  },
  {
    "url": "index.html",
    "revision": "d8b28de3cc2000ca2c1a15bd99ff418b"
  },
  {
    "url": "introduce/index.html",
    "revision": "66b9ad43b27490333311604008b5a9a3"
  },
  {
    "url": "js/axios.html",
    "revision": "cb5dbc3378b85c2916875c5b0c6946f5"
  },
  {
    "url": "js/basic.html",
    "revision": "a57852f65d64c251a03e4ebe7794affb"
  },
  {
    "url": "js/index.html",
    "revision": "977850d899e4bde32220bf4c408cfe8b"
  },
  {
    "url": "js/promise.html",
    "revision": "ccb50599e604d8f36f50ec117b37804f"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "26c126c6f6963ca24f46b841204939de"
  },
  {
    "url": "uniapp/index.html",
    "revision": "a6cc3b5451eb4891a6c231fc42afae0d"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "37424f9a50e61c115f4f3e05156d273c"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "56d6650846ffb31c2c17414b1ed9b7eb"
  },
  {
    "url": "utils/index.html",
    "revision": "8b827cda5a3eedac96348812650cc012"
  },
  {
    "url": "utils/regexp.html",
    "revision": "0211e0a44423a24e2661d2804d03b6bf"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "9b6a7fb180de6331133f77bb59de644a"
  },
  {
    "url": "vue/index.html",
    "revision": "7f47e0ff3bce0d26ca43f574e8e09080"
  },
  {
    "url": "vue/props.html",
    "revision": "e6a1c53f1b15c6d6fb88e38d23ecad38"
  },
  {
    "url": "webGL/index.html",
    "revision": "404ae1361cf4aeca070c414a7a170f98"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "a3f36b9b4f3c2e8fb29433885a84af23"
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

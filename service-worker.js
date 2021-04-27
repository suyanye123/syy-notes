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
    "revision": "1caee551fac9e19d10a743d28a29e652"
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
    "url": "assets/js/13.9117c820.js",
    "revision": "deb072489c022b78aaf6ef0e16fa7202"
  },
  {
    "url": "assets/js/14.c02ad010.js",
    "revision": "829b53f6e1282a5700316eb037830b08"
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
    "url": "assets/js/20.fd2fe8af.js",
    "revision": "ab451128f4f2ed9dbdb011c96dfe09e0"
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
    "url": "assets/js/9.f43e6440.js",
    "revision": "f000629db031d1adee22e97c2692389b"
  },
  {
    "url": "assets/js/app.08570daf.js",
    "revision": "8fb73cb0a1ecfbb6ea3864d9d12060b1"
  },
  {
    "url": "css/canvas.html",
    "revision": "303da982d9c97fa6c88b5c5f3e1f0958"
  },
  {
    "url": "css/index.html",
    "revision": "2984acecdd6fc492884211d4d475f42c"
  },
  {
    "url": "css/others.html",
    "revision": "a3c7363d792003819d445e723612e17f"
  },
  {
    "url": "css/xuanran.html",
    "revision": "c920d515480f2fa52e679599a57c38ff"
  },
  {
    "url": "demo/index.html",
    "revision": "e57bafa40ca91d8c643d80c107a7fda8"
  },
  {
    "url": "demo/suUI.html",
    "revision": "64419fd50415dae91ccbfd473354d2df"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "919a513403880e72efd8d03c1cb9f2d6"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "57c5a14cfab9d29de17e7333b1f81dcc"
  },
  {
    "url": "demo/yanye.html",
    "revision": "1883817489b5fe65d60360e2fc2b68b4"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "06129289f42cdac61068d2d78905c680"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "0abbb5c4cf9167f928168b65eee9793e"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "06981af8d78421abf7bd0fa0b3ba9f8b"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "7debf04690122b959e16f44ab39bc082"
  },
  {
    "url": "git/index.html",
    "revision": "2c9a41db75a0a50ebfabeacb747bac39"
  },
  {
    "url": "index.html",
    "revision": "e96c8b76afc169f24115532f2771dcf8"
  },
  {
    "url": "introduce/index.html",
    "revision": "b9fd2e016a7548eae8655a8823b7ade7"
  },
  {
    "url": "js/axios.html",
    "revision": "3153e1d47cd22159dc9d573560a149ec"
  },
  {
    "url": "js/basic.html",
    "revision": "995c1ba68d7302217d7e292969b0bf10"
  },
  {
    "url": "js/index.html",
    "revision": "ca4866f573a674d822d0416f76523143"
  },
  {
    "url": "js/promise.html",
    "revision": "459b291960e4be18571c11c0fbf28190"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "d68daedc958952ef12610b1c160da2de"
  },
  {
    "url": "uniapp/index.html",
    "revision": "c3b0871ce4745bc74aeaf778f8d9ea7d"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "28c2d083899a37467b1b3e48deebc4de"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "2117a4baef4763cc921ef42f6d14a9d7"
  },
  {
    "url": "utils/index.html",
    "revision": "ec8efb588dacda1154b74cf01bb3f19d"
  },
  {
    "url": "utils/regexp.html",
    "revision": "94ea6f8e3800d0c2f09603923bd9e5ff"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "f810304de239596e50669e01703d0da1"
  },
  {
    "url": "vue/index.html",
    "revision": "92a7a2648232f5b8132f88120d1ca73a"
  },
  {
    "url": "vue/props.html",
    "revision": "261d3d7a98eeeaf7b35bcc0014b47412"
  },
  {
    "url": "webGL/index.html",
    "revision": "e936d1e26c09533bfc229c771ec25b83"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "1517cf5fef4bfaf655bc11d18b3d41e1"
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

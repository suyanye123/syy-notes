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
    "revision": "773742c3bc6625a6f608a5de2b128649"
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
    "url": "assets/js/11.52ecdef4.js",
    "revision": "3b8354f51831cc444b51773fd90e5df3"
  },
  {
    "url": "assets/js/12.a5d68b13.js",
    "revision": "3754fa4f7a9c8661eb716156e2d75e45"
  },
  {
    "url": "assets/js/13.325e964f.js",
    "revision": "d533d8a6976edcf646f7102787c34d40"
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
    "url": "assets/js/33.a146af66.js",
    "revision": "bf4084a565277ae6ceb36c02a1da2296"
  },
  {
    "url": "assets/js/34.560f67e5.js",
    "revision": "d3197ea89298e914b899d4d9390bf2df"
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
    "url": "assets/js/app.af3185c8.js",
    "revision": "2098ad3cdf26feb852122410c251a00a"
  },
  {
    "url": "css/canvas.html",
    "revision": "8130d763c0a71cf1ea808ef2417c10d7"
  },
  {
    "url": "css/index.html",
    "revision": "f6f1100adabff800dc395a1d6391617f"
  },
  {
    "url": "css/others.html",
    "revision": "5506c5c76531f3eefeb6959046b6b1c9"
  },
  {
    "url": "css/xuanran.html",
    "revision": "eaa1add02ea95814d40c7a48e4252356"
  },
  {
    "url": "demo/index.html",
    "revision": "c8e232fda655f755a66538f18b5b220c"
  },
  {
    "url": "demo/suUI.html",
    "revision": "c6e76c9f86abe1c947fd01e1c21fe1c5"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "2937d5f56306e66d23d256b8e74f8a12"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "1f63a863ceb23dbf59eb01ac0cf2e78c"
  },
  {
    "url": "demo/yanye.html",
    "revision": "9cc284e9a53bc34c76f435c747785e4a"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "12dedaee2c3498aa6f703c2cd010a827"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "eab265e6613fd407d6d394f1c957dfc2"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "3636a8f9ea1b69d4c646b3b93f41cb31"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "2a53b204e5201e9e7101eaf4f7b2c0f6"
  },
  {
    "url": "git/index.html",
    "revision": "0b0cdc4aa5795ae520d587da6447dcdb"
  },
  {
    "url": "index.html",
    "revision": "eaf444f2ab752daa9f17c26d443ad29e"
  },
  {
    "url": "introduce/index.html",
    "revision": "25e0c9303c268b259079f2e1501a8ca0"
  },
  {
    "url": "js/axios.html",
    "revision": "b93d2ca92538fec96fc5b929b6f076ca"
  },
  {
    "url": "js/basic.html",
    "revision": "655a79ba2838f114833bc56ba77e21b6"
  },
  {
    "url": "js/index.html",
    "revision": "3066f0d5daa2c6dec3a94fa4bc9ebf4c"
  },
  {
    "url": "js/promise.html",
    "revision": "951a970ce93cde83fd8c7e7a2e863608"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "596a1dfe3b97d5857e8f1bf6368f09b9"
  },
  {
    "url": "uniapp/index.html",
    "revision": "e435b2090ec8fb805ad0b0ceed778b7f"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "6e03d3bb09635b26b572b8172db40ee6"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "5a505fa2f26f608fdf4d3fd0554706d5"
  },
  {
    "url": "utils/index.html",
    "revision": "56b91fb8ddf7ce83903658ff2f43c698"
  },
  {
    "url": "utils/regexp.html",
    "revision": "b375f577ec41902d58c87162431d846b"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "965e2c96fa98473fa6a41f69b487cdc6"
  },
  {
    "url": "vue/index.html",
    "revision": "46aa67281e6f177484dc4ab244546797"
  },
  {
    "url": "vue/props.html",
    "revision": "36574b118645f07ea3f58d4982aa4455"
  },
  {
    "url": "webGL/index.html",
    "revision": "382c087ce56f0796279577fd36e9d821"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "e7d01c708516bbcc6b0325ac40f52310"
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

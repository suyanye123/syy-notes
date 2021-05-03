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
    "revision": "a10df961311d2407475791cf95a32c00"
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
    "url": "assets/js/38.a35a108d.js",
    "revision": "3e21fb147125a8d16316f12fc1becf32"
  },
  {
    "url": "assets/js/39.058dac42.js",
    "revision": "46bb78037b5a507c052f5f58f292af3a"
  },
  {
    "url": "assets/js/4.1562b0a8.js",
    "revision": "fac3b91c06c6a40f9d64c8c695778d0d"
  },
  {
    "url": "assets/js/40.070e4f7f.js",
    "revision": "d85915321a00148340c90a2857e5fea7"
  },
  {
    "url": "assets/js/41.5a307a66.js",
    "revision": "a40cc5c146c3c5dfa30859271969a48e"
  },
  {
    "url": "assets/js/5.d48f1ed8.js",
    "revision": "76aa72b4634120ef9120acb61e036dba"
  },
  {
    "url": "assets/js/6.d8bbeb85.js",
    "revision": "6ec299e0294938791e521c50fab6f238"
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
    "url": "assets/js/app.ae5c14e0.js",
    "revision": "2b33668d2535fc8f190090694326d14b"
  },
  {
    "url": "css/canvas.html",
    "revision": "4aba5ec4c903239c466486715e1d9ac2"
  },
  {
    "url": "css/index.html",
    "revision": "afcfe9691f7c262f468ad57ab977c802"
  },
  {
    "url": "css/others.html",
    "revision": "1d1d8cfd92b52e8491d56030bd3ab09a"
  },
  {
    "url": "css/xuanran.html",
    "revision": "d1e774eebdd0d4a992544dccd33a1de9"
  },
  {
    "url": "demo/index.html",
    "revision": "0ec59c3f65ae875d33bb1fdbc3afc81c"
  },
  {
    "url": "demo/suUI.html",
    "revision": "48d8cd206a4793cffeb2d0f92c53d292"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "32d5ba3cc42b4b41f547ce8a0c106f0a"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "372f8e95d8c0b4d4ef87b4bfa4613384"
  },
  {
    "url": "demo/yanye.html",
    "revision": "0f5eaee23d9ce5c1e436aa29a49ae846"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "050c1e27cc8298137ceb28b90be5b057"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "4acf1f7110c47a14e14cb619ab1d4bca"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "8d583f66e6c43375e9108243e596d7e3"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "000872c58fb87a6a4c7037c747c7b10f"
  },
  {
    "url": "git/index.html",
    "revision": "6079dbb1febebe7be9976390595553d0"
  },
  {
    "url": "index.html",
    "revision": "3e4d9b5298265421baabe837afb60a37"
  },
  {
    "url": "introduce/index.html",
    "revision": "449b569ec4262809fad97d2477488688"
  },
  {
    "url": "js/axios.html",
    "revision": "e8eace1e046e7e598ed60d1c0cda2e4f"
  },
  {
    "url": "js/basic.html",
    "revision": "f6e8cf53aa6f8d417929c8015c36b9e9"
  },
  {
    "url": "js/index.html",
    "revision": "edbf226b3848d8f1a72ddb6583b5d9dd"
  },
  {
    "url": "js/promise.html",
    "revision": "9cb6b7ea54a4be75713de1a604e6a337"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "c4371c61aa5a14f18d21df0da55d8138"
  },
  {
    "url": "uniapp/index.html",
    "revision": "6ab5af3b8840f39a01960db5804ad856"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "f3fd6909de50e692a0b53d8716b5732a"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "37d2e37ed389043725b9bf466120b530"
  },
  {
    "url": "utils/index.html",
    "revision": "da9bf1351516216588619552a7177b50"
  },
  {
    "url": "utils/regexp.html",
    "revision": "a87f909e36f46980101099aeb54acb0a"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "3fe97045a8ae7955051ca16811c973d1"
  },
  {
    "url": "vue/index.html",
    "revision": "bfcb3a91da811e716f881ac45c02668f"
  },
  {
    "url": "vue/props.html",
    "revision": "f0b186e2e45d01e07c41ef17d85e725c"
  },
  {
    "url": "vue/webpack.html",
    "revision": "0fe8f0a7e142faaf674d3041c49f6248"
  },
  {
    "url": "webGL/index.html",
    "revision": "5c61028149c69fbcb25ce472c2d3f5f8"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "0e5c025552fc6f2ca82d97499d405202"
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

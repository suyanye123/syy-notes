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
    "revision": "d0664d20a9c158351ba465a4b1438e7d"
  },
  {
    "url": "assets/css/0.styles.5535a591.css",
    "revision": "90f2e9720d684522eec131e441488859"
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
    "url": "assets/js/11.5c253672.js",
    "revision": "060ba995c0f7bcc01b695efe1447db1f"
  },
  {
    "url": "assets/js/12.83bd3269.js",
    "revision": "0b4061a6165b87f35e9544d7e1a94f59"
  },
  {
    "url": "assets/js/13.83ae26d8.js",
    "revision": "64e887485e73e760591eb3cb6b717c03"
  },
  {
    "url": "assets/js/14.e17aca8a.js",
    "revision": "77c23005e2c41ccf6e80926f593a9044"
  },
  {
    "url": "assets/js/15.5070ed8f.js",
    "revision": "e2088c30da19c323eb54b2efc8a61ff5"
  },
  {
    "url": "assets/js/16.ff50dfdd.js",
    "revision": "d4dc9bd8985d6f80719171169d77d786"
  },
  {
    "url": "assets/js/17.83cc2a9a.js",
    "revision": "cbb80cfab3422e161c46a07262ba6d31"
  },
  {
    "url": "assets/js/18.3f2e8a56.js",
    "revision": "0b26b907f5400e6bf3ee2a167df72a73"
  },
  {
    "url": "assets/js/19.f2533f98.js",
    "revision": "ec91dcea7c8d7eb7798c11a5b255abc2"
  },
  {
    "url": "assets/js/2.4f9de5bc.js",
    "revision": "795402f5e66248de9a640b27d68d74d9"
  },
  {
    "url": "assets/js/20.254b9d62.js",
    "revision": "8f7279dfa04943cab2d8c20e72dd83d2"
  },
  {
    "url": "assets/js/21.6c0f0885.js",
    "revision": "6ec8fed5a8b2a2c9deb840569cd91c86"
  },
  {
    "url": "assets/js/22.46b46e45.js",
    "revision": "159c3b8bfbc22e72614f08013d41f7c9"
  },
  {
    "url": "assets/js/23.773b521b.js",
    "revision": "9ea04132fdebbcafcfd8ac2b27dd8b94"
  },
  {
    "url": "assets/js/24.aebf101e.js",
    "revision": "8094c30fef07e86856687f4cbee075e4"
  },
  {
    "url": "assets/js/25.d06fa529.js",
    "revision": "53391f498685f91aa97f812f94d3ec31"
  },
  {
    "url": "assets/js/26.e66bf22d.js",
    "revision": "021ba3dfe5b53445dcddcdf47923a891"
  },
  {
    "url": "assets/js/27.61b0034a.js",
    "revision": "87963ea5c1591f21c8249a94ff884f02"
  },
  {
    "url": "assets/js/28.f4689195.js",
    "revision": "13abd94eb3b45b1450f94aeb43d3a1ba"
  },
  {
    "url": "assets/js/29.50359e37.js",
    "revision": "520f07199f7c26693d01a3f3e8f5770c"
  },
  {
    "url": "assets/js/3.6d8e326d.js",
    "revision": "151c19fadcde429133af429eccdaf55f"
  },
  {
    "url": "assets/js/30.f6fdeefa.js",
    "revision": "007913db195b15ad988543e167678830"
  },
  {
    "url": "assets/js/31.c7375306.js",
    "revision": "8488a96480dc175a8cd9bdaf8e325d6a"
  },
  {
    "url": "assets/js/32.92259f77.js",
    "revision": "e25d2b0b555cd250c96a145a10c851c4"
  },
  {
    "url": "assets/js/33.ed007401.js",
    "revision": "aa897410bd0fc0a10721a243bf98c35d"
  },
  {
    "url": "assets/js/34.1015e167.js",
    "revision": "937f8aea72b1715ebfbbf798264c7097"
  },
  {
    "url": "assets/js/35.05db049f.js",
    "revision": "70a64194106920673fc4ff74d6125b56"
  },
  {
    "url": "assets/js/36.6d231fe2.js",
    "revision": "2166b6d07e929510044e3029cfabd1c8"
  },
  {
    "url": "assets/js/37.73124566.js",
    "revision": "c2c82d5e1eb29b049489cc41c6a4705b"
  },
  {
    "url": "assets/js/4.1562b0a8.js",
    "revision": "fac3b91c06c6a40f9d64c8c695778d0d"
  },
  {
    "url": "assets/js/5.d48f1ed8.js",
    "revision": "76aa72b4634120ef9120acb61e036dba"
  },
  {
    "url": "assets/js/6.a722c46b.js",
    "revision": "fa5bea6232e94d3a7373547b6b310826"
  },
  {
    "url": "assets/js/7.e4b64b54.js",
    "revision": "a55e262270f4a3845ac4ac8e023dd158"
  },
  {
    "url": "assets/js/8.83b32b6f.js",
    "revision": "ef1b8a2f793ecb62ffbc19498bd5e5b5"
  },
  {
    "url": "assets/js/9.eb9ff590.js",
    "revision": "7df5d8e18f2f4b9c98853ca1c8168d98"
  },
  {
    "url": "assets/js/app.0b14cd82.js",
    "revision": "a766fe05b5cf7c57aa95634e445c040f"
  },
  {
    "url": "css/canvas.html",
    "revision": "9e3bff263c29499321b6a8f8685c9247"
  },
  {
    "url": "css/index.html",
    "revision": "71dc40f6985833f74d27bc4169c25402"
  },
  {
    "url": "css/others.html",
    "revision": "fd04f02947dec9b2e8e01e5d3e11dc41"
  },
  {
    "url": "demo/index.html",
    "revision": "a33723924cd3ca1f622dfc0e8e816838"
  },
  {
    "url": "demo/suUI.html",
    "revision": "8e2b0697b285f104c4c8b936bdad780a"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "8da71321fe547127d603425fd56ede55"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "6408d9d5a9315caa37cf853b33732e8c"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "d58e1ce60b6b6b3ce86023b24bf07b9c"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "3a5047dbb7ada84cd35dd6586b3157de"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "279822bb9deb4a9e39f394de2344115c"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "3ad7a500ae28eabd7e0611d9bb5334b3"
  },
  {
    "url": "git/index.html",
    "revision": "85682e0be7706246e242cee9da9c7974"
  },
  {
    "url": "index.html",
    "revision": "7ad1172a93f37582a61020e0c262e596"
  },
  {
    "url": "introduce/index.html",
    "revision": "4c0a744fed0a7329a6d3090cd9e973ce"
  },
  {
    "url": "js/axios.html",
    "revision": "370f44a33ee11b08ad7aadab6f45e2d2"
  },
  {
    "url": "js/http.html",
    "revision": "84ee48e87f4f823bb6cef77c40b092a0"
  },
  {
    "url": "js/promise.html",
    "revision": "dc81fa8fd63feb057eef0ad4107cfc23"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "495cd0c02e0bb5fa111f3579289513aa"
  },
  {
    "url": "uniapp/index.html",
    "revision": "d014ecd4abf65b46c1238c345555a355"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "2b61dfbe304c0125b6d07ed861e0dc53"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "f15ec4ac51a764365608ebe52addf313"
  },
  {
    "url": "utils/index.html",
    "revision": "2d2eb27f59eb73613863d695955274c5"
  },
  {
    "url": "utils/regexp.html",
    "revision": "9f1ed09ff0656e4f4042228ead9422e5"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "9f06ee845f603d0c27843c66175d5111"
  },
  {
    "url": "vue/index.html",
    "revision": "b01e83cc3991ff233ad5dd3360ab716b"
  },
  {
    "url": "vue/props.html",
    "revision": "957ce467e24937491ea57a540ba355ae"
  },
  {
    "url": "webGL/index.html",
    "revision": "ac8379116d45efff825b0156d9429c03"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "c1046c8f7f0e8fc8f7f1db5b37a6535f"
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

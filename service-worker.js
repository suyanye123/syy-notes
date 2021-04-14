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
    "revision": "e9d30b5220add420c3b6d1b214e4d8c5"
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
    "url": "assets/js/10.c40f9ac5.js",
    "revision": "3a6151652bc0004a0e82287ce674e59a"
  },
  {
    "url": "assets/js/11.e1721e80.js",
    "revision": "a5ce5da0f85256bad35dc5461f8038e6"
  },
  {
    "url": "assets/js/12.9a770a9a.js",
    "revision": "58e559e4a346149bf2d2c282a426ac55"
  },
  {
    "url": "assets/js/13.237c43a1.js",
    "revision": "57729c1b13afaa19c647ffde7080e96c"
  },
  {
    "url": "assets/js/14.09a2a510.js",
    "revision": "89463ec1d4ba9bb512f53180dbf397ac"
  },
  {
    "url": "assets/js/15.e5804ccd.js",
    "revision": "4ff1516775b018c15f99fe54c65a4d75"
  },
  {
    "url": "assets/js/16.731e5a91.js",
    "revision": "35b6ca99d92660eeeb084e33afbd14f9"
  },
  {
    "url": "assets/js/17.a313999b.js",
    "revision": "f24b90d01a95e068a0586d6c47e3d02c"
  },
  {
    "url": "assets/js/18.18e729a1.js",
    "revision": "7acc5abd4200ea783edbf907ace37515"
  },
  {
    "url": "assets/js/19.bab69fb7.js",
    "revision": "18c58d948903b81650e3274a1fc9b3ec"
  },
  {
    "url": "assets/js/2.cae88ee9.js",
    "revision": "a3af8cb4e6743594977ba2ef95546095"
  },
  {
    "url": "assets/js/20.a3011e20.js",
    "revision": "c779820b6e0fc04ccbc94234b965b2fa"
  },
  {
    "url": "assets/js/21.57b40867.js",
    "revision": "58ac06b1f8df967f12dcf890eca6a1d4"
  },
  {
    "url": "assets/js/22.6ed73ca8.js",
    "revision": "231f519066607f284626431e8c59aa9b"
  },
  {
    "url": "assets/js/23.59bd9965.js",
    "revision": "116b521f44ce5a0c277388bd03b0dcb2"
  },
  {
    "url": "assets/js/24.a7225fa9.js",
    "revision": "2516f818df79b60f0d384ea08d422105"
  },
  {
    "url": "assets/js/25.6d8ac244.js",
    "revision": "ffcfbe29fdfc7d46331d4e3a5aa5c3f8"
  },
  {
    "url": "assets/js/3.e74356e7.js",
    "revision": "3f1223747a360e60559d086e85f34318"
  },
  {
    "url": "assets/js/4.00be134d.js",
    "revision": "2fa6b0330e770e8b479b3526c4bb2a9c"
  },
  {
    "url": "assets/js/5.6c8a2b30.js",
    "revision": "cb0acfa9f75820ddf0ed006e6c1a9b00"
  },
  {
    "url": "assets/js/6.2221b9da.js",
    "revision": "6d4d84ed901195d7345738a1e372151b"
  },
  {
    "url": "assets/js/7.ec655744.js",
    "revision": "c19e4ab23f180dc6002f1b976b457e10"
  },
  {
    "url": "assets/js/8.ea08d7e5.js",
    "revision": "1a3755159a466c2dc54aab787924a817"
  },
  {
    "url": "assets/js/9.6904bc8b.js",
    "revision": "09fdcf7340809f42f24680c9ed16fc63"
  },
  {
    "url": "assets/js/app.c43e067a.js",
    "revision": "68ad102342dcb25e2fa7b3061ea0b226"
  },
  {
    "url": "css/flex.html",
    "revision": "065490d07aea1f3e61ff82cf4f01959c"
  },
  {
    "url": "css/index.html",
    "revision": "6a3c26d5d73c844a78fea5e56ddfe0ae"
  },
  {
    "url": "git/index.html",
    "revision": "762a4017dc0e8576966cd6080dbc8899"
  },
  {
    "url": "index.html",
    "revision": "d3e21fd49583a68f85ce38037c33af28"
  },
  {
    "url": "interview/more.html",
    "revision": "8e26e7c5e5971d9d605e2080476bdd83"
  },
  {
    "url": "interview/quest.html",
    "revision": "bb77842de0812b26fa6bc39b1d163c08"
  },
  {
    "url": "introduce/index.html",
    "revision": "0a7d70437ba5d667206804dfd3e1e01a"
  },
  {
    "url": "js/promise.html",
    "revision": "dbb70b55d6a235a22692dc6d5dd8a982"
  },
  {
    "url": "mytools/index.html",
    "revision": "aa770ba4d251c3ba46439a87588adf94"
  },
  {
    "url": "react/index.html",
    "revision": "97e1204615035a59f58d54fefb2a9777"
  },
  {
    "url": "uniapp/index.html",
    "revision": "455192df305bc3b9c1a0e5ac10288d52"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "07c513f3f819e740b09c80d2240cd6bf"
  },
  {
    "url": "utils/regexp.html",
    "revision": "11a4a040e542d5b702db158db202ae08"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "9e28f03be0e5b3041453e930e619fbca"
  },
  {
    "url": "vue/index.html",
    "revision": "a0b39d448329b80118d99b306f283cf4"
  },
  {
    "url": "vue/props.html",
    "revision": "00f292307b256dd61915d84f98ed0c82"
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

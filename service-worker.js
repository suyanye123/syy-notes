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
    "revision": "12f8d64f6d4dbf93391971085f71e184"
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
    "url": "assets/js/13.91767f39.js",
    "revision": "56873926a05cdb51a973a9266f4e2f48"
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
    "url": "assets/js/16.2e558c0b.js",
    "revision": "491b08f6900df0424ccbd45b59858526"
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
    "url": "assets/js/21.aacfd2d1.js",
    "revision": "fea6b7594dc2c440fd7a1aec877becde"
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
    "url": "assets/js/app.d9e2dd19.js",
    "revision": "60012eab0cfbbe0b397dbbe3214ab7d0"
  },
  {
    "url": "css/flex.html",
    "revision": "030ab8b273f4911d9dc5456175e54457"
  },
  {
    "url": "css/index.html",
    "revision": "d669e99aaf96da70b00596badddd09cb"
  },
  {
    "url": "git/index.html",
    "revision": "3afdb0c366b6a5f8dc508889ad967431"
  },
  {
    "url": "index.html",
    "revision": "741f33c0623c0878cf348a05369913a1"
  },
  {
    "url": "interview/more.html",
    "revision": "f5c3a3b81fcc27037c52215228c555f9"
  },
  {
    "url": "interview/quest.html",
    "revision": "81e8bc51f0c68ca9bb2aa7c00f44b8eb"
  },
  {
    "url": "introduce/index.html",
    "revision": "8b2d9a78b929803e6bce45cd47e1d4fe"
  },
  {
    "url": "js/promise.html",
    "revision": "9403fe3329cf6ddab436d8cd666ad26a"
  },
  {
    "url": "mytools/index.html",
    "revision": "0e8edcefdff13157b9070a94f5ad7245"
  },
  {
    "url": "react/index.html",
    "revision": "6abc5c2b31cd13321b26f2f078eebd88"
  },
  {
    "url": "uniapp/index.html",
    "revision": "5289906b28b379fc01693114e720ff8b"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "8bfdeb39178f86a000dc2aa090cd5746"
  },
  {
    "url": "utils/regexp.html",
    "revision": "1772557f5202aaa930d04ed7e48f0bc3"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "62a8ce90c89de332265adc5daa03773f"
  },
  {
    "url": "vue/index.html",
    "revision": "fe199b1008beff91499f44cade7c1c4b"
  },
  {
    "url": "vue/props.html",
    "revision": "a7b10cedd8c76accb128ee18159e8353"
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

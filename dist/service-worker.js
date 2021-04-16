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
    "revision": "d0148e67ab1918fab53895d2f33d34e4"
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
    "url": "assets/js/10.c40f9ac5.js",
    "revision": "3a6151652bc0004a0e82287ce674e59a"
  },
  {
    "url": "assets/js/11.e1721e80.js",
    "revision": "a5ce5da0f85256bad35dc5461f8038e6"
  },
  {
    "url": "assets/js/12.bce8652f.js",
    "revision": "9555f5d3713298f776a82a9dcde83b32"
  },
  {
    "url": "assets/js/13.0d4fe650.js",
    "revision": "eaf2840ba547d2a32b3e1e76203d921d"
  },
  {
    "url": "assets/js/14.e64cd3c9.js",
    "revision": "34b709296dc5b2591ef88a0647520882"
  },
  {
    "url": "assets/js/15.f927b471.js",
    "revision": "dcf4eddfee6981390d926de3dcbc6e45"
  },
  {
    "url": "assets/js/16.2e558c0b.js",
    "revision": "491b08f6900df0424ccbd45b59858526"
  },
  {
    "url": "assets/js/17.68acaa5d.js",
    "revision": "27b09b868f698872b7205cca9708b41b"
  },
  {
    "url": "assets/js/18.f1674995.js",
    "revision": "77c223302fda4bb2a0edf09ceeb493b7"
  },
  {
    "url": "assets/js/19.77114983.js",
    "revision": "8f2f0feca45b47f2859a73c3f62fc63c"
  },
  {
    "url": "assets/js/2.050a0d37.js",
    "revision": "a3af8cb4e6743594977ba2ef95546095"
  },
  {
    "url": "assets/js/20.6946457c.js",
    "revision": "df0024060cf15162de12ada854119238"
  },
  {
    "url": "assets/js/21.b296f714.js",
    "revision": "6a7765da395273feec328ef367801709"
  },
  {
    "url": "assets/js/22.bdf34553.js",
    "revision": "731d4181c63d9bed46c66bd71441eea9"
  },
  {
    "url": "assets/js/23.c72fead6.js",
    "revision": "fae36232555fd76e80b475d0d15a78af"
  },
  {
    "url": "assets/js/24.d8b4e48f.js",
    "revision": "edb3e07a483f608fdca211257e9674f4"
  },
  {
    "url": "assets/js/25.e3b255c6.js",
    "revision": "84aac7dc5f542e46d56abc7555226277"
  },
  {
    "url": "assets/js/26.20251bca.js",
    "revision": "e9f7d3fab4ad15358985fef80d5f39c3"
  },
  {
    "url": "assets/js/3.9bc6c607.js",
    "revision": "802c68059361ef0cb955f0a370df2fe3"
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
    "url": "assets/js/6.3273f2f3.js",
    "revision": "6fcf798b77d1b88223211fcc4229a9ca"
  },
  {
    "url": "assets/js/7.623b1e93.js",
    "revision": "3ad9c1cfcad4a8839c689ad35fb3c2bb"
  },
  {
    "url": "assets/js/8.4d991540.js",
    "revision": "74cf53a64ac42f299347b3bd0a9ba558"
  },
  {
    "url": "assets/js/9.6904bc8b.js",
    "revision": "09fdcf7340809f42f24680c9ed16fc63"
  },
  {
    "url": "assets/js/app.b23d01aa.js",
    "revision": "c8bc5fc83e5c67b8e24dbda9bb1067f9"
  },
  {
    "url": "css/flex.html",
    "revision": "d07307902339a0a3097401386d4bf80d"
  },
  {
    "url": "css/index.html",
    "revision": "b770b697a7bd18d628876d072c6c2643"
  },
  {
    "url": "git/index.html",
    "revision": "080a9df68ad5371a82380868dff18deb"
  },
  {
    "url": "index.html",
    "revision": "5aa1fbab806e055beab512bc32c6fcd4"
  },
  {
    "url": "interview/more.html",
    "revision": "4666baa092dd37b02d4381a4f001c9a3"
  },
  {
    "url": "interview/quest.html",
    "revision": "0634677c8a5c2a31a94c94fed296d7b3"
  },
  {
    "url": "introduce/index.html",
    "revision": "6e171804944549f283115760f6cb467a"
  },
  {
    "url": "js/http.html",
    "revision": "148d8028fc702e1ea7ec9fa7027c4149"
  },
  {
    "url": "js/promise.html",
    "revision": "7f78a16846eb0f7d80caa336c7488736"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "a83af7e880e8e34508bdb606423d0dc5"
  },
  {
    "url": "react/index.html",
    "revision": "bfb573ff5bfad1ee7160ddc5bc07a67d"
  },
  {
    "url": "uniapp/index.html",
    "revision": "c6e262afd8b6d47c847643dda95c1138"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "544d5fd7788fb6f40d7349272ae0b919"
  },
  {
    "url": "utils/regexp.html",
    "revision": "84065f9a3a4d003de5fe651f968b2dcc"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "d6799f958aad1dd0842438d6e63ccec0"
  },
  {
    "url": "vue/index.html",
    "revision": "8922a5d7c760cda17c032e9e52bfd402"
  },
  {
    "url": "vue/props.html",
    "revision": "85bcf20974928794afcf408b5937ea7b"
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

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
    "revision": "29ae94aed36e2888ef5392ffeb7c0e28"
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
    "url": "assets/js/17.68acaa5d.js",
    "revision": "27b09b868f698872b7205cca9708b41b"
  },
  {
    "url": "assets/js/18.170469e6.js",
    "revision": "529f925a406cefa2ecc9fdf21bb65a03"
  },
  {
    "url": "assets/js/19.6313d02e.js",
    "revision": "1e14e42ebcf9bed96d6af8ebd21839b3"
  },
  {
    "url": "assets/js/2.cae88ee9.js",
    "revision": "a3af8cb4e6743594977ba2ef95546095"
  },
  {
    "url": "assets/js/20.6946457c.js",
    "revision": "df0024060cf15162de12ada854119238"
  },
  {
    "url": "assets/js/21.8b6f56ff.js",
    "revision": "9a935c70efb59d4bcfa133bf2faff9fd"
  },
  {
    "url": "assets/js/22.8d02a8eb.js",
    "revision": "1cadef2e6bb64b70f0a0e3f7605f7f34"
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
    "url": "assets/js/app.4b156e64.js",
    "revision": "2b6f6bd67453700309769beb18ebb199"
  },
  {
    "url": "css/flex.html",
    "revision": "df29ac2a7ef2ec2f2657efeebfebcfb7"
  },
  {
    "url": "css/index.html",
    "revision": "a20a5856703663c3b53dee1b4ced381d"
  },
  {
    "url": "git/index.html",
    "revision": "ba396bff0752080bf74b33f6cfb501d7"
  },
  {
    "url": "index.html",
    "revision": "3c06974f8b95439b09f43c2814813247"
  },
  {
    "url": "interview/more.html",
    "revision": "60711bd6fe0bb6eee13ec1f9160ade44"
  },
  {
    "url": "interview/quest.html",
    "revision": "82f9d2a978fcbb5a0e9a1b787d88d3a9"
  },
  {
    "url": "introduce/index.html",
    "revision": "e40ae604fc89d9fb4581972e369d6248"
  },
  {
    "url": "js/http.html",
    "revision": "96bd388c44d5cc7094f42d62af51456a"
  },
  {
    "url": "js/promise.html",
    "revision": "cdbd151233e75c2bf251fc8183043187"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "cc95a172cef48ce0572e06bcc2f52f98"
  },
  {
    "url": "react/index.html",
    "revision": "8eab3f067834d9d7fcdb1bca35bb724e"
  },
  {
    "url": "uniapp/index.html",
    "revision": "66c46a94797946cdcc69912e9eece639"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "2a529492aa8a1c19c3cc5e187ae72b37"
  },
  {
    "url": "utils/regexp.html",
    "revision": "e3eb7a17b793680221ab0aa1eee7648b"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "4998b6c0bb629b6854b43716c6aac475"
  },
  {
    "url": "vue/index.html",
    "revision": "154bff3e9edbc6af650e76ccd68f53e4"
  },
  {
    "url": "vue/props.html",
    "revision": "63f07df2106215df74428b9c9a7a0c72"
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

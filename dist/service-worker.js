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
    "revision": "24204e27659e7f480a902162b3d9b89d"
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
    "url": "assets/js/12.72c39990.js",
    "revision": "6fc567e9f9b61dc4936073973f26f5b3"
  },
  {
    "url": "assets/js/13.97d574dc.js",
    "revision": "c2f44401e71249f4c0e3e0eec5549770"
  },
  {
    "url": "assets/js/14.81747d1b.js",
    "revision": "62efabe1233d616b376a6adf2c03eb99"
  },
  {
    "url": "assets/js/15.5b77a32d.js",
    "revision": "d3d1a17d1984adf2e0dd96ef60b3cac6"
  },
  {
    "url": "assets/js/16.42a498f6.js",
    "revision": "d32c5f9b7bd090abbb50c56ffc736149"
  },
  {
    "url": "assets/js/17.debeb5b6.js",
    "revision": "d278ff27f20fc52b2b34ae51919c5354"
  },
  {
    "url": "assets/js/18.0dec2674.js",
    "revision": "bcdf5e64aa880359f8273aab5c1fd25f"
  },
  {
    "url": "assets/js/19.cc01a14a.js",
    "revision": "81c6da4e0b06ee3fda2018a695def307"
  },
  {
    "url": "assets/js/2.050a0d37.js",
    "revision": "a3af8cb4e6743594977ba2ef95546095"
  },
  {
    "url": "assets/js/20.b521e593.js",
    "revision": "d459a64b98d7e578e660650c472b819e"
  },
  {
    "url": "assets/js/21.7578df88.js",
    "revision": "446ffba846d55529e84b0af9c30de9c9"
  },
  {
    "url": "assets/js/22.bc5e0ee2.js",
    "revision": "cd985431349bda54caa35bbf186e0cb5"
  },
  {
    "url": "assets/js/23.1454814a.js",
    "revision": "57c7aa6491b2b1aa5b7cd563de2fc0fd"
  },
  {
    "url": "assets/js/24.45417e72.js",
    "revision": "cf3ed552a7b586c873be8329d9aaa163"
  },
  {
    "url": "assets/js/25.6d8ac244.js",
    "revision": "ffcfbe29fdfc7d46331d4e3a5aa5c3f8"
  },
  {
    "url": "assets/js/3.bd093e6a.js",
    "revision": "b59a243ba6c816db7efcc0034efc3578"
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
    "url": "assets/js/app.87956451.js",
    "revision": "73e85dd265df7989f505a542680f0664"
  },
  {
    "url": "css/flex.html",
    "revision": "548e3be7a2cb5e49a0ed1396a273a7af"
  },
  {
    "url": "css/index.html",
    "revision": "f3b3f8ff9c9ec9b0b2c3c4cdcb2c9ea3"
  },
  {
    "url": "git/index.html",
    "revision": "76555cc160c8b9cd3068cae9d91b2ea6"
  },
  {
    "url": "index.html",
    "revision": "5f5dac70b90d9de57c409c26db8dba7c"
  },
  {
    "url": "interview/more.html",
    "revision": "89e6c8ea173331734b36021c2300858e"
  },
  {
    "url": "interview/quest.html",
    "revision": "eccdbc9d38dc8800218393aaaa081925"
  },
  {
    "url": "introduce/index.html",
    "revision": "bcecf0f5cb6aa7886e03737ae2f54e50"
  },
  {
    "url": "js/promise.html",
    "revision": "a0cb6e3ece460caed479c6fe7ff3c711"
  },
  {
    "url": "mytools/index.html",
    "revision": "f3d9d069fa64c598419265e1a97adbd7"
  },
  {
    "url": "react/index.html",
    "revision": "385329da4e30643e3dc1cdfd2f112b8a"
  },
  {
    "url": "uniapp/index.html",
    "revision": "6219be9ed848ee46bb5cd1b7c8859eea"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "824489a7f5ac2757de1813890493817d"
  },
  {
    "url": "utils/regexp.html",
    "revision": "38af93fce15ba9591c6a04b00af36f36"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "a8f77215c698fd33f7aea96e07775fb3"
  },
  {
    "url": "vue/index.html",
    "revision": "6e676bc68244ad45f9ff10aa3fc4ad3a"
  },
  {
    "url": "vue/props.html",
    "revision": "884fddbe9e525909be23f57df9196db8"
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

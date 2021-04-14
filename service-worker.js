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
    "revision": "7f74f4e25bef4e0f0a73c020b69c7ff3"
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
    "url": "assets/js/10.0f666373.js",
    "revision": "3aee4b89ec12c3024ba0aa96d7dca6ed"
  },
  {
    "url": "assets/js/11.3f2490a9.js",
    "revision": "2829606bb5de70a161b2de58fcb56b18"
  },
  {
    "url": "assets/js/12.7a09a534.js",
    "revision": "3b1599c8ffb5e4825dfb79e2ea5b913d"
  },
  {
    "url": "assets/js/13.b9e8eeea.js",
    "revision": "d1db2d950a10fd23c490e03047b50ce6"
  },
  {
    "url": "assets/js/14.2ec6efb7.js",
    "revision": "a9fab9d14e4f9896536962ec2df0ee51"
  },
  {
    "url": "assets/js/15.a46b09d1.js",
    "revision": "402ee0ea69c140c4a3cd43c6ffaa68a6"
  },
  {
    "url": "assets/js/16.e1918d13.js",
    "revision": "cab379958f6b8245fed63184f1daf307"
  },
  {
    "url": "assets/js/17.82c2dc3a.js",
    "revision": "6d4dffee4ab3893f4f1324d48eefb6d9"
  },
  {
    "url": "assets/js/18.86f05f67.js",
    "revision": "9b39f5610d6d970e63b9ff13671ebd5c"
  },
  {
    "url": "assets/js/19.0f9e7b96.js",
    "revision": "3d6c5b4f218f51a002412e319b5c3a20"
  },
  {
    "url": "assets/js/2.9f7d437b.js",
    "revision": "549bb00ebf25c22fbae1ed14553d53f5"
  },
  {
    "url": "assets/js/20.e449b76e.js",
    "revision": "79154a0dcd235311354bf1a9af65ce21"
  },
  {
    "url": "assets/js/21.a2105ce8.js",
    "revision": "e7717e2e9e79c972285b3dfffca2c6f3"
  },
  {
    "url": "assets/js/22.d56a39ba.js",
    "revision": "2a54edb197a3888c50afb9481dd2efa4"
  },
  {
    "url": "assets/js/23.537fca2f.js",
    "revision": "c2894a1cb7183d51cf86408ee0a1c3dc"
  },
  {
    "url": "assets/js/24.45417e72.js",
    "revision": "cf3ed552a7b586c873be8329d9aaa163"
  },
  {
    "url": "assets/js/25.e4b4807c.js",
    "revision": "5a50d786314527bca57dca17ea3e3df8"
  },
  {
    "url": "assets/js/3.1ee81e76.js",
    "revision": "5837964fa1abda5bf4bc816af488419e"
  },
  {
    "url": "assets/js/4.2534f0da.js",
    "revision": "5463e543bac4ed39b97b1077a4d5f0c7"
  },
  {
    "url": "assets/js/5.819f8a4d.js",
    "revision": "57e13db74a09aba26dd60ad64f578688"
  },
  {
    "url": "assets/js/6.d22714b2.js",
    "revision": "948ad6bed8d2f825ee38b6c10349019d"
  },
  {
    "url": "assets/js/7.47e0a56b.js",
    "revision": "0f735507334d06e6822db6f1f1600233"
  },
  {
    "url": "assets/js/8.1562527e.js",
    "revision": "c4d102f7482db22c8fe2d358ccdcec46"
  },
  {
    "url": "assets/js/9.93dbb096.js",
    "revision": "6ff633fae0d5b539064e1fb4fdaca5ad"
  },
  {
    "url": "assets/js/app.5fbd7ee4.js",
    "revision": "e9e501eff096c0038ec904660985b319"
  },
  {
    "url": "css/flex.html",
    "revision": "9c2f0cdf88df80243e90d8feb4a614f5"
  },
  {
    "url": "css/index.html",
    "revision": "a44f0a57b927ae62349f627babaf11fc"
  },
  {
    "url": "git/index.html",
    "revision": "fac6dc1ec3ca28a8458005b1219dca27"
  },
  {
    "url": "img/vue/vue1.png",
    "revision": "730160552a2435ff54cb36dc1ec8837b"
  },
  {
    "url": "img/vue/vue2.png",
    "revision": "5fc2b35060bd17e3607908b835aff606"
  },
  {
    "url": "img/vue/vue3.png",
    "revision": "fed2f138c308f1049cebc8743e7ed65d"
  },
  {
    "url": "index.html",
    "revision": "79fb105a9c61dc4295828f1b21458c10"
  },
  {
    "url": "interview/more.html",
    "revision": "0f6e92711848abb6117883c3b7400372"
  },
  {
    "url": "interview/quest.html",
    "revision": "51528ac074fd6b69f25984ba237ced2d"
  },
  {
    "url": "introduce/index.html",
    "revision": "5ace54d8fa79ab3df9361313c92ed95c"
  },
  {
    "url": "js/promise.html",
    "revision": "91c2a36e036495ffab9caaa6d42ff8b6"
  },
  {
    "url": "mytools/index.html",
    "revision": "ddbc713315aac1266874ad8967e4789a"
  },
  {
    "url": "react/index.html",
    "revision": "c6cec6f061adce75499ccf3917114517"
  },
  {
    "url": "uniapp/index.html",
    "revision": "0008a39b1132dd17d0c4ee95aa0b2934"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "b63b3b7bb6def983f202e2ba6878e0a4"
  },
  {
    "url": "utils/regexp.html",
    "revision": "faab2bff0dc80928c73fbe59efa22390"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "c16704606da379c382516309fe7a799b"
  },
  {
    "url": "vue/index.html",
    "revision": "697130b1f8d153a66765f181e560b2d5"
  },
  {
    "url": "vue/props.html",
    "revision": "75cd01f7d33aa7dcd405778f969da546"
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

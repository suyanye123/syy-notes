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
    "revision": "7278c0358e974bd69cd3a9d83b6ad4b7"
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
    "url": "assets/js/12.303166db.js",
    "revision": "b41f25ccef1b8ffe6254c78b5dcbd67e"
  },
  {
    "url": "assets/js/13.121b7476.js",
    "revision": "8e27aa8e41b62ddd45525f1e3e47380b"
  },
  {
    "url": "assets/js/14.6d1e15f4.js",
    "revision": "84bab582cd7bed4205633d23b87a8720"
  },
  {
    "url": "assets/js/15.7b08d039.js",
    "revision": "51cbe7764a06e95b77723f99fd47f201"
  },
  {
    "url": "assets/js/16.b156def9.js",
    "revision": "66da80b15bbc8ac742bbcb93acce280a"
  },
  {
    "url": "assets/js/17.0e302b47.js",
    "revision": "0f7c4ce7cfd330f4165b2d71b14a1253"
  },
  {
    "url": "assets/js/18.5b9faec3.js",
    "revision": "228828cb2105f442d31d6835447c1afc"
  },
  {
    "url": "assets/js/19.ff8dc3b4.js",
    "revision": "142af2d3795608b907c84b3aeab6c781"
  },
  {
    "url": "assets/js/2.10f82196.js",
    "revision": "795402f5e66248de9a640b27d68d74d9"
  },
  {
    "url": "assets/js/20.19024c12.js",
    "revision": "3d2198e1c7428baa66c0434090e93afc"
  },
  {
    "url": "assets/js/21.5f1e2007.js",
    "revision": "8b015bc0d6482e370fead2c2a68fd652"
  },
  {
    "url": "assets/js/22.683c84a8.js",
    "revision": "6f52cd3e59604d88fa6552f51312d403"
  },
  {
    "url": "assets/js/23.60e09e36.js",
    "revision": "a1cc89f8d45f4de9f37e6b692e556afe"
  },
  {
    "url": "assets/js/24.eab0b905.js",
    "revision": "c82930f4347923743096d76d3ec82d3b"
  },
  {
    "url": "assets/js/25.11dc5d18.js",
    "revision": "e16efd4b84776bb381054252c628aa76"
  },
  {
    "url": "assets/js/26.12cc21ed.js",
    "revision": "7ca25977e156a67c663e20aec5696c09"
  },
  {
    "url": "assets/js/27.af20d861.js",
    "revision": "4e106f161b92b6ab47b3d3dcc3da5916"
  },
  {
    "url": "assets/js/28.3677d706.js",
    "revision": "fb1fdfd80c6b78a3f04e35272e27daa7"
  },
  {
    "url": "assets/js/29.9407e25b.js",
    "revision": "f11b0b00f119333d931c6d49bc180cf7"
  },
  {
    "url": "assets/js/3.5856a540.js",
    "revision": "62ea7777b83d10b4eed813ef0e53bd53"
  },
  {
    "url": "assets/js/30.f4b824e6.js",
    "revision": "9ddea12ef7da8c8f875a9d95a295ffeb"
  },
  {
    "url": "assets/js/31.8c2f2948.js",
    "revision": "ad53ae213f44b39628c389d52443eb69"
  },
  {
    "url": "assets/js/32.f20e6c1a.js",
    "revision": "d7a146026b3b2f721e14cf9d0d5ca0ef"
  },
  {
    "url": "assets/js/4.1562b0a8.js",
    "revision": "fac3b91c06c6a40f9d64c8c695778d0d"
  },
  {
    "url": "assets/js/5.87ef2bb9.js",
    "revision": "64b22f4aa829b936c5f1fa46f64f1f96"
  },
  {
    "url": "assets/js/6.22f0fef4.js",
    "revision": "7c4998f6fcfe9c9fe15ae0130a361bdd"
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
    "url": "assets/js/9.27d20505.js",
    "revision": "e2c77fc531fb63de82c60a3b7bbd2e47"
  },
  {
    "url": "assets/js/app.7c518096.js",
    "revision": "25cdfce1015da4a052793334553464b4"
  },
  {
    "url": "css/index.html",
    "revision": "b275d3c5346dfba854a710c948deaef1"
  },
  {
    "url": "css/others.html",
    "revision": "a55a15fb357ee358e6ba1d18680e85ce"
  },
  {
    "url": "demo/index.html",
    "revision": "01a5ed16f571130864493ef20cbb5576"
  },
  {
    "url": "demo/suUI.html",
    "revision": "de22d3659f9475e66c9073446685c3f8"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "eac1d749832d84bc29af046e448a06bb"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "a959d37ae3b7542d403f67254815c656"
  },
  {
    "url": "git/index.html",
    "revision": "84db27c7af16b6d051fb4ae9cf0f4a08"
  },
  {
    "url": "index.html",
    "revision": "c6d3a216e6120988c32d4452801f15a5"
  },
  {
    "url": "interview/more.html",
    "revision": "4bce0bac7930eb798729da7798c5b607"
  },
  {
    "url": "interview/quest.html",
    "revision": "0f21adc5c05d3e509aa12f7144c7875a"
  },
  {
    "url": "introduce/index.html",
    "revision": "d3b991517a1d516cc921ab5ced3aa17e"
  },
  {
    "url": "js/axios.html",
    "revision": "013121e8c8870071f885ae117bf72019"
  },
  {
    "url": "js/http.html",
    "revision": "68fefd1a9c4767565ed763ac2601ebd3"
  },
  {
    "url": "js/promise.html",
    "revision": "fa3bc5e6b2c1c37dd2dc3326f91f7514"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "3cec05235f79c8910865c8ce9e5c11b9"
  },
  {
    "url": "react/index.html",
    "revision": "1613270eee9b0a5bf528abc5a2945c02"
  },
  {
    "url": "uniapp/index.html",
    "revision": "381f4196e6eb8dffe15627650a939469"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "7da8f69355b0058e2d44f65740f14862"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "9856f1d300475e12ee0b03bc61ded495"
  },
  {
    "url": "utils/regexp.html",
    "revision": "e9d2b5330543d40d6d097bf3d1cc0d61"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "ad57ae76803b9319b8c91c762147a13a"
  },
  {
    "url": "vue/index.html",
    "revision": "87e152edc2d9d19a412782923af5b9dc"
  },
  {
    "url": "vue/props.html",
    "revision": "6167a7b8b720cd8eba87132e77a7b5e3"
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

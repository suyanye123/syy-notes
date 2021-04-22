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
    "revision": "17c74e10e98d14db3077f5ae3adc558f"
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
    "url": "assets/js/app.f1778526.js",
    "revision": "e69d31b6f5d92200be5779f8023d88cd"
  },
  {
    "url": "css/index.html",
    "revision": "6af2c65349c00e7c1d1633b84fc9d540"
  },
  {
    "url": "css/others.html",
    "revision": "61862b2ef92ceb4365b43fc85607f8f9"
  },
  {
    "url": "demo/index.html",
    "revision": "17742b297ed68132336caec217a1e0ab"
  },
  {
    "url": "demo/suUI.html",
    "revision": "93b6dbe0b33faf1daaf3f51ea53a3ace"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "3d2d83c0008d5a0d6a4227a2013b1dfc"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "d418d4fa9261085083c594a6b9a016c2"
  },
  {
    "url": "git/index.html",
    "revision": "13cb8f76a3bfc8d09583dec2ceceaa7d"
  },
  {
    "url": "index.html",
    "revision": "3365ee131a5a7c22b3f0204d460ec74c"
  },
  {
    "url": "interview/more.html",
    "revision": "df0cb39d6df8f250c2c6d728d08d01b2"
  },
  {
    "url": "interview/quest.html",
    "revision": "2cc0c5e5d9291780ed7e0a90df4b5839"
  },
  {
    "url": "introduce/index.html",
    "revision": "4a917271a46663bfafb069cae64867ca"
  },
  {
    "url": "js/axios.html",
    "revision": "aef701e8bb23f516f6bc850bc2959267"
  },
  {
    "url": "js/http.html",
    "revision": "4c1ac32a963976e04729dff733edde8c"
  },
  {
    "url": "js/promise.html",
    "revision": "0295cb0fb8ae0017ec20330a760db987"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "e3e87d4011cdbcecdad7a32d5580b174"
  },
  {
    "url": "react/index.html",
    "revision": "e58f11f18ed3d6e2e47efdc3f1690c52"
  },
  {
    "url": "uniapp/index.html",
    "revision": "19c22569a2a6280d222f6ade817454b0"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "a7201dbd44fdf868d6109a5e72209b6c"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "058ada8cf070375b3126dcd85183ccdb"
  },
  {
    "url": "utils/regexp.html",
    "revision": "5203b34f4b7f301c17840325a04f27eb"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "a1497d23d99360164305679d318ae849"
  },
  {
    "url": "vue/index.html",
    "revision": "bb0e3b42a0aaec711e164b2b76866fc4"
  },
  {
    "url": "vue/props.html",
    "revision": "8c06ad5b521e71bb91dc9bc0dfe65fdb"
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

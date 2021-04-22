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
    "revision": "dd1f1cff0d48a82ad32b9af397032b70"
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
    "url": "assets/js/14.a62179e7.js",
    "revision": "3e6a18f2fd1b443479134dc81153fc27"
  },
  {
    "url": "assets/js/15.7b08d039.js",
    "revision": "51cbe7764a06e95b77723f99fd47f201"
  },
  {
    "url": "assets/js/16.237569c2.js",
    "revision": "bcd62432b0755b213150227f49ca1cd7"
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
    "url": "assets/js/2.4f9de5bc.js",
    "revision": "795402f5e66248de9a640b27d68d74d9"
  },
  {
    "url": "assets/js/20.19024c12.js",
    "revision": "3d2198e1c7428baa66c0434090e93afc"
  },
  {
    "url": "assets/js/21.d97f1845.js",
    "revision": "142f8eaee2ba0774bad370a167a32467"
  },
  {
    "url": "assets/js/22.64ae1d40.js",
    "revision": "11f8e472ac32867093935862dfb91df0"
  },
  {
    "url": "assets/js/23.ac4038b7.js",
    "revision": "8e575e67cb4a039768d2bf7efdc39265"
  },
  {
    "url": "assets/js/24.4f0ba9c8.js",
    "revision": "0bc5bbcab55a36be02b15fabb574cfe9"
  },
  {
    "url": "assets/js/25.f05eeb31.js",
    "revision": "690a748427c90632dab616ab40cba071"
  },
  {
    "url": "assets/js/26.679e6f89.js",
    "revision": "faf58b3aaa10ad9db3e8317fc56efca6"
  },
  {
    "url": "assets/js/27.875d27f3.js",
    "revision": "ca28382e0ec4b1f168bb5ca12c15001d"
  },
  {
    "url": "assets/js/28.87ce44c2.js",
    "revision": "96113708376ce3ae3d42c3e571346fa6"
  },
  {
    "url": "assets/js/29.9407e25b.js",
    "revision": "f11b0b00f119333d931c6d49bc180cf7"
  },
  {
    "url": "assets/js/3.06d2366e.js",
    "revision": "b8b8f81f23793521dcd728fb9ecf8c74"
  },
  {
    "url": "assets/js/30.5ab40f1a.js",
    "revision": "313feaa95387c558b62550401f9907f3"
  },
  {
    "url": "assets/js/31.b1dd9524.js",
    "revision": "85e99f9b3e29745271e99defd689c174"
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
    "url": "assets/js/9.c2163c6e.js",
    "revision": "92b2df91117b5ad026717084daffb936"
  },
  {
    "url": "assets/js/app.fb9d9f88.js",
    "revision": "d3741ac42733241674b0455f49f31abd"
  },
  {
    "url": "css/index.html",
    "revision": "da5ec81352de6832f9db19befcd85286"
  },
  {
    "url": "css/others.html",
    "revision": "5b68789ffcfbc6e372d27e23bc52b557"
  },
  {
    "url": "demo/index.html",
    "revision": "4ceb9e33f9c4006e36c4ef9249c0d975"
  },
  {
    "url": "demo/suUI.html",
    "revision": "dbe5234802e8cb7980ecbabb07ddb2ab"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "e886db5115578a666de4a668c64f2b3c"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "6f61b5f400cc84a0b573aae1fd5c15bb"
  },
  {
    "url": "git/index.html",
    "revision": "e6bd64fc61457babca6f6bfc775c3782"
  },
  {
    "url": "index.html",
    "revision": "735c998619be0e1ea259b285a429fa1f"
  },
  {
    "url": "interview/more.html",
    "revision": "36b756b9ff4db4be7efd033f77a21f2f"
  },
  {
    "url": "interview/quest.html",
    "revision": "8942410063e8907a48699d606ab055c2"
  },
  {
    "url": "introduce/index.html",
    "revision": "a98d25c8c9900ed4b4b0f4887bb8db98"
  },
  {
    "url": "js/axios.html",
    "revision": "882175e155e47790d98463b63ff53545"
  },
  {
    "url": "js/http.html",
    "revision": "2dc94d9d60f35fa19bc112f600ce1582"
  },
  {
    "url": "js/promise.html",
    "revision": "9a41206f8eeebbb3c4932a641e4e977c"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "6822e4314987f3184fc546a438542701"
  },
  {
    "url": "react/index.html",
    "revision": "87b0b3dd17fcb52bab3c13b926953bf1"
  },
  {
    "url": "uniapp/index.html",
    "revision": "3ccc764df5721aecc47c9af04d302674"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "76662b886642f16051138a13ad78bb42"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "064b4c8e3dba8efaf66f52ffbab93a27"
  },
  {
    "url": "utils/regexp.html",
    "revision": "019373b44a58edb8261558233f723877"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "8273a561acc65a97859aa8d2ef14dee1"
  },
  {
    "url": "vue/index.html",
    "revision": "f2db35505a9c7d64f3387b0b62f0b1e2"
  },
  {
    "url": "vue/props.html",
    "revision": "e445e15aea1be1795a3534597ff11728"
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

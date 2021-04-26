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
    "revision": "f302a37ff58a1b934c55d8d56ce6d606"
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
    "url": "assets/js/13.1ed06492.js",
    "revision": "e633c1db6008623b8e6c3c74a7fe2500"
  },
  {
    "url": "assets/js/14.97578afe.js",
    "revision": "7a2a5baf3b707468af8b793ac2f22ddb"
  },
  {
    "url": "assets/js/15.a8742798.js",
    "revision": "c5b328564faf411b4a6ff830bac179d0"
  },
  {
    "url": "assets/js/16.43890f2f.js",
    "revision": "f3f75f8bddff6e0f36e232c2806620f2"
  },
  {
    "url": "assets/js/17.493f6fc2.js",
    "revision": "e78a892579f356d40d5ed88376084531"
  },
  {
    "url": "assets/js/18.0686becc.js",
    "revision": "bbba77965838b54755af3756ece39577"
  },
  {
    "url": "assets/js/19.3373b5e0.js",
    "revision": "f238c2d6cd42fa984b486872a1b75860"
  },
  {
    "url": "assets/js/2.10f82196.js",
    "revision": "795402f5e66248de9a640b27d68d74d9"
  },
  {
    "url": "assets/js/20.2876586a.js",
    "revision": "0bf44e416eec3da0bbbf41a1e3fca524"
  },
  {
    "url": "assets/js/21.b8c4a6f2.js",
    "revision": "d856182eca3d11ce15796ae99fb4e15c"
  },
  {
    "url": "assets/js/22.46b46e45.js",
    "revision": "159c3b8bfbc22e72614f08013d41f7c9"
  },
  {
    "url": "assets/js/23.43f7ece0.js",
    "revision": "93d9065c6dbcfa47abbf77e71a983262"
  },
  {
    "url": "assets/js/24.4de598ee.js",
    "revision": "9a4bf1320bdacb54ae768aa71c8d3d3d"
  },
  {
    "url": "assets/js/25.55cb722b.js",
    "revision": "f9f397230fa4541c0a29173e08165b84"
  },
  {
    "url": "assets/js/26.6378a728.js",
    "revision": "db49aaac6181e5f465568b47eeb10e5f"
  },
  {
    "url": "assets/js/27.f79f83d0.js",
    "revision": "ebdedff23328c78cad37fd5b3dcc28db"
  },
  {
    "url": "assets/js/28.ae1e1fe9.js",
    "revision": "7c1cf06722fc15b33d43cfbbde3387ed"
  },
  {
    "url": "assets/js/29.c9689a07.js",
    "revision": "4e4b0ec4d2cd03b5d615417d8166a254"
  },
  {
    "url": "assets/js/3.e9d509e2.js",
    "revision": "1e8fee23521942e13ec580a90e5796d0"
  },
  {
    "url": "assets/js/30.4e8564a9.js",
    "revision": "9424cb2994d4d0d2d66aedbb8a42030c"
  },
  {
    "url": "assets/js/31.df836c2b.js",
    "revision": "e4edc075edac3f89db855e188404c9e9"
  },
  {
    "url": "assets/js/32.4ce93638.js",
    "revision": "f2b5676709153a3d5cfffbdb9037d474"
  },
  {
    "url": "assets/js/33.974a1f05.js",
    "revision": "929b094d33d6da228554c3c913d3caf9"
  },
  {
    "url": "assets/js/34.e85a481f.js",
    "revision": "8e962e15756ea89ee6207dc2fa5a1794"
  },
  {
    "url": "assets/js/35.c416cefb.js",
    "revision": "1e79d5c0f64e6bf465ab92917093ae5b"
  },
  {
    "url": "assets/js/36.de452094.js",
    "revision": "058e5674abe6a65d3277095d3a6329ef"
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
    "url": "assets/js/7.42403252.js",
    "revision": "95989333669bd9f355dea40c4719f23c"
  },
  {
    "url": "assets/js/8.4e11346a.js",
    "revision": "aa91d71d7eba4d8829ed10bfc7d54009"
  },
  {
    "url": "assets/js/9.704c2efd.js",
    "revision": "192f52db667abbe13f16da0f018d2aff"
  },
  {
    "url": "assets/js/app.eb01d057.js",
    "revision": "2d1dafd9654d06b43f7f30af758cdb5a"
  },
  {
    "url": "css/canvas.html",
    "revision": "7834314389ba5313f3ed6ec1a6444b9f"
  },
  {
    "url": "css/index.html",
    "revision": "f661cc80e367cb31400fa55b38cb7a96"
  },
  {
    "url": "css/others.html",
    "revision": "38ad7daacf946a4fff31677924045f49"
  },
  {
    "url": "demo/index.html",
    "revision": "a0c7e9e993bfe33ada1cb0aaab34040c"
  },
  {
    "url": "demo/suUI.html",
    "revision": "57aedba1b694f88244ed1c904c772198"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "f7b54364a3b915cb1f50231c43f5eba6"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "11cb7372069c92a468e2e998890c77e9"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "3739812034661a1268a061d4db957caf"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "fdcb13ff2ba344e2005f88ba523c5bad"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "2dd78ccf651a5f902dd72e70180b533a"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "3303a6404ec88d8a07ef6c7381f3d764"
  },
  {
    "url": "git/index.html",
    "revision": "bfd9963b841cc0a1fde205211903079a"
  },
  {
    "url": "index.html",
    "revision": "a73e062b3957769981ebde0f125ebaa4"
  },
  {
    "url": "introduce/index.html",
    "revision": "a3a0267a12b402361608bf210bf9a6c9"
  },
  {
    "url": "js/axios.html",
    "revision": "868fef22e6bf93af11407a67c96fcdf1"
  },
  {
    "url": "js/http.html",
    "revision": "7cb3ea6ca58fa2ff4c91d612174c6bff"
  },
  {
    "url": "js/promise.html",
    "revision": "68be34342bb64e8eba9cea91fd5138eb"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "a7263e2e2417cf08aab30c9c63f59ffd"
  },
  {
    "url": "uniapp/index.html",
    "revision": "b7b4b0b2d2b55ea660ca50ac47a86e4f"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "976bd7f4b060273ee83b6f08a4a54a97"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "d56e74c1a61042d082bcce7fee3d59d0"
  },
  {
    "url": "utils/index.html",
    "revision": "04babf2c8e17c574d4bafaadee6ca5a5"
  },
  {
    "url": "utils/regexp.html",
    "revision": "ceb24df0fb6c794a5d33aa8c0745ed7c"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "aaad7319e68f25aeaf52790842132466"
  },
  {
    "url": "vue/index.html",
    "revision": "daf33235629ff0edc85527b0eff1f355"
  },
  {
    "url": "vue/props.html",
    "revision": "59f7098da63148a7179d9d1504b810f0"
  },
  {
    "url": "webGL/index.html",
    "revision": "1f6ed783b33d5f582fcfc4f20c330ccc"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "58f3bea867ebb1c54aef21f943eb1b8f"
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

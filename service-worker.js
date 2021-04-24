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
    "revision": "dd9d6715bbf91605b65979ab1e29af20"
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
    "url": "assets/js/13.01b758a8.js",
    "revision": "5d37438282794873ce52eb17744c48f5"
  },
  {
    "url": "assets/js/14.97578afe.js",
    "revision": "7a2a5baf3b707468af8b793ac2f22ddb"
  },
  {
    "url": "assets/js/15.5adecdc2.js",
    "revision": "648242a3976919d04e5188e22b1dd189"
  },
  {
    "url": "assets/js/16.9489e5fa.js",
    "revision": "3b25cb8f6ebf33390a40e452a7aaeddd"
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
    "url": "assets/js/19.1151893a.js",
    "revision": "9dd60f1eab0e46d90d4cc64e0e20ba0f"
  },
  {
    "url": "assets/js/2.10f82196.js",
    "revision": "795402f5e66248de9a640b27d68d74d9"
  },
  {
    "url": "assets/js/20.fa58389b.js",
    "revision": "3aac394c5e80b86464606476ff032d49"
  },
  {
    "url": "assets/js/21.c2cf05f0.js",
    "revision": "5bd77ae7032bf4d0f147eddaaf7bd1b5"
  },
  {
    "url": "assets/js/22.16d2e6a6.js",
    "revision": "fce04042fc256be145b4701d398ae810"
  },
  {
    "url": "assets/js/23.70b07d3f.js",
    "revision": "07cf740d8ebc8ba78e32d2fd3734d54e"
  },
  {
    "url": "assets/js/24.96d2433a.js",
    "revision": "6620b4e6580cbd19a86733d4d799529b"
  },
  {
    "url": "assets/js/25.a054ff7a.js",
    "revision": "8d83a24b2ab612f794bda4e2a3bd29a3"
  },
  {
    "url": "assets/js/26.cd786ad1.js",
    "revision": "c7196ab89461a0fd4d6572e177374d11"
  },
  {
    "url": "assets/js/27.6a000727.js",
    "revision": "9922f5053be414e1c308016320faa307"
  },
  {
    "url": "assets/js/28.dcdc38be.js",
    "revision": "acf5db47233dd9ecff5797c9941fef52"
  },
  {
    "url": "assets/js/29.d4aefd82.js",
    "revision": "c76d54bbbd63a7577d1f6321cb68e865"
  },
  {
    "url": "assets/js/3.e9d509e2.js",
    "revision": "1e8fee23521942e13ec580a90e5796d0"
  },
  {
    "url": "assets/js/30.7ec488e3.js",
    "revision": "a6be26ef59124e2f8596bebb12fe9938"
  },
  {
    "url": "assets/js/31.0a615ef9.js",
    "revision": "7da70648516d19918b9957e42757907a"
  },
  {
    "url": "assets/js/32.4ab040f3.js",
    "revision": "c8be8fa6183214dadb596085d6b411ca"
  },
  {
    "url": "assets/js/33.9ae80380.js",
    "revision": "54ed1c5f21eaebb461b34acdab5cfef5"
  },
  {
    "url": "assets/js/34.6e293e20.js",
    "revision": "626a9f4735634c60fc146f9b69be16a7"
  },
  {
    "url": "assets/js/35.0e6228e8.js",
    "revision": "fca15400de6dd802386beb5ba4880ac7"
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
    "url": "assets/js/6.222ea5c2.js",
    "revision": "da4645397f698bd188d97cdcad733437"
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
    "url": "assets/js/9.9affa22d.js",
    "revision": "d3380032232da4918ce644111ebd2764"
  },
  {
    "url": "assets/js/app.278b4928.js",
    "revision": "84940cbe3e66a65a339dc0ffb1e722ca"
  },
  {
    "url": "css/canvas.html",
    "revision": "8b5facc3a3b04d0d12e933e2e466d553"
  },
  {
    "url": "css/index.html",
    "revision": "ff4705d9f36d5a387fd77b7f1b7e91e9"
  },
  {
    "url": "css/others.html",
    "revision": "5e192ad99f4bdab6df6bbe6bea75d145"
  },
  {
    "url": "demo/index.html",
    "revision": "61fc81b4241a70239e54d17417e93eb2"
  },
  {
    "url": "demo/suUI.html",
    "revision": "71b15f91fe5fa5ede27debc3619e8fc3"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "df3537f201efb533ca92768448524981"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "59fc422710db4f2fe684752204eb9854"
  },
  {
    "url": "git/index.html",
    "revision": "0c0621f83ca83d031edde2aabf126f54"
  },
  {
    "url": "index.html",
    "revision": "4ed3e1cddd230470048b84430e336557"
  },
  {
    "url": "interview/more.html",
    "revision": "a8fd7749ca4f252f847357e7f4b6b6d6"
  },
  {
    "url": "interview/quest.html",
    "revision": "42309d0e64381b918dcccec5a70801e8"
  },
  {
    "url": "introduce/index.html",
    "revision": "518133dc330a71ad913f6ad59baee2e8"
  },
  {
    "url": "js/axios.html",
    "revision": "9963412c3cdce0f84893b7d746958d6b"
  },
  {
    "url": "js/http.html",
    "revision": "0f13d031b95d66465061c76c4101f53d"
  },
  {
    "url": "js/promise.html",
    "revision": "421eb6588f39a523c69884aadeb66933"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "3277b7d92a064468ba3335f2b2771d33"
  },
  {
    "url": "react/index.html",
    "revision": "8ad2b6dfc3aa727544a0c7654807bfa9"
  },
  {
    "url": "uniapp/index.html",
    "revision": "65938534e449913ee13a25bc1f2172fc"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "b365156ae9de259aa6c6029249538483"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "ae88b3bf533a7b21f36371db2a482b32"
  },
  {
    "url": "utils/index.html",
    "revision": "c21276705f2bd3c3c46203ac825c8193"
  },
  {
    "url": "utils/regexp.html",
    "revision": "d19cff92d5c387e7f82cf3de88f4154b"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "b1da1351dc48ef6e041c30e3497db244"
  },
  {
    "url": "vue/index.html",
    "revision": "9f8cb5c2fe32e15f88f10852019fc782"
  },
  {
    "url": "vue/props.html",
    "revision": "749818654fc2462cfba196b91c3a6cb3"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "13f4a02b7601f584a68516d86269296b"
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

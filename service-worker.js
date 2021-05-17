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
    "revision": "818f7143afadffafa7122a49254683fd"
  },
  {
    "url": "assets/css/0.styles.fa044e56.css",
    "revision": "d3cb707888ffe376ecee31722655d62d"
  },
  {
    "url": "assets/img/centos.18697def.png",
    "revision": "18697defc99b9931e18a98816fd120c9"
  },
  {
    "url": "assets/img/docker.387c35f8.png",
    "revision": "387c35f8073446da2fb009ded50a9b70"
  },
  {
    "url": "assets/img/dockertag.823ccb83.png",
    "revision": "823ccb83997ae72e6c96489bdfeab0ee"
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
    "url": "assets/img/xcx.96db5056.jpg",
    "revision": "96db50562c2065352aa568e7e1ac5d98"
  },
  {
    "url": "assets/js/10.e8b346da.js",
    "revision": "8aa518239434fe43a70faa737225067c"
  },
  {
    "url": "assets/js/11.3ffab2ed.js",
    "revision": "48a4c3a36029721de3832723536ccaa5"
  },
  {
    "url": "assets/js/12.5b911ecc.js",
    "revision": "25d16bde30e9c1c09854335ec3e22f0e"
  },
  {
    "url": "assets/js/13.5b6e0387.js",
    "revision": "828f33381dc1efef8dde26d9eb6af946"
  },
  {
    "url": "assets/js/14.d945031c.js",
    "revision": "e9bfb316036a370dce70a4b1b5c69c75"
  },
  {
    "url": "assets/js/15.e678d0a3.js",
    "revision": "92718c1c1d1f167f0f7a1b89212abfb0"
  },
  {
    "url": "assets/js/16.952bb93b.js",
    "revision": "f7dbdd60e1a7b9708fc19ea9dbb98dc0"
  },
  {
    "url": "assets/js/17.ccf74f66.js",
    "revision": "b3f737e9ea822b61f3a62f8e3e7ca4b1"
  },
  {
    "url": "assets/js/18.37b302d5.js",
    "revision": "d76f131d566025b78cc71e4bae8bc755"
  },
  {
    "url": "assets/js/19.0a4bb509.js",
    "revision": "dc5f1769259f05dcf5a2037713cbeb3e"
  },
  {
    "url": "assets/js/2.9a17a9ee.js",
    "revision": "d6b33ca72e7d83d3e59bc19e1116a8ec"
  },
  {
    "url": "assets/js/20.da1b5d69.js",
    "revision": "f7ddf463b92f94c72b2285ac6018c520"
  },
  {
    "url": "assets/js/21.957c3bcc.js",
    "revision": "a48ce91b0853644b424a31aad0374627"
  },
  {
    "url": "assets/js/22.b53ba1ac.js",
    "revision": "5d9a356348d44eebf83d590e219e1e6f"
  },
  {
    "url": "assets/js/23.6f06d5d7.js",
    "revision": "bbb824b293309e690eb983ea9a66f61a"
  },
  {
    "url": "assets/js/24.6eb6b29a.js",
    "revision": "472cb96f04003611f5d0ddc997218242"
  },
  {
    "url": "assets/js/25.3f528f60.js",
    "revision": "575ec6e1e5f2ae7b4e88c319567485fc"
  },
  {
    "url": "assets/js/26.f944daf9.js",
    "revision": "5c0d5b40e3f9c5e4efd53a135cb33c74"
  },
  {
    "url": "assets/js/27.b3d83e4c.js",
    "revision": "bf94e742d215fbcff9bf92e208848e9a"
  },
  {
    "url": "assets/js/28.0e5f85b6.js",
    "revision": "a50c1b774e88b8b13cd0edc17f069fff"
  },
  {
    "url": "assets/js/29.e459066d.js",
    "revision": "0d9fe6089d36240c74cba9850bb46b04"
  },
  {
    "url": "assets/js/3.9273ff26.js",
    "revision": "748d42c2d1bf7ba03e60b3377e91c497"
  },
  {
    "url": "assets/js/30.8234c7de.js",
    "revision": "510340e9cdedbf309d4d1ee6d5fa2573"
  },
  {
    "url": "assets/js/31.6ab9195a.js",
    "revision": "f3705b170894880d22954ef39f3bf7cc"
  },
  {
    "url": "assets/js/32.7126af1b.js",
    "revision": "812ceeb10a675e423391caa247c29dcf"
  },
  {
    "url": "assets/js/33.75308143.js",
    "revision": "b33ac7dc495bcfa15c92cec977401575"
  },
  {
    "url": "assets/js/34.105ac854.js",
    "revision": "beff02e03deb7f93bbd911901fa70c5f"
  },
  {
    "url": "assets/js/35.4eb6a9e1.js",
    "revision": "cc4415589e0be6ed2496650b8bf959bd"
  },
  {
    "url": "assets/js/36.79f42700.js",
    "revision": "32ad3e1a7e9834f11a610c64c2c8cc30"
  },
  {
    "url": "assets/js/37.9142401c.js",
    "revision": "e8447423b55aa1d73981503cd2b2f7c9"
  },
  {
    "url": "assets/js/38.49a0ab2c.js",
    "revision": "c895606f092d463958ade3353c240f87"
  },
  {
    "url": "assets/js/39.a231fb7f.js",
    "revision": "fc9856a33f51ad18bb8eaf30bd7cc4f8"
  },
  {
    "url": "assets/js/4.18169195.js",
    "revision": "6a9cf91a8c057a9302bb5c620f9c6665"
  },
  {
    "url": "assets/js/40.07fcb23e.js",
    "revision": "75f456d8b754b379074921e2a6993aee"
  },
  {
    "url": "assets/js/41.a76b22ef.js",
    "revision": "5d8fce1f0ccca0fc7290c77a56cfec87"
  },
  {
    "url": "assets/js/42.47e4eb69.js",
    "revision": "bde44c1c140d9f6243f9bcbdee74ad55"
  },
  {
    "url": "assets/js/43.05db6585.js",
    "revision": "c1ad7bf68bd7e22bee80b5b4ad326b16"
  },
  {
    "url": "assets/js/44.58ea72c4.js",
    "revision": "cf46268d17806cd9469ae3fb66b6a36b"
  },
  {
    "url": "assets/js/5.9e51e156.js",
    "revision": "3ba547a10d7f610e26ba88c76543e11f"
  },
  {
    "url": "assets/js/6.6df92ed0.js",
    "revision": "c07a13dbc0e08e4a915e26c9badcba81"
  },
  {
    "url": "assets/js/7.8c0de395.js",
    "revision": "bf50358ff179fb88cf11378cd0398ce7"
  },
  {
    "url": "assets/js/8.dd2136db.js",
    "revision": "d51514de139c975a199827ace4b85431"
  },
  {
    "url": "assets/js/9.e6f0cc36.js",
    "revision": "0493e0aba4631fa3efa6455906436f35"
  },
  {
    "url": "assets/js/app.a257e03e.js",
    "revision": "fec5626f612b4566bc13e0795e2e262e"
  },
  {
    "url": "css/canvas.html",
    "revision": "70da4cf226622268bc1c54e6a3fa0066"
  },
  {
    "url": "css/layout.html",
    "revision": "7e7fe19a3220e3e5f6b55cc35fcf5fe3"
  },
  {
    "url": "css/others.html",
    "revision": "1f2b892bd4f3e319dfedd9e4ed4bd934"
  },
  {
    "url": "css/xuanran.html",
    "revision": "a39d4df87daf44a685d3aa05e17533e3"
  },
  {
    "url": "demo/docker.html",
    "revision": "3446228a51f3bf85c2741930f908d6ad"
  },
  {
    "url": "demo/index.html",
    "revision": "8dcc9cbcc1e7953986be528d8a183af7"
  },
  {
    "url": "demo/suUI.html",
    "revision": "2044f50fb62bffecd5a3e9a39a93dac7"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "9bcd7eef4364562b8364d5ff7c672921"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "4714acd1dcb49dcf93c1177fd5e00311"
  },
  {
    "url": "demo/yanye.html",
    "revision": "0b7e2cb58bba1ce7aebefc7c8a1f6071"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "6dc22675017587ececa7b71cda9a5107"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "18cff87e491d1cef199ce286e2aec4d0"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "8e443f6550fb02b47c56577b088aaf30"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "5b713c4c42dc0a351858d3c6707623eb"
  },
  {
    "url": "git/index.html",
    "revision": "9063685e8f67188e7aca6cf31c3c5137"
  },
  {
    "url": "index.html",
    "revision": "75fbcc48403cbdfe242fd24c0eb2357d"
  },
  {
    "url": "introduce/index.html",
    "revision": "24fc7b786e2f37121ed088add9d3a826"
  },
  {
    "url": "js/axios.html",
    "revision": "7506b4ab59c7b34a334032070493095a"
  },
  {
    "url": "js/basic.html",
    "revision": "aa5b805168fd4ae3e911249da701a309"
  },
  {
    "url": "js/promise.html",
    "revision": "5431c680eaad8c3086ee5a76cfcb30ca"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "183572eafb95aae6c93eb8f6c6624661"
  },
  {
    "url": "mytools/linux.html",
    "revision": "3b9e599562ca095c80ee0eb485f1cd40"
  },
  {
    "url": "uniapp/index.html",
    "revision": "cd5b3bb46eeff07cc6c9be9f36dfff65"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "4d78631b26c93fea2867440463dcff5c"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "d631855c5f9b56cfd469b171e2e603b4"
  },
  {
    "url": "utils/index.html",
    "revision": "bc95c534a76e4af2e3c7a1471159f92a"
  },
  {
    "url": "utils/regexp.html",
    "revision": "b4d4517b5e1ffe18eef5ed8b52120398"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "90eb169b86b4460a81e9a8befd872ec1"
  },
  {
    "url": "vue/diff.html",
    "revision": "ba3904358bcb103a039e64700ba32774"
  },
  {
    "url": "vue/props.html",
    "revision": "dbb7aa85d183ba81477aff3c5825bad1"
  },
  {
    "url": "vue/react.html",
    "revision": "f82865ab215cbad5b77ced56a49e3b97"
  },
  {
    "url": "vue/webpack.html",
    "revision": "ea3199f1f31a318bf488263ead8d05ec"
  },
  {
    "url": "webGL/index.html",
    "revision": "afca9af2176417d3cb4d0179e37b94ce"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "0cbf0ecf45f7a709ed28f9c79141bb88"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "b836b50e2bdbc4125d84be381900ee8a"
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

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
    "revision": "da1a5b3501aaf3bad76f6a841e985727"
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
    "url": "assets/js/27.5740836e.js",
    "revision": "436ae93eda3faf632d3b6c5f2f0ddfd1"
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
    "url": "assets/js/38.20329375.js",
    "revision": "259b971f4348a9cdccd69d4956faea4b"
  },
  {
    "url": "assets/js/39.4996f640.js",
    "revision": "065188bbe4035f88a8a8fe54f61a2ebe"
  },
  {
    "url": "assets/js/4.18169195.js",
    "revision": "6a9cf91a8c057a9302bb5c620f9c6665"
  },
  {
    "url": "assets/js/40.43001f29.js",
    "revision": "870df9811be6f7b079bf71bddca0eea3"
  },
  {
    "url": "assets/js/41.c7adfbbe.js",
    "revision": "ef3de163f40f308cf6ae688cccd0644d"
  },
  {
    "url": "assets/js/42.06783a95.js",
    "revision": "c7dbfb8d2872b02b2df88135b84ecfc4"
  },
  {
    "url": "assets/js/43.7b9cbb4d.js",
    "revision": "b0789e866e0c17123f001a9ca9555093"
  },
  {
    "url": "assets/js/5.9e51e156.js",
    "revision": "3ba547a10d7f610e26ba88c76543e11f"
  },
  {
    "url": "assets/js/6.c7107f35.js",
    "revision": "dc2ceefa305f36a198744bd48fa4f460"
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
    "url": "assets/js/app.90ed17ea.js",
    "revision": "70614e85ab49b4254d3f4ada1e89513f"
  },
  {
    "url": "css/canvas.html",
    "revision": "7693f557043f4c166700cde42d58cd51"
  },
  {
    "url": "css/layout.html",
    "revision": "1f12325e4f5c7f97e87eade34e561952"
  },
  {
    "url": "css/others.html",
    "revision": "d3128cb8b5f92394f9796a770b8038f1"
  },
  {
    "url": "css/xuanran.html",
    "revision": "9513ef946cf0f51547e9e6c6eca7e20d"
  },
  {
    "url": "demo/docker.html",
    "revision": "b469acdfa3253053893736b11d7f2794"
  },
  {
    "url": "demo/index.html",
    "revision": "93af56259158cb27287d055a49d8f610"
  },
  {
    "url": "demo/suUI.html",
    "revision": "86f420b908c397fb089eae535592ec96"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "bbe66a71b627a2838d17ce03dce27833"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "4d8db3229175b5cdffefaf54a3f75103"
  },
  {
    "url": "demo/yanye.html",
    "revision": "3657acc0d5dca66e9d8f02ad450704f5"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "a9aa10f18089dcd9fd4a06a10917d044"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "d1b41b49c99d04bd1231892871bc12bc"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "ca6ba954438ef868eca8ad59a0c12a80"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "c3220781d86895cf1e0fdd30a7c48520"
  },
  {
    "url": "git/index.html",
    "revision": "ec54ae24a25821af0af6f45b17723984"
  },
  {
    "url": "index.html",
    "revision": "eab3c3c24085d735ca629a685a522169"
  },
  {
    "url": "introduce/index.html",
    "revision": "a0da866d89e89e14cb9cd643d7ac5439"
  },
  {
    "url": "js/axios.html",
    "revision": "9da5ca1cdef7fc99561d8d5102bcdf63"
  },
  {
    "url": "js/basic.html",
    "revision": "65b43423d4d388c90627ea9bcc0dcbd3"
  },
  {
    "url": "js/promise.html",
    "revision": "38cece237e5df0fdf92dd7e460a4e187"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "b343fb68812cb9840550ce8563fd7b5b"
  },
  {
    "url": "mytools/linux.html",
    "revision": "0a3cb9957741d6de6bd2074796902cf8"
  },
  {
    "url": "uniapp/index.html",
    "revision": "d7790edaa6b3b2996d82f2301537b347"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "1136ef544e5373cf2523d445057cd2d1"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "d9880006414728b71f36b4590ac84b0b"
  },
  {
    "url": "utils/index.html",
    "revision": "186ef37660302166ac31929ce7e9432a"
  },
  {
    "url": "utils/regexp.html",
    "revision": "10bf76f8d5f37e13eeb4a1dc20997556"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "69a23f46cf1b2c49dce571e98bc625ab"
  },
  {
    "url": "vue/diff.html",
    "revision": "93abae3a50f066f5d36e52b7508bf716"
  },
  {
    "url": "vue/props.html",
    "revision": "da9426574700810fa70b57fbdcb89147"
  },
  {
    "url": "vue/webpack.html",
    "revision": "e9df86a0f3305fdd039dbd52e5c387c7"
  },
  {
    "url": "webGL/index.html",
    "revision": "02bf56a5f311758f4bc43bd7831051fa"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "8a0ee5416e0a12f536b2f53ee24504ec"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "d9f3e2406183e07b8f70ac0296067dcf"
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

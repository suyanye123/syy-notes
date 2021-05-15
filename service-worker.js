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
    "revision": "e61c2bf9dcd25f02d2d826cdfed964c2"
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
    "url": "assets/js/app.ec983e41.js",
    "revision": "2c781f45d18d2242af2122e5f8bc55c7"
  },
  {
    "url": "css/canvas.html",
    "revision": "c8f9448e0427b3b3eee461ecdaeb7efd"
  },
  {
    "url": "css/layout.html",
    "revision": "3a00b62a1968175ac7445c0bfbaca356"
  },
  {
    "url": "css/others.html",
    "revision": "2e82f19cde25c16835726d2f0adb7908"
  },
  {
    "url": "css/xuanran.html",
    "revision": "4a380f9e8f5421a2eef5bb073caec08e"
  },
  {
    "url": "demo/docker.html",
    "revision": "5f2f52713b88a202be6f638b8c42d378"
  },
  {
    "url": "demo/index.html",
    "revision": "4fb9d7d7c03d58a824cb760404a6a17e"
  },
  {
    "url": "demo/suUI.html",
    "revision": "5b73a1d7ecb0e0796ea569c5e4504378"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "72a756ad2f796246eb00514f31cad075"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "6968708014953cd56901613ed9aba19e"
  },
  {
    "url": "demo/yanye.html",
    "revision": "e3efccb91a2d9930290df93e6fc39a6e"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "05aaec913996b22e51d7927aca0f3dcd"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "3e3317474c0b6adfa939bd77a647a398"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "02d82d79ac16cf0200d625ca07a9bb3e"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "4d70d9ea97dddc9a351a764b9b6c0deb"
  },
  {
    "url": "git/index.html",
    "revision": "944624ea3017d1cdef649544280dcd28"
  },
  {
    "url": "index.html",
    "revision": "059b0f0317e436d788c01294fbb7cbfc"
  },
  {
    "url": "introduce/index.html",
    "revision": "93af84bde787d17d4126870ab3af4ba6"
  },
  {
    "url": "js/axios.html",
    "revision": "fede862a0949940b4055486216b48321"
  },
  {
    "url": "js/basic.html",
    "revision": "9a4475951d5032160f51ef5f8a2c88c2"
  },
  {
    "url": "js/promise.html",
    "revision": "1f63fbe54af7a7761b3605069ac036a4"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "ca8a689a17e0c410d559af9f1fd8dce3"
  },
  {
    "url": "mytools/linux.html",
    "revision": "98b90716189abe6b883fa82b28cd4143"
  },
  {
    "url": "uniapp/index.html",
    "revision": "d0b1e77b62a3a0adb3c034eeff9fab6b"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "2597cfe45f9a43d0de08b42bca453710"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "1f36755357f9f3dcea9855d9574a402d"
  },
  {
    "url": "utils/index.html",
    "revision": "86a33683dcde48e10db15150c28c7039"
  },
  {
    "url": "utils/regexp.html",
    "revision": "ec46c85a18e568d047be16f1935ab10a"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "caa5f300f6f0b5fdd2a53a649092ddda"
  },
  {
    "url": "vue/diff.html",
    "revision": "d9a7ef2558033c4e230767cb96dbb5b9"
  },
  {
    "url": "vue/props.html",
    "revision": "ade321a2d1db241c0e855d49f37dd236"
  },
  {
    "url": "vue/webpack.html",
    "revision": "418989a46ad190d75b34ce1018fbe779"
  },
  {
    "url": "webGL/index.html",
    "revision": "4c83bc2fcb4433ad563a4641eaa47bab"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "a9cffb17b931a5a014591990de8e1b83"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "79cc10e1feabf49723fdfd6e57bc16f5"
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

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
    "revision": "6b7cc1d3644c009fcda96f16c413af26"
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
    "url": "assets/js/app.22668649.js",
    "revision": "d815f7bdb09f6e30f257fbf7bc8cf688"
  },
  {
    "url": "css/canvas.html",
    "revision": "601f466765a04b7a20193ab79926d8bb"
  },
  {
    "url": "css/layout.html",
    "revision": "216dd44147c9b37f687d46c275428eca"
  },
  {
    "url": "css/others.html",
    "revision": "f6ff75a8da0970158013883040a59042"
  },
  {
    "url": "css/xuanran.html",
    "revision": "58a5f8fe2291eaecd14bfa5333a2c852"
  },
  {
    "url": "demo/docker.html",
    "revision": "97a46bd31330f1bcb090f504b09daa4f"
  },
  {
    "url": "demo/index.html",
    "revision": "3281763dc6dddb48e74c1f4a48a451e2"
  },
  {
    "url": "demo/suUI.html",
    "revision": "3f0e1b0f1842cd58ce3475f28e360491"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "82758cd2d273e98bba20b6167965e3ac"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "5c822aa7c982950f2d222b73beeea12d"
  },
  {
    "url": "demo/yanye.html",
    "revision": "91baa9571b1277c332aef64558401040"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "c1bc9f02e428ce2e3acf883e95c579ad"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "4e456d463c7c92b7beb9bf508d36f092"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "18ab643f6ee6816e1b0649ab08595311"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "4e42012a092c0500ea26a2698c17604b"
  },
  {
    "url": "git/index.html",
    "revision": "924f6620851434d56af414207e948c37"
  },
  {
    "url": "index.html",
    "revision": "bcfb0525e5ce51d36e2184c569944b01"
  },
  {
    "url": "introduce/index.html",
    "revision": "62d904f7ee42f9e829d73e732af2b1f7"
  },
  {
    "url": "js/axios.html",
    "revision": "90faa82b6395287f113b826af2a54940"
  },
  {
    "url": "js/basic.html",
    "revision": "22a2b8235f9c0b77387dfde913d256fe"
  },
  {
    "url": "js/promise.html",
    "revision": "833a7212b02919c64e5fe0bf83fffa9a"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "d43bc34ed89975bc986df3761d59aa7c"
  },
  {
    "url": "mytools/linux.html",
    "revision": "a358adc7220a2545fe9b4e6ccf483851"
  },
  {
    "url": "uniapp/index.html",
    "revision": "70154f67bbe64f7e4363083d430a0663"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "0c2aa3e03e7e96488ea232d8fb88625e"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "c0bb06510bd56209f79ad766d1e16626"
  },
  {
    "url": "utils/index.html",
    "revision": "310a3207a1ac1d80f4f88def3911d513"
  },
  {
    "url": "utils/regexp.html",
    "revision": "842f58b47f20382a7d898c8c9da3f360"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "5525ce2655062b1de761fb35af1f9c4f"
  },
  {
    "url": "vue/diff.html",
    "revision": "7390d4dff4ae674af9f91c6da1ff98d7"
  },
  {
    "url": "vue/props.html",
    "revision": "64f85734fb9bb296866e57f490d2fbd8"
  },
  {
    "url": "vue/webpack.html",
    "revision": "7483510a13b310d39bba4a7954ef62b2"
  },
  {
    "url": "webGL/index.html",
    "revision": "07b6580fe705546b1e98a81021621701"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "e4c78ebe3cee1d5d74371e2b14bad953"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "7cb85721c2abe569ac7db2052bd17e85"
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

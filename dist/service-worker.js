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
    "revision": "6d22b926f039f01dd12965a8d0d576d2"
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
    "url": "assets/js/11.801c2fb3.js",
    "revision": "13556f590025368c176a0d9de28ba718"
  },
  {
    "url": "assets/js/12.9da13134.js",
    "revision": "fb000bdfb01794b28e2d3761aae45d2f"
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
    "url": "assets/js/16.4a62961a.js",
    "revision": "ad81e38d5b4f0e7a226b9d526f91c0ce"
  },
  {
    "url": "assets/js/17.c8939ee3.js",
    "revision": "f4a92a524ea82a0a7ad955cd0c3164ed"
  },
  {
    "url": "assets/js/18.78b87357.js",
    "revision": "d92af089f032ce0879a8678cec43b894"
  },
  {
    "url": "assets/js/19.9c12f60c.js",
    "revision": "1764d60c965ddb266693e7183c7349b8"
  },
  {
    "url": "assets/js/2.866f3439.js",
    "revision": "d6b33ca72e7d83d3e59bc19e1116a8ec"
  },
  {
    "url": "assets/js/20.186306ec.js",
    "revision": "0a63b7f1d7752b1482cd12a8a6532deb"
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
    "url": "assets/js/26.44b5dd6d.js",
    "revision": "154326aaf12dc3336b68ebbd3d0a52c3"
  },
  {
    "url": "assets/js/27.5740836e.js",
    "revision": "436ae93eda3faf632d3b6c5f2f0ddfd1"
  },
  {
    "url": "assets/js/28.0e24986e.js",
    "revision": "592c43a800f8720502b9672461d7295f"
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
    "url": "assets/js/30.9fc5ee96.js",
    "revision": "ec2895a5073801035e3900241ac4dd0b"
  },
  {
    "url": "assets/js/31.08ae3514.js",
    "revision": "60117475f712b63ddef6c06d08baac78"
  },
  {
    "url": "assets/js/32.648efda3.js",
    "revision": "e60ee4d4990ce361645ab751453ff014"
  },
  {
    "url": "assets/js/33.9673cd14.js",
    "revision": "63a745fa45afe1c48f8b7dd4dc31fef7"
  },
  {
    "url": "assets/js/34.3edf3855.js",
    "revision": "97444ccc7d18aeb4b0f61fb2727c27d0"
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
    "url": "assets/js/9.409b2fb9.js",
    "revision": "45a1e70cc1a26b5317f7db6fd804a23a"
  },
  {
    "url": "assets/js/app.21b87ce3.js",
    "revision": "99a3029e1f79dcf1c3a0247801105880"
  },
  {
    "url": "css/canvas.html",
    "revision": "191ee38c49fb275dc5184b4636695083"
  },
  {
    "url": "css/layout.html",
    "revision": "428462467ca91ad8a97be8b8a65cee19"
  },
  {
    "url": "css/others.html",
    "revision": "8952fee0cc1704d601aad6f4e1b9810a"
  },
  {
    "url": "css/xuanran.html",
    "revision": "8ef66998f3f0f806d856cb50b3495550"
  },
  {
    "url": "demo/docker.html",
    "revision": "5286ebff1c65dc7dac68009055aace73"
  },
  {
    "url": "demo/index.html",
    "revision": "b3ef79e5169d12d8116c6e2a9fd70d67"
  },
  {
    "url": "demo/suUI.html",
    "revision": "69c2e9995bb7644bc99fe50b824d859b"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "cedc57cdfd6c995de68678b3587b7de2"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "9d6e37d38b0ec9d8eb6565d798532f1f"
  },
  {
    "url": "demo/yanye.html",
    "revision": "6a81239c4af4cdef0ba6c232df75933c"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "95d9ddfef7ab5b933bd31fc70e2abebe"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "79a11c68eedb630451caf7fdd42a2b5d"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "a356ffacd565e1132cd8fbaa5fda6ad0"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "faecdaf74e55af3aa2cbcc62c97e0e5b"
  },
  {
    "url": "git/index.html",
    "revision": "6612484c0d40acc3a6451e833574993f"
  },
  {
    "url": "index.html",
    "revision": "4517fe0bc105954e0cb4fda3662ab50a"
  },
  {
    "url": "introduce/index.html",
    "revision": "63f8c4d2d9b3272bf9dff999a4b5e135"
  },
  {
    "url": "js/axios.html",
    "revision": "0c3f30401307bf6fe99284ee653b4474"
  },
  {
    "url": "js/basic.html",
    "revision": "078b6f51e081705662d11673f9371b1b"
  },
  {
    "url": "js/promise.html",
    "revision": "8bd744aaba9dc837b836cd94ee35d35b"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "9240ff013e56d227ed84d7d650dd6863"
  },
  {
    "url": "mytools/linux.html",
    "revision": "01710a5fe0e0b2cb8b62803ecee7a95a"
  },
  {
    "url": "uniapp/index.html",
    "revision": "1d0219f6cd21846583cf50d48e2e45b9"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "104812cf826566d4727017af3f56a4f2"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "9a3ecc1a0095bed9510e68548ba54827"
  },
  {
    "url": "utils/index.html",
    "revision": "454e4c2ac7f4cea510b8433211b1e998"
  },
  {
    "url": "utils/regexp.html",
    "revision": "4f825b6d3ae51da269ef472e85092b83"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "50a367f2bcc3f48749865476b350c2df"
  },
  {
    "url": "vue/diff.html",
    "revision": "aaeda6a91211aff6d97c4fb06e6d7905"
  },
  {
    "url": "vue/props.html",
    "revision": "0d54e36876f0cc1a987b64c9c46fc871"
  },
  {
    "url": "vue/webpack.html",
    "revision": "0eae46cf81b7611c23a1d4c370975e7b"
  },
  {
    "url": "webGL/index.html",
    "revision": "8b7a366d26ae4d5436e93decf158e8c9"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "1a4d7fa7f7931b78146f4183e204906b"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "9f3cf5b3680ad5447798c7d37c9c13e8"
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

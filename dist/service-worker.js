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
    "revision": "4c297df0a0bc8f28f047a685173d96c5"
  },
  {
    "url": "assets/css/0.styles.fa044e56.css",
    "revision": "d3cb707888ffe376ecee31722655d62d"
  },
  {
    "url": "assets/img/1.35073d10.png",
    "revision": "35073d1026596f939b08c2a7364c9406"
  },
  {
    "url": "assets/img/2.bff2b793.png",
    "revision": "bff2b79356bb1a0b9ca5628a2f2ac32a"
  },
  {
    "url": "assets/img/3.0dadc6a1.png",
    "revision": "0dadc6a14b04a0c1902eaafb7c7cbadd"
  },
  {
    "url": "assets/img/4.d7f0bc90.png",
    "revision": "d7f0bc9029726f6a614e9b08e83bd2dd"
  },
  {
    "url": "assets/img/5.2d5a9f5c.png",
    "revision": "2d5a9f5ce8e88a83e49995e164d8f89f"
  },
  {
    "url": "assets/img/6.1f096b85.png",
    "revision": "1f096b855bb8d01ad2d70643a2db24b5"
  },
  {
    "url": "assets/img/7.b2ae74c3.png",
    "revision": "b2ae74c35904ce006b002d90f4e4e3b1"
  },
  {
    "url": "assets/img/8.a2ff7d7a.png",
    "revision": "a2ff7d7ab6ea7c6002eefe86bd06d6a4"
  },
  {
    "url": "assets/img/9.4c2e1feb.png",
    "revision": "4c2e1febbe9dc4dc13769e1850f6d5d3"
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
    "url": "assets/js/10.89986382.js",
    "revision": "dc34cbaf2e6885fbb6a71ac892669e8f"
  },
  {
    "url": "assets/js/11.6038d7a1.js",
    "revision": "ecbb5083a10586caaff05b5d96cba581"
  },
  {
    "url": "assets/js/12.b697b7d5.js",
    "revision": "188095ba18a2be18ddefc655468814bd"
  },
  {
    "url": "assets/js/13.e295fa1a.js",
    "revision": "94bfdbb35c1a6e6881586a022225f3c3"
  },
  {
    "url": "assets/js/14.90ebf15f.js",
    "revision": "798be24026c6f89a83de408b5f89a41b"
  },
  {
    "url": "assets/js/15.cce1c2a6.js",
    "revision": "d21dec71b1f1e08b972f290e22a0a844"
  },
  {
    "url": "assets/js/16.2644135a.js",
    "revision": "2356a8a28e2fbb7a7d112579bd131ad3"
  },
  {
    "url": "assets/js/17.c0151539.js",
    "revision": "d694e71a4d692a65081390a7654f25df"
  },
  {
    "url": "assets/js/18.7625d586.js",
    "revision": "839c8c2e9a1fda595a4d1697f39f29cc"
  },
  {
    "url": "assets/js/19.263d47fa.js",
    "revision": "90e267b506e88d52a93e8c6e7408d925"
  },
  {
    "url": "assets/js/2.b4cc4399.js",
    "revision": "509f75f1e5e59a3d27f995d7deec440a"
  },
  {
    "url": "assets/js/20.2a7bf51a.js",
    "revision": "8d14159c986d3d243fa154b4933c2bdf"
  },
  {
    "url": "assets/js/21.03ff033c.js",
    "revision": "c3c6e104e4d23a7665002a6b3c222eeb"
  },
  {
    "url": "assets/js/22.fcaeeae8.js",
    "revision": "e05de85656b906ffab00ae55c322a497"
  },
  {
    "url": "assets/js/23.bee9c91c.js",
    "revision": "e6a35a7a4d59fb8835efbc402ffa0d01"
  },
  {
    "url": "assets/js/24.4cae5dff.js",
    "revision": "24a8d139b02be7b5ec7e8f90ac5e3465"
  },
  {
    "url": "assets/js/25.2431a699.js",
    "revision": "f7d80c171190c3b5e132de70bbd1ce7e"
  },
  {
    "url": "assets/js/26.aae606fd.js",
    "revision": "6faa2360add302cc712cd2d4c6280ed5"
  },
  {
    "url": "assets/js/27.22fbb31c.js",
    "revision": "a0f9cee72a50ef2c78e3286c4d4a52eb"
  },
  {
    "url": "assets/js/28.b0c42099.js",
    "revision": "dbd23e4d0f100ab85c49eba710457ef4"
  },
  {
    "url": "assets/js/29.82969460.js",
    "revision": "c7d37aa51f65daf1790968fd6e8cf98d"
  },
  {
    "url": "assets/js/3.d649e924.js",
    "revision": "36496d67f64f7ce4eb06b3d7700c3c13"
  },
  {
    "url": "assets/js/30.f42321e4.js",
    "revision": "58695d9f0291478f2ca139a452b1cb96"
  },
  {
    "url": "assets/js/31.97091984.js",
    "revision": "b82c4eeb7f7acf9133f71989be611692"
  },
  {
    "url": "assets/js/32.39d90c4c.js",
    "revision": "176e814221d2c7a1854652d09279f5d6"
  },
  {
    "url": "assets/js/33.ba7f250d.js",
    "revision": "18397f4314c3005e26e48fab0e3fb45a"
  },
  {
    "url": "assets/js/34.ee95b359.js",
    "revision": "884f0cf2428f9e422026c21ecab845b0"
  },
  {
    "url": "assets/js/35.ca52beb2.js",
    "revision": "d7ccfa5fccd57d325b7b01cddfaad471"
  },
  {
    "url": "assets/js/36.5767701b.js",
    "revision": "1832e143628355e04119f88fc494ea59"
  },
  {
    "url": "assets/js/37.d9b53898.js",
    "revision": "0949e3a1a757404551f9b2ec9f65d023"
  },
  {
    "url": "assets/js/38.15c99f22.js",
    "revision": "c35eeace376d3a6aa780feef01e3400c"
  },
  {
    "url": "assets/js/39.214b1db3.js",
    "revision": "bb199b215cb47f8b46e8205120eec476"
  },
  {
    "url": "assets/js/4.7002950b.js",
    "revision": "154c4ae234ff34e53fc67f2c1ea91748"
  },
  {
    "url": "assets/js/40.47f5211b.js",
    "revision": "602f20defbc962ce7d2a2bdce2b82f5d"
  },
  {
    "url": "assets/js/41.4e145e28.js",
    "revision": "d0900119e15c3c5af185455a646037e3"
  },
  {
    "url": "assets/js/42.d1b5b26a.js",
    "revision": "dd052709830b6431194feff7f1ad65f6"
  },
  {
    "url": "assets/js/43.de9ce5af.js",
    "revision": "c91663312af7f1cc12d772250f483e88"
  },
  {
    "url": "assets/js/44.05ef2ff0.js",
    "revision": "7a47c478cdd786611fe18bd54836376d"
  },
  {
    "url": "assets/js/45.42927e18.js",
    "revision": "283b4fad8de43cc5998d1fdc5e6ca7da"
  },
  {
    "url": "assets/js/46.841d034c.js",
    "revision": "23682657944ec679f57305d8aefc8878"
  },
  {
    "url": "assets/js/47.83a95c73.js",
    "revision": "58144948db8b30d7e32c4ccdb09bbb8d"
  },
  {
    "url": "assets/js/48.7dbbe1dd.js",
    "revision": "327ec36d41cec910ece2341c422a432c"
  },
  {
    "url": "assets/js/5.d05107f2.js",
    "revision": "0090c65a360fa3f645fecbd5388e1755"
  },
  {
    "url": "assets/js/6.c00594f9.js",
    "revision": "582d1ffcecb4762268d5624f637c1c00"
  },
  {
    "url": "assets/js/7.467c9139.js",
    "revision": "be570cb7c8f32fec213b7e9b22796983"
  },
  {
    "url": "assets/js/8.2ef2db6d.js",
    "revision": "f83796176153d384b6ded3467e9da72f"
  },
  {
    "url": "assets/js/9.5e692319.js",
    "revision": "9a4d6aee8da48d80cedc58a459d8ba73"
  },
  {
    "url": "assets/js/app.b9316fd8.js",
    "revision": "bffc2c1ba20fa0385195314915efde1a"
  },
  {
    "url": "css/canvas.html",
    "revision": "e9271a693d91a160fdd8f3269be79249"
  },
  {
    "url": "css/layout.html",
    "revision": "3e424b8e215433d6a9166a6ac72e54fa"
  },
  {
    "url": "css/others.html",
    "revision": "8fb3cd4714560a96f10175e7a9a116a5"
  },
  {
    "url": "css/xuanran.html",
    "revision": "2e9aa24437148ddad9281e3ddf7b632c"
  },
  {
    "url": "demo/docker.html",
    "revision": "7118be39e6e0a8119faceb84f6e2a9d0"
  },
  {
    "url": "demo/gogs.html",
    "revision": "d319dc07f0a9b0ce5f269d25325f46eb"
  },
  {
    "url": "demo/index.html",
    "revision": "406dc97bc1f8c53fdbf991e217f8d2b1"
  },
  {
    "url": "demo/suUI.html",
    "revision": "514ed10a454f476dcadfb5ee7dc33fdf"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "01b02c3a9aee01e62db8df57ff36bbd3"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "2b86a988dbbc1ef49dc1e04b2f7b2c5e"
  },
  {
    "url": "demo/yanye.html",
    "revision": "5f2d6ea9c8cfaca2c1c4dbbfc5d86f3e"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "5b12aa9a2a72e97255337f7497382da8"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "2291c7ed422be60f581526683143c300"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "295ce72aa431feb6b50ff753a9efe84e"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "a9e2a60bc7699645f702eb9fa4646609"
  },
  {
    "url": "git/index.html",
    "revision": "a32efa53d217cb3cc2d9dea5ed419303"
  },
  {
    "url": "index.html",
    "revision": "0529a4748b720c7bc448ffed6db6b9ae"
  },
  {
    "url": "introduce/index.html",
    "revision": "e8f52b8c2360497fbb38646a82f86741"
  },
  {
    "url": "js/axios.html",
    "revision": "13726ade1db0a46481e7949e1789abfb"
  },
  {
    "url": "js/basic.html",
    "revision": "7535c7275a1efabc55a959eb030f7a3b"
  },
  {
    "url": "js/promise.html",
    "revision": "f105523896dfccd45b555a20f94eab94"
  },
  {
    "url": "js/zancun.html",
    "revision": "90922b493e347216dc5c8851ae863ff6"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mix/flutter.html",
    "revision": "fe33447e5c2442114d99061f658a9b3b"
  },
  {
    "url": "mix/index.html",
    "revision": "15c985b857cc6c9ceaaa0e74b115d5e2"
  },
  {
    "url": "mix/miniProgram.html",
    "revision": "5e37c1669e9d7c851e981b307d718920"
  },
  {
    "url": "mix/uniapp.html",
    "revision": "7449bd85ffdf3c89d92646e9f42a0cd9"
  },
  {
    "url": "mix/yukexcx.html",
    "revision": "84b307fd171ef8274c5089dda229ac37"
  },
  {
    "url": "mytools/index.html",
    "revision": "ee73c1e50f58a2d8a0ba8e677d6c42cc"
  },
  {
    "url": "mytools/linux.html",
    "revision": "f02f3a6554aadc3547218fa1178e27c9"
  },
  {
    "url": "utils/index.html",
    "revision": "4e3f202f9eeae8eb1fb7a8e6eff54f59"
  },
  {
    "url": "utils/regexp.html",
    "revision": "a51baa8e47ba7e306ef462f6f5806277"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "2e986f69e524195be86c3d375eae03ab"
  },
  {
    "url": "vue/diff.html",
    "revision": "fb6a3066690c7561139b9b34aac2c8fd"
  },
  {
    "url": "vue/props.html",
    "revision": "069de9aef64ca1bbe83e6002fc3697c6"
  },
  {
    "url": "vue/react.html",
    "revision": "528a75b5e6f15ef0ef129fb59d5f7612"
  },
  {
    "url": "vue/webpack.html",
    "revision": "0d7b9adc59324e778c8e3af7616013c9"
  },
  {
    "url": "webGL/index.html",
    "revision": "bd3cdd1f1e27752e41b8a89f0435716e"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "bd958fdc31b961364b10b84d4341fb0b"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "f7adf19168d8addec27569fad2c95286"
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

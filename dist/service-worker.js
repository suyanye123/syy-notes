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
    "revision": "21593e7b5fcfce90000377a1a08290b7"
  },
  {
    "url": "assets/css/0.styles.06359645.css",
    "revision": "634252755f93b379b037fe39426bebd2"
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
    "url": "assets/js/10.f57d5f1a.js",
    "revision": "1a30fc1d84986964735ba9be62c63bbb"
  },
  {
    "url": "assets/js/11.80090377.js",
    "revision": "d2c84f2f0f2e24b66fd97ceaa7954539"
  },
  {
    "url": "assets/js/12.420b0223.js",
    "revision": "81d728ce4a60a6bfb7ab941f1fb7c2d1"
  },
  {
    "url": "assets/js/13.e295fa1a.js",
    "revision": "94bfdbb35c1a6e6881586a022225f3c3"
  },
  {
    "url": "assets/js/14.a0a9988d.js",
    "revision": "2accc0f53fc483d253325cfc882bc179"
  },
  {
    "url": "assets/js/15.cce1c2a6.js",
    "revision": "d21dec71b1f1e08b972f290e22a0a844"
  },
  {
    "url": "assets/js/16.2c311d34.js",
    "revision": "cdc530a8e0d437ce9a09fdd9199f696d"
  },
  {
    "url": "assets/js/17.8c4b45fc.js",
    "revision": "f57ca2adf601e166f5bd440d668c83c1"
  },
  {
    "url": "assets/js/18.fe33c15d.js",
    "revision": "5f35c03cd8fa62f353944f677bc984ff"
  },
  {
    "url": "assets/js/19.990fb939.js",
    "revision": "537421d1142db9b33e902641b5a335a5"
  },
  {
    "url": "assets/js/2.b4cc4399.js",
    "revision": "509f75f1e5e59a3d27f995d7deec440a"
  },
  {
    "url": "assets/js/20.d0f985d2.js",
    "revision": "ac867df32c26acd59567d10a167868c3"
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
    "url": "assets/js/23.aa8399ee.js",
    "revision": "0d791e8123a872d46e6ffe6e7d3f9894"
  },
  {
    "url": "assets/js/24.c643fece.js",
    "revision": "e7eac20d4a735f56f6ffd2b1564fe9fb"
  },
  {
    "url": "assets/js/25.f48a03b4.js",
    "revision": "08d93884eba3eb3e0b89c9046db9cfbf"
  },
  {
    "url": "assets/js/26.6673cb72.js",
    "revision": "5279c7ffdd099a4da8c446f122612041"
  },
  {
    "url": "assets/js/27.22fbb31c.js",
    "revision": "a0f9cee72a50ef2c78e3286c4d4a52eb"
  },
  {
    "url": "assets/js/28.9c1bc6db.js",
    "revision": "45afeb4ea21eeb6b3789e3db5f08cabb"
  },
  {
    "url": "assets/js/29.75bd80cc.js",
    "revision": "e368a5dba7d3a52f6642b3cd6fd5d4a9"
  },
  {
    "url": "assets/js/3.d6004ffe.js",
    "revision": "a72d625d55f7fbe7b959b0638125cc7c"
  },
  {
    "url": "assets/js/30.73a8f80e.js",
    "revision": "61f4e5afa646eb3d3f920ee039e48bbb"
  },
  {
    "url": "assets/js/31.42c92479.js",
    "revision": "f32153db5258aeefbc7f9f793a08231d"
  },
  {
    "url": "assets/js/32.9bc74176.js",
    "revision": "b7175e48a753d23e2cd8a632fa14ca7c"
  },
  {
    "url": "assets/js/33.e6e300bc.js",
    "revision": "5ef4e58d5ff3479d17c20e72d3713fbd"
  },
  {
    "url": "assets/js/34.8f8c942b.js",
    "revision": "9f818458c8c7ea512815a9b3ed3c47af"
  },
  {
    "url": "assets/js/35.7237b0de.js",
    "revision": "8232a5dbbe5dca0b76743079de4bc5fc"
  },
  {
    "url": "assets/js/36.8e5b9077.js",
    "revision": "b474a095337fedd6cfffca003bbe4171"
  },
  {
    "url": "assets/js/37.d301b911.js",
    "revision": "b45eaf340023d4c97913ecb6c74f7074"
  },
  {
    "url": "assets/js/38.1fdfb974.js",
    "revision": "90ac08237da1f3e243c031eeaa1ed391"
  },
  {
    "url": "assets/js/39.3595fa8c.js",
    "revision": "339422688ce1ae4810aee80dbbda9cbb"
  },
  {
    "url": "assets/js/4.389e5e16.js",
    "revision": "525fb7595588106ccab253ea0ececf12"
  },
  {
    "url": "assets/js/40.a5935144.js",
    "revision": "0610c47fb38fc887158eb9c729495c83"
  },
  {
    "url": "assets/js/41.96616cce.js",
    "revision": "58d95bc34f555ac9062695325c526635"
  },
  {
    "url": "assets/js/42.8bb8846b.js",
    "revision": "8881cba006aa542e3bbbfe86707675d7"
  },
  {
    "url": "assets/js/43.c7568a4c.js",
    "revision": "0c8b6208accc1be13610c43c15b2c9af"
  },
  {
    "url": "assets/js/44.1cff5522.js",
    "revision": "72e9b64a677ed23b31072aa251ffab5a"
  },
  {
    "url": "assets/js/45.7e552fe1.js",
    "revision": "49e3c2c931a59b74d91e914ff17eeebb"
  },
  {
    "url": "assets/js/46.cbf04cb8.js",
    "revision": "0eb1d29598e3fcf7431938b849d23517"
  },
  {
    "url": "assets/js/47.6e0b855f.js",
    "revision": "2de3dc783cbdc78e818d16db623cbd92"
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
    "url": "assets/js/7.831f5a31.js",
    "revision": "3826d80d2302e6f184369fdb10306c4b"
  },
  {
    "url": "assets/js/8.7a8e0bed.js",
    "revision": "6af3bd1244a3298b3351b684f752899e"
  },
  {
    "url": "assets/js/9.5e692319.js",
    "revision": "9a4d6aee8da48d80cedc58a459d8ba73"
  },
  {
    "url": "assets/js/app.a9702d5d.js",
    "revision": "8c7d0314c337baf9b5f9a8801ab761ad"
  },
  {
    "url": "css/canvas.html",
    "revision": "f3820b7708bfdf5355e66fbbf48e5e61"
  },
  {
    "url": "css/layout.html",
    "revision": "3ed76d2812b0bb5cd8ad7c246c2d0f65"
  },
  {
    "url": "css/others.html",
    "revision": "8c9f626372be08bcbc0760ae29b7e53b"
  },
  {
    "url": "css/xuanran.html",
    "revision": "77e16570d627ae3e6e65656ef769374e"
  },
  {
    "url": "demo/docker.html",
    "revision": "2ab96f723c82ee96ee9f0de9a87b3271"
  },
  {
    "url": "demo/gogs.html",
    "revision": "8c63772042777e52aea7a31f4a746e42"
  },
  {
    "url": "demo/index.html",
    "revision": "8162e158c220eedb6ce1b07b6acf7e5f"
  },
  {
    "url": "demo/suUI.html",
    "revision": "93beaa77a068ecfe8675c272c60a882f"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "b29469791887569c3769d0d8c7fa4670"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "2f983e7ebf8498f157d0a6de17d8bec8"
  },
  {
    "url": "demo/yanye.html",
    "revision": "9c76e96eed2ef9ebe41da1e01d02e0f8"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "9b9ecf19699e88dffe83312372e3a036"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "380f33842f9f5f5dff6508d974707d8b"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "2b16c1760cdaa51b3f8c3a8a168ae153"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "df5071e942d8f2fefc6fff3e1497a117"
  },
  {
    "url": "git/index.html",
    "revision": "a22763a95396509cfdb1e4cdd7b567df"
  },
  {
    "url": "index.html",
    "revision": "3cde0998d535abfcbf99ead34341047a"
  },
  {
    "url": "introduce/index.html",
    "revision": "dfc464f49cb41ea8a6f8d1b777332c3b"
  },
  {
    "url": "js/axios.html",
    "revision": "f726d555d75f7b590eb4363829d1af73"
  },
  {
    "url": "js/basic.html",
    "revision": "9f7c16c40296e1e13905b4ee118a746d"
  },
  {
    "url": "js/promise.html",
    "revision": "c517ac0771c81a2f362b7cba88665986"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mix/flutter.html",
    "revision": "2af47b8bb344db80d523824454d8130d"
  },
  {
    "url": "mix/index.html",
    "revision": "888b0b24e1be997f2ec57dbb23790339"
  },
  {
    "url": "mix/miniProgram.html",
    "revision": "157ab67ca82b39156c58c0b2873f43f7"
  },
  {
    "url": "mix/uniapp.html",
    "revision": "79d0b7a20728f1a8fe789745ce7c30d4"
  },
  {
    "url": "mix/yukexcx.html",
    "revision": "769fd16854b55955b77e0ab897c097fe"
  },
  {
    "url": "mytools/index.html",
    "revision": "ce1cb47fb5ba7d80ce4c82a4c75995ef"
  },
  {
    "url": "mytools/linux.html",
    "revision": "f10dbdb73010ded1ab7087845d04690f"
  },
  {
    "url": "utils/index.html",
    "revision": "20513f79e015e1cdb0378c9841db372b"
  },
  {
    "url": "utils/regexp.html",
    "revision": "12736d327cd3f4e55d6d86673dc77ac5"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "5aaf916fc7b5b5f1973dc4f3fe9fcde8"
  },
  {
    "url": "vue/diff.html",
    "revision": "9b5b45d724d3ca0b32f390a9bb4d0490"
  },
  {
    "url": "vue/props.html",
    "revision": "67a65c0905f86136a15d0d19f1fdd887"
  },
  {
    "url": "vue/react.html",
    "revision": "50e8f0e1621ce416f55c998e9f7776ec"
  },
  {
    "url": "vue/webpack.html",
    "revision": "07c9051027bc7ecea185223a5d29c964"
  },
  {
    "url": "webGL/index.html",
    "revision": "59714be0d86e5948eaf2367f1a1d1763"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "75df4e2a6c93bca725a26e0286303980"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "4212a8867df74b29265180e312a3d178"
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

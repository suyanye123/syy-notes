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
    "revision": "98edd3ae299d02a8bd4660bd1c144555"
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
    "url": "assets/js/10.f28a350b.js",
    "revision": "1f44604b78c9b9151fd1c3fbd4e9ee15"
  },
  {
    "url": "assets/js/11.befcbaae.js",
    "revision": "003d66a2713b494fd5b79c805600af8a"
  },
  {
    "url": "assets/js/12.128b6590.js",
    "revision": "3ef1a0b6b44322e499bf843808a6cd5f"
  },
  {
    "url": "assets/js/13.e295fa1a.js",
    "revision": "94bfdbb35c1a6e6881586a022225f3c3"
  },
  {
    "url": "assets/js/14.a719194a.js",
    "revision": "b97dd644a74fe47e1bd5bc81c8f7ccda"
  },
  {
    "url": "assets/js/15.8cb06a24.js",
    "revision": "b1188b48ea73d2b1c554cac3a77a8445"
  },
  {
    "url": "assets/js/16.2c311d34.js",
    "revision": "cdc530a8e0d437ce9a09fdd9199f696d"
  },
  {
    "url": "assets/js/17.1e29a81c.js",
    "revision": "32b38aff3652e586937c9dd5676a1fa7"
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
    "url": "assets/js/2.d6ba3b21.js",
    "revision": "509f75f1e5e59a3d27f995d7deec440a"
  },
  {
    "url": "assets/js/20.d0f985d2.js",
    "revision": "ac867df32c26acd59567d10a167868c3"
  },
  {
    "url": "assets/js/21.48239457.js",
    "revision": "335addd991fc1ac87b3d2a3f0387fa55"
  },
  {
    "url": "assets/js/22.19a7ec9c.js",
    "revision": "d07bb5b57b15ed012b7b4346eebb0093"
  },
  {
    "url": "assets/js/23.8111a974.js",
    "revision": "02b15865d41dfdbbe8eeb0bcff3697f3"
  },
  {
    "url": "assets/js/24.b4552ffa.js",
    "revision": "cc6a740e402fdcdb1b9a711b374744da"
  },
  {
    "url": "assets/js/25.6fa6e392.js",
    "revision": "602314b947595946d6634cbf15c20071"
  },
  {
    "url": "assets/js/26.7afcb9c0.js",
    "revision": "dc209aac8d335fef7b5e1696551537eb"
  },
  {
    "url": "assets/js/27.879a7990.js",
    "revision": "595efe74c17005224d7d60abab0ea9b6"
  },
  {
    "url": "assets/js/28.b0c42099.js",
    "revision": "dbd23e4d0f100ab85c49eba710457ef4"
  },
  {
    "url": "assets/js/29.b5a4ebef.js",
    "revision": "7d62b8698ff14e0972fdc02578549db3"
  },
  {
    "url": "assets/js/3.22872f87.js",
    "revision": "593c3bfefc8ba291f2c17220cd6ca072"
  },
  {
    "url": "assets/js/30.6b1a5484.js",
    "revision": "4291db6c1c31f40d9f09823d8376577a"
  },
  {
    "url": "assets/js/31.e8cfc183.js",
    "revision": "c48e948c793fb138921c7eee928220b0"
  },
  {
    "url": "assets/js/32.a17bf101.js",
    "revision": "ea49467e33bd3587dbad75f0f320b0d1"
  },
  {
    "url": "assets/js/33.68b0c670.js",
    "revision": "79b9f335c4a82791f6a5e33b76640a6d"
  },
  {
    "url": "assets/js/34.7f8bd565.js",
    "revision": "b23211cccdd09e11e5e21bcca90130a0"
  },
  {
    "url": "assets/js/35.ca52beb2.js",
    "revision": "d7ccfa5fccd57d325b7b01cddfaad471"
  },
  {
    "url": "assets/js/36.cf99f346.js",
    "revision": "b45313b73dcdc05f616005717c469c5d"
  },
  {
    "url": "assets/js/37.9f8fb511.js",
    "revision": "09a452714efbe858c36183e76bf7eb9d"
  },
  {
    "url": "assets/js/38.2863aded.js",
    "revision": "88fab6b1310f1f290f705537042f98d6"
  },
  {
    "url": "assets/js/39.0c0648bf.js",
    "revision": "ffb979a7e797257fc87b8023ff989ca3"
  },
  {
    "url": "assets/js/4.6771ef9b.js",
    "revision": "0f8965e360313ad3578cf5de19ccca4c"
  },
  {
    "url": "assets/js/40.3a1c65a1.js",
    "revision": "17b19cd17ce07c12da9215fe47620985"
  },
  {
    "url": "assets/js/41.dee70079.js",
    "revision": "0b57eb8b55bbae9e40ee4dc195ce4f29"
  },
  {
    "url": "assets/js/42.19ccf4cc.js",
    "revision": "d907f593feb8a44ef93885e0e66270b6"
  },
  {
    "url": "assets/js/43.5363272f.js",
    "revision": "305e85aecff10609b6160e0c6ed5c1c2"
  },
  {
    "url": "assets/js/44.e94f1e86.js",
    "revision": "d5ff8ca3e6bcdb34f6c5cacdb1df121e"
  },
  {
    "url": "assets/js/45.8b3d43c8.js",
    "revision": "ad3ea975b36f88cb9e6d539eb9879e7f"
  },
  {
    "url": "assets/js/46.841d034c.js",
    "revision": "23682657944ec679f57305d8aefc8878"
  },
  {
    "url": "assets/js/47.500328a5.js",
    "revision": "1339360ad506dd462c3402ce76f805e2"
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
    "url": "assets/js/app.3ca11156.js",
    "revision": "6400d59fdcbd597c75d9810e1edf3a24"
  },
  {
    "url": "css/canvas.html",
    "revision": "9ac404bca257440da7a7a9b8505091e9"
  },
  {
    "url": "css/layout.html",
    "revision": "2f5b7de0a98f90bc7cc86abff17e0793"
  },
  {
    "url": "css/others.html",
    "revision": "27fc2689bb5079b29b69e6887cb428f6"
  },
  {
    "url": "css/xuanran.html",
    "revision": "f991097b4ac200e6bb6b8ccf10f971a4"
  },
  {
    "url": "demo/docker.html",
    "revision": "4312293052df1e30c791adbb8b6dbda1"
  },
  {
    "url": "demo/gogs.html",
    "revision": "fe9ef0740378945de789f76963709115"
  },
  {
    "url": "demo/index.html",
    "revision": "04a57f0724d408d40d964b87c875218c"
  },
  {
    "url": "demo/suUI.html",
    "revision": "e509ea69061c4a781edc68d0af53e175"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "942818e22c25f074e48cf2a05d4ba587"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "f3f0cfa2e23e2e84a847c795ea4f39c2"
  },
  {
    "url": "demo/yanye.html",
    "revision": "32a31002a2cdd732bc9bc82bb2ac0ee8"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "d9a22621a6fa40114c16be1c0027c400"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "92dd4a6315638fdadf0ea1db0ca322a9"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "5cbed8bdf91f949398f18bfe116bb72e"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "330427e29fd11f5f105c289651b3874d"
  },
  {
    "url": "git/index.html",
    "revision": "5d6ed1a82b5a73544702c79b998c51df"
  },
  {
    "url": "index.html",
    "revision": "35c57b9cddff31b77c547150b7b99c6f"
  },
  {
    "url": "introduce/index.html",
    "revision": "327832b4e5d6c9ecbd2025f9c9660e49"
  },
  {
    "url": "js/axios.html",
    "revision": "9614874c0d0f336f6bc240867c79f12b"
  },
  {
    "url": "js/basic.html",
    "revision": "9649f440fe133052cf88056776210011"
  },
  {
    "url": "js/promise.html",
    "revision": "69701db683a2c48910a4a27f35c60f36"
  },
  {
    "url": "js/zancun.html",
    "revision": "238316756626f58d0e9979c68be8e56c"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mix/flutter.html",
    "revision": "a1b50e169e8be5daa1c7214a5f36aea4"
  },
  {
    "url": "mix/index.html",
    "revision": "4151d06461962fb8584a948d430c95f7"
  },
  {
    "url": "mix/miniProgram.html",
    "revision": "dd9787ed66c3e1ed2e2b899e457432b3"
  },
  {
    "url": "mix/uniapp.html",
    "revision": "b78fa2edad4fa5afb8c4613f2b7b6247"
  },
  {
    "url": "mix/yukexcx.html",
    "revision": "aca198118a6bf4f74c7b59aa86162425"
  },
  {
    "url": "mytools/index.html",
    "revision": "46157dc96126a8af0cea528d287afabc"
  },
  {
    "url": "mytools/linux.html",
    "revision": "48454064b072362b01a9de97f851b88c"
  },
  {
    "url": "utils/index.html",
    "revision": "a67bf45bea3d57f813d5b81e0810a3eb"
  },
  {
    "url": "utils/regexp.html",
    "revision": "5617d30e82755713c822c7b63974361b"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "7ff5ea55d4b0e715e735f409e033fc8d"
  },
  {
    "url": "vue/diff.html",
    "revision": "f6d14f3c773f7e045d4f3e2df9e36734"
  },
  {
    "url": "vue/props.html",
    "revision": "02c631a296b2a0739a8b5aa78c6980f0"
  },
  {
    "url": "vue/react.html",
    "revision": "af4bebe354328f4eb1c23a74567d726b"
  },
  {
    "url": "vue/webpack.html",
    "revision": "7ad8d00904c5adcf2a6fc52151d12d14"
  },
  {
    "url": "webGL/index.html",
    "revision": "cd74f58181ce4ca7470f05d4b5c2a2ef"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "651b24f31d84853d095644d88fa88774"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "ad5a1acf376670e975d93b2a14c0422e"
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

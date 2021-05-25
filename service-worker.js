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
    "revision": "3503a62418047de3f05b46ecfe2232e0"
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
    "url": "assets/js/11.8bc2a821.js",
    "revision": "f09272222a1a85bb3b7716ece025ac52"
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
    "url": "assets/js/19.990fb939.js",
    "revision": "537421d1142db9b33e902641b5a335a5"
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
    "url": "assets/js/22.1cf61df0.js",
    "revision": "ed0eade6254bb52b8dd7301c15d2cedb"
  },
  {
    "url": "assets/js/23.aa8399ee.js",
    "revision": "0d791e8123a872d46e6ffe6e7d3f9894"
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
    "url": "assets/js/3.d425b5f5.js",
    "revision": "9f0578244af2564f1932c47919020355"
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
    "url": "assets/js/33.102f90f4.js",
    "revision": "2b446c95cfe7634433506bdae1844d34"
  },
  {
    "url": "assets/js/34.55cb615e.js",
    "revision": "73b87a14bc1e62125c67820983724c4c"
  },
  {
    "url": "assets/js/35.0d3d0318.js",
    "revision": "ca9e0db3bdc0366b3c717f435be9adaf"
  },
  {
    "url": "assets/js/36.8e5b9077.js",
    "revision": "b474a095337fedd6cfffca003bbe4171"
  },
  {
    "url": "assets/js/37.ca060054.js",
    "revision": "bde5b921c1a83485441af11c34788e9c"
  },
  {
    "url": "assets/js/38.13f55c41.js",
    "revision": "32fb26d9db4d92583f86c295c34e4a29"
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
    "url": "assets/js/41.c104d951.js",
    "revision": "8ef95c48a3637c0249aa75236cded8f4"
  },
  {
    "url": "assets/js/42.6b2f4300.js",
    "revision": "96226843912e2b36d6fa17c726d05cda"
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
    "url": "assets/js/7.7bfa599b.js",
    "revision": "869e2dcf34b73d56efcac68b6a0512b4"
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
    "url": "assets/js/app.4d34ffac.js",
    "revision": "555cc2c9395be95224c2b601f6dccdd7"
  },
  {
    "url": "css/canvas.html",
    "revision": "13a7495d8e83b8a9513295939e204f18"
  },
  {
    "url": "css/layout.html",
    "revision": "5a465e6cf86f3f0096f7d941948e6c3b"
  },
  {
    "url": "css/others.html",
    "revision": "dbcc4281778a047c4ec459b25024e622"
  },
  {
    "url": "css/xuanran.html",
    "revision": "b56dc01ccc6ce718aa90a0dee379bdd3"
  },
  {
    "url": "demo/docker.html",
    "revision": "e4892c4da81fd83cc8c580efadba988c"
  },
  {
    "url": "demo/gogs.html",
    "revision": "8f8abe91d470364db61f4c14bcffd218"
  },
  {
    "url": "demo/index.html",
    "revision": "e6b920a4699abc48d29b9aafe5aefc5e"
  },
  {
    "url": "demo/suUI.html",
    "revision": "54d998fb2b7e7dd1fdcc419cdfc5151d"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "fa932517b24e9ce5716a339a09c2ff20"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "a268f4e8a91d0075456b5a17a3f3a32e"
  },
  {
    "url": "demo/yanye.html",
    "revision": "941c234a0321acf72901324f48e3b36a"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "192a97035b26421eec100ba2758e3545"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "ca24abe77844fbd3fb1bfa1c5ab4ccef"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "6e43ad9c8d648d915d34f61bd9a4c235"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "9c0b03e4aa50db70ffcc234f93d141f7"
  },
  {
    "url": "git/index.html",
    "revision": "74cfa0cd2cf7fcc8e2ce17ac398c3038"
  },
  {
    "url": "index.html",
    "revision": "6de4429709c6d4c2cf705855fc7fced2"
  },
  {
    "url": "introduce/index.html",
    "revision": "1bec26e2dd60fd1a49dd574695f57339"
  },
  {
    "url": "js/axios.html",
    "revision": "97ee7dc424305ce8f29bd418eb44b7e1"
  },
  {
    "url": "js/basic.html",
    "revision": "750aff18c784da2f5e519158cc795961"
  },
  {
    "url": "js/promise.html",
    "revision": "a2dc0087edeba57b5340202f9f52bd68"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mix/flutter.html",
    "revision": "629ee5a05fb0958ecc7f08ab10291644"
  },
  {
    "url": "mix/index.html",
    "revision": "8c60252bb17d79425e3c44292dcad7e6"
  },
  {
    "url": "mix/miniProgram.html",
    "revision": "7c3a5a2f609b5aa384aada295566118e"
  },
  {
    "url": "mix/uniapp.html",
    "revision": "a97eecb99c52b297e1c536b58ddf2cdf"
  },
  {
    "url": "mix/yukexcx.html",
    "revision": "c5d89496be5e18d94490f00baa380281"
  },
  {
    "url": "mytools/index.html",
    "revision": "0913144839c24036a46dd99d6b9e24ec"
  },
  {
    "url": "mytools/linux.html",
    "revision": "a2c83923d0ab1237de44580c4ffabe0c"
  },
  {
    "url": "utils/index.html",
    "revision": "9bf5ca0045f0c1ce9ef25c2cab999905"
  },
  {
    "url": "utils/regexp.html",
    "revision": "552d9c4ecce69b032269cc4459add9b0"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "6784eb1b2b9fff14fffebfbfd59780a2"
  },
  {
    "url": "vue/diff.html",
    "revision": "42f760e44cc3a15f40d0ea710dc3e23c"
  },
  {
    "url": "vue/props.html",
    "revision": "27d54a3c119ed6c99ffece8f196ab6dd"
  },
  {
    "url": "vue/react.html",
    "revision": "46c12a9814d572f8aa1986ec08a5fb6d"
  },
  {
    "url": "vue/webpack.html",
    "revision": "fc86be9cfc79434fef285b563780a677"
  },
  {
    "url": "webGL/index.html",
    "revision": "c8fbc047bfff2cfbb5e0426ecb251f59"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "8406a3c6b9b9ba601a3c4981315d0336"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "d32578fc0b9023555efe8072b4e28387"
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

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
    "revision": "b5f5731a38cb62b9138eaa9ca3cb2c86"
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
    "url": "assets/img/xcx.96db5056.jpg",
    "revision": "96db50562c2065352aa568e7e1ac5d98"
  },
  {
    "url": "assets/js/10.853b5adb.js",
    "revision": "e2c49fc41066d5e2af7cb8c5dcc2bf41"
  },
  {
    "url": "assets/js/11.5ffaedac.js",
    "revision": "598257e9c46782c4f4a4f541e367bf89"
  },
  {
    "url": "assets/js/12.50929e54.js",
    "revision": "0d34df551d72b290d1addb182a0cafe9"
  },
  {
    "url": "assets/js/13.d49cfb4c.js",
    "revision": "e8107034440aadb615bb83a68e89c3e1"
  },
  {
    "url": "assets/js/14.a05e95f2.js",
    "revision": "86d34f062cf97feec91634c54e212164"
  },
  {
    "url": "assets/js/15.509e4bc4.js",
    "revision": "eb079824012948743239133e4ff1c0a0"
  },
  {
    "url": "assets/js/16.68b90bd8.js",
    "revision": "14ce0c5aec7e067ff86f1b0cfafb0e65"
  },
  {
    "url": "assets/js/17.9cef7566.js",
    "revision": "841a5c379089960b75d9fc1048a17933"
  },
  {
    "url": "assets/js/18.4d00eaaa.js",
    "revision": "b037f7e847b807086c3c86d889de6769"
  },
  {
    "url": "assets/js/19.c6c8a9e8.js",
    "revision": "308ff793ea19eb80bb7b7496ff201d56"
  },
  {
    "url": "assets/js/2.768c3e55.js",
    "revision": "e71de7ebd3aea689b5c49f8bf39954ad"
  },
  {
    "url": "assets/js/20.e118dbd1.js",
    "revision": "24fa3d7805cc18501308e2179dec4b3c"
  },
  {
    "url": "assets/js/21.ba760165.js",
    "revision": "b04fc9ec0cf21c40b16b129f1c7ec8b9"
  },
  {
    "url": "assets/js/22.cb2b9c99.js",
    "revision": "dc040c96b3bc458acae17b0081c3aa6b"
  },
  {
    "url": "assets/js/23.87ee1e7f.js",
    "revision": "e4e2f71f6731d65eb597a0b1c3d0519c"
  },
  {
    "url": "assets/js/24.abce2379.js",
    "revision": "5f8258c2983ca30b8882b46cca7e5cd3"
  },
  {
    "url": "assets/js/25.fc5c3415.js",
    "revision": "54e21104aa0c22d793a6b1ff80eef68a"
  },
  {
    "url": "assets/js/26.d5038cf6.js",
    "revision": "d26b9761565bcff96f4012a8a91152ce"
  },
  {
    "url": "assets/js/27.b4bc7f82.js",
    "revision": "d58a76ab35f91d59696241044fec5e92"
  },
  {
    "url": "assets/js/28.60c91803.js",
    "revision": "46902464d27ac6b336c296ec374a2da8"
  },
  {
    "url": "assets/js/29.dffc1ede.js",
    "revision": "db016ce824b295d89748921ea0cd1b8b"
  },
  {
    "url": "assets/js/3.83941a85.js",
    "revision": "d5da40727f4f393a10b0a2ed797b3f64"
  },
  {
    "url": "assets/js/30.366a206b.js",
    "revision": "c8bcc5022204dc8abadc9548ca3cf400"
  },
  {
    "url": "assets/js/31.d8f98e60.js",
    "revision": "a54a3089c1515a5f6f9adeeb1e0b0443"
  },
  {
    "url": "assets/js/32.fbc4b51b.js",
    "revision": "ca4c70465ea93e0a429234bc08e3d3f2"
  },
  {
    "url": "assets/js/33.00e78cdb.js",
    "revision": "66dc3b23a26ad9157753ff7538ceb917"
  },
  {
    "url": "assets/js/34.6f75c900.js",
    "revision": "d7b452a65cdd05b619f6af984365be9d"
  },
  {
    "url": "assets/js/35.ef9b87f1.js",
    "revision": "27449ab3669746b064d8885215299487"
  },
  {
    "url": "assets/js/36.a2239a61.js",
    "revision": "39c6973a00bc803b3ff688c90c8e8e4a"
  },
  {
    "url": "assets/js/37.9b5a7d9d.js",
    "revision": "c5bdd32fc96f20a616ded1928c15cd7c"
  },
  {
    "url": "assets/js/38.49361808.js",
    "revision": "27e223683f80bc6b7162c294277fbc78"
  },
  {
    "url": "assets/js/39.3a794a47.js",
    "revision": "24d3e38ed6976dc31b8c83889bbf6873"
  },
  {
    "url": "assets/js/4.46f47609.js",
    "revision": "8fd652863754d979d75ddc2e75b49cd4"
  },
  {
    "url": "assets/js/40.7d08693a.js",
    "revision": "3645fb6040df17b4248e3c48f1c4f113"
  },
  {
    "url": "assets/js/41.7c3f08d6.js",
    "revision": "4564e81081d77d77b3e820e5ca8ac3ca"
  },
  {
    "url": "assets/js/5.1a37c84c.js",
    "revision": "e9e38dfa2a88c080597f5959ad25af92"
  },
  {
    "url": "assets/js/6.bf90d9d7.js",
    "revision": "0eb62a6cf37d9fb4e1e493f613ed5f17"
  },
  {
    "url": "assets/js/7.05513ba3.js",
    "revision": "f107914c113122976d6404d7c6da80aa"
  },
  {
    "url": "assets/js/8.f81f2b68.js",
    "revision": "df844a5c8b3d52965c185acc1ade3e82"
  },
  {
    "url": "assets/js/9.36a965d4.js",
    "revision": "9ed84d12ddd56be24f6f4c0a369b4ab1"
  },
  {
    "url": "assets/js/app.e3fbfca3.js",
    "revision": "204eb188257d2e4d4f8f6b7f5d962e9e"
  },
  {
    "url": "css/canvas.html",
    "revision": "8b0cbfb13eeb4c6d70214ea2c8689297"
  },
  {
    "url": "css/layout.html",
    "revision": "3f39586e12430fde93da801797b3bb64"
  },
  {
    "url": "css/others.html",
    "revision": "041f7cce3dd25bb936461b67d4d9c7ab"
  },
  {
    "url": "css/xuanran.html",
    "revision": "c250502bc2dd9a1cedf737c57a1edfb6"
  },
  {
    "url": "demo/index.html",
    "revision": "857ceb95e85665bfa2bd2419de28317d"
  },
  {
    "url": "demo/suUI.html",
    "revision": "bafd2c47f1559e7600a8bf67ef6de82f"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "577d08097d3c9021317236deb2e18fc7"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "31683690c74c8c8ace1266065b2598cf"
  },
  {
    "url": "demo/yanye.html",
    "revision": "e3fda60496d9356aaf8baa0ae192e231"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "03941e8a3b1fbc35aec21691cd8ff9b5"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "49e4144e133453967596daa80b7df84a"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "2177c1115da16682f1056d34927dbe84"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "a831fbd0c80e515c529c0d4659166685"
  },
  {
    "url": "git/index.html",
    "revision": "3e41682c82daed1efc5cf65dc9f094f4"
  },
  {
    "url": "index.html",
    "revision": "1425ec97e1ded5d7485f2b51db86f4da"
  },
  {
    "url": "introduce/index.html",
    "revision": "96ab2cb9b02928fb05267fac94fa71ab"
  },
  {
    "url": "js/axios.html",
    "revision": "b384e100aafc1ff6adb347d3053d0c41"
  },
  {
    "url": "js/basic.html",
    "revision": "51e136865c1a6e44a8bbe05bf4490480"
  },
  {
    "url": "js/promise.html",
    "revision": "778985b5bdd8fb208e395a6fc63db18f"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "64dc8254fe2c15b3c99a1607c9887b4c"
  },
  {
    "url": "uniapp/index.html",
    "revision": "4b12890e329ff20fae41a0cbc09b90c7"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "481e746ba1af38ee24e3ce220bce9cdb"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "1ce9d2b56a2fc3f0cce80aafe60c5a2e"
  },
  {
    "url": "utils/index.html",
    "revision": "41309a53e65969ce254ee1aea90efd13"
  },
  {
    "url": "utils/regexp.html",
    "revision": "6e134156a94e32bd365833bf91901c32"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "dde7708d606ab14fc2d6e8bea52c874b"
  },
  {
    "url": "vue/diff.html",
    "revision": "db50499a2d6ae19efaf80aa4e4825d11"
  },
  {
    "url": "vue/props.html",
    "revision": "7c7bd20a9e8340cd8db35daffffd4fae"
  },
  {
    "url": "vue/webpack.html",
    "revision": "bb53ee504576703415fb66d8f1417cc5"
  },
  {
    "url": "webGL/index.html",
    "revision": "b4d32ffb02e124b0fde69196f3241913"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "59f1850044bdaf9d1bc4e71d08568bc7"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "12fdf3430b186fa09ae39e566956daf1"
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

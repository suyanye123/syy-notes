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
    "revision": "1bdb2beaa17ea1301a1db6246c36f5d6"
  },
  {
    "url": "assets/css/0.styles.624e67a4.css",
    "revision": "a85913e5dfb9e9f5856d3e186fb6d27e"
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
    "url": "assets/img/nginx.4c34c5ea.jpg",
    "revision": "4c34c5ea190f587dc292108868c69aed"
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
    "url": "assets/js/10.64fdab0d.js",
    "revision": "4f85c38d7dae9d769fd5390314df21a2"
  },
  {
    "url": "assets/js/11.4624a5c2.js",
    "revision": "ce791615130fc919098ee6cc34f29673"
  },
  {
    "url": "assets/js/12.9cc07621.js",
    "revision": "f3068da0e2b819e7de568ee1b9d4a66e"
  },
  {
    "url": "assets/js/13.5971b759.js",
    "revision": "984357979158ad9ca4234aee49125952"
  },
  {
    "url": "assets/js/14.a0a9988d.js",
    "revision": "2accc0f53fc483d253325cfc882bc179"
  },
  {
    "url": "assets/js/15.c1530251.js",
    "revision": "b9462907440c626954f3aa51ceac9ba2"
  },
  {
    "url": "assets/js/16.0314629b.js",
    "revision": "ed0068b3cf3a6ae2d6a69d58acfc284c"
  },
  {
    "url": "assets/js/17.1e29a81c.js",
    "revision": "32b38aff3652e586937c9dd5676a1fa7"
  },
  {
    "url": "assets/js/18.790951f8.js",
    "revision": "952b92ea333226a1544212974a7178f1"
  },
  {
    "url": "assets/js/19.5378d830.js",
    "revision": "abec640095508e0ef574fdd0318ea4c3"
  },
  {
    "url": "assets/js/2.413ce9d8.js",
    "revision": "db829ce40a607f646e99cf24d66d0ae5"
  },
  {
    "url": "assets/js/20.96f207e8.js",
    "revision": "b4a11e5cbd9390ddbc2c4db87c6af97e"
  },
  {
    "url": "assets/js/21.45f9d452.js",
    "revision": "716377e20887aecd539d27c17723dec2"
  },
  {
    "url": "assets/js/22.99700ca6.js",
    "revision": "e9367dd120015c9818929381814f39e0"
  },
  {
    "url": "assets/js/23.24626e87.js",
    "revision": "9e850ac374411203bc939f7a2a42c76d"
  },
  {
    "url": "assets/js/24.738d2cc7.js",
    "revision": "adf9769c6d93a375a43467f2e2fe2f01"
  },
  {
    "url": "assets/js/25.86f5795d.js",
    "revision": "2406d24d5bc3ad08be14ca8421066c86"
  },
  {
    "url": "assets/js/26.34981b86.js",
    "revision": "adf4d860e7bda79c67b89c57e0e1af20"
  },
  {
    "url": "assets/js/27.48abb2a3.js",
    "revision": "15b4435395a891ab65470682846db2da"
  },
  {
    "url": "assets/js/28.0feea109.js",
    "revision": "78b2a23ff4527419da923f07d2155874"
  },
  {
    "url": "assets/js/29.2eb3754b.js",
    "revision": "7a1b5d55f2507bfa429ff3bbac77d7a8"
  },
  {
    "url": "assets/js/3.90311236.js",
    "revision": "9f90f342a5a8df8ea7758da411adf18f"
  },
  {
    "url": "assets/js/30.efca3200.js",
    "revision": "a08920bcecd080b7b207fdbba7da66ad"
  },
  {
    "url": "assets/js/31.2efe7691.js",
    "revision": "5007993804692d4d36d053073ccd3692"
  },
  {
    "url": "assets/js/32.a541e6d5.js",
    "revision": "c81c8986573e7574207e62ab7deb904d"
  },
  {
    "url": "assets/js/33.610bb824.js",
    "revision": "0579229f5a319f0a8617d7012282090c"
  },
  {
    "url": "assets/js/34.fc65c69e.js",
    "revision": "dd1e3be6a358faad95b791463391cb56"
  },
  {
    "url": "assets/js/35.014c59d8.js",
    "revision": "00d62fb30666966d6e9c3efd9b44bf0d"
  },
  {
    "url": "assets/js/36.b50299fa.js",
    "revision": "b91f33ab242c44d21f095a9cb222877d"
  },
  {
    "url": "assets/js/37.05a633bd.js",
    "revision": "4888f2f4c318be22b226e66b75afeb96"
  },
  {
    "url": "assets/js/38.7d2180cc.js",
    "revision": "59ad5ee2218261a6d1ea579aa837130f"
  },
  {
    "url": "assets/js/39.5cd7d009.js",
    "revision": "0dc02d9a761ac39ff4d6f831845ecb30"
  },
  {
    "url": "assets/js/4.a0f03d66.js",
    "revision": "6988f0507e58a0bcb10239c23724c142"
  },
  {
    "url": "assets/js/40.cb8f7c03.js",
    "revision": "b1c39e6fb7da19a2fbb32244ca44ace1"
  },
  {
    "url": "assets/js/41.9f390a34.js",
    "revision": "b738957baa26f3ffaa7d6ebdc64452a2"
  },
  {
    "url": "assets/js/42.d71f6421.js",
    "revision": "8dff479fd244fa6b5a26c9f04a56bb5a"
  },
  {
    "url": "assets/js/43.80099269.js",
    "revision": "bbc92ce378ba1d652dafa0fd652c8869"
  },
  {
    "url": "assets/js/44.3c3bcfdb.js",
    "revision": "a5de69e1dcb83dfe1f00389e39269b6a"
  },
  {
    "url": "assets/js/45.d5451420.js",
    "revision": "840f3006ca5e0e6361e5ee3818f58e9b"
  },
  {
    "url": "assets/js/46.5987b817.js",
    "revision": "3b29b212a434805123d9b44a6e4e903d"
  },
  {
    "url": "assets/js/47.ef14d2ca.js",
    "revision": "3e2c3d6364e181df84c9d7c0923da481"
  },
  {
    "url": "assets/js/48.4b7f6b43.js",
    "revision": "1da259295b573aecbaf4d153c0c62d72"
  },
  {
    "url": "assets/js/49.3cf55b41.js",
    "revision": "f85eddf0bd089bfcb053f40978862ebb"
  },
  {
    "url": "assets/js/5.112ab975.js",
    "revision": "ef6c7043e51d7810349477d7d797fc75"
  },
  {
    "url": "assets/js/50.23261b7f.js",
    "revision": "8ac929d273c323f91e473fdc7076cfb7"
  },
  {
    "url": "assets/js/51.a47e5363.js",
    "revision": "29511b806f4117da689713470e5f9921"
  },
  {
    "url": "assets/js/6.117958ab.js",
    "revision": "0d15f230929976bd9864f99646f2ed2c"
  },
  {
    "url": "assets/js/7.d6fac5d5.js",
    "revision": "71aec0c9f3253201ea5e6b8f19f1251a"
  },
  {
    "url": "assets/js/8.ec0f6991.js",
    "revision": "6a9d5c827c6c91d00b2754713cd4fba8"
  },
  {
    "url": "assets/js/9.da3f8c13.js",
    "revision": "06ad38de4f25972ec04be95418ce9e08"
  },
  {
    "url": "assets/js/app.94251a10.js",
    "revision": "7cd162d4cf488ddf0679ba0c62bd50b3"
  },
  {
    "url": "css/canvas.html",
    "revision": "ea01e4da50c7ef341a6e532cbfaf6734"
  },
  {
    "url": "css/layout.html",
    "revision": "50fe69c3af8b2988ccd5a78f4d41d6c3"
  },
  {
    "url": "css/others.html",
    "revision": "ba79ed3d817ef894b06d184c3fabd5b4"
  },
  {
    "url": "css/xuanran.html",
    "revision": "0c49224952a9395896d0a264a3c0c476"
  },
  {
    "url": "demo/docker.html",
    "revision": "72eda45b97784e912ece83b15ea283b9"
  },
  {
    "url": "demo/gogs.html",
    "revision": "7d43d404c5141807aadb93a7c89dfdca"
  },
  {
    "url": "demo/index.html",
    "revision": "c63e9c898c705715893d39929583cf47"
  },
  {
    "url": "demo/nginx-config.html",
    "revision": "f9e6169f586703b4301e143df01f3683"
  },
  {
    "url": "demo/nginx.html",
    "revision": "cfba1eb74866b059827d9cf3a59ceb65"
  },
  {
    "url": "demo/suUI.html",
    "revision": "581ac6934d90a3c2bbc0cc31eaa0df9e"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "2af40cabee504803a67a46c3c50dcbfc"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "7c9bdeddddfb1c968ead266dcc8ddd88"
  },
  {
    "url": "demo/yanye.html",
    "revision": "c8cb7d095db640fd0751778c07cb19fc"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "3db229b96d587e057f051d928797c86c"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "9ac26cf433275df5379520731b57325e"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "1f892085acace6be0375650228b5acb0"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "b3c119f83a59c6e0d79d1da0087b2517"
  },
  {
    "url": "git/index.html",
    "revision": "2fb269c5390cf8d00e213250fabfe6be"
  },
  {
    "url": "index.html",
    "revision": "d8f3ba245cb4005206b4a0fa72bdcd50"
  },
  {
    "url": "introduce/index.html",
    "revision": "19afb114dad6110144a6276d4ef97a67"
  },
  {
    "url": "js/axios.html",
    "revision": "070e3ecf0910e8173af198117c484709"
  },
  {
    "url": "js/basic.html",
    "revision": "fce6702505b80982d538cfc24e72b6bf"
  },
  {
    "url": "js/promise.html",
    "revision": "56249615043979963ff594af57da1c6c"
  },
  {
    "url": "js/zancun.html",
    "revision": "373f569289a04bd3c6c9e030d4fa4028"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mix/flutter.html",
    "revision": "2d61921ad2a391ff13b2722ff7958e22"
  },
  {
    "url": "mix/index.html",
    "revision": "152323823a05cd4c029de7e820543390"
  },
  {
    "url": "mix/miniProgram.html",
    "revision": "7d860f573fccdd9c61a40db8d1980a15"
  },
  {
    "url": "mix/uniapp.html",
    "revision": "74e60141838e9bcb90149dbbe415e8e1"
  },
  {
    "url": "mix/yukexcx.html",
    "revision": "cf4244fca992d80f813f21a23c648ba9"
  },
  {
    "url": "mytools/fiddler.html",
    "revision": "9bdbfd34ff9092355b841a27fd20a2b8"
  },
  {
    "url": "mytools/index.html",
    "revision": "15213eb3a41d17303403b615e7f82275"
  },
  {
    "url": "mytools/linux.html",
    "revision": "00ff792401d833e5478e9f5dc77e6850"
  },
  {
    "url": "utils/index.html",
    "revision": "6aed5ae35228bb9fe497efb2f99777a5"
  },
  {
    "url": "utils/regexp.html",
    "revision": "e017123db3f93345dc59db5a590933e1"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "bccd919eebf2c387abcd89146f593667"
  },
  {
    "url": "vue/diff.html",
    "revision": "351495339da46232b2761cb3d9a568fb"
  },
  {
    "url": "vue/props.html",
    "revision": "5b93351b6d3a28de8146a06cbea92193"
  },
  {
    "url": "vue/react.html",
    "revision": "dfd1364b73993d73adff7581d50369b1"
  },
  {
    "url": "vue/webpack.html",
    "revision": "f3924fc616080c894b65b5d06788e96b"
  },
  {
    "url": "webGL/index.html",
    "revision": "cf230ff95d36809b6e5a7de73ddc662f"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "aea83168b920f8b8631a4cdc0339b59f"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "2f39c6d9062789dfc0cde1d95e6934a3"
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

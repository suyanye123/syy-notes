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
    "revision": "3aa67460aa37a28a693cff1e8ecc17b8"
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
    "url": "assets/js/10.c40f9ac5.js",
    "revision": "3a6151652bc0004a0e82287ce674e59a"
  },
  {
    "url": "assets/js/11.e1721e80.js",
    "revision": "a5ce5da0f85256bad35dc5461f8038e6"
  },
  {
    "url": "assets/js/12.9a770a9a.js",
    "revision": "58e559e4a346149bf2d2c282a426ac55"
  },
  {
    "url": "assets/js/13.43d952e2.js",
    "revision": "e5664c31e94436641d66747397eeac6a"
  },
  {
    "url": "assets/js/14.b3f34d7e.js",
    "revision": "43b0b285e4d62da49d8034a369d8331b"
  },
  {
    "url": "assets/js/15.ffa8f639.js",
    "revision": "51a8804e2c4b182412d7d43c111978de"
  },
  {
    "url": "assets/js/16.f651e2f9.js",
    "revision": "420305b7bc434acc256ae569a9101fda"
  },
  {
    "url": "assets/js/17.4eda6fcd.js",
    "revision": "d6ab64b3ef927ec496ab1bdb40f7e1a0"
  },
  {
    "url": "assets/js/18.ea1b5ce5.js",
    "revision": "c67e63a0b236f8c4de4e334db3cf7f6d"
  },
  {
    "url": "assets/js/19.225075e4.js",
    "revision": "ae8b8d7f0705631b7e9c43cc87ca1086"
  },
  {
    "url": "assets/js/2.cae88ee9.js",
    "revision": "a3af8cb4e6743594977ba2ef95546095"
  },
  {
    "url": "assets/js/20.2a46b317.js",
    "revision": "8c2403494dce78b9ae5efab447968db2"
  },
  {
    "url": "assets/js/21.ec258217.js",
    "revision": "c04ab5a0fd44bf15dbf3fa387d27842e"
  },
  {
    "url": "assets/js/22.d6d0c83e.js",
    "revision": "4ce044e7150008fdef0aba91f7150185"
  },
  {
    "url": "assets/js/23.6b83acfb.js",
    "revision": "663b9913b22e3298831ed6262b0c6f65"
  },
  {
    "url": "assets/js/24.cdddb460.js",
    "revision": "85bdbb08d1eb93185902c08dd1928651"
  },
  {
    "url": "assets/js/25.4b2d9e89.js",
    "revision": "1d1a8a8cf78e9ae0abb8ec01be388f3b"
  },
  {
    "url": "assets/js/26.886e610d.js",
    "revision": "33650b8eca32cce3cc3851f8d93341c3"
  },
  {
    "url": "assets/js/27.ca582abe.js",
    "revision": "a29c3b66be76cbafc8ef9d201d349a35"
  },
  {
    "url": "assets/js/28.60b67c64.js",
    "revision": "8befb167454c5e107756a5872995a09c"
  },
  {
    "url": "assets/js/29.603b0f45.js",
    "revision": "e39711b8390d69792b88f0a14652518d"
  },
  {
    "url": "assets/js/3.06f9b6ea.js",
    "revision": "a38a3ad982bf96b888196626918e51ea"
  },
  {
    "url": "assets/js/30.710d7a45.js",
    "revision": "6bd98ddf52a664fd64918e4b01bac84c"
  },
  {
    "url": "assets/js/31.9c7eed23.js",
    "revision": "7491258fbe75fe15944d16835eab8cd4"
  },
  {
    "url": "assets/js/4.00be134d.js",
    "revision": "2fa6b0330e770e8b479b3526c4bb2a9c"
  },
  {
    "url": "assets/js/5.6c8a2b30.js",
    "revision": "cb0acfa9f75820ddf0ed006e6c1a9b00"
  },
  {
    "url": "assets/js/6.c63e940f.js",
    "revision": "9dc62304430b5eba18ef77a0d84bd2ec"
  },
  {
    "url": "assets/js/7.ec655744.js",
    "revision": "c19e4ab23f180dc6002f1b976b457e10"
  },
  {
    "url": "assets/js/8.ea08d7e5.js",
    "revision": "1a3755159a466c2dc54aab787924a817"
  },
  {
    "url": "assets/js/9.6904bc8b.js",
    "revision": "09fdcf7340809f42f24680c9ed16fc63"
  },
  {
    "url": "assets/js/app.0d9b820c.js",
    "revision": "20da3ad7a3331ee023ba67614a127232"
  },
  {
    "url": "css/flex.html",
    "revision": "3e16b8a9f3b194232838b73fe76460d1"
  },
  {
    "url": "css/index.html",
    "revision": "be63ef0797d6ac79f9709ec135034c9b"
  },
  {
    "url": "demo/index.html",
    "revision": "c53a24a038be427140ea23dfb1e1b206"
  },
  {
    "url": "demo/suUI.html",
    "revision": "ad2377959e762f2fc43c6515ab9200c3"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "725b9f2f8d2b3d0aa01dc1820289687e"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "b891c18d93ba62fc97bf72f3274916aa"
  },
  {
    "url": "git/index.html",
    "revision": "33ae320ae75c7b712a911189a7099134"
  },
  {
    "url": "index.html",
    "revision": "60f6df44a69e4bcc77d3391f42ed1b61"
  },
  {
    "url": "interview/more.html",
    "revision": "bcdcb2df1b60f919fbaf5387c8f0b2f3"
  },
  {
    "url": "interview/quest.html",
    "revision": "1d36b0a517fc18d79b6e3388e2e84e7b"
  },
  {
    "url": "introduce/index.html",
    "revision": "9772833b2ffcd12931123805c8c4219f"
  },
  {
    "url": "js/axios.html",
    "revision": "d42ff45513b82703f8e0f0fc74eae23b"
  },
  {
    "url": "js/http.html",
    "revision": "49b3afeb378dcd540f4e93401a2ca248"
  },
  {
    "url": "js/promise.html",
    "revision": "f302d623bababb6dccf99049d508408a"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "0d8994ceb7b51b0e3880182f63833967"
  },
  {
    "url": "react/index.html",
    "revision": "e64c6e6f5b7bb8afed7e66a1d871b65b"
  },
  {
    "url": "uniapp/index.html",
    "revision": "cd168563b0f67464ffe10178f50378c3"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "d96afdb05855cf5c0e451dfd06bfc9d5"
  },
  {
    "url": "utils/regexp.html",
    "revision": "013c1ab50b12d128b849bbb7eb709cfc"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "bd4434d121cdad6ed5e237afbb56ae7a"
  },
  {
    "url": "vue/index.html",
    "revision": "c50696053b82bb7ef8f4a29100bc469a"
  },
  {
    "url": "vue/props.html",
    "revision": "434d9efe7abf199a3b412652bb7e84d4"
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

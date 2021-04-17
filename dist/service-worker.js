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
    "revision": "03164b58253638a62fc474d6b02b5b5c"
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
    "url": "assets/js/13.18dd4a70.js",
    "revision": "463c51eac3268c476b89935df33c0a76"
  },
  {
    "url": "assets/js/14.d71812fd.js",
    "revision": "19c1fe7b49f87ddf3f4a742554305466"
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
    "url": "assets/js/2.050a0d37.js",
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
    "url": "assets/js/23.0f47c1f3.js",
    "revision": "43ce38e2f789a744f8680b1e6f25fcb7"
  },
  {
    "url": "assets/js/24.6ccd86a0.js",
    "revision": "66cad2725092f5028152a175bad08ae3"
  },
  {
    "url": "assets/js/25.4b2d9e89.js",
    "revision": "1d1a8a8cf78e9ae0abb8ec01be388f3b"
  },
  {
    "url": "assets/js/26.79b28fca.js",
    "revision": "3f9ea1b27434c213c854648b26b98632"
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
    "url": "assets/js/app.ade59102.js",
    "revision": "0ac27d5bc4172b23e9c3ad5a3f0235b4"
  },
  {
    "url": "css/flex.html",
    "revision": "a4fd31e4e46d4b78d068826135cfdf98"
  },
  {
    "url": "css/index.html",
    "revision": "5844329e670b58f5a8049ca59dea49ca"
  },
  {
    "url": "demo/index.html",
    "revision": "f5400cdaadeb64dbd389eb63e5f5caae"
  },
  {
    "url": "demo/suUI.html",
    "revision": "7d4a6b43e128051b924d489730181b6a"
  },
  {
    "url": "demo/vitepress.html",
    "revision": "0d327635e21633243ef3e7cdc3b730a7"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "95c2353b89c1a67afa56cf60a5b8f98f"
  },
  {
    "url": "git/index.html",
    "revision": "758d2cb016da474ce0b2a60ce2db4dd3"
  },
  {
    "url": "index.html",
    "revision": "4df34afee3aec35d7a4ec4bd53b952a3"
  },
  {
    "url": "interview/more.html",
    "revision": "0115eb24204fdb221e071031fdc2a9e2"
  },
  {
    "url": "interview/quest.html",
    "revision": "256e1c6bfe073a2158e79061333b183c"
  },
  {
    "url": "introduce/index.html",
    "revision": "9747aedd09c39a2a9ba0c6bde1b87cfd"
  },
  {
    "url": "js/axios.html",
    "revision": "1e5f5b9fb7e7bada5000b9977be78968"
  },
  {
    "url": "js/http.html",
    "revision": "5617153bb76d3a21a37a2800ff89590b"
  },
  {
    "url": "js/promise.html",
    "revision": "a0eff9205396951f1d760fe95b46f236"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "069abc07773a1f2a3afb752fd9bd6d14"
  },
  {
    "url": "react/index.html",
    "revision": "ac323538950f07dd1e4c76221e4542b0"
  },
  {
    "url": "uniapp/index.html",
    "revision": "4eaad553c0b513342cfbbdce76a8e5c5"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "00bcda8fb78df8005cc3afffa96e8ed2"
  },
  {
    "url": "utils/regexp.html",
    "revision": "e73467e4f8eea131eeee3db88106984c"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "da2b2c2f1c6c0331131afd418852fa51"
  },
  {
    "url": "vue/index.html",
    "revision": "5a88303ec969464dcc2597047121c90d"
  },
  {
    "url": "vue/props.html",
    "revision": "cc116a715a4bd91257097beab7fc61e1"
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

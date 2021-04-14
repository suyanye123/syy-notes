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
    "revision": "b4c66a5636784d6521415018324a9233"
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
    "url": "assets/js/10.0f666373.js",
    "revision": "3aee4b89ec12c3024ba0aa96d7dca6ed"
  },
  {
    "url": "assets/js/11.8b00b24c.js",
    "revision": "3b55de9b8a02871cd81754680d1bd5d6"
  },
  {
    "url": "assets/js/12.c6f8c9fb.js",
    "revision": "2d84b02b8b78951bca3835ff7300169c"
  },
  {
    "url": "assets/js/13.de2557ab.js",
    "revision": "240f19deae039e84a52fcaacd0f920b6"
  },
  {
    "url": "assets/js/14.2ec6efb7.js",
    "revision": "a9fab9d14e4f9896536962ec2df0ee51"
  },
  {
    "url": "assets/js/15.0ebec042.js",
    "revision": "bc4ae1f7d67ab70f3d668c62bef6d230"
  },
  {
    "url": "assets/js/16.1f4851a2.js",
    "revision": "6649f22b08f709f0f1a2dff86fc0762e"
  },
  {
    "url": "assets/js/17.82c2dc3a.js",
    "revision": "6d4dffee4ab3893f4f1324d48eefb6d9"
  },
  {
    "url": "assets/js/18.86f05f67.js",
    "revision": "9b39f5610d6d970e63b9ff13671ebd5c"
  },
  {
    "url": "assets/js/19.0f9e7b96.js",
    "revision": "3d6c5b4f218f51a002412e319b5c3a20"
  },
  {
    "url": "assets/js/2.559e4518.js",
    "revision": "549bb00ebf25c22fbae1ed14553d53f5"
  },
  {
    "url": "assets/js/20.e449b76e.js",
    "revision": "79154a0dcd235311354bf1a9af65ce21"
  },
  {
    "url": "assets/js/21.a2105ce8.js",
    "revision": "e7717e2e9e79c972285b3dfffca2c6f3"
  },
  {
    "url": "assets/js/22.d56a39ba.js",
    "revision": "2a54edb197a3888c50afb9481dd2efa4"
  },
  {
    "url": "assets/js/23.5e5b3a6c.js",
    "revision": "e25b9d54ec3f36ed1b45c5cd7df571fa"
  },
  {
    "url": "assets/js/24.45417e72.js",
    "revision": "cf3ed552a7b586c873be8329d9aaa163"
  },
  {
    "url": "assets/js/25.e4b4807c.js",
    "revision": "5a50d786314527bca57dca17ea3e3df8"
  },
  {
    "url": "assets/js/3.1ee81e76.js",
    "revision": "5837964fa1abda5bf4bc816af488419e"
  },
  {
    "url": "assets/js/4.2534f0da.js",
    "revision": "5463e543bac4ed39b97b1077a4d5f0c7"
  },
  {
    "url": "assets/js/5.819f8a4d.js",
    "revision": "57e13db74a09aba26dd60ad64f578688"
  },
  {
    "url": "assets/js/6.d22714b2.js",
    "revision": "948ad6bed8d2f825ee38b6c10349019d"
  },
  {
    "url": "assets/js/7.47e0a56b.js",
    "revision": "0f735507334d06e6822db6f1f1600233"
  },
  {
    "url": "assets/js/8.1562527e.js",
    "revision": "c4d102f7482db22c8fe2d358ccdcec46"
  },
  {
    "url": "assets/js/9.93dbb096.js",
    "revision": "6ff633fae0d5b539064e1fb4fdaca5ad"
  },
  {
    "url": "assets/js/app.d38f5f86.js",
    "revision": "e8d040751b2cd1eeda0648870be537c4"
  },
  {
    "url": "css/flex.html",
    "revision": "7af082a1e92ed6dcc31ecfe223dbf427"
  },
  {
    "url": "css/index.html",
    "revision": "b203133e5b44d3af3bb0b6f8f46a49cb"
  },
  {
    "url": "git/index.html",
    "revision": "e3e20d951fa8bda814a03a2a3575f83c"
  },
  {
    "url": "img/vue/vue1.png",
    "revision": "730160552a2435ff54cb36dc1ec8837b"
  },
  {
    "url": "img/vue/vue2.png",
    "revision": "5fc2b35060bd17e3607908b835aff606"
  },
  {
    "url": "img/vue/vue3.png",
    "revision": "fed2f138c308f1049cebc8743e7ed65d"
  },
  {
    "url": "index.html",
    "revision": "ea344dfd2469edd8b2c082ae9370f433"
  },
  {
    "url": "interview/more.html",
    "revision": "5673213caffbb1591a141af802ca5dd6"
  },
  {
    "url": "interview/quest.html",
    "revision": "6f1f827cbafd91d426a1970a50c480be"
  },
  {
    "url": "introduce/index.html",
    "revision": "0ad18b371ff37d74687053ab76ea2d23"
  },
  {
    "url": "js/promise.html",
    "revision": "07175d27ea629ab680a69973d75cfed4"
  },
  {
    "url": "mytools/index.html",
    "revision": "d5e817fc113cbe715517d76de752d1ee"
  },
  {
    "url": "react/index.html",
    "revision": "f2227356e4f03c87a186300b725aae3b"
  },
  {
    "url": "uniapp/index.html",
    "revision": "6983a82aee71acb11b2217b33874bac0"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "19de9c7bab3af98965d9b2cc8e7f2c4f"
  },
  {
    "url": "utils/regexp.html",
    "revision": "822c8112c96ff817958b1b551f611f3a"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "a5aeb91f7bfbef2ab34eb629cb2ed661"
  },
  {
    "url": "vue/index.html",
    "revision": "929a87215ce7b715803475b385d67192"
  },
  {
    "url": "vue/props.html",
    "revision": "9002a5321b9a48af9ddc8e3183c107eb"
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

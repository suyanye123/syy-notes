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
    "revision": "3a804a1d8fc48eb05725fe4bfe78479b"
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
    "url": "assets/js/10.19367d5d.js",
    "revision": "6b63072b377f2404ce947d885838873c"
  },
  {
    "url": "assets/js/11.c34f8b47.js",
    "revision": "b7d6b9c4c40ee0c08209d7a889ef19fa"
  },
  {
    "url": "assets/js/12.492408a7.js",
    "revision": "cbef7677d7df6316183f11e47ca482c2"
  },
  {
    "url": "assets/js/13.2cedaa03.js",
    "revision": "59c17ad8d73d46d2bee30e45e9b3b883"
  },
  {
    "url": "assets/js/14.339621af.js",
    "revision": "a2f8420bdd8672659352e8fa55f69fdf"
  },
  {
    "url": "assets/js/15.4127d7b6.js",
    "revision": "287e2e644de41981de98748483ca2934"
  },
  {
    "url": "assets/js/16.12a83e37.js",
    "revision": "e07a694cd88f1c9c8e610199a2ffba4e"
  },
  {
    "url": "assets/js/17.ff1475d1.js",
    "revision": "061bfabd2352e23a1a7b38a5ec2e6822"
  },
  {
    "url": "assets/js/18.c77b61e2.js",
    "revision": "d2d1c12ec67c7cbbe9d087de884b3cd3"
  },
  {
    "url": "assets/js/19.cf6c241d.js",
    "revision": "f36773449aa8e027149e815c1b06d931"
  },
  {
    "url": "assets/js/2.4f9de5bc.js",
    "revision": "795402f5e66248de9a640b27d68d74d9"
  },
  {
    "url": "assets/js/20.d8930771.js",
    "revision": "c9b1f78b5db30386ce4f07d85f9068d9"
  },
  {
    "url": "assets/js/21.f5410b90.js",
    "revision": "d656a84d17f0aa1d2c100c5cdb224fe3"
  },
  {
    "url": "assets/js/22.2f33caed.js",
    "revision": "766539ff8625b55b13fbd4433007154d"
  },
  {
    "url": "assets/js/23.a26d5a8a.js",
    "revision": "76dad135fbfb00fb754d97e159eb27d1"
  },
  {
    "url": "assets/js/24.a23e7f1f.js",
    "revision": "d58c863e6a5a945c7490deaa378981ea"
  },
  {
    "url": "assets/js/25.a29941c6.js",
    "revision": "eec3b1fc4c0b693516abd1dee018a79a"
  },
  {
    "url": "assets/js/26.09d0040b.js",
    "revision": "9e6d7a44fe15a75b6bba0701fa7a2006"
  },
  {
    "url": "assets/js/27.809d180a.js",
    "revision": "d433fb568bf69125c8a3685090431758"
  },
  {
    "url": "assets/js/28.3747e98b.js",
    "revision": "1c554de9b65319ae22381a01bfb676f0"
  },
  {
    "url": "assets/js/29.3bb72f0b.js",
    "revision": "b7faa1cadffc2aba79903066957635a5"
  },
  {
    "url": "assets/js/3.18cce45a.js",
    "revision": "e1568728d306fed5e57434024e5734bf"
  },
  {
    "url": "assets/js/30.2c36df77.js",
    "revision": "e43ec133b6095ac8a8d93bbab3b1904d"
  },
  {
    "url": "assets/js/31.f8c60579.js",
    "revision": "e6c55078d8192594f8723be1aeced342"
  },
  {
    "url": "assets/js/32.388c6386.js",
    "revision": "2cdf7c9ae973710095fd8ed9d5ccdf71"
  },
  {
    "url": "assets/js/33.164118ae.js",
    "revision": "25a0c1492aa53645f9b715a327973387"
  },
  {
    "url": "assets/js/34.a0480d6f.js",
    "revision": "dd5c67b030e5220e940c1f4adffc229f"
  },
  {
    "url": "assets/js/35.c688f4f7.js",
    "revision": "b225e03b1d2b1fae03d917830087d870"
  },
  {
    "url": "assets/js/36.1a50664f.js",
    "revision": "1f9f5994dfaf04937a1efe57b39a76b3"
  },
  {
    "url": "assets/js/37.ea8a9660.js",
    "revision": "c321bbc09c79433d0d11ce81ef681b08"
  },
  {
    "url": "assets/js/38.1053fe3d.js",
    "revision": "40f098a026cf99c026f6156723636311"
  },
  {
    "url": "assets/js/39.e353f90d.js",
    "revision": "22bc54e54c844ea3033b115fb5a3be02"
  },
  {
    "url": "assets/js/4.1562b0a8.js",
    "revision": "fac3b91c06c6a40f9d64c8c695778d0d"
  },
  {
    "url": "assets/js/40.166c6525.js",
    "revision": "90af1a6f9eb3d35510c91da780a8c702"
  },
  {
    "url": "assets/js/5.d48f1ed8.js",
    "revision": "76aa72b4634120ef9120acb61e036dba"
  },
  {
    "url": "assets/js/6.c4f7e7dd.js",
    "revision": "4e126785b6ac27335a9558e9a9226565"
  },
  {
    "url": "assets/js/7.42403252.js",
    "revision": "95989333669bd9f355dea40c4719f23c"
  },
  {
    "url": "assets/js/8.4e11346a.js",
    "revision": "aa91d71d7eba4d8829ed10bfc7d54009"
  },
  {
    "url": "assets/js/9.f8950735.js",
    "revision": "80500b9083566f71da03c565e74f9c99"
  },
  {
    "url": "assets/js/app.f476d1a7.js",
    "revision": "78ce1f0f7298c9e248840f34f809304f"
  },
  {
    "url": "css/canvas.html",
    "revision": "3714ffcc7cf3714a2239818e68efad38"
  },
  {
    "url": "css/layout.html",
    "revision": "9bc9b99605d873f4a70d89987032289c"
  },
  {
    "url": "css/others.html",
    "revision": "dbee43d385f93fb75eda8aa8ea056ab9"
  },
  {
    "url": "css/xuanran.html",
    "revision": "371dc5b304042becd6f4b5831d8fcd55"
  },
  {
    "url": "demo/index.html",
    "revision": "61ccbecf9949298f786ff40ec37ca4f5"
  },
  {
    "url": "demo/suUI.html",
    "revision": "5d261c46a1890c0391f4d29f3189bfd8"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "dba93e77bd2f82b05fc382a902e92510"
  },
  {
    "url": "demo/yanye.html",
    "revision": "062c09740a8a1ccfec544438154090d5"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "815560ec619600eab2befc35d37d3d0d"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "b32d2b12f713b14af8261a7170430c56"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "2fc0d367c4923076eb4b59e6088ee991"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "069e913ded5d3cdaa0155307ac5d26d1"
  },
  {
    "url": "git/index.html",
    "revision": "bfea0ce279aefe91691e32b09f7b2303"
  },
  {
    "url": "index.html",
    "revision": "b17b475db6a6224adaa16bf77e824f22"
  },
  {
    "url": "introduce/index.html",
    "revision": "e7d743666e8691066dcfeab6ed4f33a3"
  },
  {
    "url": "js/axios.html",
    "revision": "a5b56873cfeaec90204bf163c6b253e0"
  },
  {
    "url": "js/basic.html",
    "revision": "447911057c50a35fbe61629723d99353"
  },
  {
    "url": "js/promise.html",
    "revision": "ff8c42480f3b8e3e60daf7211c474f0d"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "59b9351f020b1b50f59a418d7df28db4"
  },
  {
    "url": "uniapp/index.html",
    "revision": "5cba2144a0c1a78ec48cbadee2af2bdd"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "2bb7a8ed953bc6363a4896705f3f4d07"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "f0e812626733794fd5a381ddc662d465"
  },
  {
    "url": "utils/index.html",
    "revision": "fa7310574195f366ea9a5c1265d009e9"
  },
  {
    "url": "utils/regexp.html",
    "revision": "b2818550513136164ba6db0e51621afb"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "6c6d98ccf0e73b99f00d0e638936a4f8"
  },
  {
    "url": "vue/diff.html",
    "revision": "36e304365c2bd392a130bbaf92aa435d"
  },
  {
    "url": "vue/props.html",
    "revision": "d9c22c9606acf9c6e2f54435cc0aea3b"
  },
  {
    "url": "vue/webpack.html",
    "revision": "f878558206b39ac8c26587c7c41f6cea"
  },
  {
    "url": "webGL/index.html",
    "revision": "8eb5bf23c9c24c567f5eaff09d96b7ad"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "0dcfee4e9ad0d35a924cddd9e025614c"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "b137938546e855450b89c3cd45fcc461"
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

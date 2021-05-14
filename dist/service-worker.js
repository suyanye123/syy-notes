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
    "revision": "d8f82746aed8fa25c01b1055ff14b831"
  },
  {
    "url": "assets/css/0.styles.fa044e56.css",
    "revision": "d3cb707888ffe376ecee31722655d62d"
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
    "url": "assets/js/10.b912daf9.js",
    "revision": "4660901c860b46906d4d37c81d0a1800"
  },
  {
    "url": "assets/js/11.68541606.js",
    "revision": "22a237c2cc0e3d4dd4c367e19515dff8"
  },
  {
    "url": "assets/js/12.6ecd4646.js",
    "revision": "1636a763ae0f36972b43dc07ec77ff49"
  },
  {
    "url": "assets/js/13.5b6e0387.js",
    "revision": "828f33381dc1efef8dde26d9eb6af946"
  },
  {
    "url": "assets/js/14.b5428237.js",
    "revision": "8b7040afff6061d6a47c653e76e54121"
  },
  {
    "url": "assets/js/15.48e8da3c.js",
    "revision": "43a6a5e39c6be35b3975c29fd4a1156d"
  },
  {
    "url": "assets/js/16.ba49a84e.js",
    "revision": "d82624870e762e7822413763ee353258"
  },
  {
    "url": "assets/js/17.c1eee1e0.js",
    "revision": "09a97031d237c8d2071b206c65cfca52"
  },
  {
    "url": "assets/js/18.5b297356.js",
    "revision": "098fccac5e9f4bd41c7c5145c9217f67"
  },
  {
    "url": "assets/js/19.9c12f60c.js",
    "revision": "1764d60c965ddb266693e7183c7349b8"
  },
  {
    "url": "assets/js/2.866f3439.js",
    "revision": "d6b33ca72e7d83d3e59bc19e1116a8ec"
  },
  {
    "url": "assets/js/20.a9ef3524.js",
    "revision": "caf83a5aad6f61d657bed253fd069f76"
  },
  {
    "url": "assets/js/21.98e81062.js",
    "revision": "e313b8d259e6f4e770ddda8a6cb917f1"
  },
  {
    "url": "assets/js/22.7896b1ce.js",
    "revision": "33e5c385efe7befed8f94debb476554e"
  },
  {
    "url": "assets/js/23.be72352c.js",
    "revision": "6e5a9883d7df3f77f1189fd1a5ae54c1"
  },
  {
    "url": "assets/js/24.c9e49dde.js",
    "revision": "669d4434ba404e08cfe08434ffde5102"
  },
  {
    "url": "assets/js/25.55684fd9.js",
    "revision": "5f784c6cc0d0da23668d589d4d332b63"
  },
  {
    "url": "assets/js/26.b26e4dac.js",
    "revision": "fde030becd2393a8594701f7560bd839"
  },
  {
    "url": "assets/js/27.9c6e45c3.js",
    "revision": "9cca26ea88264cae087813185c78b0fc"
  },
  {
    "url": "assets/js/28.b447d957.js",
    "revision": "28203c3f2419f1d287d3fc216cbbcba1"
  },
  {
    "url": "assets/js/29.9444fe54.js",
    "revision": "b2caf271c92a45b31a2c29731bb104f2"
  },
  {
    "url": "assets/js/3.b27a9b1e.js",
    "revision": "63a4fe5580545f8158ad054450dc4e27"
  },
  {
    "url": "assets/js/30.681d4d6b.js",
    "revision": "cd327259ec72cd8d574a20f2faa5a626"
  },
  {
    "url": "assets/js/31.c9ac6975.js",
    "revision": "dba3c0dda09f4db387d0001ae0d85ba3"
  },
  {
    "url": "assets/js/32.648efda3.js",
    "revision": "e60ee4d4990ce361645ab751453ff014"
  },
  {
    "url": "assets/js/33.919d2b9b.js",
    "revision": "f2255dd6b26e5bebbe1edf31dca89def"
  },
  {
    "url": "assets/js/34.7682b66f.js",
    "revision": "181b7efd0782f9f859f9dd2104f0c675"
  },
  {
    "url": "assets/js/35.038d5ae4.js",
    "revision": "0cd38aa7e9a4d0da4a7d09b635958e39"
  },
  {
    "url": "assets/js/36.31c68f3f.js",
    "revision": "b3cff23b5ad7a4f8b42485caadaf7b7c"
  },
  {
    "url": "assets/js/37.c8ba192f.js",
    "revision": "de452394dedb86e87bc44864f94002e1"
  },
  {
    "url": "assets/js/38.d3ce516f.js",
    "revision": "83785f34f65bf83782246f2e2abda70b"
  },
  {
    "url": "assets/js/39.cb6abdb5.js",
    "revision": "e4bde7c8f020cb8cc721488f1f2b6e34"
  },
  {
    "url": "assets/js/4.18169195.js",
    "revision": "6a9cf91a8c057a9302bb5c620f9c6665"
  },
  {
    "url": "assets/js/40.6f67dc59.js",
    "revision": "2a1e5585bf4e522166ac21247be9dc2a"
  },
  {
    "url": "assets/js/41.c495d9a6.js",
    "revision": "c7c1417b97d1d38d793f9e3aa0e3f43b"
  },
  {
    "url": "assets/js/42.1a533d36.js",
    "revision": "2d26cc224081f88a1a4efe8093e8271d"
  },
  {
    "url": "assets/js/43.7b9cbb4d.js",
    "revision": "b0789e866e0c17123f001a9ca9555093"
  },
  {
    "url": "assets/js/5.9e51e156.js",
    "revision": "3ba547a10d7f610e26ba88c76543e11f"
  },
  {
    "url": "assets/js/6.c7107f35.js",
    "revision": "dc2ceefa305f36a198744bd48fa4f460"
  },
  {
    "url": "assets/js/7.8c0de395.js",
    "revision": "bf50358ff179fb88cf11378cd0398ce7"
  },
  {
    "url": "assets/js/8.dd2136db.js",
    "revision": "d51514de139c975a199827ace4b85431"
  },
  {
    "url": "assets/js/9.e6f0cc36.js",
    "revision": "0493e0aba4631fa3efa6455906436f35"
  },
  {
    "url": "assets/js/app.24bad44e.js",
    "revision": "6ec87e46878ba2ea9339dc9506a2e7c1"
  },
  {
    "url": "css/canvas.html",
    "revision": "5fb928294f1a162802a870cf415b2767"
  },
  {
    "url": "css/layout.html",
    "revision": "246a541dc16ae1829e25f703fef228fa"
  },
  {
    "url": "css/others.html",
    "revision": "e993b440b832c814e24723c4ba3797fe"
  },
  {
    "url": "css/xuanran.html",
    "revision": "1bb2c2acc8fda4d42cc2d16538365e14"
  },
  {
    "url": "demo/docker.html",
    "revision": "2bc4f356e13c4ce57d9ba1df5835d031"
  },
  {
    "url": "demo/index.html",
    "revision": "963c8810be71ee92d175e98f696a210c"
  },
  {
    "url": "demo/suUI.html",
    "revision": "c7ce4843b048d265bba3847cfae65e97"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "4ca4d4229c3a2ce49a12d33667974b1d"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "38aa68fc36963902cf67000769cc44d4"
  },
  {
    "url": "demo/yanye.html",
    "revision": "bb0bc1d7bcd34bd672859c4e6ba02923"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "c92314a20dbf146d1440bbf2fb3dfdd2"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "8e52880dfafbda9f4e0012c0a1fa9c4e"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "fba29632f8f0f703543fd911af3579a2"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "93277123d5f0480375104394266dd87e"
  },
  {
    "url": "git/index.html",
    "revision": "28618d21108c579a63d3b8029acced0f"
  },
  {
    "url": "index.html",
    "revision": "a943c788edec8095a6e9d99630388c4f"
  },
  {
    "url": "introduce/index.html",
    "revision": "5a5ddbc4fe0f1c77867b21b9a8f8d71f"
  },
  {
    "url": "js/axios.html",
    "revision": "24d385aa4fa62004dc9161a42bbd6349"
  },
  {
    "url": "js/basic.html",
    "revision": "20edaed161b1e51ca7fa91d1a3689e2f"
  },
  {
    "url": "js/promise.html",
    "revision": "28afa535c7145b0f7fac2431921e93c5"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mytools/index.html",
    "revision": "06b7f7b5a3cd02c066562b03379a967a"
  },
  {
    "url": "mytools/linux.html",
    "revision": "c6fa9c463c906959dfcac47108a84354"
  },
  {
    "url": "uniapp/index.html",
    "revision": "ab452444a3398a39e22298d4cfe2907a"
  },
  {
    "url": "uniapp/miniProgram.html",
    "revision": "a2a5d1c076b850cc0c2adf15cbcc5092"
  },
  {
    "url": "uniapp/yukexcx.html",
    "revision": "c047b8e05625d4d9bb84a3bca6a1651e"
  },
  {
    "url": "utils/index.html",
    "revision": "a5edb1e363beb60a1d87852125137e96"
  },
  {
    "url": "utils/regexp.html",
    "revision": "349e824acd54a30bd7d99492aea78d72"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "700a127d41944b45159af7183a812e11"
  },
  {
    "url": "vue/diff.html",
    "revision": "6b4b4fc8071a0f3b343bb5d716f7283e"
  },
  {
    "url": "vue/props.html",
    "revision": "b795df3129cb734067504c315dc520b3"
  },
  {
    "url": "vue/webpack.html",
    "revision": "2440f7ba5dee99741cd751dee5866eec"
  },
  {
    "url": "webGL/index.html",
    "revision": "ffbbf632886b05f97b03650e326a0457"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "2ac4a046216011a866af9697b42542b8"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "1cbc5fc8c7c8688e1916bec1a200aca6"
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

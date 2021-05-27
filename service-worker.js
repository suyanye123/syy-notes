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
    "revision": "cd5b2dfe26c87c2a3232e2f18301a6cf"
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
    "url": "assets/js/app.4131ecf7.js",
    "revision": "6c2aa2f109432c0d110364134b3d3414"
  },
  {
    "url": "css/canvas.html",
    "revision": "f6260279efc02af3a591c12a9200d7a5"
  },
  {
    "url": "css/layout.html",
    "revision": "e1264c4fed20d012100a9b5d4582ddc0"
  },
  {
    "url": "css/others.html",
    "revision": "8dd90468ccb45b6d3a7e2bdd0f66be6e"
  },
  {
    "url": "css/xuanran.html",
    "revision": "8167361753704e9cda7cc2892d4a53d5"
  },
  {
    "url": "demo/docker.html",
    "revision": "6c6781ba776980417b5d5bc768829da6"
  },
  {
    "url": "demo/gogs.html",
    "revision": "7da453943d244fe8d05b827e09dfcf36"
  },
  {
    "url": "demo/index.html",
    "revision": "7c82cd60fcd3c194ed5e2d686b749ea2"
  },
  {
    "url": "demo/suUI.html",
    "revision": "2d64bf1f1d4827f520855aa168a1104d"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "79b39791aa4ce060e63d8ae389a63a96"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "f2a7d3b9db525b7b181da27b5779fa27"
  },
  {
    "url": "demo/yanye.html",
    "revision": "e6806fb5bfa81d6c27a0781ccb1c5985"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "0bbd598140316af52ea69f14bc937579"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "84dbda1b57fd5ce9d68204c4fba8948d"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "a4bcb6f55b469ad062ba972060534ce7"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "f01e2cad061a6497ae6d21f42702ad6c"
  },
  {
    "url": "git/index.html",
    "revision": "a99df7dada1c91e8c49250c7fa1f286f"
  },
  {
    "url": "index.html",
    "revision": "6fd9a6d1c4f63cde0daeef88c50c08d9"
  },
  {
    "url": "introduce/index.html",
    "revision": "7a9ffb96ea11df7960d52d1ed2397dc1"
  },
  {
    "url": "js/axios.html",
    "revision": "1af5da1d28d152f35b1a21f4bd535a12"
  },
  {
    "url": "js/basic.html",
    "revision": "287bbad01f0c309ffead577f98102ea5"
  },
  {
    "url": "js/promise.html",
    "revision": "3d2c6e1117b810c5eb3b80eb8176e621"
  },
  {
    "url": "js/zancun.html",
    "revision": "efc273f241006ca1b5058af76c955ccd"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mix/flutter.html",
    "revision": "b0dedd33a44e990ddfddca0e6486ede6"
  },
  {
    "url": "mix/index.html",
    "revision": "25cd549ca8c978706aa35613f14df637"
  },
  {
    "url": "mix/miniProgram.html",
    "revision": "8ae9089c89c1148e3f9f890e31327f43"
  },
  {
    "url": "mix/uniapp.html",
    "revision": "c5dafe51a85ca5fab483bebedc21e46d"
  },
  {
    "url": "mix/yukexcx.html",
    "revision": "c4c248181ee26f63676da639ade0b7ab"
  },
  {
    "url": "mytools/index.html",
    "revision": "4ecf9d6867c3573479f1c33f40023017"
  },
  {
    "url": "mytools/linux.html",
    "revision": "23d1cf397b59ef1011c759007304d1d0"
  },
  {
    "url": "utils/index.html",
    "revision": "da13fdf7c9a3dd7330c981696b9594ed"
  },
  {
    "url": "utils/regexp.html",
    "revision": "84af02778457c2151ca874c11e2cf292"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "88d354cf4757dad0b859bb004c25aea9"
  },
  {
    "url": "vue/diff.html",
    "revision": "de046b30c9d502a1805951d00d621ab7"
  },
  {
    "url": "vue/props.html",
    "revision": "14be5375629e5e0808545a6dd117fd2e"
  },
  {
    "url": "vue/react.html",
    "revision": "f80563a3bef3897ae85a9b2c83f172f6"
  },
  {
    "url": "vue/webpack.html",
    "revision": "50ce8a4ebea45977069cb28c76443a21"
  },
  {
    "url": "webGL/index.html",
    "revision": "966001a2372534734ee80f8fb19e3f2d"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "4da16bbaf7121ebe33870bc1201c29a0"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "245e52f5973897f9feb9f23386c6fc19"
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

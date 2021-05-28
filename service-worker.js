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
    "revision": "57a2d1ac0f21defcf41026d1fd1aaf63"
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
    "url": "assets/js/11.48253d3d.js",
    "revision": "84b50eef7a5ab2327a23266441e4c42f"
  },
  {
    "url": "assets/js/12.52a18985.js",
    "revision": "755d043115fdd248329ab3044683e0d8"
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
    "url": "assets/js/15.fc23f409.js",
    "revision": "d79283bdcfd5c55ed74992d5fad17527"
  },
  {
    "url": "assets/js/16.5386e44a.js",
    "revision": "52aab232927e5462d9ecee2c4ca094b9"
  },
  {
    "url": "assets/js/17.8c4b45fc.js",
    "revision": "f57ca2adf601e166f5bd440d668c83c1"
  },
  {
    "url": "assets/js/18.0cf3d6ad.js",
    "revision": "124c2175a90d6cbdfab0b3e3363a483b"
  },
  {
    "url": "assets/js/19.d471f1ff.js",
    "revision": "3e9d074095005dda1a3e652d165d05f4"
  },
  {
    "url": "assets/js/2.669adcb6.js",
    "revision": "db829ce40a607f646e99cf24d66d0ae5"
  },
  {
    "url": "assets/js/20.e513e31f.js",
    "revision": "03bd20805d9f10605ea5d0c2c166f36b"
  },
  {
    "url": "assets/js/21.8bf9554e.js",
    "revision": "4705c300f44f3d42096803a77b2c820e"
  },
  {
    "url": "assets/js/22.bf76a898.js",
    "revision": "ba5d3bd91e993933f600858b5576271b"
  },
  {
    "url": "assets/js/23.3e4a6bb9.js",
    "revision": "b2dd25ac7b9392fb33e60385a96660fd"
  },
  {
    "url": "assets/js/24.d936a030.js",
    "revision": "6f46a4d7345b4c5f56d227016e0c3b6a"
  },
  {
    "url": "assets/js/25.947e5ffb.js",
    "revision": "86f6dc4129eb0c0ffd7666ae9360eb4a"
  },
  {
    "url": "assets/js/26.46c7f3e5.js",
    "revision": "dfd5bf89a04b938c4d69b1906b878704"
  },
  {
    "url": "assets/js/27.7ddefcaa.js",
    "revision": "3da36a88fcd424689121b0494e02f64c"
  },
  {
    "url": "assets/js/28.e82ded5d.js",
    "revision": "777ca09487133e972c19478de8e73912"
  },
  {
    "url": "assets/js/29.3e593e59.js",
    "revision": "e24b95a2e362b5b743e4f38792768ee4"
  },
  {
    "url": "assets/js/3.3bf12d48.js",
    "revision": "9ffffb989bb38c870c2a7611e1bc903d"
  },
  {
    "url": "assets/js/30.b7340f43.js",
    "revision": "e94252624635f634a2d4dcc930d2b458"
  },
  {
    "url": "assets/js/31.71640ed0.js",
    "revision": "f8d2e64cb3769c6799d5428dfea16cb9"
  },
  {
    "url": "assets/js/32.b317d899.js",
    "revision": "b55b0e3e5f1266f851af14a35e2d88f8"
  },
  {
    "url": "assets/js/33.33029ab1.js",
    "revision": "1191d80550cbdc42927683d3693e4093"
  },
  {
    "url": "assets/js/34.a4b0511b.js",
    "revision": "29cbee6359a53d9c4d09026587ae9a04"
  },
  {
    "url": "assets/js/35.4e7bf53e.js",
    "revision": "c6310dd0a3b075b4c549fc50b11ce10a"
  },
  {
    "url": "assets/js/36.bd03c3f7.js",
    "revision": "8cf9d5c84e17dade21c5f2b87a5ff1dd"
  },
  {
    "url": "assets/js/37.fa74ee64.js",
    "revision": "c58ef98e72eb56966485960f00172cc9"
  },
  {
    "url": "assets/js/38.b2b3a126.js",
    "revision": "5fc6e30b9040ec2abe1faf6ecb7063be"
  },
  {
    "url": "assets/js/39.eec58eb0.js",
    "revision": "86458a53873e41ea79d018d59786f0c5"
  },
  {
    "url": "assets/js/4.8890886c.js",
    "revision": "ca128f069da36c3bfc4913bd7330e3c9"
  },
  {
    "url": "assets/js/40.787d9a52.js",
    "revision": "d12fa58884cf6570e1acc74b4b14a423"
  },
  {
    "url": "assets/js/41.4b0a0f4a.js",
    "revision": "9a7a6f0c781cd04c3e0754399945bf97"
  },
  {
    "url": "assets/js/42.d29d9c65.js",
    "revision": "9601469985a20a1660c36a0b65262675"
  },
  {
    "url": "assets/js/43.571e6ee3.js",
    "revision": "b16ba2c0fb325600447ceb44d27c284f"
  },
  {
    "url": "assets/js/44.54948254.js",
    "revision": "2ec02b75896d675731d6e0575eb538f4"
  },
  {
    "url": "assets/js/45.48cf9744.js",
    "revision": "3cd3431d67f0929cb4c64397a13549b8"
  },
  {
    "url": "assets/js/46.873d0d5d.js",
    "revision": "cb4847a9817caeec4af9a7d1c8b7172d"
  },
  {
    "url": "assets/js/47.04d2aa28.js",
    "revision": "52d8dca974cb48a1cef7b6e10e13cbe6"
  },
  {
    "url": "assets/js/48.03c9caaf.js",
    "revision": "6cc8d2764e19ad1e3399c7f6f14ca670"
  },
  {
    "url": "assets/js/49.3d40c96a.js",
    "revision": "d3b52919198f6f1a012adec49084dc31"
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
    "url": "assets/js/7.29e53c95.js",
    "revision": "78381a2a542dd62d4da46fecbedbef3a"
  },
  {
    "url": "assets/js/8.4151eb9c.js",
    "revision": "bea93e6b6ea5adf1a2f1c7f6c88b5f4a"
  },
  {
    "url": "assets/js/9.9ef922c1.js",
    "revision": "0a83225bb90b20de9bbf42371bfa6720"
  },
  {
    "url": "assets/js/app.218d4bc3.js",
    "revision": "0bd89d8520385d2faa0308a18f200d01"
  },
  {
    "url": "css/canvas.html",
    "revision": "45eadbe1ec8668ca11678cf2082d16f3"
  },
  {
    "url": "css/layout.html",
    "revision": "af25a29cfa034f1d2eab4086c98f6352"
  },
  {
    "url": "css/others.html",
    "revision": "ab0a11c379f884e88913fee5f3ce3ec0"
  },
  {
    "url": "css/xuanran.html",
    "revision": "541f08d8c06e9d2f0c2b729714481516"
  },
  {
    "url": "demo/docker.html",
    "revision": "f0d17aebcfe02e4bc99e48a98a765ee1"
  },
  {
    "url": "demo/gogs.html",
    "revision": "2e9b4b2caa055777d1e0446a5a45bee8"
  },
  {
    "url": "demo/index.html",
    "revision": "c4e65cd15f781afa80b7f7d5106c6a68"
  },
  {
    "url": "demo/nginx-config.html",
    "revision": "5fbba674f98c1f3f022a8cce56e314f4"
  },
  {
    "url": "demo/nginx.html",
    "revision": "4fbb65cc9b49f8f85b2272b3c5eb128c"
  },
  {
    "url": "demo/suUI.html",
    "revision": "cba703657fe5a4edf3c2743bfa85d208"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "211c06662caf9c3bd09c8d0d300061fa"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "7b95c828ceaad730c954fcd6a65ed1a2"
  },
  {
    "url": "demo/yanye.html",
    "revision": "551ffd0c2f0299556c45d47dcc160fe5"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "fe3371a860f95a4ff08a5486caac9d28"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "8683e34419030561c29b8b49f31965b2"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "a8b5d960526a2dbe1e137bcd560b3087"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "a00c8185126a1d1992745e8fd3346fe8"
  },
  {
    "url": "git/index.html",
    "revision": "982724dfe72c31d8bd697db9af29ab5c"
  },
  {
    "url": "index.html",
    "revision": "35850fe1043301ad138bd6599e1df074"
  },
  {
    "url": "introduce/index.html",
    "revision": "8ab7ca57458fe92e4ceb5e716862c0dd"
  },
  {
    "url": "js/axios.html",
    "revision": "2f23fcef91b6c8f09fb8076e71ce1e40"
  },
  {
    "url": "js/basic.html",
    "revision": "b61c2fb5908a1949c7bafc70562e6dc5"
  },
  {
    "url": "js/promise.html",
    "revision": "234aa7df68c28921bf1a5e20c0c60757"
  },
  {
    "url": "js/zancun.html",
    "revision": "7c05da4872b59b2642816544fab6e140"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mix/flutter.html",
    "revision": "cdb451cef719ea87536b05f60837aba2"
  },
  {
    "url": "mix/index.html",
    "revision": "7cc7df96270c4c3b652cff8b9ffea878"
  },
  {
    "url": "mix/miniProgram.html",
    "revision": "c94d6b82e6fc229f210e5a681b45dfc8"
  },
  {
    "url": "mix/uniapp.html",
    "revision": "6b9a852715030ef762360166d0f03136"
  },
  {
    "url": "mix/yukexcx.html",
    "revision": "fe6843f29211a8031b5747c51656a297"
  },
  {
    "url": "mytools/fiddler.html",
    "revision": "b7194901670f6eb3f60f07a64981689f"
  },
  {
    "url": "mytools/index.html",
    "revision": "45a2a05acba639f9036b0dd8c68bacf1"
  },
  {
    "url": "mytools/linux.html",
    "revision": "b6fbc534fc0bdfcc95efe4dbfa53c977"
  },
  {
    "url": "utils/index.html",
    "revision": "3a2ae8a9672008d37f3c5ea19aac6c54"
  },
  {
    "url": "utils/regexp.html",
    "revision": "397ba89f0a252cf4ffa47723068d3207"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "5f2bef933cb88360386fa0f14f240471"
  },
  {
    "url": "vue/diff.html",
    "revision": "f8d48a53373d91a33bb7cdc6ecf0c6fa"
  },
  {
    "url": "vue/props.html",
    "revision": "605d5606828ea2b390fc5a26cd918b41"
  },
  {
    "url": "vue/react.html",
    "revision": "37cca70b39f8c33a913d701c51e10a66"
  },
  {
    "url": "vue/webpack.html",
    "revision": "45c3ced697316b53d30b723982da5906"
  },
  {
    "url": "webGL/index.html",
    "revision": "aa963d3cc5ac857edc60e8eb60527626"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "e96e3610e4dd06c95f31d51b1bcf7b93"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "1351cb427077f8d76588dea179c23e35"
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

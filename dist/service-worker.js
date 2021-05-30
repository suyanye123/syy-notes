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
    "revision": "7f796db30c443655565759d1083c297b"
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
    "url": "assets/img/lyh.511cb7ac.png",
    "revision": "511cb7ac02b6530602cb2a4fc639ddf9"
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
    "url": "assets/img/wxlogin.c92876d8.jpg",
    "revision": "c92876d8f4d4771f9eeb3fde9a6f9841"
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
    "url": "assets/js/10.bfc8ad50.js",
    "revision": "543d1dd2614c263541e9c9590523c851"
  },
  {
    "url": "assets/js/11.23bb1da2.js",
    "revision": "ccc7a4f81d3139d66224a1581f1b41ea"
  },
  {
    "url": "assets/js/12.c7feea3b.js",
    "revision": "0187ba6ac09785d02313a26d31b643a4"
  },
  {
    "url": "assets/js/13.9655fd52.js",
    "revision": "d7d323a4d7d0b367697eed1cfcdc9541"
  },
  {
    "url": "assets/js/14.185ee0c3.js",
    "revision": "96d307ca3674eff854edbbc38c1d2fb8"
  },
  {
    "url": "assets/js/15.8d781460.js",
    "revision": "782cead6debb0ec9b98f60070c644bfd"
  },
  {
    "url": "assets/js/16.7097cabe.js",
    "revision": "d3c6843bc50fe704f0cec55b17ddd2f4"
  },
  {
    "url": "assets/js/17.b94ddbb7.js",
    "revision": "a0581bbbc4787a9a83ada2e2845b6f0d"
  },
  {
    "url": "assets/js/18.aea2e585.js",
    "revision": "9a0999eff5f07f5aaf9e528e3c50596a"
  },
  {
    "url": "assets/js/19.8136eaee.js",
    "revision": "3386fb4a8ce61d71c5ae27585859f84e"
  },
  {
    "url": "assets/js/2.c240e540.js",
    "revision": "a0ef98419be54957ee72ed99dc6ae98d"
  },
  {
    "url": "assets/js/20.eddffe12.js",
    "revision": "b0fbb3de8e78a6bea6d749f3d8d5abde"
  },
  {
    "url": "assets/js/21.29e7cf26.js",
    "revision": "8616d59f8cf80059a07d31087373c25c"
  },
  {
    "url": "assets/js/22.a000116e.js",
    "revision": "fa43a5ecb661cb356e6bd4dea386160b"
  },
  {
    "url": "assets/js/23.85568f11.js",
    "revision": "1479ca4a4580bb43b81aa1d699465633"
  },
  {
    "url": "assets/js/24.f27c081f.js",
    "revision": "52ee698fcbcdc0a7fd817c3373fac4da"
  },
  {
    "url": "assets/js/25.0928357c.js",
    "revision": "c8166256372f45844ad581a97acf30d3"
  },
  {
    "url": "assets/js/26.76bfdd05.js",
    "revision": "a86051faad17f41be119312718231356"
  },
  {
    "url": "assets/js/27.e06db3ee.js",
    "revision": "e105613644bbc7b3141110d91bc55866"
  },
  {
    "url": "assets/js/28.c2979f61.js",
    "revision": "f091c7ac77f5acebfa342b38dccbc6d9"
  },
  {
    "url": "assets/js/29.37997cf3.js",
    "revision": "589e0f194b045e4e34ec5fd932810f0c"
  },
  {
    "url": "assets/js/3.18859c8d.js",
    "revision": "78922e09f9dfc86bbe8640354093273f"
  },
  {
    "url": "assets/js/30.805d8aa8.js",
    "revision": "c531253b0b6c6cc8f8495edac75ebea1"
  },
  {
    "url": "assets/js/31.e5f2e42d.js",
    "revision": "290335df53cc6d7b428dd47612cf3d2c"
  },
  {
    "url": "assets/js/32.f49f294d.js",
    "revision": "1cecdb2b329a40b303a88f74eafc6296"
  },
  {
    "url": "assets/js/33.5d7edeeb.js",
    "revision": "e0d6ae09a3d771f2b68bdc6267e2e446"
  },
  {
    "url": "assets/js/34.e2db2183.js",
    "revision": "f0367b0b82a2d2b300e6c27806aa8a00"
  },
  {
    "url": "assets/js/35.eb7c48e3.js",
    "revision": "fbc36fd1aca99a768f2caeded924983f"
  },
  {
    "url": "assets/js/36.0242f987.js",
    "revision": "8f14876251ce776424c13138160045cb"
  },
  {
    "url": "assets/js/37.6265e88a.js",
    "revision": "2e3a08960055c4989d06f157e2abec8e"
  },
  {
    "url": "assets/js/38.cf5cee9d.js",
    "revision": "294bb5318c1ee1a5e451a00588766086"
  },
  {
    "url": "assets/js/39.bf5a8d88.js",
    "revision": "4af4a404465c4c5bfd08ff5b8679eef9"
  },
  {
    "url": "assets/js/4.5d6618c5.js",
    "revision": "44dfc656cadac12a812f830a3f8c2802"
  },
  {
    "url": "assets/js/40.d6ba4764.js",
    "revision": "437dcee1d7aa9bf52e1a04653cd7428b"
  },
  {
    "url": "assets/js/41.7ae25acf.js",
    "revision": "ee31fc44eed2d2e7c2213c6b0e10abc8"
  },
  {
    "url": "assets/js/42.175b2cc3.js",
    "revision": "edce84008aa3a49a535ffcfb9173b727"
  },
  {
    "url": "assets/js/43.33201b33.js",
    "revision": "ab566ca90edf2b3e1cf284c3447083b1"
  },
  {
    "url": "assets/js/44.c111c48b.js",
    "revision": "3c569c70b06ebf60f56ebc450ea3c069"
  },
  {
    "url": "assets/js/45.b6fff7a8.js",
    "revision": "d7aa1edf1c5dcd0e30bd15818f2aac5a"
  },
  {
    "url": "assets/js/46.06f058a8.js",
    "revision": "1f14537eb655cfc5285138ca635798c3"
  },
  {
    "url": "assets/js/47.c98df0b8.js",
    "revision": "8b0eaade1be84165502ed0ffc952be65"
  },
  {
    "url": "assets/js/48.0732eee4.js",
    "revision": "680ac177b66a4abea6db08804850076b"
  },
  {
    "url": "assets/js/49.139045f9.js",
    "revision": "705c9e604e92d1e0742d3b0d2af99e7c"
  },
  {
    "url": "assets/js/5.d4bdd74c.js",
    "revision": "c3ba123070351483a99be392d9ac2f91"
  },
  {
    "url": "assets/js/50.ccabdd46.js",
    "revision": "98d92936ebeba390489bad598c2e27fd"
  },
  {
    "url": "assets/js/51.5dc5b3aa.js",
    "revision": "9b24fd3b132251ed862d7bb14a69dccb"
  },
  {
    "url": "assets/js/52.a7db484f.js",
    "revision": "55d339f7982d4d4729aebd7211e78341"
  },
  {
    "url": "assets/js/6.0490b026.js",
    "revision": "4beda2ac4568841c1425b7b53724dfb3"
  },
  {
    "url": "assets/js/7.e308006f.js",
    "revision": "0e704ce51a59a6a23ea534a0c54344a6"
  },
  {
    "url": "assets/js/8.c69040e4.js",
    "revision": "53e965457229904aa8bbaa46eb905b87"
  },
  {
    "url": "assets/js/9.e8b1b3c4.js",
    "revision": "0ce8d83f44d52b815a7754fc55e8e10b"
  },
  {
    "url": "assets/js/app.094dc226.js",
    "revision": "9738187368bd562790c1dec350d04643"
  },
  {
    "url": "css/canvas.html",
    "revision": "3c4320e077bc7f75bf0e6752b1349b19"
  },
  {
    "url": "css/layout.html",
    "revision": "4054f680bce55d49c3e656e0f222b81b"
  },
  {
    "url": "css/others.html",
    "revision": "2538c95f24fd0343aaf1e8acccb86582"
  },
  {
    "url": "css/xuanran.html",
    "revision": "8a804e07c85ed813f2003e213f46e909"
  },
  {
    "url": "demo/docker.html",
    "revision": "9255248f381e937cf014924f550ffdc7"
  },
  {
    "url": "demo/gogs.html",
    "revision": "88a84596517a405f7a2d5d9637e0d068"
  },
  {
    "url": "demo/index.html",
    "revision": "e7af9b7293b2b5a2be2f80a0cd16f24a"
  },
  {
    "url": "demo/nextcloud.html",
    "revision": "8d907c7aeb96d085209d951cd4480b07"
  },
  {
    "url": "demo/nginx-config.html",
    "revision": "3e2d66cba713145e90395c064c4da376"
  },
  {
    "url": "demo/nginx.html",
    "revision": "b781e2efce65978ee15ffba6ecd5a368"
  },
  {
    "url": "demo/suUI.html",
    "revision": "9d0277d75239290a608e41822913c665"
  },
  {
    "url": "demo/vsftpd.html",
    "revision": "4bae8e2225b13c9e12ce053e1228d925"
  },
  {
    "url": "demo/vuepress.html",
    "revision": "e4770564d37085dc975b38d57234ecaf"
  },
  {
    "url": "demo/yanye.html",
    "revision": "1008e786de71f64878978bdef57b7581"
  },
  {
    "url": "freeTalk/dairy.html",
    "revision": "7b76ab68a699d256fbc466416a898210"
  },
  {
    "url": "freeTalk/index.html",
    "revision": "2eaceb32d5c5ca81c665f289eeeed25a"
  },
  {
    "url": "freeTalk/more.html",
    "revision": "cc787599f78ea35e7cc79f44449654ad"
  },
  {
    "url": "freeTalk/quest.html",
    "revision": "d19b09270dec1fdb298d40b7eb638021"
  },
  {
    "url": "git/index.html",
    "revision": "f3c3e99c6d90cc4d9b99e0cbe4fd46e8"
  },
  {
    "url": "index.html",
    "revision": "6a4f9adeb55e53abbc3055ddc1e67967"
  },
  {
    "url": "introduce/index.html",
    "revision": "d17f734c3b7a037c80973f200147397d"
  },
  {
    "url": "js/axios.html",
    "revision": "b8a28aa0ad49cbf12cf82b39b41276f6"
  },
  {
    "url": "js/basic.html",
    "revision": "38c66d4b318f1eaee7375daa4e9a041d"
  },
  {
    "url": "js/promise.html",
    "revision": "f2cd55eb58e901c0afad2771c078e432"
  },
  {
    "url": "js/zancun.html",
    "revision": "786a18d1981614dbc6551efe92a56b25"
  },
  {
    "url": "logo1.jpg",
    "revision": "1ea6e16303e6cd9f6cdc6091130c2664"
  },
  {
    "url": "mix/flutter.html",
    "revision": "91315b30c4d8f0a814efbe06393cc825"
  },
  {
    "url": "mix/index.html",
    "revision": "244ad0d779d7d36b8da3335738238b66"
  },
  {
    "url": "mix/miniProgram.html",
    "revision": "34d45f960082aa51cdeda1524f79670c"
  },
  {
    "url": "mix/uniapp.html",
    "revision": "e734cb9b62d801e77b09c942e6421796"
  },
  {
    "url": "mix/yukexcx.html",
    "revision": "2c67b3b82414d1376d5d5775ac81ccfe"
  },
  {
    "url": "mytools/fiddler.html",
    "revision": "f46aec9c38e9a9170a2165f256a32b5e"
  },
  {
    "url": "mytools/index.html",
    "revision": "01ddca0ce9cb1df6980c3e56766c98aa"
  },
  {
    "url": "mytools/linux.html",
    "revision": "5aa7779996998fd8d829b0882ce61865"
  },
  {
    "url": "utils/index.html",
    "revision": "7b57649c23a1495f2c2021d185ff330f"
  },
  {
    "url": "utils/regexp.html",
    "revision": "564cc2e163896df2058652dbbc8484e3"
  },
  {
    "url": "utils/timestamp.html",
    "revision": "045155259185ec67ca79739882619982"
  },
  {
    "url": "vue/diff.html",
    "revision": "88a6e7cc77709c38516aedc7945fa30d"
  },
  {
    "url": "vue/props.html",
    "revision": "ca3b524bb2c0d1a42eaf718fb898e98d"
  },
  {
    "url": "vue/react.html",
    "revision": "4f308b7eade7075df8209acd692fdea7"
  },
  {
    "url": "vue/webpack.html",
    "revision": "d6c9d329131d75e194d7486a277ed479"
  },
  {
    "url": "webGL/index.html",
    "revision": "fdbffd74368b7e492683386529318adc"
  },
  {
    "url": "webGL/pixijs.html",
    "revision": "688ba6673020cf24983740ac47730674"
  },
  {
    "url": "webGL/threejs.html",
    "revision": "865021ad9248d106a927c9f10b30b6e9"
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

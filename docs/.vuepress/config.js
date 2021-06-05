const base = process.env.BUILD_ENV ? process.env.BUILD_ENV : "/syy-notes/";

module.exports = {
  base,
  dest: "./dist",
  title: "前端小札",
  description: "前端常用知识、踩坑记录荐等",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "前端小札",
      description: "前端常用知识、踩坑记录等",
    },
  },
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["link", { rel: "apple-touch-icon", href: "/favicon.ico" }],
    ["link", { rel: "mask-icon", href: "/favicon.ico", color: "#3eaf7c" }],
    ["meta", { name: "msapplication-TileImage", content: "/favicon.ico" }],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  ],
  themeConfig: {
    nav: [
      {
        text: "工作项目",
        items: [
          { text: "后台管理系统", link: "http://admin.yuke520.com/" },
          { text: "裕客商城小程序", link: "../uniapp/yukexcx" },
        ],
      },
      { text: " suUI ", link: "https://yu-nan.gitee.io/suui" },
      { text: "言叶之庭", link: "http://www.syy123.com" },
      {
        text: "关于",
        items: [
          { text: "GitHub", link: "https://github.com/suyanye123/syy-notes" },
          { text: "关于我", link: "../introduce/" },
        ],
      },
    ],
    sidebar: [
      {
        title: "网页工具",
        path: "/mytools/",
      },
      {
        title: "我的项目",
        path: "/demo/",
        children: [
          "demo/vuepress",
          "demo/yanye",
          "demo/uni-template",
          "demo/suUI",
        ],
      },
      {
        title: "CSS",
        children: ["css/layout", "css/others", "css/canvas"],
      },
      {
        title: "JavaScript",
        children: ["js/basic", "js/promise", "js/axios"],
      },
      {
        title: "框架",
        children: [
          "frame/props",
          "frame/webpack",
          "frame/diff",
          "frame/react",
          "frame/mock",
        ],
      },

      {
        title: "混合开发",
        path: "/mix/",
        children: ["mix/uniapp", "mix/miniProgram", "mix/flutter"],
      },
      {
        title: "Git",
        path: "/git/",
      },
      {
        title: "WebGL",
        path: "/webGL/",
        children: ["webGL/threejs", "webGL/pixijs"],
      },
      {
        title: "utils",
        path: "/utils/",
        children: ["utils/timestamp", "utils/regexp"],
      },

      {
        title: "写点东西",
        path: "/freeTalk/",
        children: ["freeTalk/quest", "freeTalk/dairy", "freeTalk/more"],
      },
    ],
    lastUpdated: "上次更新",
  },
  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-153242456-1",
      },
    ],
    "@vuepress/back-to-top",
    [
      "@vuepress/pwa",
      {
        updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新",
        },
      },
    ],
  ],
};

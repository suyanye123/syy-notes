const base = process.env.BUILD_ENV ? process.env.BUILD_ENV : "";

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
    repo: "maomao1996/mm-notes/",
    nav: [
      {
        text: "后台管理",
        items: [
          { text: "中台管理", link: "" },
          { text: "后台管理", link: "" },
        ],
      },
      { text: "Blog", link: "https://www.syy123.com" },
    ],
    sidebar: [
      {
        title: "在线工具",
        children: ["online-tools/", "online-tools/bookmark-scripts"],
      },
      {
        title: "CSS",
        children: ["css/", "css/skill", "css/scss"],
      },
      {
        title: "Js",
        path: "/js/",
      },
      {
        title: "Vue",
        path: "/vue/",
      },
      {
        title: "Git",
        path: "/git/",
      },
      {
        title: "uni-app",
        children: [
          "uniapp/scroll",
         
        ],
      },
      {
        title: "utils",
        children: ["utils/regexp"],
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

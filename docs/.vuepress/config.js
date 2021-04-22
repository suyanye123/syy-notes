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
    // repo: "suyanye123/syy-notes/", //这是github链接
    nav: [
      {
        text: "工作项目",
        items: [
          { text: "后台管理系统", link: "http://admin.yuke520.com/" },
          { text: "裕客商城小程序", link: "../uniapp/yukexcx" },
        ],
      },
      { text: " suUI ", link: "https://yu-nan.gitee.io/suui" },
      { text: "言叶之庭", link: "https://www.syy123.com" },
    ],
    sidebar: [
      {
        title: "简单介绍",
        path: "introduce/",
      },
      {
        title: "网页工具",
        path: "mytools/",
      },
      {
        title: "Demo",
        path: "/demo/",
        children: ["demo/suUI", "demo/vuepress", "demo/vitepress"],
      },
      {
        title: "CSS",
        children: ["css/", "css/others"],
      },
      {
        title: "前后端交互",
        children: ["js/promise", "js/axios", "js/http"],
      },
      {
        title: "Vue",
        children: ["vue/", "vue/props"],
      },
      {
        title: "React",
        path: "react/",
      },
      {
        title: "Git",
        path: "git/",
      },
      {
        title: "uni-app",
        children: ["uniapp/", "uniapp/miniProgram"],
      },
      {
        title: "utils",
        children: ["utils/timestamp", "utils/regexp"],
      },
      {
        title: "八股文",
        children: ["interview/quest", "interview/more"],
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

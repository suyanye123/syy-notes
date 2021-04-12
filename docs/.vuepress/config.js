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
    repo: "yu-nan/syy-notes/", //这是github链接
    nav: [
      {
        text: "后台管理",
        items: [
          { text: "中台管理", link: "" },
          { text: "后台管理", link: "" },
        ],
      },
      { text: "言叶之庭", link: "https://www.syy123.com" },
      { text: "uniapp", link: "https://www.test.syy123.com" },
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
        title: "CSS",
        children: ["css/", "css/flex"],
      },
      {
        title: "前后端交互",
        children: ["js/promise"],
      },
      {
        title: "Vue",
        children: ["vue/", "vue/vue3", "vue/props"],
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

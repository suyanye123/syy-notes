<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />

    <div id="gitalk-container"></div>
  </main>
</template>

<script>
import PageEdit from "@parent-theme/components/PageEdit.vue";
import PageNav from "@parent-theme/components/PageNav.vue";
import Gitalk from "gitalk";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems"],
  mounted() {
    this.init(location.pathname);
    this.$router.afterEach((to, from) => {
      if (to.path !== from.path) {
        console.log(to.path, from.path, "页面切换了");
        this.init(to.path);
      }
    });
  },
  methods: {
    init(path) {
      path = path.includes("/syy-notes") ? path : `/syy-notes${path}`;
      const gitalk = new Gitalk({
        clientID: "5800ca32a72b2d040c1d",
        clientSecret: "58a53aefa780bce77e94e2118281709146d05015",
        repo: "syy-notes",
        owner: "suyanye123",
        admin: ["suyanye123"],
        id: path,
        body: path,
        distractionFreeMode: false,
      });
      const dom = document.getElementById("gitalk-container");
      dom && (dom.innerHTML = "");
      gitalk.render("gitalk-container");
    },
  },
};
</script>

<style lang="stylus">
// @require '../styles/wrapper.styl'
@require '../../styles/gitalk.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}

#gitalk-container {
  padding: 0 2.25rem;
  max-width: $contentWidth;
  margin: 0 auto;
}
</style>

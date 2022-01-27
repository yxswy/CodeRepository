<script setup lang="ts">
import "@/styles/index.scss";
import hljs from "highlight.js";
import "highlight.js/styles/agate.css";
import http from "./utils/http/simple";
import { onMounted, reactive } from "vue";
import { ElScrollbar } from "element-plus";
import Loader from "./components/HelloWorld.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import 'nprogress/test'

NProgress.configure({
  minmum: 1.1,
  showSpinner: false,
});

let state = reactive<{
  html: string;
  list: any[];
  form: Record<string, any>;
}>({
  html: "",
  form: {},
  list: [],
});

const init = () => {
  http({
    url: "http://localhost:3010/file/list",
  }).then((res) => {
    state.list = res?.data || [];
  });
};

onMounted(init);

const showCode = (id: string) => {
  NProgress.start();
  http({
    url: "http://localhost:3010/file/detail/" + id,
  })
    .then((res) => {
      state.html = hljs.highlight(res?.data?.file_content || "", {
        language: "js",
      }).value;
      state.form = res?.data || {};
    })
    .finally(() => {
      NProgress.done(true);
    });
};
</script>

<template>
  <ElScrollbar>
    <main>
      <aside>
        <p class="title">相关文章</p>
        <ul>
          <li
            class="active"
            v-for="item in state.list"
            :key="item.id"
            @click="showCode(item.id)"
          >
            <a>{{ item.file_title }}</a>
          </li>
        </ul>
      </aside>
      <div class="app-main">
        <div class="main-title">{{ state.form.file_title }}</div>
        <p>
          <span>浏览次数：203158次</span>
          <a class="action">download</a>
          <a class="action">copy-all</a>
        </p>
        <Loader :loading="false" />
        <pre><code :class="{ [`language-` + state.form.file_extname]: true }" v-html="state.html"></code>
        </pre>
      </div>
      <router-view />
    </main>
  </ElScrollbar>
</template>

<style lang="scss" scoped>
pre {
  width: 100%;
  min-height: 180px;
  border: 1px solid $borderColor;
  border-radius: 6px;
  padding: 14px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  font-size: 0;
  code {
    font-family: Impact !important;
    font-size: 14px;
  }
  &.over {
    border-color: white;
  }
  img {
    width: 38px;
    height: 38px;
  }
}
</style>

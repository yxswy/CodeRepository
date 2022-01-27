<script lang="ts">
import { useRoute } from "vue-router";
import {
  computed,
  onMounted,
  toRefs,
  defineComponent,
  watch,
  onUnmounted,
  reactive,
} from "vue";
import http from "../utils/http/simple";
import hljs from "highlight.js";
import "highlight.js/styles/agate.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  minmum: 1.1,
  showSpinner: false,
  parent: "pre",
});

export default defineComponent({
  setup(props) {
    const form = reactive({
      file_content: "",
      file_extname: "js",
      file_title: "",
    });
    let unWatch;
    const init = () => {
      const route = useRoute();

      const getData = () => {
        const { id } = route.params;

        if (id) {
          NProgress.start();
          http({
            url: "http://192.168.20.158:3010/file/detail/" + id,
          })
            .then((res) => {
              Object.assign(form, res?.data || {});
            })
            .finally(() => {
              NProgress.done(true);
            });
        }
      };
      unWatch = watch(route, getData, { immediate: true });
    };
    onMounted(init);
    onUnmounted(() => {
      unWatch();
    });

    const html = computed(() => {
      return hljs.highlight(form?.file_content || "", {
        language: form?.file_extname || "js",
      }).value;
    });

    return { html, ...toRefs(form) };
  },
});
</script>

<template>
  <div class="main-title tran">
    {{ file_title || "Welcome" }}
  </div>
  <div class="tran" v-show="file_title">
    <p>
      <span>浏览次数：203158次</span>
      <a class="action">download</a>
      <a class="action">copy-all</a>
    </p>
  </div>
  <pre
    v-show="html"
  ><code :class="{ [`language-` + file_extname]: true }" v-html="html"></code></pre>
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

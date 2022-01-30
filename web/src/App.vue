<script setup lang="ts">
import "@/styles/index.scss";
import "highlight.js/styles/agate.css";
import http from "./utils/http/simple";
import { onMounted, reactive } from "vue";
import { ElScrollbar } from "element-plus";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

let state = reactive<{
  list: any[];
}>({
  list: [],
});

const init = () => {
  http({
    url: "http://localhost:3010/api/code/list",
  }).then((res) => {
    state.list = res?.data?.data || [];
  });
};

onMounted(init);

const showCode = (id: string) => {
  router.push({ path: "/homepage/" + id });
};
</script>

<template>
  <ElScrollbar>
    <main>
      <aside>
        <p class="title">Article</p>
        <ul>
          <li
            :class="{ active: route.params.id === String(item.id) }"
            v-for="item in state.list"
            :key="item.id"
            @click="showCode(item.id)"
          >
            <a>{{ item.file_title }}</a>
          </li>
        </ul>
      </aside>
      <div class="app-main">
        <router-view />
      </div>
    </main>
  </ElScrollbar>
</template>

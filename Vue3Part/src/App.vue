<script setup lang="ts">
import '@/styles/index.scss'
import hljs from 'highlight.js'
import 'highlight.js/styles/agate.css'
import http from './utils/http/simple'
import { onMounted, ref } from 'vue'

let html = ref('')
let extname = ref('')
let fileName = ref('')

const init = () => {
  http({
    url: 'http://localhost:3010/',
  }).then(res => {
    const content: string = res?.data?.content
    html.value = hljs.highlight(content, { language: 'js' }).value
    extname.value = res?.data?.extname
    fileName.value = res?.data?.name
  })
}

onMounted(init)
</script>

<template>
  <div>
    <main>
      <aside>
        <p class="title">相关文章</p>
        <ul>
          <li class="active">
            <a>node服务系列发的作品</a>
          </li>
          <li>
            <a>node服务使用http原生的作品</a>
          </li>
          <li>
            <a>node服务下载文node服务下载文件品node服务下载文件品node服务下载文件品件品</a>
          </li>
          <li>
            <a>node服务系formDatat品</a>
          </li>
          <li>
            <a>node服务袋里转发，docker安装</a>
          </li>
        </ul>
      </aside>
      <div class="app-main">
        <div class="main-title">{{ fileName }}</div>
        <p>
          <span>浏览次数：203158次</span>
          <a class="action">download</a>
          <a class="action">copy-all</a>
        </p>
        <pre><code :class="{ [`language-` + extname]: true }" v-html="html"></code></pre>
      </div>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
pre {
  width: 100%;
  min-height: 180px;
  border: 1px solid $borderColor;
  border-radius: 6px;
  padding: 14px;
  box-sizing: border-box;
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

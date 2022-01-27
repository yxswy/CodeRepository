<script setup lang="ts">
defineProps<{ loading: boolean }>();
</script>

<template>
  <div class="app-loading" v-if="loading">
    <div class="loading"></div>
  </div>
</template>

<style scoped lang="scss">
.app-loading {
  width: 100%;
  height: 100%;
  display: flex;
  padding-left: 80px;
  align-items: center;
  // pointer-events: none;
  .loading {
    width: 32px;
    height: 32px;
    border-radius: 50px;
    border-width: 4px;
    border-top-color: #42b983;
    border-bottom-color: transparent;
    border-left-color: #42b983;
    border-right-color: transparent;
    animation: identifier 0.76s infinite linear;
    border-style: solid;
  }
}

@keyframes identifier {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
</script>

<template>
  <ConfigProvider>
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </ConfigProvider>
</template>

<style lang="less" scoped></style>

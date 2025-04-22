<script lang="ts" setup>
const props = defineProps<{
    title: string
}>()
</script>

<template>
    <div class="box">
      <div class="box-header">
        <span class="title">{{ title }}</span>
        <slot name="header-action" />
      </div>
      <slot />
    </div>
  </template>

<style scoped>
/* Estilização das caixas */
.box {
  flex-grow: 1;
  min-height: 100%;
  background-color: white;
  overflow-y: auto;
  position: relative;
  /* Garante que .box-header fique limitada à .box */
}

/* Header da primeira caixa */
.box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: rgba(160, 160, 160, 0.997);
  border-bottom: 2px solid #ddd;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* Para garantir que não ultrapasse a largura da .box */
}
</style>
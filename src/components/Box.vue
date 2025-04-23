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
.box {
  flex: 1; /* Cada box ocupa o mesmo espaço do container */
  height: auto;
  background: #2e2e3e;
  border-radius: 16px;
  overflow-y: auto;
  position: relative;
  padding: 0;
  box-shadow: 0 0 15px rgba(80, 0, 150, 0.15);
  border: 1px solid #3a3a4d;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  box-sizing: border-box;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;
}

.box:hover {
  box-shadow: 0 0 25px rgba(120, 0, 220, 0.3);
  transform: translateY(-2px);
}

/* Header da caixa */
.box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  box-sizing: border-box;
  background: linear-gradient(to right, #3a3a4d, #4b3c66);
  border-bottom: 1px solid #5c5c7a;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.box::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* Título */
.title {
  color: #e0e0ff;
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
</style>
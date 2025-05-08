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
    <div class="box-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.box {
  flex: 1;
  height: auto;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  padding: 0;
  box-shadow: 0 0 15px rgba(80, 0, 150, 0.15);
  border: 1px solid #5a4a70;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: transparent; /* Para evitar cor sólida por padrão */
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
  z-index: 1;
}

.box-body {
  padding: 16px 20px;
  background-color: rgba(46, 46, 62, 0.4); /* Mesma cor que o .box, mas com opacidade */
  backdrop-filter: blur(4px); /* opcional: dá um efeito levemente fosco */
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  overflow-y: auto;
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
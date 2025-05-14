<script lang="ts" setup>
import { loja } from '@/data/loja';
import { ref } from 'vue';

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const selectedTab = ref<'avatares' | 'backgrounds'>('avatares')
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <button class="close-button" @click="emit('close')">×</button>
      <div class="tab-buttons">
        <button :class="{ active: selectedTab === 'avatares' }" @click="selectedTab = 'avatares'">Avatares</button>
        <button :class="{ active: selectedTab === 'backgrounds' }" @click="selectedTab = 'backgrounds'">Backgrounds</button>
      </div>

      <div v-if="selectedTab === 'avatares'" class="content-scroll">
        <h2>Avatares</h2>
        <div class="item-grid">
          <button v-for="avatar in loja.avatares" :key="avatar">
            <img :src="`/avatares/${avatar}`" :alt="avatar" width="80" />
          </button>
        </div>
      </div>

      <div v-else-if="selectedTab === 'backgrounds'" class="content-scroll">
        <h2>Backgrounds</h2>
        <div class="item-grid">
          <button v-for="bg in loja.backgrounds" :key="bg">
            <img :src="`/backgrounds/${bg}`" :alt="bg" width="120" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999; /* Faz com que o modal fique acima de tudo */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #2d2d30;
  color: #ffffff;
  padding: 32px;
  border-radius: 12px;
  width: 600px;
  max-height: 80vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 24px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
}

.tab-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.tab-buttons button {
  padding: 8px 16px;
  border: none;
  background-color: #444;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.tab-buttons button.active {
  background-color: #007bff;
}

.content-scroll {
  overflow-y: auto;
  flex-grow: 1;
}

.item-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.item-grid button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>

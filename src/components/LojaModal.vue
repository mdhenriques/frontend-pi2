<script lang="ts" setup>

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <button class="close-button" @click="emit('close')">×</button>
      <h2>Criar Tarefa</h2>
    </div>
  </div>
</template>
<style scoped>

.modal {
  background-color: #2d2d30;
  color: #ffffff;
  padding: 32px;
  border-radius: 12px;
  width: 448px;
  height: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
}
</style>
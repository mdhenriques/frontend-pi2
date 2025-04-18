<script lang="ts" setup>
import { ref } from 'vue';

defineProps<{
    show: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'create-task', task: { title: string; description: string }): void
}>()

const title = ref('')
const description = ref('')
function handleCreateTask() {}
</script>

<template>
    <div v-if="show" class="modal-overlay">
      <div class="modal">
        <h2>Criar Tarefa</h2>
        <form @submit.prevent="handleCreateTask">
          <label for="title">Título</label>
          <input type="text" id="title" v-model="title" required />

          <label for="description">Descrição</label>
          <textarea id="description" v-model="description"></textarea>

          <button type="submit">Confirmar</button>
          <button @click="emit('close')">Cancelar</button>
        </form>
      </div>
    </div>
</template>

<style>
</style>
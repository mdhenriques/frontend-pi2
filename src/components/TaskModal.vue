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
function handleCreateTask() {
  emit('create-task', {
    title: title.value,
    description: description.value
  })
}
</script>

<template>
    <div v-if="show" class="modal-overlay">
      <div class="modal">
        <h2>Criar Tarefa</h2>
        <form @submit.prevent="handleCreateTask" @submit="emit('close')">
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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* fundo escurecido */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background-color: #252525;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  animation: fadeIn 0.3s ease-in-out;
}

h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #ffffff;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #ffffff;
}

input,
textarea {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

input:focus,
textarea:focus {
  border-color: #007bff;
  outline: none;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.2s ease;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="button"],
button:not([type="submit"]):not([type="reset"]) {
  background-color: #ddd;
  color: #333;
}

button[type="button"]:hover,
button:not([type="submit"]):not([type="reset"]):hover {
  background-color: #bbb;
}

/* Animação suave ao abrir o modal */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
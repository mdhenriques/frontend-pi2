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
  background-color: rgba(15, 15, 25, 0.85); /* Fundo escurecido com leve roxo */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(6px);
}

.modal {
  background: linear-gradient(145deg, #2e2e3e, #3b3b52);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(120, 0, 220, 0.3);
  width: 100%;
  max-width: 480px;
  animation: fadeIn 0.3s ease-in-out;
  border: 1px solid #4b3c66;
}

h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  color: #e0e0ff;
  text-align: center;
  letter-spacing: 0.5px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #cfcfff;
  font-size: 0.95rem;
}

input,
textarea {
  padding: 0.8rem;
  margin-bottom: 1.2rem;
  background-color: #1f1f2e;
  color: #f0f0f5;
  border: 1px solid #5a4d7b;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #9c6fe4;
  outline: none;
  box-shadow: 0 0 0 2px rgba(156, 111, 228, 0.3);
}

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 0.6rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s;
}

button[type="submit"] {
  background: linear-gradient(to right, #7c4dff, #9575cd);
  color: white;
}

button[type="submit"]:hover {
  background: linear-gradient(to right, #6a1b9a, #7e57c2);
  transform: scale(1.02);
}

button[type="button"],
button:not([type="submit"]):not([type="reset"]) {
  background-color: #3a3a4d;
  color: #cfcfff;
}

button[type="button"]:hover,
button:not([type="submit"]):not([type="reset"]):hover {
  background-color: #50496c;
  transform: scale(1.02);
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

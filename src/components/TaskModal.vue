<script lang="ts" setup>
import { ref } from 'vue';

const isRepetitive = ref(false)
const repeatHours = ref<number | null>(null)
const deadline = ref<string | null>(null)
const taskDuration = ref<number | null>(null)


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
      <button class="close-button" @click="emit('close')">×</button>
      <h2>Criar Tarefa</h2>
      <form @submit.prevent="handleCreateTask">
        <label for="title">Título</label>
        <input type="text" id="title" v-model="title" required maxlength="50" />

        <label for="description">Descrição</label>
        <textarea id="description" v-model="description" maxlength="80"></textarea>

        <div class="toggle-section">
          <span>Tarefa:</span>
          <label class="switch">
            <input type="checkbox" v-model="isRepetitive" />
            <span class="slider"></span>
          </label>
          <span>{{ isRepetitive ? 'Repetitiva' : 'Única' }}</span>
        </div>

        <div v-if="isRepetitive" class="input-group">
          <label for="repeatHours">Tempo diário dedicado (horas)</label>
          <input type="number" id="repeatHours" v-model="repeatHours" min="1" max="24" />
        </div>

        <div v-else class="input-group horizontal-group">
          <div class="input-half">
            <label for="deadline">Data de Entrega</label>
            <input type="date" id="deadline" v-model="deadline" />
          </div>

          <div class="input-half">
            <label for="taskDuration">Tempo estimado (horas)</label>
            <input type="number" id="taskDuration" v-model="taskDuration" min="1" />
          </div>
        </div>

        <button type="submit">Confirmar</button>
      </form>
    </div>
  </div>
</template>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 15, 25, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(6px);
  padding: 1rem;
  overflow-y: auto;
}

.modal {
  position: relative;
  /* ADICIONADO! */
  background: linear-gradient(145deg, #2e2e3e, #3b3b52);
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(120, 0, 220, 0.3);
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
  animation: fadeIn 0.3s ease-in-out;
  border: 1px solid #4b3c66;
}

h2 {
  margin-top: 0;
  margin-bottom: 1.2rem;
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
  margin-bottom: 0.2rem;
  color: #cfcfff;
  font-size: 0.95rem;
}

input,
textarea {
  padding: 0.6rem;
  margin-bottom: 0.9rem;
  background-color: #1f1f2e;
  color: #f0f0f5;
  border: 1px solid #5a4d7b;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #9c6fe4;
  outline: none;
  box-shadow: 0 0 0 2px rgba(156, 111, 228, 0.3);
}

textarea {
  min-height: 80px;
  resize: vertical;
}

button {
  padding: 0.7rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 0.5rem;
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

button[type="button"] {
  background-color: #3a3a4d;
  color: #cfcfff;
}

button[type="button"]:hover {
  background-color: #50496c;
  transform: scale(1.02);
}

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

.toggle-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #cfcfff;
  font-weight: 600;
}

.input-group {
  margin-bottom: 1rem;
}

input[type="date"],
input[type="number"] {
  width: 100%;
  padding: 0.6rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  margin: 0 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #555577;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.switch input:checked+.slider {
  background-color: #7c4dff;
}

.switch input:checked+.slider:before {
  transform: translateX(24px);
}

/* Responsividade para telas pequenas */
@media (max-width: 480px) {
  .modal {
    padding: 1rem;
    max-width: 95vw;
    max-height: 95vh;
    font-size: 0.9rem;
  }

  .close-button {
    top: 10px;
    right: 10px;
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  input,
  textarea {
    font-size: 0.85rem;
  }
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.8rem;
  color: #cfcfff;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s, color 0.2s;
}

.close-button:hover {
  color: #ffffff;
  transform: scale(1.2);
}

.horizontal-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.input-half {
  flex: 1 1 150px;
  display: flex;
  flex-direction: column;
}
</style>

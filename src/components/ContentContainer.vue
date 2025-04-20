<script lang="ts" setup>
import type { Task } from '@/types/task';
import TaskCard from './TaskCard.vue';


const props = defineProps<{
    tasks: Task[]
}>()

const emit = defineEmits<{
    (e: 'add-task'): void
    (e: 'task-updated'): void
}>()
</script>

<template>
    <div class="content-container">
      <div class="box">
        <div class="box-header">
          <span class="title">TAREFAS</span>
          <button class="add-task-button" @click="emit('add-task')">+</button>
        </div>
        <TaskCard
         v-for="task in tasks"
         :key="task.id" 
         :task="task" 
         @task-updated="emit('task-updated')"
        />
      </div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
</template>

<style scoped>
/* Container das caixas */
.content-container {
  position: absolute;
  top: 213px; /* distância abaixo do avatar/perfil */
  left: 54px;
  right: 54px;
  bottom: 54px; /* mantém uma margem inferior */
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  width: calc(100% - 108px);
  height: auto;
}

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

/* Botão "+" */
.add-task-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-task-button:hover {
  background-color: #0056b3;
}
</style>
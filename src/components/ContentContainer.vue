<script lang="ts" setup>
import type { Task } from '@/types/task';
import type { Mission } from '@/types/mission';
import TaskCard from './TaskCard.vue';
import Box from './Box.vue';
import MissionCard from './MissionCard.vue';


const props = defineProps<{
  tasks: Task[];
  missions: Mission[];
}>()

const emit = defineEmits<{
  (e: 'add-task'): void;
  (e: 'task-updated'): void;
  (e: 'mark-completed', taskId: number, reward: { coins: number, xp: number }): void;
  (e: 'delete-task', taskId: number): void;
}>()
</script>

<template>
  <div class="content-container">
    <Box title="TAREFAS">
      <template #header-action>
        <button class="add-task-button" @click="emit('add-task')">+</button>
      </template>
      <TaskCard
       v-for="task in tasks" 
       :key="task.id" 
       :task="task" 
       @task-updated="emit('task-updated')"
       @mark-completed="(id, reward) => emit('mark-completed', id, reward)"
       @delete-task="(id) => emit('delete-task', id)"
       />  
    </Box>
    <Box title="OUTROS">
      
    </Box>
    <Box title="MISSÕES">
      <MissionCard
       v-for="mission in missions" 
       :key="mission.id" 
       :mission="mission" 
       />
    </Box>
  </div>
</template>

<style scoped>
/* Container das caixas */
.content-container {
  position: absolute;
  top: 213px;
  left: 54px;
  right: 54px;
  bottom: 54px;
  display: flex;
  gap: 20px;
  height: auto;
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
<script lang="ts" setup>
import { ref } from 'vue';
import type { Task } from '@/types/task';
import type { Mission } from '@/types/mission';
import TaskCard from './TaskCard.vue';
import Box from './Box.vue';
import MissionCard from './MissionCard.vue';

const draggingTask = ref<Task | null>(null);

const onDragStart = (task: Task): void => {
  draggingTask.value = task;
};

const onDragEnd = (): void => {
  draggingTask.value = null;
};

const props = defineProps<{
  tasks: Task[];
  missions: Mission[];
}>()

const emit = defineEmits<{
  (e: 'add-task'): void;
  (e: 'task-updated'): void;
  (e: 'mark-completed', taskId: number, reward: { coins: number, xp: number }): void;
  (e: 'mission-completed'): void;
  (e: 'delete-task', taskId: number): void;
  (e: 'move-to-in-progress', task: Task): void;
}>()

const onDropInProgress = () => {
  if (draggingTask.value) {
    emit('move-to-in-progress', draggingTask.value);
    emit('task-updated');
    draggingTask.value = null;
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};
</script>

<template>
  <div class="content-container">
    <Box title="TAREFAS">
      <template #header-action>
        <button class="add-task-button" @click="emit('add-task')">+</button>
      </template>
      <TaskCard 
        v-for="task in tasks.filter(task => Number(task.status) !== 1)" 
        :key="task.id"
        :task="task"
        :class="{ dragging: draggingTask?.id === task.id }"
        draggable="true"
        @dragstart="onDragStart(task)"
        @dragend="onDragEnd"
        @task-updated="emit('task-updated')"
        @mark-completed="(id, reward) => emit('mark-completed', id, reward)"
        @delete-task="(id) => emit('delete-task', id)" />
    </Box>
    <Box
     title="EM ANDAMENTO"
     @dragover="onDragOver"
     @drop="onDropInProgress"    
    >
    <TaskCard 
        v-for="task in tasks.filter(task => Number(task.status) === 1)" 
        :key="task.id"
        :task="task"
        :class="{ dragging: draggingTask?.id === task.id }"
        draggable="true"
        @dragstart="onDragStart(task)"
        @dragend="onDragEnd"
        @task-updated="emit('task-updated')"
        @mark-completed="(id, reward) => emit('mark-completed', id, reward)"
        @delete-task="(id) => emit('delete-task', id)" />
    </Box>
    <Box title="MISSÕES">
      <MissionCard v-for="mission in missions" :key="mission.id" :mission="mission"
        @mission-completed=" emit('mission-completed')" />
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
<script setup lang="ts">
import { computed, ref } from 'vue';

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    coinsReward: number;
    xpReward: number;
}

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{
    (event: "task-updated"): void;
    (event: "mark-completed", taskId: number, reward: { coins: number, xp: number }): void;
    (event: "delete-task", taskId: number): void;
}>();

const deleteTask = () => {
    emit("delete-task", props.task.id)
}
// Função para marcar a tarefa como concluída
const markAsCompleted = () => {
    if (props.task.status !== 'concluido') {
        emit("mark-completed", props.task.id, {
            coins: props.task.coinsReward,
            xp: props.task.xpReward
        });
    }
    console.log(props.task.status)
    console.log(statusLabel.value);
};
const statusMap: { [key: string]: string } = {
    '0': 'pendente',
    '1': 'emandamento',
    '2': 'concluido',
    '3': 'urgente',
    '4': 'atrasada',
};

const statusLabel = computed(() => {
    return statusMap[props.task.status] || 'desconhecido';
});


</script>

<template>
    <div :class="['task-card', $attrs.class]">
        <div class="card-header">
            <h3>{{ task.title }}</h3>
            <div class="status-line" :class="statusLabel"></div>
            <button class="delete-button" @click="deleteTask" title="Excluir tarefa">🗑️</button>
        </div>

        <p class="description">{{ task.description }}</p>

        <div class="rewards">
            <div class="reward">
                <span class="icon">💰</span>
                <span class="value">{{ task.coinsReward }}</span>
            </div>
            <div class="reward">
                <span class="icon">⭐</span>
                <span class="value">{{ task.xpReward }}</span>
            </div>
        </div>

        <button @click="markAsCompleted" class="check-button" :disabled="statusLabel === 'concluido'">
            ✔️ Marcar como feita
        </button>
    </div>
</template>

<style scoped>


.task-card {
    position: relative; /* Adicionado */
    background: #2e2e3e;
    border-radius: 18px;
    padding: 20px 20px 20px 26px; /* espaço extra à esquerda pro status-line */
    color: #f0f0f0;
    box-shadow: 0 0 15px rgba(80, 0, 150, 0.15);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    border: 1px solid #3a3a4d;
}

.task-card.dragging {
  opacity: 0.5;
  transform: rotate(2deg) scale(1.02);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  cursor: grabbing;
}

/* Corrige o conflito */
.task-card.dragging:hover {
  transform: rotate(2deg) scale(1.02);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
.task-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 25px rgba(120, 0, 220, 0.3);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
}

h3 {
    font-size: 1.2rem;
    color: #e0e0ff;
    margin: 0;
}



.status {
    font-size: 0.75rem;
    padding: 5px 12px;
    border-radius: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: #5e4b8b;
    color: #fff;
}

.status-line {
    background-color: #ffc107;
    color: white;
}

.status.pendente {
    background-color: #ffc107;
    color: #1e1e2f;
}

.status.concluido {
    background-color: #4caf50;
    color: white;
}

.status.emandamento {
    background-color: #42a5f5;
    color: white;
}

.description {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 16px;
    color: #ccc;
}

.rewards {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 12px;
}

.reward {
    background-color: #3a3a4d;
    padding: 10px 14px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    font-size: 0.95rem;
    font-weight: 500;
    color: #fff;
}

.reward .icon {
    margin-right: 6px;
    font-size: 1.2rem;
}

.check-button {
    background: linear-gradient(135deg, #7c4dff, #651fff);
    border: none;
    color: white;
    padding: 12px;
    width: 100%;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
}

.check-button:hover {
    background: linear-gradient(135deg, #9575cd, #7e57c2);
}

.check-button:disabled {
    background-color: #555;
    opacity: 0.5;
    cursor: not-allowed;
}

.status-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
}

/* Verde para concluído */
.status-line.concluido {
    background-color: #4caf50;
}

/* Amarelo para em andamento (vou assumir que o "pendente" é em andamento) */
.status-line.EmAndamento {
    background-color: #ffc107;
}

.delete-button {
    background: transparent;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    color: #aaa;
    transition: color 0.2s ease;
    margin-left: 8px;
}

.delete-button:hover {
    color: #ff5252;
}


</style>
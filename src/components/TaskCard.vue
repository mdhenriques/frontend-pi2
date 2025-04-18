<script setup lang="ts">
import axios from 'axios';

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
}>();
// Função para marcar a tarefa como concluída
const markAsCompleted = async () => {
    const token = localStorage.getItem("auth_token");
    try {
        await axios.put(
            `http://localhost:5155/tarefa/status/${props.task.id}`,
            {
                status: "concluido",
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );

        await axios.put(
             "http://localhost:5155/user/reward",
             { coinReward: props.task.coinsReward, xpReward: props.task.xpReward },
             { headers: { Authorization: `Bearer ${token}` } }
        );

        setTimeout(() => {
            window.location.reload(); // Recarrega a página
        }, 500);
        
        emit("task-updated")
    } catch (error) {
        console.error("Erro ao atualizar o status da tarefa:", error);
    }
};
</script>

<template>
    <div class="task-card">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <span class="status">{{ task.status }}</span>
        <div class="rewards">
            <span>💰 {{ task.coinsReward }}</span>
            <span>⭐ {{ task.xpReward }}</span>
        </div>
        <!-- Botão de Check para mudar o status da tarefa -->
        <button @click="markAsCompleted" class="check-button" :disabled="task.status === 'concluido'">
            ✔️
        </button>
    </div>
</template>



<style scoped>
.task-card {
    background: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    border-left: 5px solid #4caf50;
}

h3 {
    margin: 0;
    font-size: 1.2em;
}

p {
    margin: 5px 0;
    font-size: 0.9em;
    color: #555;
}

.status {
    font-weight: bold;
    color: #ff9800;
}

.rewards {
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
    margin-top: 5px;
}

.check-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2em;
    margin-top: 10px;
}

.check-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
</style>
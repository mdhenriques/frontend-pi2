<script setup lang="ts">
import axios from 'axios';
import { computed } from 'vue';

interface Mission {
    id: number;
    title: string;
    description: string;
    qtdTarefas: number;    
    coinsReward: number;
    xpReward: number;
    currentProgress: number;
    isConcluida: boolean;
}

const props = defineProps<{ mission: Mission }>();
const emit = defineEmits<{
    (event: "task-updated"): void;
    (event: "mark-completed", taskId: number, reward: { coins: number, xp: number }): void
}>();
// Função para marcar a tarefa como concluída
</script>

<template>
    <div class="task-card">
        <div class="card-header">
            <h3>{{ mission.title }}</h3>
        </div>

        <p class="description">{{ mission.description }}</p>

        <div class="rewards">
            <div class="reward">
                <span class="icon">💰</span>
                <span class="value">{{ mission.coinsReward }}</span>
            </div>
            <div class="reward">
                <span class="icon">⭐</span>
                <span class="value">{{ mission.xpReward }}</span>
            </div>
        </div>

    </div>
</template>

<style scoped>
.task-card {
    background: #2e2e3e;
    border-radius: 18px;
    padding: 20px;
    color: #f0f0f0;
    box-shadow: 0 0 15px rgba(80, 0, 150, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #3a3a4d;
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

.status.pendente {
    background-color: #a374ff;
    color: #1e1e2f;
}

.status.concluido {
    background-color: #4caf50;
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
</style>
<script lang="ts" setup>
import type { Task } from '@/types/task';
import { ref, defineComponent, onMounted } from 'vue';
import TaskCard from "@/components/TaskCard.vue";
import axios from 'axios';
import { computed } from 'vue';
import TaskModal from '@/components/TaskModal.vue';
import ContentContainer from '@/components/ContentContainer.vue';

const showModal = ref<boolean>(false);
const title = ref<string>('');
const description = ref<string>('');
const tasks = ref<Task[]>([]);
const coins = ref<number>(0);
const xp = ref<number>(0);

const sortedTasks = computed(() => {
  return tasks.value.slice().sort((a, b) => {
    if (a.status === "Em Andamento" && b.status !== "Em Andamento") return -1;
    if (a.status !== "Em Andamento" && b.status === "Em Andamento") return 1;
    return 0;
  });
});

const createTask = async () => {
  if (title.value && description.value) {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.post(
        "http://localhost:5155/tarefa",
        {
          title: title.value,
          description: description.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Não foi possível criar a tarefa", error);
    }
  } else {
    console.error("Título e descrição são obrigatórios.")
  }
}

const fetchTasks = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("auth_token");
    console.log(token);
    const response = await axios.get<Task[]>("http://localhost:5155/tarefas", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    tasks.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  }
}

const updateRewards = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.put(
      "http://localhost:5155/user/reward",
      { coinReward: 0, xpReward: 0 },
      { headers: { Authorization: `Bearer ${token}`}}
    );

    if (response.data && typeof response.data.coins === 'number' && typeof response.data.xp === 'number') {
      coins.value = response.data.coins;
      xp.value = response.data.xp;
    }
  } catch (error) {
    console.error("Erro ao atualizar recompensas: ", error);
  }
}

onMounted(async () => {
  await fetchTasks();
  await updateRewards();
})
</script>

<template>
  <div class="home-container">

    <!-- Foto de perfil -->
    <div class="profile-section">
      <div class="profile-box"></div>
      <div class="rewards">
        <p>💰: {{ coins }}</p>
        <p>⭐: {{ xp }}</p>
      </div>
    </div>

    <!-- Botão da loja -->
    <button class="shop-button">Loja</button>

    <!-- Três caixas retangulares abaixo -->
    <ContentContainer
     :tasks="sortedTasks"
     @add-task="showModal = true"
     @task-updated="fetchTasks"
    />
    <!-- Componente Modal criação de tarefas-->
    <TaskModal
      :show="showModal"
      @close="showModal = false"
      @create-task="createTask"
    />

  </div>
</template>

<style scoped>
/* Container principal */
.home-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 54px;
  box-sizing: border-box;
  overflow: hidden;
  /* Remove rolagem desnecessária */
}

.profile-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

/* Caixa de foto de perfil */
.profile-box {
  position: absolute;
  top: 54px;
  left: 54px;
  width: 15vw;
  /* Tamanho relativo */
  max-width: 213px;
  height: 15vw;
  max-height: 213px;
  background-color: gray;
}

.rewards {
  margin-left: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.rewards p {
  margin: 5px 0;
}

/* Botão da loja */
.shop-button {
  position: absolute;
  top: 54px;
  right: 54px;
  width: clamp(180px, 15vw, 257px);
  /* Adapta o tamanho do botão */
  height: clamp(60px, 6vh, 92px);
  background-color: purple;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

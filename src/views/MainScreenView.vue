<script lang="ts" setup>
import type { Task } from '@/types/task';
import type { Mission } from '@/types/mission';
import { ref, defineComponent, onMounted } from 'vue';
import TaskCard from "@/components/TaskCard.vue";
import axios from 'axios';
import { computed } from 'vue';
import TaskModal from '@/components/TaskModal.vue';
import ContentContainer from '@/components/ContentContainer.vue';
import ProfileSection from '@/components/ProfileSection.vue';

const showModal = ref<boolean>(false);
const title = ref<string>('');
const description = ref<string>('');
const tasks = ref<Task[]>([]);
const missions = ref<Mission[]>([]);
const coins = ref<number>(0);
const xp = ref<number>(0);

const sortedTasks = computed(() => {
  return tasks.value.slice().sort((a, b) => {
    if (a.status === "Em Andamento" && b.status !== "Em Andamento") return -1;
    if (a.status !== "Em Andamento" && b.status === "Em Andamento") return 1;
    return 0;
  });
});

const createTask = async (task: { title: string, description: string }) => {
  if (task.title && task.description) {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.post(
        "http://localhost:5155/tarefa",
        {
          title: task.title,
          description: task.description,
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
    console.error("Título e descrição são obrigatórios.");
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

const updateRewards = async (coinReward = 0, xpReward = 0) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.put(
      "http://localhost:5155/user/reward",
      {  coinReward, xpReward },
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

const markTaskAsCompleted = async (taskId: number, reward: { coins: number, xp: number }) => {
  const token = localStorage.getItem("auth_token");
  try {
    await axios.put(
      `http://localhost:5155/tarefa/status/${taskId}`,
      { status: "concluido" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await updateRewards(reward.coins, reward.xp);


    const updatedTask = tasks.value.find(t => t.id === taskId)
    if (updatedTask) {
      updatedTask.status = 'concluido';
    }
    console.log("Tarefa concluída com sucesso!");

  } catch (error) {
    console.error("Erro ao concluir tarefa:", error);
  }
};

const handleCreateTask = async (task: { title: string, description: string }) => {
    await createTask(task);
    await fetchTasks();
    showModal.value = false; // Fecha o modal após criar a tarefa
}

const fetchMission = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    console.log(token);
    const response = await axios.get<Mission[]>("http://localhost:5155/missoes", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    missions.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  }
}

const deleteTask = async (taskId: number) => {
  try {
    const token = localStorage.getItem("auth_token");
    await axios.delete(
      `http://localhost:5155/tarefa/${taskId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  } catch (error) {
    console.error("Erro ao excluir tarefa: ", error)
  }
}

onMounted(async () => {
  await fetchTasks();
  await fetchMission();
  await updateRewards();
})
</script>

<template>
  <div class="home-container">

    <!-- Foto de perfil -->
    <ProfileSection
    :coins="coins"
    :xp="xp"
    />

    <!-- Botão da loja -->
    <button class="shop-button">Loja</button>

    <!-- Três caixas retangulares abaixo -->
    <ContentContainer
     :tasks="sortedTasks"
     :missions="missions"
     @add-task="showModal = true"
     @task-updated="fetchTasks"
     @mark-completed="markTaskAsCompleted"
     @delete-task="deleteTask"
    />
    <!-- Componente Modal criação de tarefas-->
    <TaskModal
      :show="showModal"
      @close="showModal = false"
      @create-task="handleCreateTask"
    />

  </div>
</template>

<style scoped>
/* Container principal */
.home-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #1b1b25;;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  /* Remove rolagem desnecessária */
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

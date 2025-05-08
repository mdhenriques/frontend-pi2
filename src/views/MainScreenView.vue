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
const missionId = ref<number>(0);

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

const updateRewards = async (coinReward = 0, xpReward = 0, token) => {
  try {

    const response = await axios.put(
      "http://localhost:5155/user/reward",
      { coinReward, xpReward },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data && typeof response.data.coins === 'number' && typeof response.data.xp === 'number') {
      coins.value = response.data.coins;
      xp.value = response.data.xp;
    }
  } catch (error) {
    console.error("Erro ao atualizar recompensas: ", error);
  }
}

const loadRewards = async (coinReward = 0, xpReward = 0) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.put(
      "http://localhost:5155/user/reward",
      { coinReward, xpReward },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data && typeof response.data.coins === 'number' && typeof response.data.xp === 'number') {
      coins.value = response.data.coins;
      xp.value = response.data.xp;
    }
  } catch (error) {
    console.error("Erro ao atualizar recompensas: ", error);
  }
}

const addProgress = async (token, id: number) => {
  try {

    await axios.post(`http://localhost:5155/missao/progresso/${id}`,
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    await fetchMission();
  } catch (error) {
    console.log(error);
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

    await updateRewards(reward.coins, reward.xp, token);
    await addProgress(token, missionId.value);

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
    if (missionId.value === 0) {
      missions.value.forEach(mission => {
        missionId.value = mission.id;
      });
    }

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
    await fetchTasks(); // Atualiza a lista de tarefas após a exclusão
  } catch (error) {
    console.error("Erro ao excluir tarefa: ", error)
  }
}

const completeMission = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    await axios.post(
      `http://localhost:5155/missao/resgatar/${missionId.value}`,
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await loadRewards();
    await fetchMission();
  } catch (error) {
    console.error("Erro ao completar missão:", error);
  }
}

onMounted(async () => {
  await fetchTasks();
  await fetchMission();
  await loadRewards();
})
</script>

<template>
  <div class="home-wrapper">
    <div class="background-overlay"></div>
    <div class="home-container">

      <!-- Foto de perfil -->
      <ProfileSection :coins="coins" :xp="xp" />

      <!-- Botão da loja -->
      <button class="shop-button">Loja</button>

      <!-- Três caixas retangulares abaixo -->
      <ContentContainer :tasks="sortedTasks" :missions="missions" @add-task="showModal = true"
        @task-updated="fetchTasks" @mark-completed="markTaskAsCompleted" @delete-task="deleteTask"
        @mission-completed="completeMission" />
      <!-- Componente Modal criação de tarefas-->
      <TaskModal :show="showModal" @close="showModal = false" @create-task="handleCreateTask" />

    </div>
  </div>


</template>

<style scoped>
.home-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('public/backgrounds/Wallpaper 1.2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.55; /* Altere esse valor para mais ou menos transparência */
  z-index: 0;
}
/* Container principal */
.home-container {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
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

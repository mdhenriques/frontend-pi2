<script setup lang="ts">
import { ref } from "vue";

interface LoginResponse {
  token: string;
  message?: string;
}

const username = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");
const successMessage = ref<string>("");

const handleSubmit = async (event: Event): Promise<void> => {
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:5155/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const errorData: LoginResponse = await response.json();
      errorMessage.value = errorData.message || "Erro ao fazer login!";
      successMessage.value = "";
      return;
    }

    const data: LoginResponse = await response.json();
    successMessage.value = "Cadastro realizado com sucesso!";
    errorMessage.value = "";
    
  } catch (error) {
    errorMessage.value = "Erro ao conectar com o servidor!";
    successMessage.value = "";
  }
};
</script>

<template>
    <div class="login-container">
      <div class="login-box">
        <form @submit="handleSubmit">
          <label for="username">Usuário</label>
          <input type="text" id="username" v-model="username" placeholder="Digite seu usuário" required />
  
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" placeholder="Digite sua senha" required />
  
          <button type="submit">Cadastrar</button>
  
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
          <p>Já está cadastrado? Faça o <router-link to="/">Login</router-link> </p>
        </form>
      </div>
    </div>
  </template>

<style scoped>
/* Fundo cinza */

/* Ajusta o container para cobrir toda a tela */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Caixa preta no centro */
.login-box {
    background-color: #252525;
    color: white;
    padding: 32px;
    border-radius: 8px;       
    width: 448px;
    height: 336px;
}

/* Estilo do formulário */
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
}

label {
    font-size: 16px;
}

input {
    background-color: #252525;
    padding: 10px;
    border: 2px solid #515155;
    border-radius: 8px;
    font-size: 16px;
}

/* Botão roxo */
button {
    padding: 10px;
    background-color: #6A3DA3;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
}

a {
    color: #FFFFFF
}

button:hover {
    background-color: #5a0098;
}
</style>
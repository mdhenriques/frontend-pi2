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

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1e1e1e;
}

.login-box {
  background-color: #2d2d30;
  color: #ffffff;
  padding: 32px;
  border-radius: 12px;
  width: 448px;
  height: 336px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

label {
  font-size: 15px;
  color: #cccccc;
}

input {
  background-color: #1e1e1e;
  padding: 10px 12px;
  border: 1.5px solid #3c3c3c;
  border-radius: 8px;
  font-size: 15px;
  color: #ffffff;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #6a3da3;
  background-color: #252526;
}

button {
  padding: 10px;
  background-color: #6a3da3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

button:hover {
  background-color: #5a0098;
  transform: scale(1.02);
}

a {
  color: #a472d3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

p {
  font-size: 14px;
  margin-top: 10px;
}

.error-message {
  color: #ff6b6b;
  margin-top: 5px;
}

.success-message {
  color: #7ed957;
  margin-top: 5px;
}
</style>
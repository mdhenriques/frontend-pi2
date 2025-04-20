<script lang="ts" setup>

const props = defineProps<{
    coins: number,
    xp: number
}>()
</script>

<template>
    <div class="profile-section">
        <div class="profile-box"></div>
        <div class="rewards">
            <p>💰: {{ coins }}</p>
            <p>⭐: {{ xp }}</p>
        </div>
    </div>
</template>

<style lang="css" scoped>
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
</style>
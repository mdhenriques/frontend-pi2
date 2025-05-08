<script lang="ts" setup>

const props = defineProps<{
    coins: number,
    xp: number
}>()

const avatarSrc = 'public/avatares/IMG-20250507-WA0097.jpg'
</script>

<template>
    <div class="profile-section">
        <div class="profile-box">
          <img :src="avatarSrc" alt="Avatar" />
        </div>
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
  margin: 20px;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
}

/* Caixa de foto de perfil */
.profile-box {
  width: 80px;
  height: 80px;
  background-color: gray;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rewards {
  margin-left: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rewards p {
  margin: 2px 0;
}

</style>
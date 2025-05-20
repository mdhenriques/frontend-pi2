<script lang="ts" setup>
import { loja } from '@/data/loja';
import { ref } from 'vue';

const props = defineProps<{
  show: boolean
  ownedItems: number[]
}>()

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'select-background', background: string): void
  (e: 'select-avatar', avatar: string): void
  (e: 'purchase', item: { id: number, preco: number }): void
}>()


const selectedTab = ref<'avatares' | 'backgrounds'>('avatares')
const isOwned = (itemId: number): boolean => props.ownedItems.includes(itemId)

const selectedItem = ref<{ id: number, preco: number, nome: string, tipo: 'avatar' | 'background' } | null>(null)

function handleClick(item: { id: number, preco: number, nome: string }, tipo: 'avatar' | 'background') {
  if (isOwned(item.id)) {
    if (tipo === 'avatar') emit('select-avatar', `avatares/${item.nome}`)
    else emit('select-background', item.nome)
  } else {
    selectedItem.value = { ...item, tipo }
  }
}

function comprarItem() {
  if (selectedItem.value) {
    emit('purchase', { id: selectedItem.value.id, preco: selectedItem.value.preco })
    selectedItem.value = null // opcional: fecha a visualização após compra
  }
}

</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <button class="close-button" @click="emit('close')">×</button>

      <div class="tab-buttons">
        <button :class="{ active: selectedTab === 'avatares' }" @click="selectedTab = 'avatares'">Avatares</button>
        <button :class="{ active: selectedTab === 'backgrounds' }" @click="selectedTab = 'backgrounds'">Backgrounds</button>
      </div>

      <div class="modal-body">
        <div class="content-scroll">
          <h2>{{ selectedTab === 'avatares' ? 'Avatares' : 'Backgrounds' }}</h2>
          <div class="item-grid">
            <button v-for="item in selectedTab === 'avatares' ? loja.avatares : loja.backgrounds"
                    :key="item.nome"
                    @click="handleClick(item, selectedTab === 'avatares' ? 'avatar' : 'background')"
                    :class="{ locked: !isOwned(item.id) }">
              <img :src="`/${selectedTab}/${item.nome}`" :alt="item.nome" :width="selectedTab === 'avatares' ? 80 : 120" />
              <div v-if="!isOwned(item.id)" class="lock-overlay">🔒</div>
              <div class="item-price">{{ item.preco }} 🪙</div>
            </button>
          </div>
        </div>

        <!-- Painel lateral do item bloqueado -->
        <div v-if="selectedItem" class="side-panel">
          <img :src="`/${selectedItem.tipo === 'avatar' ? 'avatares' : 'backgrounds'}/${selectedItem.nome}`"
               :alt="selectedItem.nome"
               class="preview-img" />
          <div class="item-price big">{{ selectedItem.preco }} 🪙</div>
          <button class="buy-button" @click="comprarItem">Comprar</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  /* Faz com que o modal fique acima de tudo */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #2d2d30;
  color: #ffffff;
  padding: 32px;
  border-radius: 12px;
  max-height: 80vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  width: 90vw;
  max-width: 1400px;
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 24px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
}

.tab-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.tab-buttons button {
  padding: 8px 16px;
  border: none;
  background-color: #444;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.tab-buttons button.active {
  background-color: #007bff;
}

.content-scroll {
  overflow-y: auto;
  flex-grow: 1;
  width: 1000px; /* Ajuste conforme necessário para manter as 4-5 colunas */
}

.item-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.item-grid button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.locked {
  position: relative;
  opacity: 0.6;
  cursor: not-allowed;
}

.lock-overlay {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
}

.item-price {
  margin-top: 4px;
  text-align: center;
  color: #ffc107;
  font-weight: bold;
  font-size: 14px;
}

.modal-body {
  display: flex;
  gap: 32px;
  overflow-y: auto;
  max-height: none;
}

.side-panel {
  background-color: #1f1f22;
  border-left: 2px solid #444;
  padding: 24px;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow: inset 0 0 10px #00000050;
  justify-content: space-between;
  min-height: 320px;
  height: 100%;
  max-height: 400px;
  box-sizing: border-box;
}

.preview-img {
  max-width: 180px;
  max-height: 180px;
  object-fit: contain;
  margin-bottom: 20px;
  border-radius: 12px;
  background-color: #2d2d31;
  padding: 8px;
}

.item-price.big {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ffc107;
}

.buy-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.buy-button:hover {
  background-color: #218838;
}

.modal-content {
  max-width: 1100px; /* ou até 1000px se necessário */
  width: 95%;
}
</style>

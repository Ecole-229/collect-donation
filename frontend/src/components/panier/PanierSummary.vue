<template>
  <div class="ps-carte">
    <div class="ps-ligne-total">
      <span class="ps-libelle">Total du don</span>
      <span class="ps-pointille" aria-hidden="true"></span>
      <span class="ps-total panier-num">{{ totalFormate }}</span>
    </div>

    <div class="ps-actions">
      <button
        type="button"
        class="ps-vider"
        :disabled="estVide || chargement"
        @click="$emit('vider')"
      >
        Vider le panier
      </button>
      <button
        type="button"
        class="ps-valider"
        :disabled="!estValidable || chargement"
        @click="$emit('valider')"
      >
        {{ chargement ? 'Validation…' : 'Valider et faire le don' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  total: { type: Number, default: 0 },
  estVide: { type: Boolean, default: true },
  estValidable: { type: Boolean, default: false },
  chargement: { type: Boolean, default: false },
})

defineEmits(['vider', 'valider'])

const totalFormate = computed(() => `${props.total.toLocaleString('fr-FR')} FCFA`)
</script>

<style scoped>
.ps-carte {
  background: var(--panier-surface);
  border: 1px solid var(--panier-border);
  border-radius: var(--panier-radius-m);
  padding: var(--panier-space-4);
  font-family: var(--panier-font-body);
}

.ps-ligne-total {
  display: flex;
  align-items: baseline;
  gap: var(--panier-space-2);
  margin-bottom: var(--panier-space-4);
}
.ps-libelle {
  color: var(--panier-text-muted);
  font-size: 0.9rem;
}
.ps-pointille {
  flex: 1;
  border-bottom: 1px dotted var(--panier-border);
  height: 0;
  transform: translateY(-5px);
}
.ps-total {
  font-family: var(--panier-font-display);
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--panier-primary-dark);
}

.ps-actions {
  display: flex;
  flex-direction: column;
  gap: var(--panier-space-2);
}

.ps-vider {
  background: none;
  border: 1px solid var(--panier-border);
  color: var(--panier-text-muted);
  border-radius: var(--panier-radius-s);
  padding: var(--panier-space-2);
  font-size: 0.85rem;
  cursor: pointer;
}
.ps-vider:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ps-valider {
  background: var(--panier-accent);
  color: var(--panier-primary-dark);
  border: none;
  border-radius: var(--panier-radius-s);
  padding: var(--panier-space-3);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.1s ease;
}
.ps-valider:hover:not(:disabled) {
  transform: translateY(-1px);
}
.ps-valider:disabled {
  background: var(--panier-border);
  color: var(--panier-text-muted);
  cursor: not-allowed;
  transform: none;
}
</style>

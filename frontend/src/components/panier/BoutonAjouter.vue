<template>
  <div class="ba-wrapper">
    <button
      type="button"
      class="ba-trigger"
      :disabled="projetIndisponible"
      @click="ouvrir"
    >
      {{ projetIndisponible ? 'Dons clos' : 'Ajouter au panier' }}
    </button>

    <div v-if="ouvert" class="ba-popover" role="dialog" :aria-label="`Faire un don à ${projet.titre}`">
      <p class="ba-popover__titre">Montant du don</p>
      <div class="ba-champ">
        <input
          ref="champMontant"
          v-model="montant"
          type="number"
          min="1"
          step="0.01"
          inputmode="decimal"
          class="ba-input panier-num"
          :class="{ 'ba-input--erreur': erreur }"
          placeholder="0"
          @keyup.enter="confirmer"
        />
        <span class="ba-devise">FCFA</span>
      </div>
      <p v-if="erreur" class="ba-erreur">{{ erreur }}</p>

      <div class="ba-suggestions">
        <button
          v-for="valeur in suggestions"
          :key="valeur"
          type="button"
          class="ba-suggestion"
          @click="montant = String(valeur)"
        >
          {{ valeur.toLocaleString('fr-FR') }}
        </button>
      </div>

      <div class="ba-actions">
        <button type="button" class="ba-annuler" @click="fermer">Annuler</button>
        <button type="button" class="ba-confirmer" :disabled="enCours" @click="confirmer">
          {{ enCours ? 'Ajout…' : 'Confirmer' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { usePanierStore } from '@/stores/panier'
import { validerMontant } from '@/composables/useMontantValidation'

const props = defineProps({
  projet: { type: Object, required: true },
})

const panierStore = usePanierStore()
const ouvert = ref(false)
const montant = ref('')
const erreur = ref('')
const enCours = ref(false)
const champMontant = ref(null)

const projetIndisponible = computed(() =>
  ['BROUILLON', 'TERMINE', 'ANNULE'].includes(props.projet.statut)
)

const suggestions = computed(() => [1000, 5000, 10000])

async function ouvrir() {
  erreur.value = ''
  montant.value = ''
  ouvert.value = true
  await nextTick()
  champMontant.value?.focus()
}

function fermer() {
  ouvert.value = false
}

async function confirmer() {
  const check = validerMontant(montant.value, props.projet)
  if (!check.valide) {
    erreur.value = check.erreur
    return
  }
  erreur.value = ''
  enCours.value = true
  const { succes, erreur: erreurServeur } = await panierStore.ajouterAuPanier(
    props.projet,
    check.montant
  )
  enCours.value = false
  if (succes) {
    fermer()
  } else if (erreurServeur) {
    erreur.value = erreurServeur
  }
}
</script>

<style scoped>
.ba-wrapper {
  position: relative;
  display: inline-block;
}

.ba-trigger {
  font-family: var(--panier-font-body);
  font-weight: 600;
  font-size: 0.9rem;
  padding: var(--panier-space-2) var(--panier-space-3);
  border-radius: var(--panier-radius-s);
  border: none;
  background: var(--panier-primary);
  color: white;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.ba-trigger:hover:not(:disabled) {
  background: var(--panier-primary-dark);
}
.ba-trigger:disabled {
  background: var(--panier-border);
  color: var(--panier-text-muted);
  cursor: not-allowed;
}
.ba-trigger:focus-visible {
  outline: 2px solid var(--panier-accent);
  outline-offset: 2px;
}

.ba-popover {
  position: absolute;
  z-index: 20;
  top: calc(100% + 8px);
  left: 0;
  width: 260px;
  background: var(--panier-surface);
  border: 1px solid var(--panier-border);
  border-radius: var(--panier-radius-m);
  box-shadow: var(--panier-shadow-card);
  padding: var(--panier-space-3);
  font-family: var(--panier-font-body);
}

.ba-popover__titre {
  margin: 0 0 var(--panier-space-2);
  font-size: 0.85rem;
  color: var(--panier-text-muted);
}

.ba-champ {
  display: flex;
  align-items: center;
  border: 1px solid var(--panier-border);
  border-radius: var(--panier-radius-s);
  overflow: hidden;
}
.ba-input {
  flex: 1;
  border: none;
  padding: var(--panier-space-2) var(--panier-space-3);
  font-size: 1.1rem;
  font-family: var(--panier-font-display);
  color: var(--panier-text);
  outline: none;
}
.ba-input--erreur {
  color: var(--panier-error);
}
.ba-devise {
  padding: 0 var(--panier-space-3);
  font-size: 0.8rem;
  color: var(--panier-text-muted);
}

.ba-erreur {
  color: var(--panier-error);
  font-size: 0.8rem;
  margin: var(--panier-space-1) 0 0;
}

.ba-suggestions {
  display: flex;
  gap: var(--panier-space-2);
  margin-top: var(--panier-space-2);
}
.ba-suggestion {
  flex: 1;
  border: 1px solid var(--panier-border);
  background: var(--panier-bg);
  border-radius: var(--panier-radius-s);
  padding: var(--panier-space-1) 0;
  font-size: 0.8rem;
  cursor: pointer;
}
.ba-suggestion:hover {
  border-color: var(--panier-primary);
}

.ba-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--panier-space-2);
  margin-top: var(--panier-space-3);
}
.ba-annuler {
  background: none;
  border: none;
  color: var(--panier-text-muted);
  cursor: pointer;
  font-size: 0.85rem;
}
.ba-confirmer {
  background: var(--panier-accent);
  color: var(--panier-primary-dark);
  border: none;
  font-weight: 700;
  padding: var(--panier-space-2) var(--panier-space-3);
  border-radius: var(--panier-radius-s);
  cursor: pointer;
}
.ba-confirmer:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

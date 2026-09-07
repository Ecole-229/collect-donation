<template>
  <li class="lp-ligne" :class="{ 'lp-ligne--attente': enAttente }">
    <img
      v-if="ligne.projet?.image"
      :src="ligne.projet.image"
      :alt="ligne.projet.titre"
      class="lp-image"
    />
    <div class="lp-corps">
      <div class="lp-en-tete">
        <span class="lp-titre">{{ ligne.projet?.titre ?? 'Projet' }}</span>
        <span class="lp-pointille" aria-hidden="true"></span>
        <span class="lp-montant-affiche panier-num">{{ formatMontant(ligne.montant) }}</span>
      </div>

      <div class="lp-controles">
        <label :for="`montant-${ligne.id}`" class="lp-label">Modifier le montant</label>
        <div class="lp-champ">
          <input
            :id="`montant-${ligne.id}`"
            v-model="montantLocal"
            type="number"
            min="1"
            step="0.01"
            inputmode="decimal"
            class="lp-input panier-num"
            :class="{ 'lp-input--erreur': erreurLocale }"
            :disabled="enAttente"
            @change="enregistrer"
            @keyup.enter="($event.target).blur()"
          />
          <span class="lp-devise">FCFA</span>
        </div>
        <button
          type="button"
          class="lp-supprimer"
          :disabled="enAttente"
          @click="$emit('supprimer', ligne.id)"
        >
          Retirer
        </button>
      </div>

      <p v-if="erreurLocale" class="lp-erreur" role="alert">{{ erreurLocale }}</p>
    </div>
  </li>
</template>

<script setup>
import { ref, watch } from 'vue'
import { validerMontant } from '@/composables/useMontantValidation'

const props = defineProps({
  ligne: { type: Object, required: true },
  enAttente: { type: Boolean, default: false },
})

const emit = defineEmits(['modifier-montant', 'supprimer'])

const montantLocal = ref(String(props.ligne.montant))
const erreurLocale = ref('')

// Si le serveur renvoie une valeur différente (ex: après arrondi), on resynchronise.
watch(
  () => props.ligne.montant,
  (nouveau) => {
    montantLocal.value = String(nouveau)
  }
)

function enregistrer() {
  const check = validerMontant(montantLocal.value, props.ligne.projet)
  if (!check.valide) {
    erreurLocale.value = check.erreur
    return
  }
  erreurLocale.value = ''
  if (check.montant === props.ligne.montant) return
  emit('modifier-montant', props.ligne.id, check.montant)
}

function formatMontant(valeur) {
  return `${Number(valeur).toLocaleString('fr-FR')} FCFA`
}
</script>

<style scoped>
.lp-ligne {
  display: flex;
  gap: var(--panier-space-3);
  padding: var(--panier-space-3) 0;
  border-bottom: 1px dashed var(--panier-border);
  font-family: var(--panier-font-body);
  transition: opacity 0.15s ease;
}
.lp-ligne--attente {
  opacity: 0.55;
  pointer-events: none;
}

.lp-image {
  width: 56px;
  height: 56px;
  border-radius: var(--panier-radius-s);
  object-fit: cover;
  flex-shrink: 0;
}

.lp-corps {
  flex: 1;
  min-width: 0;
}

.lp-en-tete {
  display: flex;
  align-items: baseline;
  gap: var(--panier-space-2);
}
.lp-titre {
  font-weight: 600;
  color: var(--panier-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lp-pointille {
  flex: 1;
  border-bottom: 1px dotted var(--panier-border);
  height: 0;
  transform: translateY(-4px);
}
.lp-montant-affiche {
  font-family: var(--panier-font-display);
  font-size: 1.05rem;
  color: var(--panier-primary-dark);
  white-space: nowrap;
}

.lp-controles {
  display: flex;
  align-items: center;
  gap: var(--panier-space-2);
  margin-top: var(--panier-space-2);
}
.lp-label {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
.lp-champ {
  display: flex;
  align-items: center;
  border: 1px solid var(--panier-border);
  border-radius: var(--panier-radius-s);
  overflow: hidden;
}
.lp-input {
  width: 90px;
  border: none;
  padding: var(--panier-space-1) var(--panier-space-2);
  font-size: 0.9rem;
  outline: none;
}
.lp-input--erreur {
  color: var(--panier-error);
}
.lp-devise {
  padding: 0 var(--panier-space-2);
  font-size: 0.75rem;
  color: var(--panier-text-muted);
}
.lp-supprimer {
  background: none;
  border: none;
  color: var(--panier-error);
  font-size: 0.8rem;
  cursor: pointer;
  padding: var(--panier-space-1) var(--panier-space-2);
}
.lp-supprimer:hover {
  text-decoration: underline;
}

.lp-erreur {
  color: var(--panier-error);
  font-size: 0.78rem;
  margin: var(--panier-space-1) 0 0;
}
</style>

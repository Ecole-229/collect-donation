<template>
  <section class="pp-page">
    <header class="pp-en-tete">
      <h1 class="pp-titre">Mon panier de dons</h1>
      <p class="pp-sous-titre">
        Vérifiez vos montants avant de valider — vos dons deviennent des contributions
        une fois le panier validé.
      </p>
    </header>

    <div v-if="panierStore.chargement && !panierStore.panier" class="pp-chargement">
      Chargement de votre panier…
    </div>

    <div v-else-if="panierStore.estVide" class="pp-vide">
      <p>Votre panier est vide.</p>
      <p class="pp-vide__aide">Parcourez le catalogue des projets et ajoutez un don.</p>
      <router-link to="/projets" class="pp-lien-catalogue">Voir les projets</router-link>
    </div>

    <div v-else class="pp-contenu">
      <ul class="pp-liste">
        <LignePanierItem
          v-for="ligne in panierStore.lignes"
          :key="ligne.id"
          :ligne="ligne"
          :en-attente="panierStore.ligneEnAttente === ligne.id"
          @modifier-montant="onModifierMontant"
          @supprimer="onSupprimer"
        />
      </ul>

      <PanierSummary
        :total="panierStore.total"
        :est-vide="panierStore.estVide"
        :est-validable="panierStore.estValidable"
        :chargement="panierStore.chargement"
        @vider="onVider"
        @valider="onValider"
      />
    </div>

    <NotificationToast />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePanierStore } from '@/stores/panier'
import LignePanierItem from '@/components/panier/LignePanierItem.vue'
import PanierSummary from '@/components/panier/PanierSummary.vue'
import NotificationToast from '@/components/panier/NotificationToast.vue'

const panierStore = usePanierStore()
const router = useRouter()

onMounted(() => {
  panierStore.chargerPanier()
})

function onModifierMontant(ligneId, montant) {
  panierStore.modifierMontantLigne(ligneId, montant)
}

function onSupprimer(ligneId) {
  panierStore.supprimerLigne(ligneId)
}

function onVider() {
  panierStore.viderPanier()
}

async function onValider() {
  const { succes } = await panierStore.validerPanier()
  if (succes) {
    // Le paiement lui-même (choix de méthode, statut EN_ATTENTE/REUSSI...)
    // est géré côté Eddy ; Félix redirige simplement vers l'étape suivante.
    router.push('/mes-dons')
  }
}
</script>

<style scoped>
.pp-page {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--panier-space-5) var(--panier-space-3);
  font-family: var(--panier-font-body);
  color: var(--panier-text);
}

.pp-en-tete {
  margin-bottom: var(--panier-space-4);
}
.pp-titre {
  font-family: var(--panier-font-display);
  font-size: 1.9rem;
  margin: 0 0 var(--panier-space-1);
}
.pp-sous-titre {
  color: var(--panier-text-muted);
  font-size: 0.9rem;
  margin: 0;
}

.pp-chargement,
.pp-vide {
  text-align: center;
  padding: var(--panier-space-5) 0;
  color: var(--panier-text-muted);
}
.pp-vide__aide {
  font-size: 0.85rem;
  margin-top: var(--panier-space-1);
}
.pp-lien-catalogue {
  display: inline-block;
  margin-top: var(--panier-space-3);
  color: var(--panier-primary);
  font-weight: 600;
  text-decoration: none;
}
.pp-lien-catalogue:hover {
  text-decoration: underline;
}

.pp-contenu {
  display: grid;
  gap: var(--panier-space-4);
}

.pp-liste {
  list-style: none;
  margin: 0;
  padding: 0;
  background: var(--panier-surface);
  border: 1px solid var(--panier-border);
  border-radius: var(--panier-radius-m);
  padding: 0 var(--panier-space-3);
}
</style>

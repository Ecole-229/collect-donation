<script setup>
import AppHeader from './components/AppHeader.vue'
import { RouterView } from 'vue-router'
import NotificationToast from './components/panier/NotificationToast.vue'
</script>

<template>
  <div id="app">
    <!-- Le header gère lui-même son affichage s'il y a un utilisateur connecté -->
    <AppHeader />

    <!-- C'est ici que Vue Router affiche tes différentes pages (Login, Projets, etc.) -->
    <main>
      <RouterView />
    </main>

    <!-- Composant de notification pour le panier de Félix -->
    <NotificationToast />
  </div>
</template>

<style>
/* Un reset global basique */
body {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa; /* Fond clair pour faire ressortir tes cartes blanches */
}
</style>

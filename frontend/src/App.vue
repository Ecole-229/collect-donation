<script setup>
import AppHeader from './components/AppHeader.vue' // Ton nouveau composant
</script>

<template>
  <div id="app">
    <!-- Le header gère lui-même son affichage s'il y a un utilisateur connecté -->
    <AppHeader />
    
    <!-- C'est ici que Vue Router affiche tes différentes pages (Login, Projets, etc.) -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
/* Un reset global basique (si tu n'en as pas déjà un) */
body {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa; /* Fond clair pour faire ressortir tes cartes blanches */
}
</style>
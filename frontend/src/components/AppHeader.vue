<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const user = ref(null)

// Fonction pour récupérer l'utilisateur connecté
const checkAuth = () => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  } else {
    user.value = null
  }
}

// On vérifie au montage du composant
onMounted(() => {
  checkAuth()
})

// On surveille les changements de route pour mettre à jour le header 
// (utile quand l'utilisateur vient juste de se connecter)
watch(
  () => route.path,
  () => {
    checkAuth()
  }
)

const handleLogout = () => {
  // On vide le coffre-fort
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  user.value = null
  // On renvoie vers la page de connexion
  router.push('/login')
}
</script>

<template>
  <!-- Le header ne s'affiche que si l'utilisateur est connecté -->
  <header v-if="user" class="navbar">
    
    <!-- Logo / Nom de l'app -->
    <div class="navbar-brand" @click="router.push(user.role === 'admin' ? '/admin/projets' : '/projets')">
      <span class="logo-icon">🌿</span>
      <h1 class="logo-text">Collect Donation</h1>
    </div>

    <!-- Liens de navigation centraux -->
    <nav class="navbar-menu">
      <!-- Vue publique (Catalogue) accessible à tous -->
      <router-link to="/projets" class="nav-link" active-class="active">
        Les Projets
      </router-link>

      <!-- Lien spécifique Donateur -->
      <router-link v-if="user.role !== 'ADMIN'" to="/mes-dons" class="nav-link" active-class="active">
        Mes Dons
      </router-link>

      <!-- Lien spécifique Admin (John James) -->
      <router-link v-if="user.role === 'ADMIN'" to="/admin/projets" class="nav-link" active-class="active">
        Gestion Admin
      </router-link>
    </nav>

    <!-- Section profil et déconnexion -->
    <div class="navbar-actions">
      <div class="user-profile">
        <span class="user-greeting">Bonjour,</span>
        <span class="user-name">{{ user.name }}</span>
        <!-- Petit badge pour repérer facilement si on est admin -->
        <span v-if="user.role === 'ADMIN'" class="admin-badge">Admin</span>
      </div>
      <button @click="handleLogout" class="btn-logout">
        Déconnexion
      </button>
    </div>

  </header>
</template>

<style scoped>
.navbar {
  /* Variables de ton Design System */
  --primary-color: #42b883;
  --primary-dark: #33996c;
  --text-main: #2c3e50;
  --text-muted: #7f8c8d;
  --border-color: #e2e8f0;
  --bg-input: #f8f9fa;
  --radius: 8px;
  --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #ffffff;
  border-bottom: 1px solid var(--border-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  
  /* Pour qu'il reste fixé en haut de l'écran (optionnel) */
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Zone Logo */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

/* Menu central */
.navbar-menu {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 15px;
  padding: 8px 12px;
  border-radius: var(--radius);
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--primary-color);
  background-color: rgba(66, 184, 131, 0.1);
}

/* Classe appliquée automatiquement par Vue Router quand on est sur la page */
.nav-link.active {
  color: var(--primary-color);
  background-color: rgba(66, 184, 131, 0.1);
}

/* Section Actions (Droite) */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.user-greeting {
  color: var(--text-muted);
}

.user-name {
  color: var(--text-main);
  font-weight: 700;
}

.admin-badge {
  background-color: #fde8e8;
  color: #e74c3c;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 12px;
  margin-left: 5px;
}

.btn-logout {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  background-color: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
}

.btn-logout:hover {
  background-color: #fde8e8;
  color: #e74c3c;
  border-color: #fbd5d5;
}
</style>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// Données fictives pour la liste des utilisateurs (John James)
const utilisateurs = ref([
  { id: 1, nom: 'John James', email: 'john.james@example.com', role: 'ADMIN', actif: true },
  { id: 2, nom: 'Felix Competent', email: 'felix@example.com', role: 'DONATEUR', actif: true },
  { id: 3, nom: 'Eddy Backend', email: 'eddy@example.com', role: 'DONATEUR', actif: false },
  { id: 4, nom: 'Aline Dupont', email: 'aline@example.com', role: 'DONATEUR', actif: true }
])

// Fonction d'activation / désactivation
const toggleStatut = (utilisateur) => {
  utilisateur.actif = !utilisateur.actif
  const message = utilisateur.actif ? 'activé' : 'désactivé'
  console.log(`Utilisateur ${utilisateur.nom} est maintenant ${message}.`)
}

</script>

<template>
  <div class="admin-container">
    <header class="admin-header">
      <h1 class="admin-title">Gestion des Utilisateurs</h1>
      <button @click="router.push('/admin/projects')" style="float: right; padding: 10px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
        Gérer les Projets →
      </button>
      <p class="admin-subtitle">Interface Administrateur — Liste, rôles et statuts des comptes</p>
    </header>

    <div class="table-wrapper">
      <table class="users-table">
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Adresse Email</th>
            <th>Rôle (Affichage)</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in utilisateurs" :key="user.id">
            <td class="font-bold">{{ user.nom }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="badge-role" :class="user.role.toLowerCase()">
                {{ user.role }}
              </span>
            </td>
            <td>
              <span class="status-dot" :class="{ active: user.actif }"></span>
              {{ user.actif ? 'Actif' : 'Inactif' }}
            </td>
            <td>
              <button
                @click="toggleStatut(user)"
                class="btn-toggle"
                :class="{ 'btn-deactivate': user.actif, 'btn-activate': !user.actif }"
              >
                {{ user.actif ? 'Désactiver' : 'Acter' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  --primary-color: #42b883;
  --danger-color: #e74c3c;
  --text-main: #2c3e50;
  --text-muted: #7f8c8d;
  --border-color: #e2e8f0;
  --radius: 8px;

  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.admin-header {
  margin-bottom: 30px;
}

.admin-title {
  font-size: 28px;
  color: var(--text-main);
  margin: 0 0 6px 0;
}

.admin-subtitle {
  color: var(--text-muted);
  font-size: 14px;
  margin: 0;
}

.table-wrapper {
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  overflow: hidden;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 15px;
}

.users-table th {
  background-color: #f8f9fa;
  color: var(--text-main);
  padding: 16px;
  font-weight: 600;
  border-bottom: 2px solid var(--border-color);
}

.users-table td {
  padding: 16px;
  color: var(--text-main);
  border-bottom: 1px solid var(--border-color);
}

.font-bold {
  font-weight: 600;
}

/* Badges Rôles */
.badge-role {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
}

.badge-role.admin {
  background-color: #ebfbee;
  color: var(--primary-color);
}

.badge-role.donateur {
  background-color: #eaf2f8;
  color: #2980b9;
}

/* Statuts */
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #95a5a6;
  border-radius: 50%;
  margin-right: 6px;
}

.status-dot.active {
  background-color: var(--primary-color);
}

/* Boutons Actions */
.btn-toggle {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-deactivate {
  background-color: #fde8e8;
  color: var(--danger-color);
}

.btn-deactivate:hover {
  background-color: #fbd5d5;
}

.btn-activate {
  background-color: #eafaf1;
  color: var(--primary-color);
}

.btn-activate:hover {
  background-color: #d1f2e1;
}
</style>

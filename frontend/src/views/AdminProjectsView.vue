<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Liste stricte des statuts demandés dans le tableau
const statutsDisponibles = ['BROUILLON', 'EN_COURS', 'FINANCE', 'TERMINE', 'ANNULE']

// Données fictives des projets (John James)
const projets = ref([
  { id: 1, titre: 'Urgences Inondations Afrique', categorie: 'Humanitaire', objectif: 15000, statut: 'EN_COURS' },
  { id: 2, titre: 'Reforestation de la Forêt Classée', categorie: 'Environnement', objectif: 5000, statut: 'BROUILLON' },
  { id: 3, titre: 'Une Tablette Pour Apprendre', categorie: 'Éducation', objectif: 8000, statut: 'FINANCE' }
])

// Formulaire de création (CRUD)
const nouveauTitre = ref('')
const nouvelleCategorie = ref('Humanitaire')
const nouvelObjectif = ref('')

const ajouterProjet = () => {
  if (!nouveauTitre.value || !nouvelObjectif.value) return

  projets.value.push({
    id: projets.value.length + 1,
    titre: nouveauTitre.value,
    categorie: nouvelleCategorie.value,
    objectif: Number(nouvelObjectif.value),
    statut: 'BROUILLON' // Statut initial par défaut
  })

  // Réinitialisation du formulaire
  nouveauTitre.value = ''
  nouvelObjectif.value = ''
  alert('Projet créé avec succès en mode BROUILLON !')
}

// Fonction de suppression (CRUD)
const supprimerProjet = (id) => {
  if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
    projets.value = projets.value.filter(p => p.id !== id)
  }
}
</script>

<template>
  <div class="admin-container">
    <!-- Barre supérieure de navigation Admin -->
    <div class="admin-nav-top">
      <div class="admin-nav-top" style="display: flex; gap: 15px; margin-bottom: 20px;">
        <button @click="router.push('/admin/users')"
          style="padding: 8px 16px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer; font-weight: 600;">➔
          Gérer les Utilisateurs</button>
        <button @click="router.push('/admin/categories')"
          style="padding: 8px 16px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer; font-weight: 600;">➔
          Gérer les Catégories</button>
        <button @click="router.push('/')"
          style="margin-left: auto; padding: 8px 16px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">←
          Retour Accueil</button>
      </div>
    </div>

    <header class="admin-header">
      <h1 class="admin-title">Gestion des Projets (Interface Admin)</h1>
      <p class="admin-subtitle">Ajoutez de nouveaux projets et gérez leurs statuts officiels</p>
    </header>

    <!-- Formulaire de Création (CRUD) -->
    <section class="admin-form-section">
      <h2>Créer un nouveau projet</h2>
      <form @submit.prevent="ajouterProjet" class="project-form">
        <div class="form-group">
          <label>Titre du projet</label>
          <input v-model="nouveauTitre" type="text" placeholder="Ex: Construction d'un puits" required />
        </div>
        <div class="form-group">
          <label>Catégorie</label>
          <select v-model="nouvelleCategorie">
            <option>Humanitaire</option>
            <option>Environnement</option>
            <option>Éducation</option>
          </select>
        </div>
        <div class="form-group">
          <label>Objectif (€)</label>
          <input v-model="nouvelObjectif" type="number" placeholder="Ex: 10000" required />
        </div>
        <button type="submit" class="btn-add">Créer le projet</button>
      </form>
    </section>

    <!-- Liste et modification des statuts -->
    <div class="table-wrapper">
      <table class="projects-table">
        <thead>
          <tr>
            <th>Titre du projet</th>
            <th>Catégorie</th>
            <th>Objectif</th>
            <th>Statut (Gestion)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="projet in projets" :key="projet.id">
            <td class="font-bold">{{ projet.titre }}</td>
            <td>{{ projet.categorie }}</td>
            <td>{{ projet.objectif }} €</td>
            <td>
              <!-- Sélecteur de modification des statuts -->
              <select v-model="projet.statut" class="select-status">
                <option v-for="st in statutsDisponibles" :key="st" :value="st">
                  {{ st }}
                </option>
              </select>
            </td>
            <td>
              <button @click="supprimerProjet(projet.id)" class="btn-delete">
                Supprimer
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
  margin: 20px auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.admin-nav-top {
  margin-bottom: 20px;
}

/* Style de la barre de navigation supérieure (John James) */
.admin-nav-top {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

/* Boutons de navigation épurés au repos */
.admin-nav-top button:not(.back-home) {
  background-color: #ffffff;
  color: #2c3e50;
  border: 1px solid #e2e8f0;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

/* Effet de survol corrigé : fond vert et texte blanc obligatoire */
.admin-nav-top button:not(.back-home):hover {
  background-color: #42b883 !important;
  color: #ffffff !important;
  border-color: #42b883 !important;
  box-shadow: 0 4px 6px rgba(66, 184, 131, 0.15);
}

/* Bouton Retour Accueil principal sombre */
.back-home {
  margin-left: auto;
  background-color: #2c3e50;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.back-home:hover {
  background-color: #34495e;
}


.btn-nav-link {
  background: none;
  border: none;
  color: var(--text-muted);
  font-weight: 600;
  cursor: pointer;
}

.btn-nav-link:hover {
  color: var(--primary-color);
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
}

/* Formulaire */
.admin-form-section {
  background: #f8f9fa;
  border: 1px solid var(--border-color);
  padding: 20px;
  border-radius: var(--radius);
  margin-bottom: 30px;
}

.admin-form-section h2 {
  font-size: 18px;
  margin: 0 0 15px 0;
  color: var(--text-main);
}

.project-form {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: flex-end;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 180px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
}

.form-group input,
.form-group select {
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
}

.btn-add {
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  height: 41px;
}

/* Table */
.table-wrapper {
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  overflow: hidden;
}

.projects-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.projects-table th {
  background-color: #f8f9fa;
  padding: 16px;
  font-weight: 600;
  border-bottom: 2px solid var(--border-color);
}

.projects-table td {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.font-bold {
  font-weight: 600;
}

.select-status {
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-main);
}

.btn-delete {
  padding: 6px 12px;
  background-color: #fde8e8;
  color: var(--danger-color);
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #fbd5d5;
}
</style>

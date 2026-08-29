<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { projectService } from '../services/projectServices' // L'import magique

const router = useRouter()

const statutsDisponibles = ['BROUILLON', 'EN_COURS', 'FINANCE', 'TERMINE', 'ANNULE']

// Variables d'état (vides au départ, remplies par le backend)
const projets = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

// Champs du formulaire
const nouveauTitre = ref('')
const nouvelleCategorie = ref('Humanitaire')
const nouvelObjectif = ref('')

// 1. Fonction pour récupérer les projets depuis l'API
const chargerProjets = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const data = await projectService.getAllProjects()

    // 👇 C'est ici qu'il faut assigner directement à .value
    projets.value = data.projects;

    console.log("Projets chargés avec succès :", projets.value);
    
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
// S'exécute automatiquement quand l'administrateur arrive sur la page
onMounted(() => {
  chargerProjets()
})

// 2. Fonction pour créer le projet (Connectée au backend)
const ajouterProjet = async () => {
  if (!nouveauTitre.value || !nouvelObjectif.value) return

  try {
    // On traduit les variables pour correspondre à notre modèle Mongoose
    await projectService.createProject({
      title: nouveauTitre.value,
      // Comme on n'a pas de champ catégorie en base, on l'utilise comme description pour l'instant
      description: `Catégorie : ${nouvelleCategorie.value}`, 
      goalAmount: Number(nouvelObjectif.value)
    })

    // Réinitialisation du formulaire
    nouveauTitre.value = ''
    nouvelObjectif.value = ''
    alert('Projet créé avec succès dans la base de données !')

    // On rafraîchit la liste pour voir apparaître le nouveau projet
    await chargerProjets()
    
  } catch (error) {
    alert("Erreur lors de la création : " + error.message)
  }
}

// 3. Fonction de suppression (En attente du backend)
const supprimerProjet = () => {
  alert("La route de suppression n'existe pas encore côté backend ! Nous devons la créer.");
}

// 4. Fonction de mise à jour du statut (En attente du backend)
const modifierStatut = () => {
    alert("La modification de statut nécessite aussi une nouvelle route backend.");
}
</script>

<template>
  <div class="admin-container">
    <!-- Barre supérieure de navigation Admin -->
    <div class="admin-nav-top">
      <button @click="router.push('/admin/users')" class="btn-nav-link">
        ← Retour à la Gestion Utilisateurs
      </button>
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
          <!-- Ajout d'un état de chargement -->
          <tr v-if="isLoading">
            <td colspan="5" style="text-align: center;">Chargement des projets depuis la base de données...</td>
          </tr>
          
          <!-- Affichage des vraies données (utilisation de title, description, goalAmount et status) -->
          <tr v-else v-for="projet in projets" :key="projet._id">
            <td class="font-bold">{{ projet.title }}</td>
            <td>{{ projet.description }}</td>
            <td>{{ projet.goalAmount }} €</td>
            <td>
              <!-- Ajout de l'événement @change pour détecter la modification -->
              <select v-model="projet.status" @change="modifierStatut(projet._id, projet.status)" class="select-status">
                <option v-for="st in statutsDisponibles" :key="st" :value="st">
                  {{ st }}
                </option>
              </select>
            </td>
            <td>
              <button @click="supprimerProjet(projet._id)" class="btn-delete">
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

.form-group input, .form-group select {
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

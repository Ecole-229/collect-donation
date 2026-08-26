<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Liste initiale des catégories (John James)
const categories = ref([
  { id: 1, nom: 'Humanitaire', code: 'HUM' },
  { id: 2, nom: 'Environnement', code: 'ENV' },
  { id: 3, nom: 'Éducation', code: 'EDU' }
])

// Formulaire d'ajout
const nouvelleCategorie = ref('')

const ajouterCategorie = () => {
  if (!nouvelleCategorie.value.trim()) return

  // Création d'un code simplifié à partir du nom
  const codeGenere = nouvelleCategorie.value.trim().substring(0, 3).toUpperCase()

  categories.value.push({
    id: categories.value.length + 1,
    nom: nouvelleCategorie.value.trim(),
    code: codeGenere
  })

  nouvelleCategorie.value = ''
  alert('Nouvelle catégorie ajoutée avec succès !')
}

// Fonction de suppression
const supprimerCategorie = (id) => {
  if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
    categories.value = categories.value.filter(c => c.id !== id)
  }
}
</script>

<template>
  <div class="admin-container">
    <!-- Boutons pour naviguer (John James) -->
    <div class="admin-nav-top">
      <button @click="router.push('/admin/users')" class="btn-nav-link">➔ Gérer les Utilisateurs</button>
      <button @click="router.push('/admin/projects')" class="btn-nav-link">➔ Gérer les Projets</button>
      <button @click="router.push('/')" class="btn-nav-link back-home">← Retour Accueil</button>
    </div>

    <header class="admin-header">
      <h1 class="admin-title">Gestion des Catégories</h1>
      <p class="admin-subtitle">Interface Administrateur — Configuration des filtres de la plateforme</p>
    </header>

    <!-- Formulaire d'Ajout (CRUD) -->
    <section class="admin-form-section">
      <h2>Créer une nouvelle catégorie</h2>
      <form @submit.prevent="ajouterCategorie" class="category-form">
        <div class="form-group">
          <label for="cat-name">Nom de la catégorie</label>
          <input
            id="cat-name"
            v-model="nouvelleCategorie"
            type="text"
            placeholder="Ex: Santé, Sport, Culture..."
            required
          />
        </div>
        <button type="submit" class="btn-add">Ajouter</button>
      </form>
    </section>

    <!-- Tableau d'affichage (CRUD) -->
    <div class="table-wrapper">
      <table class="categories-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom de la catégorie</th>
            <th>Code système</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in categories" :key="cat.id">
            <td>#{{ cat.id }}</td>
            <td class="font-bold">{{ cat.nom }}</td>
            <td><code>{{ cat.code }}</code></td>
            <td>
              <button @click="supprimerCategorie(cat.id)" class="btn-delete">
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

  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.admin-nav-top {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.btn-nav-link {
  background: #f1f5f9;
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 6px;
  color: var(--text-main);
  font-weight: 600;
  cursor: pointer;
}

.btn-nav-link:hover {
  background: var(--primary-color);
  color: white;
}

.back-home {
  margin-left: auto;
  background: #2c3e50;
  color: white;
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

.category-form {
  display: flex;
  gap: 15px;
  align-items: flex-end;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
}

.form-group input {
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
}

.btn-add {
  padding: 10px 24px;
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

.categories-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.categories-table th {
  background-color: #f8f9fa;
  padding: 16px;
  font-weight: 600;
  border-bottom: 2px solid var(--border-color);
}

.categories-table td {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.font-bold {
  font-weight: 600;
}

code {
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
  color: #0f172a;
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

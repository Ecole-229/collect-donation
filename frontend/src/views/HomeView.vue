<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import imgInondation from '../assets/inondation.jpg'
import imgForet from '../assets/foret.jpg'
import imgEducation from '../assets/education.jpg'

const router = useRouter()
// Liste fictive de projets pour simuler la base de données (John James)
const projets = ref([
  {
    id: 1,
    titre: 'Urgences Inondations Afrique',
    description:
      "Aide humanitaire d'urgence pour approvisionner en eau potable et nourriture les familles touchées.",
    categorie: 'Humanitaire',
    image: imgInondation,
    objectif: 15000,
    recolte: 9450,
  },
  {
    id: 2,
    titre: 'Reforestation de la Forêt Classée',
    description:
      'Projet écologique visant à planter 5000 arbres pour lutter contre la désertification locale.',
    categorie: 'Environnement',
    image: imgForet,
    objectif: 5000,
    recolte: 1200,
  },
  {
    id: 3,
    titre: 'Une Tablette Pour Apprendre',
    description:
      "Équiper les classes des zones rurales en outils numériques pour l'éducation des enfants.",
    categorie: 'Éducation',
    image: imgEducation,
    objectif: 8000,
    recolte: 8000,
  },
])

// Gestion des filtres de catégories
const categories = ['Tous', 'Humanitaire', 'Environnement', 'Éducation']
const categorieSelectionnee = ref('Tous')

// Variable pour la recherche par texte (John James)
const texteRecherche = ref('')

// Filtre combiné : Catégorie + Recherche textuelle
const projetsFiltres = computed(() => {
  return projets.value.filter(projet => {
    const correspondCategorie = categorieSelectionnee.value === 'Tous' || projet.categorie === categorieSelectionnee.value
    const correspondTexte = projet.titre.toLowerCase().includes(texteRecherche.value.toLowerCase()) ||
      projet.description.toLowerCase().includes(texteRecherche.value.toLowerCase())

    return correspondCategorie && correspondTexte
  })
})


// Calcul du pourcentage de la barre de progression
const calculerPourcentage = (recolte, objectif) => {
  const pct = Math.round((recolte / objectif) * 100)
  return pct > 100 ? 100 : pct
}

const deconnexion = () => {
  alert('Vous avez été déconnecté avec succès !')
  router.push('/login')
}

</script>

<template>
  <div class="catalog-container">
    <button @click="deconnexion" class="btn-logout">Se déconnecter</button>
    <button @click="router.push('/profile')" class="btn-profile">Mon Profil</button>
    <button @click="router.push('/login')" class="btn-login-nav">Connexion Admin</button>
    <!-- Header -->
    <header class="catalog-header">
      <h1 class="main-title">Découvrez les Projets</h1>
      <p class="subtitle">Soutenez des causes qui changent le monde</p>
    </header>

    <!-- Navigation / Filtres par catégories -->
    <div class="categories-nav">
      <button v-for="cat in categories" :key="cat" class="btn-category"
        :class="{ active: categorieSelectionnee === cat }" @click="categorieSelectionnee = cat">
        {{ cat }}
      </button>
    </div>

    <!-- Barre de recherche (John James) -->
    <div class="search-container">
      <input v-model="texteRecherche" type="text" placeholder="🔍 Rechercher un projet par titre ou description..."
        class="search-input" />
    </div>

    <!-- Grille des projets -->
    <main class="projects-grid">
      <div v-for="projet in projetsFiltres" :key="projet.id" class="project-card">
        <div class="card-image-wrapper">
          <img :src="projet.image" :alt="projet.titre" class="card-image" />
          <span class="card-badge">{{ projet.categorie }}</span>
        </div>

        <div class="card-content">
          <h2 class="card-title">{{ projet.titre }}</h2>
          <p class="card-description">{{ projet.description }}</p>

          <!-- Barre de progression -->
          <div class="progress-section">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill"
                :style="{ width: calculerPourcentage(projet.recolte, projet.objectif) + '%' }"></div>
            </div>
            <div class="progress-text">
              <span class="pct-number">{{ calculerPourcentage(projet.recolte, projet.objectif) }}%</span>
              <span class="amounts">{{ projet.recolte }} € sur {{ projet.objectif }} €</span>
            </div>
          </div>

          <!-- Bouton d'action -->
          <button @click="router.push(`/project/${projet.id}`)" class="btn-donate">
            Soutenir ce projet
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.catalog-container {
  --primary: #42b883;
  --primary-dark: #33996c;
  --dark: #2c3e50;
  --muted: #7f8c8d;
  --light-bg: #f8f9fa;
  --border: #e2e8f0;
  --shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
  --radius: 12px;

  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.catalog-header {
  text-align: center;
  margin-bottom: 40px;
}

.main-title {
  font-size: 36px;
  color: var(--dark);
  margin-bottom: 10px;
}

.btn-profile {
  position: absolute;
  top: 20px;
  right: 160px;
  padding: 8px 16px;
  background: #34495e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-login-nav {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 8px 16px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.subtitle {
  color: var(--muted);
  font-size: 16px;
}

.categories-nav {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
}

.btn-category {
  padding: 10px 20px;
  border: 1px solid var(--border);
  background: white;
  border-radius: 30px;
  color: var(--dark);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-category.active,
.btn-category:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
}

.project-card {
  background: white;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-image-wrapper {
  position: relative;
  height: 200px;
  width: 100%;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(44, 62, 80, 0.85);
  color: white;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.card-content {
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  font-size: 20px;
  color: var(--dark);
  margin: 0 0 12px 0;
}

.card-description {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.6;
  margin: 0 0 20px 0;
  flex-grow: 1;
}

.progress-section {
  margin-bottom: 20px;
}

.progress-bar-bg {
  background: var(--light-bg);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
  border: 1px solid var(--border);
}

.progress-bar-fill {
  background: var(--primary);
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.pct-number {
  font-weight: 700;
  color: var(--primary);
}

.amounts {
  color: var(--muted);
}

.btn-donate {
  width: 100%;
  padding: 12px;
  background: var(--dark);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-logout {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #c0392b;
}

.btn-donate:hover {
  background: var(--primary);
}

.search-container {
  max-width: 600px;
  margin: 0 auto 30px auto;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  font-size: 15px;
  border: 1px solid var(--border);
  border-radius: 30px;
  background-color: white;
  color: var(--dark);
  box-shadow: var(--shadow);
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.15);
}


</style>

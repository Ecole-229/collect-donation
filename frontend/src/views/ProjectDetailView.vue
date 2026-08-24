<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Importation de tes images locales (John James)
import imgInondation from '../assets/inondation.jpg'
import imgForet from '../assets/foret.jpg'
import imgEducation from '../assets/education.jpg'

const route = useRoute()
const router = useRouter()
const projet = ref(null)

// Simulation de la base de données locale (John James)
const tousLesProjets = [
  {
    id: 1,
    titre: 'Urgences Inondations Afrique',
    description: 'Aide humanitaire d\'urgence pour approvisionner en eau potable et nourriture les familles touchées. Ce projet vise à déployer des kits de survie, des stations de purification d\'eau mobiles et un soutien médical de première nécessité dans les zones les plus sinistrées.',
    categorie: 'Humanitaire',
    image: imgInondation,
    objectif: 15000,
    recolte: 9450,
    porteur: 'ONG Aide Afrique',
    dateLimite: '31 Décembre 2026'
  },
  {
    id: 2,
    titre: 'Reforestation de la Forêt Classée',
    description: 'Projet écologique visant à planter 5000 arbres pour lutter contre la désertification locale. En collaboration avec les communautés, nous restaurons la biodiversité, créons des barrières naturelles contre l\'érosion et sensibilisons la jeunesse aux enjeux climatiques.',
    categorie: 'Environnement',
    image: imgForet,
    objectif: 5000,
    recolte: 1200,
    porteur: 'Collectif Éco-Bénin',
    dateLimite: '15 Novembre 2026'
  },
  {
    id: 3,
    titre: 'Une Tablette Pour Apprendre',
    description: 'Équiper les classes des zones rurales en outils numériques pour l\'éducation des enfants. Nous fournissons des tablettes reconditionnées chargées de programmes éducatifs hors-ligne pour permettre aux élèves d\'accéder à des ressources pédagogiques modernes.',
    categorie: 'Éducation',
    image: imgEducation,
    objectif: 8000,
    recolte: 8000,
    porteur: 'EduTech For All',
    dateLimite: '30 Octobre 2026'
  }
]

onMounted(() => {
  // Récupération de l'ID depuis l'URL (ex: /project/1)
  const idProjet = parseInt(route.params.id)
  const trouve = tousLesProjets.find(p => p.id === idProjet)

  if (trouve) {
    projet.value = trouve
  } else {
    // Si le projet n'existe pas, redirection vers l'accueil (John James)
    router.push('/')
  }
})

const calculerPourcentage = (recolte, objectif) => {
  const pct = Math.round((recolte / objectif) * 100)
  return pct > 100 ? 100 : pct
}
</script>

<template>
  <div v-if="projet" class="detail-container">
    <!-- Bouton Retour -->
    <button @click="router.push('/')" class="btn-back">
      ← Retour aux projets
    </button>

    <div class="project-layout">
      <!-- Section Gauche : Média (John James) -->
      <div class="project-media">
        <img :src="projet.image" :alt="projet.titre" class="main-image" />
        <span class="category-badge">{{ projet.categorie }}</span>
      </div>

      <!-- Section Droite : Infos & Progression (John James) -->
      <div class="project-info-card">
        <h1 class="project-title">{{ projet.titre }}</h1>
        <p class="porteur-text">Projet proposé par : <strong>{{ projet.porteur }}</strong></p>

        <!-- Barre de progression -->
        <div class="progress-box">
          <div class="progress-bar-bg">
            <div
              class="progress-bar-fill"
              :style="{ width: calculerPourcentage(projet.recolte, projet.objectif) + '%' }"
            ></div>
          </div>
          <div class="progress-metrics">
            <span class="percentage">{{ calculerPourcentage(projet.recolte, projet.objectif) }}%</span>
            <span class="dates">Fin le : {{ projet.dateLimite }}</span>
          </div>
        </div>

        <div class="financial-summary">
          <div class="metric">
            <span class="label">Récolté</span>
            <span class="value color-primary">{{ projet.recolte }} €</span>
          </div>
          <div class="metric">
            <span class="label">Objectif</span>
            <span class="value">{{ projet.objectif }} €</span>
          </div>
        </div>

        <!-- Bouton d'action pour Félix (Panier) -->
        <button class="btn-action-donate">
          Ajouter au panier pour soutenir
        </button>
      </div>
    </div>

    <!-- Description complète en dessous -->
    <section class="project-description-section">
      <h2>À propos de ce projet</h2>
      <p class="full-description">{{ projet.description }}</p>
    </section>
  </div>
</template>

<style scoped>
.detail-container {
  --primary: #42b883;
  --primary-dark: #33996c;
  --dark: #2c3e50;
  --muted: #7f8c8d;
  --light-bg: #f8f9fa;
  --border: #e2e8f0;
  --radius: 12px;

  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: system-ui, -apple-system, sans-serif;
}

.btn-back {
  background: none;
  border: none;
  color: var(--muted);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 25px;
  transition: color 0.2s;
}
.btn-back:hover {
  color: var(--primary);
}

.project-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 50px;
}

@media (min-width: 768px) {
  .project-layout {
    grid-template-columns: 1.2fr 0.8fr;
  }
}

.project-media {
  position: relative;
  height: 400px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: var(--dark);
  color: white;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
}

.project-info-card {
  background: white;
  border: 1px solid var(--border);
  padding: 35px;
  border-radius: var(--radius);
  box-shadow: 0 10px 25px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-title {
  font-size: 28px;
  color: var(--dark);
  margin: 0 0 10px 0;
}

.porteur-text {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 30px;
}

/* Progression */
.progress-box {
  margin-bottom: 25px;
}

.progress-bar-bg {
  background: var(--light-bg);
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
  border: 1px solid var(--border);
}

.progress-bar-fill {
  background: var(--primary);
  height: 100%;
  border-radius: 5px;
  transition: width 0.5s ease-out;
}

.progress-metrics {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.percentage {
  font-weight: 700;
  color: var(--primary);
}

.dates {
  color: var(--muted);
}

/* Grille financière */
.financial-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 35px;
  background: var(--light-bg);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--border);
}

.metric {
  display: flex;
  flex-direction: column;
}

.metric .label {
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.metric .value {
  font-size: 20px;
  font-weight: 700;
  color: var(--dark);
}

.metric .color-primary {
  color: var(--primary);
}

.btn-action-donate {
  width: 100%;
  padding: 15px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-action-donate:hover {
  background: var(--primary-dark);
}

/* Description */
.project-description-section h2 {
  font-size: 22px;
  color: var(--dark);
  border-bottom: 2px solid var(--light-bg);
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.full-description {
  color: var(--dark);
  font-size: 15px;
  line-height: 1.8;
}
</style>

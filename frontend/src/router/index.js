import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminUsersView from '../views/AdminUsersView.vue'
import AdminProjectsView from '../views/AdminProjectsView.vue'

// N'oublie pas d'importer le fichier de ta vue publique des projets !
// import ProjectsView from '../views/ProjectsView.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    // 👇 NOUVELLE ROUTE : Le catalogue public pour les donateurs
    {
      path: '/projets',
      name: 'projets',
      component: HomeView, // Remplace 'HomeView' par ton vrai composant de catalogue (ex: ProjectsView)
    },
    {
      path: '/project/:id',
      name: 'project-detail',
      component: ProjectDetailView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: AdminUsersView,
    },
    // 👇 CORRECTION : Remplacer 'projects' par 'projets'
    {
      path: '/admin/projets', 
      name: 'admin-projects',
      component: AdminProjectsView,
    },
  ],
})

export default router
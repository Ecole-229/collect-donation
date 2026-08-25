import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminUsersView from '../views/AdminUsersView.vue'
import AdminProjectsView from '../views/AdminProjectsView.vue'
import AdminCategoriesView from '../views/AdminCategoriesView.vue'

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
    {
      path: '/admin/projects',
      name: 'admin-projects',
      component: AdminProjectsView,
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: AdminCategoriesView,
    },
  ],
})

export default router

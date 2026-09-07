// src/router/panier.routes.js
export default [
  {
    path: '/panier',
    name: 'panier',
    component: () => import('@/views/PagePanier.vue'),
    meta: { requiresAuth: true, roles: ['DONATEUR', 'ADMIN'] },
  },
]

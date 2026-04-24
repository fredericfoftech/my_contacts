import { createRouter, createWebHistory } from 'vue-router'
import inscription from '../views/InscriptionView.vue'
import connexion from '../views/ConnexionView.vue'
import contact from '../views/ContactView.vue'
import profil from '../views/ProfilView.vue'
import AcceuilView from '@/views/AcceuilView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: AcceuilView,
    },
    {
      path: '/inscription',
      name: 'Inscription',
      component: inscription,
    },
    {
     path: '/connexion',
      name: 'Connexion',
      component: connexion,
   },
    {
     path: '/contact',
      name: 'Contact',
    component: contact,
    },
   {
     path: '/profil',
     name: 'Profil',
     component: profil,
    },
  ],
})

export default router


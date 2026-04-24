<template>
  <div class="container">

    <!-- 🔝 NAVBAR -->
    <div class="navbar">

      <!-- gauche -->
      <div class="nav-left">
        <button @click="goLogin">Connexion</button>
        <button @click="goRegister">Inscription</button>
      </div>

      <!-- droite -->
      <div class="nav-right">
        <span class="home" @click="goHome">Accueil</span>
        <h2 class="logo">MyContacts</h2>
      </div>

    </div>

    <!-- 🎯 HERO -->
    <div class="hero">
      <h1>Bienvenue sur MyContacts</h1>
      <p>Gérez facilement vos contacts en toute simplicité.</p>

     
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = () => {
  router.push('/connexion')
}

const goRegister = () => {
  router.push('/inscription')
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f4f4f4;
  font-family: Arial, sans-serif;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #4CAF50;
  padding: 15px 20px;
  border-radius: 0 0 10px 10px;
}

.nav-left button {
  margin-right: 10px;
  background: white;
  color: #4CAF50;
  font-weight: bold;
  border: none;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
}

.logo {
  margin: 0;
}

.home {
  font-weight: bold;
  cursor: pointer;
}

.hero {
  text-align: center;
  margin-top: 100px;
}

.hero h1 {
  font-size: 2.5rem;
  color: #333;
}

.hero p {
  margin: 15px 0 30px;
  color: #666;
}

.hero-buttons button {
  margin: 10px;
  padding: 12px 20px;
  border-radius: 5px;
  border: none;
  background: #3498db;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.hero-buttons .secondary {
  background: #e74c3c;
}

button:hover {
  opacity: 0.9;
}
</style>
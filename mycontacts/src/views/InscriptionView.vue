<template>
  <div class="signup-container">
    <form @submit.prevent="handleSubmit" class="signup-form">
      <h2>Inscription</h2>
      
      <div class="form-group">
        <label for="name">Nom</label>
        <input 
        type="name"
          v-model="name" 
          placeholder="Cocody Angre"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input  
        type="email"
          v-model="email" 
          placeholder="cocodyangre@email.com"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
        type="password"
          v-model="password" 
          placeholder="********"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Confirmer le mot de passe</label>
        <input 
        type="password"
          v-model="confirm_password" 
          placeholder="********"
          required
        />
      </div>

      <button type="submit" class="submit-btn">Créer mon compte</button>
      
      <p class="login-link">Déjà inscrit ? <a href="#" @click="handleLoginRedirect">Connexion</a></p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAccount } from '@/stores/api';

const router = useRouter();
const store = useAccount();

const name = ref('');
const email = ref('');
const password = ref('');
const confirm_password = ref('');
const loading = ref(false);
const error = ref('');

const handleSubmit = async () => {

   if (!email.value || !name.value || !password.value || !confirm_password.value) {
    alert('Veuillez remplir tous les champs');
    return;
  }

 
  if (password.value !== confirm_password.value) {
  alert('Les mots de passe ne correspondent pas');
    return;
  }
  if (password.value.length < 8) {
    alert('Le mot de passe doit contenir au moins 8 caractères');
    return;
  }


  loading.value = true;
  error.value = '';

  try {
  loading.value = true;
  await store.register(
    name.value, 
    email.value, 
    password.value, 
    confirm_password.value
  );
  alert('Inscription réussie !');

  name.value = '';
  email.value = '';
  password.value = '';
  confirm_password.value = '';

  router.push('/connexion'); 

} catch (err: any) {

  error.value = err.response?.data?.message || "Une erreur est survenue";
  alert(error.value);
} finally {
  loading.value = false;
}
}
const handleLoginRedirect = () => {
  router.push('/connexion');
}
</script>
<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7f6;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.signup-form {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box; /* Important pour le padding */
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #4CAF50;
  outline: none;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #4CAF50;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #45a049;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #777;
}

.login-link a {
  color: #4CAF50;
  text-decoration: none;
}
</style>

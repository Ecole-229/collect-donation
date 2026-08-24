<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = () => {
  isLoading.value = true

  // Simulation de la latence réseau avant intégration de l'API d'Eddy
  setTimeout(() => {
    console.log('Credentials soumis :', { email: email.value, password: password.value })
    isLoading.value = false
    alert('Formulaire soumis avec succès !')
  }, 1000)
}
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="auth-title">Connexion</h1>
        <p class="auth-subtitle">Accédez à votre espace Collect Donation</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email" class="form-label">Adresse Email</label>
          <div class="input-wrapper">
            <input type="email" id="email" v-model="email" class="form-input" placeholder="adresse@exemple.com" required
              autocomplete="email" />
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Mot de passe</label>
          <div class="input-wrapper">
            <input type="password" id="password" v-model="password" class="form-input" placeholder="••••••••" required
              autocomplete="current-password" />
          </div>
        </div>

        <button type="submit" class="btn-submit" :disabled="isLoading">
          <span v-if="!isLoading">Se connecter</span>
          <span v-else class="loader"></span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Variables locales de Design System */
.auth-wrapper {
  --primary-color: #42b883;
  --primary-dark: #33996c;
  --text-main: #2c3e50;
  --text-muted: #7f8c8d;
  --bg-input: #f8f9fa;
  --border-color: #e2e8f0;
  --radius: 8px;
  --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.auth-card {
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  padding: 40px;
  border-radius: var(--radius);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 5px 10px rgba(0, 0, 0, 0.03);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 8px 0;
}

.auth-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  color: var(--text-main);
  background-color: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  box-sizing: border-box;
  transition: var(--transition);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.15);
}

.form-input::placeholder {
  color: #a0aec0;
}

.btn-submit {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background-color: var(--primary-color);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
  margin-top: 10px;
}

.btn-submit:hover:not(:disabled) {
  background-color: var(--primary-dark);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Micro-spinner pour l'état de chargement */
.loader {
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

// src/services/authService.js
const API_URL = 'http://127.0.0.1:3000/api/auth'

export const authService = {

  async login(email, password) {

    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Envoi de "password"
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Erreur de connexion')

    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
    }
    return data
  },

  
  async register(name, email, password) {

    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Erreur lors de l'inscription")

    return data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getToken() {
    return localStorage.getItem('token')
  },

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },
}

// src/services/projectService.js
const API_URL = 'http://127.0.0.1:3000/api/project';

// Fonction utilitaire pour générer l'en-tête avec le token
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // C'est ici que la magie opère !
    };
};

export const projectService = {
    // Récupérer tous les projets (Route publique/accessible)
    async getAllProjects() {
        const response = await fetch(`${API_URL}/`);
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Erreur lors du chargement des projets');
        
        return data;
    },

    // Créer un projet (Route Admin)
    async createProject(projectData) {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: getAuthHeaders(), // On attache le token de l'admin
            body: JSON.stringify(projectData)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Erreur lors de la création');
        
        return data;
    }
};
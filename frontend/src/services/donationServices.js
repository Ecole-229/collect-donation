// src/services/donationService.js
const API_URL = 'http://127.0.0.1:3000/api/donations';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const donationService = {
    // Faire un don (Route protégée)
    async makeDonation(projectId, amount, message = '') {
        const response = await fetch(`${API_URL}/make`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ projectId, amount, message })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Erreur lors du don');
        
        return data;
    }
};
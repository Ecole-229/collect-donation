const API_URL = 'http://localhost:3000/api/cart';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export default {
    async getCart() {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Erreur lors de la récupération du panier');
        return response.json();
    },

    async addToCart(projectId, amount) {
        const response = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ projectId, amount })
        });
        if (!response.ok) throw new Error("Erreur lors de l'ajout au panier");
        return response.json();
    },

    async updateCartItem(projectId, amount) {
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ projectId, amount })
        });
        if (!response.ok) throw new Error('Erreur lors de la mise à jour du panier');
        return response.json();
    },

    async removeFromCart(projectId) {
        const response = await fetch(`${API_URL}/item/${projectId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Erreur lors de la suppression du panier');
        return response.json();
    },

    async checkout() {
        const response = await fetch(`${API_URL}/checkout`, {
            method: 'POST',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Erreur lors de la validation du paiement');
        return response.json();
    }
};
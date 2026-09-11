import api from './api'

function normaliserPanier(cartBrut) {
  const lignes = (cartBrut.items ?? []).map((item) => {
    const projetBrut = item.project
    const estPopule = projetBrut && typeof projetBrut === 'object'

    return {

      id: estPopule ? projetBrut._id : projetBrut,
      montant: item.amount,
      projet: estPopule
        ? {
            id: projetBrut._id,
            titre: projetBrut.title,
            statut: projetBrut.status,
            objectif: projetBrut.goalAmount,
          }
        : { id: projetBrut },
    }
  })

  const total = lignes.reduce((somme, ligne) => somme + (ligne.montant ?? 0), 0)

  return {
    id: cartBrut._id,
    total,
    // Eddy ne gère pas de statut de panier explicite : on le déduit
    // localement (ACTIF s'il y a des lignes, VIDE sinon).
    statut: lignes.length > 0 ? 'ACTIF' : 'VIDE',
    lignes,
  }
}

export const panierService = {
  async recupererPanierActif() {
    const { data } = await api.get('/cart')
    return normaliserPanier(data)
  },

  async ajouterProjet(projetId, montant) {
    const { data } = await api.post('/cart/add', {
      projectId: projetId,
      amount: montant,
    })
    return normaliserPanier(data)
  },

  /** Remplace le montant d'une ligne existante (PATCH, pas d'addition). */
  async modifierMontant(projetId, montant) {
    const { data } = await api.patch(`/cart/item/${projetId}`, {
      amount: montant,
    })
    return normaliserPanier(data)
  },

  async supprimerLigne(projetId) {
    const { data } = await api.delete(`/cart/item/${projetId}`)
    return normaliserPanier(data)
  },

  async viderPanier() {
    const { data } = await api.delete('/cart')
    return normaliserPanier(data)
  },


  async validerPanier() {
    const { data } = await api.post('/cart/checkout')
    return data // { message: 'Paiement validé avec succès !' }
  },
}

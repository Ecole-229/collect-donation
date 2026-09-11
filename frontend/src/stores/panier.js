
import { defineStore } from 'pinia'
import { panierService } from '@/services/panierService'
import { validerMontant } from '@/composables/useMontantValidation'
import { useNotification } from '@/composables/useNotification'

export const usePanierStore = defineStore('panier', {
  state: () => ({
    panier: null, // { id, total, statut, lignes: [...] }
    chargement: false,
    ligneEnAttente: null, // id (= id du projet) de la ligne en cours de modif/suppression
    erreur: null,
  }),

  getters: {
    lignes: (state) => state.panier?.lignes ?? [],
    nombreLignes: (state) => state.panier?.lignes?.length ?? 0,
    total: (state) => state.panier?.total ?? 0,
    estVide: (state) => (state.panier?.lignes?.length ?? 0) === 0,
    estValidable: (state) =>
      (state.panier?.lignes?.length ?? 0) > 0 && state.panier?.statut === 'ACTIF',
  },

  actions: {
    async chargerPanier() {
      this.chargement = true
      this.erreur = null
      try {
        this.panier = await panierService.recupererPanierActif()
      } catch (err) {
        this._gererErreur(err, 'Impossible de charger votre panier.')
      } finally {
        this.chargement = false
      }
    },

    /** Ajoute un projet au panier avec un montant de don. Appelé par BoutonAjouterPanier. */
    async ajouterAuPanier(projet, montant) {
      const { valide, erreur, montant: montantValide } = validerMontant(montant, projet)
      if (!valide) {
        useNotification().notifierErreur(erreur)
        return { succes: false, erreur }
      }

      this.chargement = true
      try {
        this.panier = await panierService.ajouterProjet(projet.id, montantValide)
        useNotification().notifierSucces(`« ${projet.titre} » ajouté au panier.`)
        return { succes: true }
      } catch (err) {
        this._gererErreur(err, "Impossible d'ajouter ce projet au panier.")
        return { succes: false, erreur: err.message }
      } finally {
        this.chargement = false
      }
    },

    /** Modifie le montant d'une ligne existante (identifiée par l'id du projet). */
    async modifierMontantLigne(projetId, nouveauMontant) {
      const ligne = this.lignes.find((l) => l.id === projetId)
      const { valide, erreur, montant } = validerMontant(nouveauMontant, ligne?.projet)
      if (!valide) {
        useNotification().notifierErreur(erreur)
        return { succes: false, erreur }
      }

      this.ligneEnAttente = projetId
      try {
        this.panier = await panierService.modifierMontant(projetId, montant)
        return { succes: true }
      } catch (err) {
        this._gererErreur(err, 'Impossible de modifier ce montant.')
        return { succes: false, erreur: err.message }
      } finally {
        this.ligneEnAttente = null
      }
    },

    async supprimerLigne(projetId) {
      this.ligneEnAttente = projetId
      try {
        this.panier = await panierService.supprimerLigne(projetId)
        useNotification().notifierSucces('Ligne supprimée du panier.')
      } catch (err) {
        this._gererErreur(err, 'Impossible de supprimer cette ligne.')
      } finally {
        this.ligneEnAttente = null
      }
    },

    async viderPanier() {
      this.chargement = true
      try {
        this.panier = await panierService.viderPanier()
        useNotification().notifierSucces('Panier vidé.')
      } catch (err) {
        this._gererErreur(err, 'Impossible de vider le panier.')
      } finally {
        this.chargement = false
      }
    },

    async validerPanier() {
      if (!this.estValidable) {
        useNotification().notifierErreur('Votre panier est vide.')
        return { succes: false }
      }
      this.chargement = true
      try {
        const resultat = await panierService.validerPanier()
        this.panier = { id: this.panier?.id ?? null, total: 0, statut: 'VIDE', lignes: [] }
        useNotification().notifierSucces(
          resultat?.message ?? 'Don validé, merci pour votre contribution !'
        )
        return { succes: true, resultat }
      } catch (err) {
        this._gererErreur(err, 'La validation du panier a échoué. Réessayez.')
        return { succes: false, erreur: err.message }
      } finally {
        this.chargement = false
      }
    },

    _gererErreur(err, messageParDefaut) {
      const message = err?.message || messageParDefaut
      this.erreur = message
      useNotification().notifierErreur(message)
    },
  },
})

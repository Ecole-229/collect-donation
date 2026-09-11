import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePanierStore } from '@/stores/panier'
import { panierService } from '@/services/panierService'

vi.mock('@/services/panierService', () => ({
  panierService: {
    recupererPanierActif: vi.fn(),
    ajouterProjet: vi.fn(),
    modifierMontant: vi.fn(),
    supprimerLigne: vi.fn(),
    viderPanier: vi.fn(),
    validerPanier: vi.fn(),
  },
}))

const projet = { id: 'p1', titre: 'Forage communautaire', statut: 'EN_COURS' }

function panierAvecLignes(lignes, extra = {}) {
  const total = lignes.reduce((s, l) => s + l.montant, 0)
  return { id: 'pan1', statut: 'ACTIF', total, lignes, ...extra }
}

describe('store panier', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('charge le panier actif au démarrage', async () => {
    panierService.recupererPanierActif.mockResolvedValue(panierAvecLignes([]))
    const store = usePanierStore()
    await store.chargerPanier()
    expect(store.panier).not.toBeNull()
    expect(store.estVide).toBe(true)
  })

  it('ajoute un projet au panier (ajouter au panier)', async () => {
    const ligne = { id: 'l1', montant: 5000, projet }
    panierService.ajouterProjet.mockResolvedValue(panierAvecLignes([ligne]))
    const store = usePanierStore()

    const res = await store.ajouterAuPanier(projet, 5000)

    expect(res.succes).toBe(true)
    expect(panierService.ajouterProjet).toHaveBeenCalledWith('p1', 5000)
    expect(store.nombreLignes).toBe(1)
    expect(store.total).toBe(5000)
  })

  it("refuse d'ajouter un montant invalide sans appeler l'API", async () => {
    const store = usePanierStore()
    const res = await store.ajouterAuPanier(projet, -10)
    expect(res.succes).toBe(false)
    expect(panierService.ajouterProjet).not.toHaveBeenCalled()
  })

  it('modifie le montant d\'une ligne', async () => {
    const store = usePanierStore()
    store.panier = panierAvecLignes([{ id: 'l1', montant: 5000, projet }])

    panierService.modifierMontant.mockResolvedValue(
      panierAvecLignes([{ id: 'l1', montant: 7000, projet }])
    )

    const res = await store.modifierMontantLigne('l1', 7000)
    expect(res.succes).toBe(true)
    expect(panierService.modifierMontant).toHaveBeenCalledWith('l1', 7000)
    expect(store.total).toBe(7000)
  })

  it('supprime une ligne du panier', async () => {
    const store = usePanierStore()
    store.panier = panierAvecLignes([{ id: 'l1', montant: 5000, projet }])
    panierService.supprimerLigne.mockResolvedValue(panierAvecLignes([]))

    await store.supprimerLigne('l1')

    expect(panierService.supprimerLigne).toHaveBeenCalledWith('l1')
    expect(store.estVide).toBe(true)
  })

  it('calcule le total à partir de la réponse serveur (calcul automatique)', async () => {
    const store = usePanierStore()
    store.panier = panierAvecLignes([
      { id: 'l1', montant: 5000, projet },
      { id: 'l2', montant: 2500, projet },
    ])
    expect(store.total).toBe(7500)
  })

  it('vide le panier', async () => {
    const store = usePanierStore()
    store.panier = panierAvecLignes([{ id: 'l1', montant: 5000, projet }])
    panierService.viderPanier.mockResolvedValue(panierAvecLignes([], { statut: 'VIDE' }))

    await store.viderPanier()

    expect(panierService.viderPanier).toHaveBeenCalled()
    expect(store.estVide).toBe(true)
  })

  it('valide le panier quand il contient des lignes', async () => {
    const store = usePanierStore()
    store.panier = panierAvecLignes([{ id: 'l1', montant: 5000, projet }])
    panierService.validerPanier.mockResolvedValue({
      panier: panierAvecLignes([], { statut: 'VALIDE' }),
    })

    const res = await store.validerPanier()

    expect(res.succes).toBe(true)
    expect(panierService.validerPanier).toHaveBeenCalled()
  })

  it('refuse de valider un panier vide', async () => {
    const store = usePanierStore()
    store.panier = panierAvecLignes([])

    const res = await store.validerPanier()

    expect(res.succes).toBe(false)
    expect(panierService.validerPanier).not.toHaveBeenCalled()
  })

  it('gère une erreur serveur lors de l\'ajout (gestion des erreurs)', async () => {
    panierService.ajouterProjet.mockRejectedValue({ message: 'Projet indisponible' })
    const store = usePanierStore()

    const res = await store.ajouterAuPanier(projet, 5000)

    expect(res.succes).toBe(false)
    expect(store.erreur).toBe('Projet indisponible')
  })
})

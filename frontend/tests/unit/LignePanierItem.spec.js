import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LignePanierItem from '@/components/panier/LignePanierItem.vue'

const ligne = {
  id: 'l1',
  montant: 5000,
  projet: { id: 'p1', titre: 'Forage communautaire', statut: 'EN_COURS' },
}

describe('LignePanierItem', () => {
  it('affiche le titre du projet et le montant', () => {
    const wrapper = mount(LignePanierItem, { props: { ligne } })
    expect(wrapper.text()).toContain('Forage communautaire')
    expect(wrapper.text().replace(/\s/g, ' ')).toContain('5 000 FCFA')
  })

  it('émet modifier-montant avec une nouvelle valeur valide', async () => {
    const wrapper = mount(LignePanierItem, { props: { ligne } })
    const input = wrapper.find('input')
    await input.setValue('8000')
    await input.trigger('change')

    expect(wrapper.emitted('modifier-montant')).toBeTruthy()
    expect(wrapper.emitted('modifier-montant')[0]).toEqual(['l1', 8000])
  })

  it("n'émet rien et affiche une erreur pour un montant invalide", async () => {
    const wrapper = mount(LignePanierItem, { props: { ligne } })
    const input = wrapper.find('input')
    await input.setValue('-5')
    await input.trigger('change')

    expect(wrapper.emitted('modifier-montant')).toBeFalsy()
    expect(wrapper.text()).toContain('supérieur à 0')
  })

  it('émet supprimer au clic sur "Retirer"', async () => {
    const wrapper = mount(LignePanierItem, { props: { ligne } })
    await wrapper.find('.lp-supprimer').trigger('click')

    expect(wrapper.emitted('supprimer')).toBeTruthy()
    expect(wrapper.emitted('supprimer')[0]).toEqual(['l1'])
  })

  it('désactive les contrôles quand la ligne est en attente', () => {
    const wrapper = mount(LignePanierItem, { props: { ligne, enAttente: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.lp-supprimer').attributes('disabled')).toBeDefined()
  })
})

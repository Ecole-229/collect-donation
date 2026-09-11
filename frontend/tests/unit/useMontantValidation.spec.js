import { describe, it, expect } from 'vitest'
import { validerMontant } from '@/composables/useMontantValidation'

describe('validerMontant', () => {
  it('refuse un montant vide', () => {
    expect(validerMontant('').valide).toBe(false)
  })

  it('refuse un montant non numérique', () => {
    expect(validerMontant('abc').valide).toBe(false)
  })

  it('refuse un montant nul ou négatif', () => {
    expect(validerMontant(0).valide).toBe(false)
    expect(validerMontant(-100).valide).toBe(false)
  })

  it('refuse plus de deux décimales', () => {
    expect(validerMontant('10.123').valide).toBe(false)
  })

  it('accepte un montant positif valide', () => {
    const res = validerMontant('5000')
    expect(res.valide).toBe(true)
    expect(res.montant).toBe(5000)
  })

  it('accepte une virgule décimale (saisie FR)', () => {
    const res = validerMontant('10,50')
    expect(res.valide).toBe(true)
    expect(res.montant).toBe(10.5)
  })

  it('refuse un don vers un projet TERMINE', () => {
    const res = validerMontant('1000', { statut: 'TERMINE' })
    expect(res.valide).toBe(false)
  })

  it('refuse un don vers un projet ANNULE', () => {
    const res = validerMontant('1000', { statut: 'ANNULE' })
    expect(res.valide).toBe(false)
  })

  it('accepte un don vers un projet EN_COURS', () => {
    const res = validerMontant('1000', { statut: 'EN_COURS' })
    expect(res.valide).toBe(true)
  })
})

/**
 * useMontantValidation
 * ---------------------------------------------------------------
 * Règles métier (issues du diagramme et des règles fonctionnelles) :
 *  - un don est un montant, jamais une quantité
 *  - le montant doit être strictement positif
 *  - au plus 2 décimales
 *  - un projet BROUILLON / TERMINE / ANNULE ne peut pas recevoir de don
 */
export const STATUTS_PROJET_INTERDITS = ['BROUILLON', 'TERMINE', 'ANNULE']

export function validerMontant(montant, projet = null) {
  const valeur = typeof montant === 'string' ? montant.replace(',', '.').trim() : montant
  const nombre = Number(valeur)

  if (valeur === '' || valeur === null || valeur === undefined) {
    return { valide: false, erreur: 'Indiquez un montant.' }
  }
  if (Number.isNaN(nombre)) {
    return { valide: false, erreur: 'Le montant doit être un nombre.' }
  }
  if (nombre <= 0) {
    return { valide: false, erreur: 'Le montant doit être supérieur à 0.' }
  }
  if (!/^\d+(\.\d{1,2})?$/.test(String(nombre))) {
    return { valide: false, erreur: 'Deux décimales maximum.' }
  }
  if (projet && STATUTS_PROJET_INTERDITS.includes(projet.statut)) {
    return { valide: false, erreur: "Ce projet ne peut plus recevoir de dons." }
  }
  return { valide: true, erreur: null, montant: nombre }
}

/**
 * useNotification
 * ---------------------------------------------------------------
 * Petit bus de notifications en mémoire (pas de dépendance externe).
 * Chaque composant du panier peut pousser un message de succès/erreur ;
 * un <NotificationToast/> unique (monté une fois dans App.vue) les affiche.
 */
import { reactive } from 'vue'

const state = reactive({
  messages: [], // { id, type: 'success' | 'error', text }
})

let nextId = 1

export function useNotification() {
  function notifier(text, type = 'error') {
    const id = nextId++
    state.messages.push({ id, type, text })
    setTimeout(() => retirer(id), 4000)
  }

  function retirer(id) {
    const index = state.messages.findIndex((m) => m.id === id)
    if (index !== -1) state.messages.splice(index, 1)
  }

  return {
    messages: state.messages,
    notifierErreur: (text) => notifier(text, 'error'),
    notifierSucces: (text) => notifier(text, 'success'),
    retirer,
  }
}

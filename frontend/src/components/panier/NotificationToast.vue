<template>
  <div class="nt-conteneur" aria-live="polite">
    <transition-group name="nt-fade">
      <div
        v-for="message in messages"
        :key="message.id"
        class="nt-toast"
        :class="`nt-toast--${message.type}`"
        role="status"
        @click="retirer(message.id)"
      >
        {{ message.text }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification'

const { messages, retirer } = useNotification()
</script>

<style scoped>
.nt-conteneur {
  position: fixed;
  bottom: var(--panier-space-4);
  right: var(--panier-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--panier-space-2);
  z-index: 50;
}
.nt-toast {
  font-family: var(--panier-font-body);
  font-size: 0.85rem;
  padding: var(--panier-space-2) var(--panier-space-3);
  border-radius: var(--panier-radius-s);
  box-shadow: var(--panier-shadow-card);
  cursor: pointer;
  max-width: 320px;
}
.nt-toast--success {
  background: var(--panier-primary);
  color: white;
}
.nt-toast--error {
  background: var(--panier-error-bg);
  color: var(--panier-error);
  border: 1px solid var(--panier-error);
}
.nt-fade-enter-active,
.nt-fade-leave-active {
  transition: all 0.2s ease;
}
.nt-fade-enter-from,
.nt-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>

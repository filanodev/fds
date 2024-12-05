import { ref } from 'vue'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

const toasts = ref<Toast[]>([])
let nextId = 0

export const useToast = () => {
  const show = (message: string, type: Toast['type'] = 'info') => {
    const id = nextId++
    const toast = { id, message, type }
    toasts.value.push(toast)
    setTimeout(() => {
      remove(id)
    }, 3000)
  }

  const remove = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message: string) => show(message, 'success')
  const error = (message: string) => show(message, 'error')
  const info = (message: string) => show(message, 'info')

  return {
    toasts,
    show,
    success,
    error,
    info,
    remove
  }
}

export type { Toast }

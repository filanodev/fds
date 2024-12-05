&lt;template&gt;
  &lt;div class=&quot;border-t border-gray-200 pt-4&quot;&gt;
    &lt;h3 class=&quot;text-lg font-medium text-gray-900 mb-4&quot;&gt;Question au vendeur&lt;/h3&gt;
    &lt;form @submit.prevent=&quot;submitQuestion&quot; class=&quot;space-y-4&quot;&gt;
      &lt;div&gt;
        &lt;label for=&quot;question&quot; class=&quot;block text-sm font-medium text-gray-700&quot;&gt;Votre question&lt;/label&gt;
        &lt;textarea
          id=&quot;question&quot;
          v-model=&quot;question&quot;
          rows=&quot;3&quot;
          class=&quot;mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500&quot;
          placeholder=&quot;Posez votre question au vendeur...&quot;
        &gt;&lt;/textarea&gt;
      &lt;/div&gt;
      &lt;div class=&quot;flex justify-end&quot;&gt;
        &lt;button
          type=&quot;submit&quot;
          :disabled=&quot;!question.trim()&quot;
          class=&quot;inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed&quot;
        &gt;
          Envoyer
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/form&gt;
    &lt;div v-if=&quot;successMessage&quot; class=&quot;mt-4 p-4 bg-green-50 text-green-700 rounded-md&quot;&gt;
      {{ successMessage }}
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import { ref } from 'vue'

const props = defineProps&lt;{
  sellerId: string
  productId: string
}&gt;()

const question = ref('')
const successMessage = ref('')

const submitQuestion = async () => {
  // TODO: Implement API call to send question
  successMessage.value = 'Votre question a été envoyée au vendeur. Vous recevrez une réponse par email.'
  question.value = ''
  setTimeout(() => {
    successMessage.value = ''
  }, 5000)
}
&lt;/script&gt;

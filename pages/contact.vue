<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p class="text-xl text-gray-600">
          We're here to help
        </p>
      </div>

      <!-- Contact Information -->
      <div class="bg-white rounded-2xl shadow-sm p-8">
        <div class="space-y-8">
          <!-- Email -->
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Email</h3>
              <p class="text-gray-600 mb-2">
                For any questions or assistance, don't hesitate to contact us by email.
              </p>
              <a href="mailto:info@filano.dev" 
                 class="inline-flex items-center text-blue-600 hover:text-blue-700">
                info@filano.dev
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Support Hours -->
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Support Hours</h3>
              <p class="text-gray-600">
                Our team is available to assist you:<br>
                Monday - Friday: 9:00 AM - 6:00 PM<br>
                Saturday: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>

          <!-- Response Time -->
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Response Time</h3>
              <p class="text-gray-600">
                We strive to respond to all inquiries within 24 business hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">How does the affiliate system work?</h3>
            <p class="text-gray-600">
              Our affiliate system allows you to earn commissions on every sale made through our platform. 
              We currently work with Piketplace and plan to expand our partnerships.
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">How are commissions calculated?</h3>
            <p class="text-gray-600">
              Commissions are automatically calculated on each sale. 
              The commission rate varies depending on the products and partners.
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">When are commissions paid?</h3>
            <p class="text-gray-600">
              Commissions are paid monthly after our partners validate the sales.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

// Meta tags for SEO
useHead({
  title: 'Contact - FD Shop',
  meta: [
    {
      name: 'description',
      content: 'Contact the FD Shop team for any questions about our affiliate platform. Support available by email at info@filano.dev'
    },
    {
      name: 'keywords',
      content: 'contact, support, help, FD Shop, affiliate, email'
    }
  ]
})
</script>

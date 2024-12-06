<template>
  <div class="min-h-screen bg-white md:bg-gray-50 px-4 py-6 md:py-12">
    <div class="max-w-lg mx-auto">
      <div class="bg-white md:shadow md:rounded-2xl">
        <div class="p-6 md:p-8">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
          
          <div class="space-y-6">
            <!-- Shopping --> 
            <section>
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Shopping</h2>
              <div class="space-y-4">
                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="font-medium text-gray-900 mb-2">How do I place an order?</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Browse products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase.
                  </p>
                </div>

                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="font-medium text-gray-900 mb-2">What payment methods are accepted?</h3>
                  <p class="text-gray-600 leading-relaxed">
                    We accept major credit cards, PayPal, and cryptocurrency payments for secure transactions.
                  </p>
                </div>

                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="font-medium text-gray-900 mb-2">How can I track my order?</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Once your order ships, you'll receive a tracking number via email. You can also view order status in your account dashboard.
                  </p>
                </div>
              </div>
            </section>

            <!-- Returns & Refunds -->
            <section>
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Returns & Refunds</h2>
              <div class="space-y-4">
                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="font-medium text-gray-900 mb-2">What is your return policy?</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Most items can be returned within 30 days of delivery. Items must be unused and in original packaging.
                  </p>
                </div>

                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="font-medium text-gray-900 mb-2">How do I request a refund?</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Contact the seller through your account dashboard. Once the return is approved, you'll receive instructions for shipping the item back.
                  </p>
                </div>
              </div>
            </section>

            <!-- Account & Security -->
            <section>
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Account & Security</h2>
              <div class="space-y-4">
                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="font-medium text-gray-900 mb-2">How do I create an account?</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Click the "Sign Up" button, enter your email and create a password. Verify your email to complete registration.
                  </p>
                </div>

                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="font-medium text-gray-900 mb-2">Is my payment information secure?</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Yes, we use industry-standard encryption to protect your payment information. We never store your card details.
                  </p>
                </div>
              </div>
            </section>

            <!-- Selling -->
            <section>
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Selling on Piketplace</h2>
              <div class="space-y-4">
                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="font-medium text-gray-900 mb-2">How do I start selling?</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Create a seller account, set up your store profile, and start listing products. Our platform provides all the tools you need.
                  </p>
                </div>

                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="font-medium text-gray-900 mb-2">What are the seller fees?</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Commission rates vary by category. Contact us for detailed information about our competitive pricing structure.
                  </p>
                </div>
              </div>
            </section>

            <!-- Still Have Questions -->
            <section class="border-t pt-8">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Still Have Questions?</h2>
              <div class="space-y-4">
                <a 
                  href="mailto:info@filano.dev" 
                  class="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="text-lg">info@filano.dev</span>
                </a>
                <p class="text-gray-600 mt-2">
                  Our support team is here to help and will respond within 24 business hours.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="min-h-screen bg-white md:bg-gray-50 px-4 py-6 md:py-12">
    <div class="max-w-lg mx-auto">
      <div class="bg-white md:shadow md:rounded-2xl">
        <div class="p-6 md:p-8">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">About Piketplace</h1>
          
          <div class="space-y-8">
            <!-- Mission -->
            <section>
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Our Mission</h2>
              <div class="bg-gray-50 p-6 rounded-xl">
                <p class="text-gray-600 leading-relaxed"> 
                  Piketplace is revolutionizing online shopping by connecting buyers with quality products through our innovative affiliate platform. We're committed to creating a seamless, secure, and enjoyable shopping experience for everyone.
                </p>
              </div>
            </section>

            <!-- Why Choose Us -->
            <section>
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Why Choose Us</h2>
              <div class="space-y-4">
                <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <svg class="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h3 class="font-medium text-gray-900 mb-1">Secure Shopping</h3>
                    <p class="text-gray-600">Protected payments and verified sellers for your peace of mind</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <svg class="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <div>
                    <h3 class="font-medium text-gray-900 mb-1">Global Marketplace</h3>
                    <p class="text-gray-600">Access to a wide range of products from sellers worldwide</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <svg class="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 class="font-medium text-gray-900 mb-1">Competitive Prices</h3>
                    <p class="text-gray-600">Best deals and regular discounts on quality products</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- For Sellers -->
            <section class="border-t pt-8">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">For Sellers</h2>
              <p class="text-gray-600 leading-relaxed mb-6">
                Join our growing community of successful sellers. Our platform provides powerful tools for managing your online store, processing orders, and reaching customers worldwide.
              </p>
              <a 
                href="https://mainnet.piketplace.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="w-full flex items-center justify-center px-6 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Start Selling
              </a>
            </section>

            <!-- Contact -->
            <section class="border-t pt-8">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <p class="text-gray-600 leading-relaxed mb-6">
                Have questions or suggestions? We'd love to hear from you.
              </p>
              <div class="flex flex-col space-y-4">
                <a 
                  href="mailto:support@piketplace.com" 
                  class="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="text-gray-700">support@piketplace.com</span>
                </a>
                <NuxtLink 
                  to="/contact" 
                  class="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span class="text-gray-700">Contact Form</span>
                </NuxtLink>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="min-h-screen bg-white md:bg-gray-50 px-4 py-6 md:py-12">
    <div class="max-w-lg mx-auto">
      <div class="bg-white md:shadow md:rounded-2xl">
        <div class="p-6 md:p-8">
          <!-- Account Header -->
          <div class="flex items-center justify-between mb-8">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">My Account</h1>
            <button 
              class="text-gray-600 hover:text-gray-700"
              @click="logout"
            > 
              Logout
            </button>
          </div>
          
          <div class="space-y-8">
            <!-- Profile Section -->
            <section>
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
              <div class="bg-gray-50 rounded-xl p-6">
                <div class="flex items-center space-x-4 mb-6">
                  <div class="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-medium">
                    {{ userInitials }}
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">{{ user.name }}</h3>
                    <p class="text-gray-600">{{ user.email }}</p>
                  </div>
                </div>
                <button 
                  class="w-full py-2 border border-gray-200 rounded-lg text-gray-600 hover:border-gray-300 transition-colors duration-200"
                  @click="editProfile"
                >
                  Edit Profile
                </button>
              </div>
            </section>

            <!-- Orders Section -->
            <section>
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
              <div class="space-y-4">
                <div 
                  v-for="order in recentOrders" 
                  :key="order.id"
                  class="bg-gray-50 rounded-xl p-6"
                >
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <p class="font-medium text-gray-900">Order #{{ order.id }}</p>
                      <p class="text-sm text-gray-600">{{ order.date }}</p>
                    </div>
                    <span :class="[
                      'px-3 py-1 rounded-full text-sm font-medium',
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    ]">
                      {{ order.status }}
                    </span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span>{{ order.items }} items</span>
                    <span>π{{ order.total }}</span>
                  </div>
                </div>
              </div>
              <button 
                class="mt-4 w-full py-2 border border-gray-200 rounded-lg text-gray-600 hover:border-gray-300 transition-colors duration-200"
                @click="viewAllOrders"
              >
                View All Orders
              </button>
            </section>

            <!-- Saved Addresses -->
            <section>
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Saved Addresses</h2>
              <div class="space-y-4">
                <div 
                  v-for="address in savedAddresses" 
                  :key="address.id"
                  class="bg-gray-50 rounded-xl p-6"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="font-medium text-gray-900">{{ address.name }}</h3>
                    <button class="text-blue-600 hover:text-blue-700">Edit</button>
                  </div>
                  <p class="text-gray-600">{{ address.street }}</p>
                  <p class="text-gray-600">{{ address.city }}, {{ address.state }} {{ address.zip }}</p>
                </div>
              </div>
              <button 
                class="mt-4 w-full py-2 border border-gray-200 rounded-lg text-gray-600 hover:border-gray-300 transition-colors duration-200"
                @click="addAddress"
              >
                Add New Address
              </button>
            </section>

            <!-- Settings -->
            <section>
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 class="font-medium text-gray-900">Email Notifications</h3>
                    <p class="text-sm text-gray-600">Receive order updates and promotions</p>
                  </div>
                  <button 
                    :class="[
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                      notifications ? 'bg-blue-600' : 'bg-gray-200'
                    ]"
                    @click="toggleNotifications"
                  >
                    <span
                      :class="[
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                        notifications ? 'translate-x-6' : 'translate-x-1'
                      ]"
                    />
                  </button>
                </div>

                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 class="font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p class="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <button 
                    :class="[
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                      twoFactor ? 'bg-blue-600' : 'bg-gray-200'
                    ]"
                    @click="toggleTwoFactor"
                  >
                    <span
                      :class="[
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                        twoFactor ? 'translate-x-6' : 'translate-x-1'
                      ]"
                    />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// User data (should come from store/API)
const user = ref({
  name: 'John Doe',
  email: 'john@example.com'
})

const userInitials = computed(() => {
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
})

// Recent orders
const recentOrders = ref([
  {
    id: '1234',
    date: 'Mar 14, 2024',
    status: 'Delivered',
    items: 2,
    total: '299.98'
  },
  {
    id: '1235',
    date: 'Mar 10, 2024',
    status: 'Processing',
    items: 1,
    total: '99.99'
  }
])

// Saved addresses
const savedAddresses = ref([
  {
    id: 1,
    name: 'Home',
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105'
  },
  {
    id: 2,
    name: 'Work',
    street: '456 Market St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105'
  }
])

// Settings
const notifications = ref(true)
const twoFactor = ref(false)

// Methods
const logout = () => {
  // Implement logout logic
  console.log('Logging out...')
}

const editProfile = () => {
  // Implement edit profile logic
  console.log('Editing profile...')
}

const viewAllOrders = () => {
  // Implement view all orders logic
  console.log('Viewing all orders...')
}

const addAddress = () => {
  // Implement add address logic
  console.log('Adding new address...')
}

const toggleNotifications = () => {
  notifications.value = !notifications.value
}

const toggleTwoFactor = () => {
  twoFactor.value = !twoFactor.value
}
</script>

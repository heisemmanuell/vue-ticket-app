<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Ticket Management</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">Welcome, {{ currentUser?.name }}</span>
            <RouterLink
              to="/dashboard"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Back to Dashboard
            </RouterLink>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Add Ticket Button -->
        <div class="mb-6">
          <button
            @click="showAddForm = true"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Add New Ticket
          </button>
        </div>

        <!-- Add Ticket Form -->
        <div v-if="showAddForm" class="bg-white shadow rounded-lg p-6 mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Ticket</h3>
          <form @submit.prevent="addTicket" class="space-y-4">
            <div>
              <label for="event" class="block text-sm font-medium text-gray-700">Event Name</label>
              <input
                id="event"
                v-model="newTicket.event"
                type="text"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="buyer" class="block text-sm font-medium text-gray-700">Buyer Name</label>
              <input
                id="buyer"
                v-model="newTicket.buyer"
                type="text"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
              <input
                id="price"
                v-model.number="newTicket.price"
                type="number"
                min="0"
                step="0.01"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div class="flex space-x-3">
              <button
                type="submit"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add Ticket
              </button>
              <button
                type="button"
                @click="showAddForm = false"
                class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Tickets List -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="ticket in tickets" :key="ticket.id" class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-700">{{ ticket.event.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ ticket.event }}</div>
                    <div class="text-sm text-gray-500">{{ ticket.buyer }}</div>
                    <div class="text-xs text-gray-400">{{ ticket.date }}</div>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="text-sm text-gray-900 font-medium">${{ ticket.price }}</div>
                  <button
                    @click="deleteTicket(ticket.id)"
                    class="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/auth';

const router = useRouter();
const { currentUser, logout } = useAuth();

const tickets = ref([
  { id: 1, event: 'Concert A', buyer: 'John Doe', price: 50, date: '2024-01-15' },
  { id: 2, event: 'Concert B', buyer: 'Jane Smith', price: 75, date: '2024-01-16' },
  { id: 3, event: 'Festival C', buyer: 'Bob Johnson', price: 100, date: '2024-01-17' },
  { id: 4, event: 'Show D', buyer: 'Alice Brown', price: 60, date: '2024-01-18' },
]);

const showAddForm = ref(false);
const newTicket = reactive({
  event: '',
  buyer: '',
  price: 0
});

const addTicket = () => {
  const ticket = {
    id: Date.now(),
    event: newTicket.event,
    buyer: newTicket.buyer,
    price: newTicket.price,
    date: new Date().toISOString().split('T')[0]
  };
  tickets.value.push(ticket);

  // Reset form
  newTicket.event = '';
  newTicket.buyer = '';
  newTicket.price = 0;
  showAddForm.value = false;
};

const deleteTicket = (id) => {
  tickets.value = tickets.value.filter(ticket => ticket.id !== id);
};

const handleLogout = () => {
  logout();
  router.push('/auth/Login');
};
</script>
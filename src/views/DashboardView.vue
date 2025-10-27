<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Ticket Web App</h1>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-6">
            <RouterLink
              to="/dashboard"
              class="text-gray-900 font-medium hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/tickets"
              class="text-gray-700 font-medium hover:text-indigo-600 transition-colors"
            >
              Tickets
            </RouterLink>
            <button
              @click="handleLogout"
              class="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <LogOut class="w-4 h-4" />
              Logout
            </button>
          </nav>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu v-if="!mobileMenuOpen" class="w-6 h-6 text-gray-700" />
            <X v-else class="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div
          v-if="mobileMenuOpen"
          class="md:hidden py-4 border-t border-gray-200 animate-fadeIn"
        >
          <nav class="flex flex-col space-y-3">
            <RouterLink
              to="/dashboard"
              class="text-gray-900 font-medium hover:text-indigo-600 transition-colors py-2"
              @click="mobileMenuOpen = false"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/tickets"
              class="text-gray-700 font-medium hover:text-indigo-600 transition-colors py-2"
              @click="mobileMenuOpen = false"
            >
              Tickets
            </RouterLink>
            <div class="py-2 border-t border-gray-200">
              <button
                @click="handleLogout"
                class="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md"
              >
                <LogOut size="18" />
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-[1440px] mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <span class="text-gray-700">Welcome back, {{ currentUser?.name }}! 👋</span>
        </div>

        <!-- Summary Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div class="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 pt-5 pb-5">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
                    <Ticket class="w-6 h-6 text-white" />
                  </div>
                </div>
                <div class="ml-4 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Tickets</dt>
                    <dd class="text-2xl font-bold text-gray-900">{{ totalTickets }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 pt-5 pb-5">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center">
                    <CheckCircle class="w-6 h-6 text-white" />
                  </div>
                </div>
                <div class="ml-4 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Open</dt>
                    <dd class="text-2xl font-bold text-green-600">{{ openTickets }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 pt-5 pb-5">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center">
                    <Clock class="w-6 h-6 text-white" />
                  </div>
                </div>
                <div class="ml-4 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                    <dd class="text-2xl font-bold text-amber-600">{{ inProgressTickets }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 pt-5 pb-5">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
                    <X class="w-6 h-6 text-white" />
                  </div>
                </div>
                <div class="ml-4 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Closed</dt>
                    <dd class="text-2xl font-bold text-gray-600">{{ closedTickets }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="mb-5" />
        <!-- Quick Actions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 col-span-full">
            Quick Actions
          </h2>

          <!-- --- Create New Ticket --- -->
          <RouterLink
            to="/tickets"
            class="bg-white hover:bg-gray-200 transition shadow-lg rounded-xl border border-gray-200 p-6 flex items-start gap-4"
          >
            <div class="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
              <PlusCircle class="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                Create New Ticket
              </h3>
              <p class="text-gray-600 text-sm">
                Set up a new ticket or request
              </p>
            </div>
          </RouterLink>

          <!-- --- Manage Tickets --- -->
          <RouterLink
            to="/tickets"
            class="bg-white hover:bg-gray-200 transition shadow-lg rounded-xl border border-gray-200 p-6 flex items-start gap-4"
          >
            <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Ticket class="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                Manage Tickets
              </h3>
              <p class="text-gray-600 text-sm">
                View and manage all your ticket sales
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/auth';
import {
  Menu,
  X,
  LogOut,
  Ticket,
  CheckCircle,
  Clock,
  PlusCircle
} from 'lucide-vue-next';

const router = useRouter();
const { currentUser, logout } = useAuth();

const mobileMenuOpen = ref(false);

// Mock data - in a real app, this would come from an API
const tickets = ref([]);
const loadTickets = () => {
  try {
    const storedTickets = localStorage.getItem(`tickets_${currentUser.value?.id}`);
    if (storedTickets) {
      tickets.value = JSON.parse(storedTickets);
    } else {
      tickets.value = [];
    }
  } catch (error) {
    toast.error('Failed to load tickets. Please retry.');
  }
};

onMounted(() => {
  loadTickets();
});

const totalTickets = computed(() => tickets.value.length);
const openTickets = computed(() => tickets.value.filter(ticket => ticket.status === 'open').length);
const inProgressTickets = computed(() => tickets.value.filter(ticket => ticket.status === 'in_progress').length);
const closedTickets = computed(() => tickets.value.filter(ticket => ticket.status === 'closed').length);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleLogout = () => {
  logout();
  router.push('/auth/Login');
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

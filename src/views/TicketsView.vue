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
          <div class="hidden md:flex items-center space-x-4">
            <RouterLink
              to="/dashboard"
              class="text-gray-700 font-medium hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/tickets"
              class="text-gray-900 font-medium hover:text-indigo-600 transition-colors"
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
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="toggleMobileMenu"
              class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu v-if="!isMobileMenuOpen" class="w-6 h-6 text-gray-700" />
              <X v-else class="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-200">
          <div class="px-4 pt-3 pb-4 flex flex-col space-y-2">
            <RouterLink
              to="/dashboard"
              class="text-gray-700 font-medium hover:text-indigo-600 transition-colors py-2"
              @click="isMobileMenuOpen = false"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/tickets"
              class="text-gray-900 font-medium hover:text-indigo-600 transition-colors py-2"
              @click="isMobileMenuOpen = false"
            >
              Tickets
            </RouterLink>
            <button
              @click="handleLogout"
              class="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md"
            >
              <LogOut class="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-[1440px] mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Filter Buttons -->
        <div class="mb-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <!-- Filter Buttons -->
            <div class="flex flex-wrap gap-2">
              <button
                v-for="status in ['all', 'open', 'in_progress', 'closed']"
                :key="status"
                @click="filter = status"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium capitalize transition duration-300',
                  filter === status
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md'
                ]"
              >
                {{ status.replace('_', ' ') }}
              </button>
            </div>

            <!-- Create Ticket-->
            <button
              @click="openCreateModal"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 self-start sm:self-auto"
            >
              Create Ticket
            </button>
          </div>
        </div>

        <!-- Tickets Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-if="filteredTickets.length === 0"
            class="col-span-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center"
          >
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle class="w-8 h-8 text-gray-400" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p class="text-gray-500 mb-4">No tickets match the selected filter.</p>
            <button
              @click="openCreateModal"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300"
            >
              Create Your First Ticket
            </button>
          </div>

          <div
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {{ ticket.title }}
                  </h3>
                  <p v-if="ticket.description" class="text-sm text-gray-600 mb-3 line-clamp-3">
                    {{ ticket.description }}
                  </p>
                </div>
              </div>

              <div class="flex items-center justify-between mb-4">
                <span :class="['inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize border', getStatusColor(ticket.status)]">
                  Status: {{ ticket.status.replace('_', ' ') }}
                </span>
                <span v-if="ticket.priority" :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize', getPriorityColor(ticket.priority)]">
                  Priority: {{ ticket.priority }}
                </span>
              </div>

              <div class="text-xs text-gray-500 mb-4">
                Created: {{ formatDate(ticket.createdAt) }}
                <span v-if="ticket.updatedAt !== ticket.createdAt" class="ml-2">
                  • Updated: {{ formatDate(ticket.updatedAt) }}
                </span>
              </div>

              <div class="flex space-x-2">
                <button
                  @click="handleEditTicket(ticket)"
                  class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition duration-300"
                >
                  Edit
                </button>
                <button
                  @click="handleDeleteTicket(ticket.id)"
                  class="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Create/Edit Modal -->
    <div
      v-if="isCreateModalOpen || editingTicket"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">
              {{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}
            </h2>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600"
            >
              <XIcon class="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <form @submit.prevent="editingTicket ? handleUpdateTicket() : handleCreateTicket()" class="space-y-4">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
                  formErrors.title ? 'border-red-300' : 'border-gray-300'
                ]"
                placeholder="Enter ticket title"
              />
              <p v-if="formErrors.title" class="mt-1 text-sm text-red-600">{{ formErrors.title }}</p>
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                rows="3"
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
                  formErrors.description ? 'border-red-300' : 'border-gray-300'
                ]"
                placeholder="Enter ticket description (optional)"
              />
              <p v-if="formErrors.description" class="mt-1 text-sm text-red-600">{{ formErrors.description }}</p>
            </div>

            <div>
              <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                id="status"
                v-model="formData.status"
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
                  formErrors.status ? 'border-red-300' : 'border-gray-300'
                ]"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <p v-if="formErrors.status" class="mt-1 text-sm text-red-600">{{ formErrors.status }}</p>
            </div>

            <div>
              <label for="priority" class="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                v-model="formData.priority"
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
                  formErrors.priority ? 'border-red-300' : 'border-gray-300'
                ]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <p v-if="formErrors.priority" class="mt-1 text-sm text-red-600">{{ formErrors.priority }}</p>
            </div>

            <div class="flex space-x-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isLoading"
                class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isLoading ? 'Saving...' : (editingTicket ? 'Update Ticket' : 'Create Ticket') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import {
  Menu,
  X,
  LogOut,
  AlertCircle,
  XIcon
} from 'lucide-vue-next';

const router = useRouter();
const { currentUser, logout } = useAuth();
const toast = useToast();

const tickets = ref([]);
const filter = ref('all');
const isCreateModalOpen = ref(false);
const editingTicket = ref(null);
const isLoading = ref(false);
const isMobileMenuOpen = ref(false);

const formData = reactive({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium',
});

const formErrors = reactive({});

const filteredTickets = computed(() => {
  if (filter.value === 'all') return tickets.value;
  return tickets.value.filter(ticket => ticket.status === filter.value);
});

onMounted(() => {
  loadTickets();
});

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

const saveTickets = (updatedTickets) => {
  try {
    localStorage.setItem(`tickets_${currentUser.value?.id}`, JSON.stringify(updatedTickets));
    tickets.value = updatedTickets;
  } catch (error) {
    toast.error('Failed to save tickets. Please try again.');
  }
};

const validateForm = () => {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = 'Title is required';
  } else if (formData.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (formData.title.trim().length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  if (formData.description && formData.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }

  if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
    errors.status = 'Invalid status value';
  }

  if (!['low', 'medium', 'high'].includes(formData.priority)) {
    errors.priority = 'Invalid priority value';
  }

  Object.assign(formErrors, errors);
  return Object.keys(errors).length === 0;
};

const resetForm = () => {
  formData.title = '';
  formData.description = '';
  formData.status = 'open';
  formData.priority = 'medium';
  Object.keys(formErrors).forEach(key => {
    formErrors[key] = '';
  });
};

const openCreateModal = () => {
  editingTicket.value = null; // reset edit mode
  // isCreateModalOpen.value = true;
  isCreateModalOpen.value = true;
};

const closeModal = () => {
  isCreateModalOpen.value = false;
  editingTicket.value = null;
  resetForm();
};

const handleCreateTicket = async () => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    const newTicket = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      status: formData.status,
      priority: formData.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTickets = [...tickets.value, newTicket];
    saveTickets(updatedTickets);

    toast.success('Ticket created successfully!');
    closeModal();
  } catch (error) {
    toast.error('Failed to create ticket. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const handleEditTicket = (ticket) => {
  editingTicket.value = ticket;
  formData.title = ticket.title;
  formData.description = ticket.description || '';
  formData.status = ticket.status;
  formData.priority = ticket.priority || 'medium';
  Object.keys(formErrors).forEach(key => {
    formErrors[key] = '';
  });
};

const handleUpdateTicket = async () => {
  if (!validateForm() || !editingTicket.value) {
    return;
  }

  isLoading.value = true;

  try {
    const updatedTicket = {
      ...editingTicket.value,
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      status: formData.status,
      priority: formData.priority,
      updatedAt: new Date().toISOString(),
    };

    const updatedTickets = tickets.value.map(ticket =>
      ticket.id === editingTicket.value.id ? updatedTicket : ticket
    );
    saveTickets(updatedTickets);

    toast.success('Ticket updated successfully!');
    closeModal();
  } catch (error) {
    toast.error('Failed to update ticket. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const handleDeleteTicket = async (ticketId) => {
  if (!confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
    return;
  }

  try {
    const updatedTickets = tickets.value.filter(ticket => ticket.id !== ticketId);
    saveTickets(updatedTickets);
    toast.success('Ticket deleted successfully!');
  } catch (error) {
    toast.error('Failed to delete ticket. Please try again.');
  }
};

const handleLogout = () => {
  logout();
  router.push('/auth/Login');
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'in_progress':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'closed':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
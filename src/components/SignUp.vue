<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <RouterLink to="/auth/Login" class="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to existing account
          </RouterLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignUp">
        <div class="rounded-md p-5 shadow-sm -space-y-px">
          <div class="m-3">
            <input
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Full Name"
              v-model="form.name"
            />
            <span v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</span>
          </div>
          <div class="m-3">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
              v-model="form.email"
            />
            <span v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</span>
          </div>
          <div class="m-3">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border rounded-none border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              v-model="form.password"
            />
            <span v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</span>
          </div>
          <div class="m-3">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none relative block w-full rounded-none px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm Password"
              v-model="form.confirmPassword"
            />
            <span v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading"
          >
            <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            <span v-else>Create Account</span>
          </button>
        </div>
      </form>

      <!-- Toast Notification -->
      <div
        v-if="toast.show"
        class="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg"
      >
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/auth';

const router = useRouter();
const { login } = useAuth();

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const loading = ref(false);
const toast = reactive({
  show: false,
  message: ''
});

const validateForm = () => {
  errors.name = '';
  errors.email = '';
  errors.password = '';
  errors.confirmPassword = '';

  if (!form.name.trim()) {
    errors.name = 'Name is required';
    return false;
  }
  if (!form.email) {
    errors.email = 'Email is required';
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid';
    return false;
  }
  if (!form.password) {
    errors.password = 'Password is required';
    return false;
  }
  if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    return false;
  }
  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
    return false;
  }
  return true;
};

const handleSignUp = async () => {
  if (!validateForm()) return;

  loading.value = true;

  // Simulate API call
  setTimeout(() => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
    const existingUser = users.find((u) => u.email === form.email);

    if (existingUser) {
      showToast('User with this email already exists');
      loading.value = false;
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email,
      password: form.password
    };

    users.push(newUser);
    localStorage.setItem('ticketapp_users', JSON.stringify(users));

    // Create session
    const session = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      loginTime: new Date().toISOString()
    };
    login(session);

    // Redirect to dashboard
    router.push('/dashboard');

    loading.value = false;
  }, 1000);
};

const showToast = (message) => {
  toast.message = message;
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 3000);
};
</script>
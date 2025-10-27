<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <RouterLink to="/auth/SignUp" class="font-medium text-indigo-600 hover:text-indigo-500">
            create a new account
          </RouterLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md p-5 shadow-sm -space-y-px">
          <div class="m-3">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              v-model="form.email"
            />
            <span v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</span>
          </div>
          <div class="m-3">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              v-model="form.password"
            />
            <span v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading"
          >
            <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>

      <!-- Toast Notification -->
      <transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50"
      >
        {{ toast.message }}
      </div>
    </transition>
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
  email: '',
  password: ''
});

const errors = reactive({
  email: '',
  password: ''
});

const loading = ref(false);
const toast = reactive({
  show: false,
  message: ''
});

const validateForm = () => {
  errors.email = '';
  errors.password = '';

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
  return true;
};

const handleLogin = async () => {
  if (!validateForm()) return;

  loading.value = true;

  // Simulate API call
  setTimeout(() => {
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
    const user = users.find((u) => u.email === form.email && u.password === form.password);

    if (user) {
      // Create session
      const session = {
        userId: user.id,
        email: user.email,
        name: user.name,
        loginTime: new Date().toISOString()
      };
      login(session);

      // Redirect to dashboard (assuming /dashboard exists)
      router.push('/dashboard');
    } else {
      showToast('Invalid email or password');
    }

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
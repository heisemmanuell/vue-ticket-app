import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import Toast, { type PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 2000,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
}

const app = createApp(App)
app.use(router)
app.use(Toast, options)
app.mount('#app')

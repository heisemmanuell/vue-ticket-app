import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
}

export interface Session {
  userId: number
  email: string
  name: string
  loginTime: string
}

const session = ref<Session | null>(null)

// Initialize session from localStorage
const initAuth = () => {
  const storedSession = localStorage.getItem('ticketapp_session')
  if (storedSession) {
    try {
      session.value = JSON.parse(storedSession)
    } catch (error) {
      console.error('Failed to parse session:', error)
      localStorage.removeItem('ticketapp_session')
    }
  }
}

const isAuthenticated = computed(() => !!session.value)

const currentUser = computed(() => session.value)

const login = (userSession: Session) => {
  session.value = userSession
  localStorage.setItem('ticketapp_session', JSON.stringify(userSession))
}

const logout = () => {
  session.value = null
  localStorage.removeItem('ticketapp_session')
  window.location.href = '/'
}

const checkAuth = () => {
  const storedSession = localStorage.getItem('ticketapp_session')
  if (storedSession) {
    try {
      const parsedSession = JSON.parse(storedSession)
      // Check if session is still valid (e.g., not expired)
      const loginTime = new Date(parsedSession.loginTime)
      const now = new Date()
      const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)

      if (hoursDiff < 24) { // Session valid for 24 hours
        session.value = parsedSession
        return true
      } else {
        logout() // Session expired
        return false
      }
    } catch (error) {
      console.error('Failed to parse session:', error)
      logout()
      return false
    }
  }
  return false
}

// Initialize auth on module load
initAuth()

export const useAuth = () => ({
  session,
  isAuthenticated,
  currentUser,
  login,
  logout,
  checkAuth
})
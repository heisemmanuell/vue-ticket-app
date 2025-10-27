# Vue Ticket Web App

A modern, responsive ticket management application built with Vue 3, featuring secure authentication, real-time CRUD operations, and a beautiful user interface.

## 🚀 Features

- **Secure Authentication**: Login/Signup with localStorage simulation
- **Dashboard**: Overview with statistics and quick actions
- **Ticket Management**: Full CRUD operations for tickets
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Toast Notifications**: Real-time feedback for user actions
- **Route Protection**: Automatic redirects for unauthorized access
- **Form Validation**: Client-side validation with error messages

## 🛠️ Frameworks and Libraries Used

### Core Framework
- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe JavaScript for better development experience

### Build Tools & Development
- **Vite** - Fast build tool and development server
- **Vue Router 4** - Official router for Vue.js
- **Pinia** - Intuitive state management for Vue.js

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide Vue Next** - Beautiful & consistent icon library
- **Vue Toastification** - Toast notification library

### Development Dependencies
- **@vitejs/plugin-vue** - Vue plugin for Vite
- **@vue/tsconfig** - TypeScript configuration for Vue
- **Autoprefixer** - CSS post-processing tool
- **PostCSS** - CSS processing tool

## 📋 Prerequisites

- **Node.js**: Version 20.19.0 or higher (or >= 22.12.0)
- **npm**: Latest version recommended

## 🏗️ Setup and Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd vue-ticket-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

### 6. Type Checking
```bash
npm run type-check
```

## 🌐 Usage Instructions

### For Development (Local)
1. Start the development server: `npm run dev`
2. Open your browser to `http://localhost:5173/`
3. Navigate through the application

### For Production (Hosted)
1. Build the application: `npm run build`
2. The `dist/` folder will contain the production-ready files
3. Deploy the contents of `dist/` to your web server
4. Ensure your hosting provider supports SPA routing (fallback to index.html)

### Switching Between Development and Production
- **Development**: Use `npm run dev` for hot-reload and debugging
- **Production**: Use `npm run build` then serve the `dist/` folder
- The application automatically detects the environment and adjusts accordingly

## 🎨 UI Components Overview

### Authentication Components
- **Login.vue**: Email/password login form with validation
- **SignUp.vue**: User registration form with confirmation

### Main Application Components
- **DashboardView.vue**: Statistics dashboard with navigation
- **TicketsView.vue**: Ticket management interface with CRUD operations
- **LandingPage.vue**: Marketing landing page

### State Structure
- **Authentication Store** (`src/stores/auth.ts`):
  - `session`: Current user session data
  - `isAuthenticated`: Computed boolean for auth status
  - `currentUser`: Computed user information
  - Methods: `login()`, `logout()`, `checkAuth()`

### Key UI Patterns
- **Responsive Navigation**: Mobile hamburger menu with slide animations
- **Modal System**: Overlay modals for forms and confirmations
- **Toast Notifications**: Bottom-right positioned feedback messages
- **Card Layouts**: Consistent card-based design throughout
- **Form Validation**: Real-time validation with error states

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of headings, labels, and ARIA attributes
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Descriptive labels and announcements
- **Color Contrast**: WCAG compliant color combinations
- **Focus Management**: Visible focus indicators and logical tab order

## 🐛 Known Issues & Limitations

### Current Limitations
- **Data Persistence**: Uses localStorage (data lost on browser clear)
- **Real-time Updates**: No WebSocket or polling for live updates
- **File Uploads**: No support for attachments in tickets
- **User Management**: No admin panel or user role management

### Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Not Supported**: Internet Explorer (any version)

### Performance Considerations
- **Bundle Size**: ~2.5MB (gzipped: ~800KB)
- **First Load**: Initial load may be slower on slow connections
- **Memory Usage**: Minimal memory footprint for typical usage

## 🔐 Authentication System

### How It Works
1. **Registration**: Users create accounts stored in localStorage
2. **Login**: Credentials validated against stored user data
3. **Session Management**: 24-hour session validity with automatic expiration
4. **Route Protection**: Automatic redirects for unauthorized access

### Security Notes
- **Client-side Only**: This is a demonstration app with simulated security
- **No Encryption**: Passwords stored in plain text (for demo purposes only)
- **Session Storage**: Uses localStorage (not secure for production)
- **No HTTPS**: Development server runs on HTTP

## 📝 User Credentials

**Important**: This application does not come with pre-built user accounts. Users must register themselves using the signup form.

### Example Registration Process
1. Visit the application at `http://localhost:5173/`
2. Click "Get Started" or navigate to `/auth/SignUp`
3. Fill out the registration form with:
   - Full Name (e.g., "John Doe")
   - Email (e.g., "john.doe@example.com")
   - Password (minimum 6 characters)
   - Confirm Password
4. Click "Create Account"
5. Use the same credentials to login at `/auth/Login`

### Sample Test Data
After registration, you can create sample tickets with various statuses:
- **Title**: "Fix login bug"
- **Description**: "Users unable to login with valid credentials"
- **Status**: "open" / "in_progress" / "closed"
- **Priority**: "high" / "medium" / "low"

## 📁 Project Structure

```
vue-ticket-app/
├── public/
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── base.css
│   │   ├── logo.svg
│   │   └── main.css
│   ├── components/
│   │   ├── LandingPage.vue
│   │   ├── Login.vue
│   │   ├── SignUp.vue
│   │   └── ...
│   ├── stores/
│   │   └── auth.ts
│   ├── views/
│   │   ├── DashboardView.vue
│   │   └── TicketsView.vue
│   ├── router/
│   │   └── index.ts
│   ├── App.vue
│   └── main.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is for educational and demonstration purposes. See individual component licenses for third-party dependencies.

## 🆘 Support

For issues or questions:
1. Check the browser console for errors
2. Verify Node.js version compatibility
3. Ensure all dependencies are installed
4. Check the terminal output for build errors

---

**Note**: This is a demonstration application showcasing Vue 3, TypeScript, and modern web development practices. It is not intended for production use without proper security implementations.

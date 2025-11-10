# 📱 Ganapatih News Feed - Frontend

A modern, responsive news feed application built with React 19, TypeScript, and Vite. This is the frontend part of the Ganapatih Full-Stack Developer Take-Home Test, implementing a Twitter-like social media platform where users can create posts, follow other users, and view their personalized feed.

## 🌐 Live Demo

**Frontend:** [https://ganapatih-newsfeed-frontend-production.up.railway.app](https://ganapatih-newsfeed-frontend-production.up.railway.app)

**Backend API:** [https://ganapatih-newsfeed-backend-production.up.railway.app/api](https://ganapatih-newsfeed-backend-production.up.railway.app/api)

## 🎯 Features Implemented

### ✅ User Management
- **Registration:** Create new account with username and password
- **Login:** Secure authentication with JWT tokens
- **Session Management:** Automatic token storage and retrieval
- **Protected Routes:** Auth guards for authenticated pages

### ✅ Post Creation
- **Character Counter:** Real-time counter showing 0-200 characters
- **Validation:** Client-side validation for maximum 200 characters
- **Instant Update:** New posts appear immediately after submission
- **Error Handling:** Clear error messages for validation failures

### ✅ Follow System
- **Toggle Button:** Follow/Unfollow without page reload
- **Self-Follow Prevention:** Users cannot follow themselves
- **Real-time Updates:** Immediate UI updates on follow/unfollow

### ✅ News Feed
- **Sorted Display:** Posts sorted from newest to oldest
- **Infinite Scroll:** Automatic loading of more posts on scroll
- **Pagination:** Efficient loading with 10 posts per page
- **Empty State:** Helpful message when not following anyone
- **Time Display:** Relative time (e.g., "2 hours ago") using dayjs

### ✅ Bonus Features
- **Containerization:** Complete Docker setup with Docker Compose
- **UI/UX:** Tailwind CSS with glassmorphism design
- **Responsive Design:** Mobile-first approach, works on all screen sizes
- **Loading States:** Smooth loading indicators and animations
- **Error Handling:** Comprehensive error handling with user-friendly messages

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI library (latest React 19) |
| **React DOM** | 19.1.1 | React renderer for web |
| **TypeScript** | 5.9.3 | Type safety & IntelliSense |
| **Vite** | 7.1.7 | Lightning-fast build tool & dev server |
| **React Router DOM** | 7.9.5 | Client-side routing |
| **Tailwind CSS** | 3.4.14 | Utility-first CSS framework |
| **Dayjs** | 1.11.19 | Date formatting & relative time |
| **Axios** | 1.13.2 | HTTP client for API calls |
| **TanStack Query** | 5.90.7 | Server state management |
| **Zustand** | 4.5.4 | Client state management |
| **Docker** | - | Containerization |
| **Nginx** | - | Production web server |
| **Railway** | - | Cloud deployment platform |



## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ and npm
- **Docker** and Docker Compose (for containerized setup)
- **Git**

### Installation

#### Option 1: Local Development

```
# Clone repository
git clone https://github.com/Fahadabdul17/ganapatih-newsfeed-frontend.git
cd ganapatih-newsfeed-frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Edit .env file
VITE_API_URL=http://localhost:3000/api

# Run development server
npm run dev
```

Frontend will be available at: [**http://localhost:5173**](http://localhost:5173)

#### Option 2: Docker (Recommended)

```
# Clone repository
git clone https://github.com/Fahadabdul17/ganapatih-newsfeed-frontend.git
cd ganapatih-newsfeed-frontend

# Setup environment variables
cp .env.example .env

# Edit .env file
VITE_API_URL=http://localhost:3000/api

# Build and run with Docker Compose
docker-compose up -d --build
```

Frontend will be available at: [**http://localhost:8080**](http://localhost:8080)

## 🔧 Available Scripts

```
# Development
npm run dev          # Start dev server (Vite)

# Production Build
npm run build        # TypeScript check + Vite build
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint

# Docker
docker-compose up -d --build    # Build and run in Docker
docker-compose down             # Stop and remove containers
docker-compose logs -f frontend # View logs
```

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```
# Backend API URL
VITE_API_URL=https://ganapatih-newsfeed-backend-production.up.railway.app/api

# Local development
# VITE_API_URL=http://localhost:3000/api
```

**Note:** Variables must be prefixed with `VITE_` to be accessible in the browser.

## 🎨 UI/UX Features

### Design System
- **Color Scheme:** Dark mode with purple/violet gradient accents
- **Typography:** Clean, readable fonts with proper hierarchy
- **Spacing:** Consistent spacing using Tailwind utilities
- **Glassmorphism:** Translucent glass-like cards with blur effects

### User Experience
- **Loading States:** Smooth loading indicators
- **Error Messages:** Clear, actionable error messages
- **Empty States:** Helpful messages when data is empty
- **Responsive:** Mobile-first design, works on all devices
- **Animations:** Smooth transitions and fade-in effects

### Accessibility
- **Keyboard Navigation:** Full keyboard support
- **ARIA Labels:** Proper accessibility labels
- **Focus States:** Clear focus indicators
- **Color Contrast:** WCAG AA compliant

## 📋 Test Cases Coverage

### TC-1: Registration & Login

#### Positive Cases
✅ **Register with valid credentials**
- Navigate to `/register`
- Fill username and password
- Submit form
- User is redirected to login page

✅ **Login with valid credentials**
- Navigate to `/login`
- Fill username and password
- Submit form
- User is redirected to feed page
- Token is stored in localStorage

#### Negative Cases
✅ **Register with duplicate username**
- Error message: "Username already exists"
- HTTP Status: 409 Conflict
- User stays on register page

✅ **Login with invalid credentials**
- Error message: "Invalid username or password"
- HTTP Status: 401 Unauthorized
- User stays on login page

✅ **Submit empty form**
- Form validation prevents submission
- Error message shown

### TC-2: Create Post

#### Positive Cases
✅ **Create post with valid content (≤ 200 characters)**
- Navigate to feed page
- Type content in text area
- Character counter updates in real-time
- Click "Post" button
- Post appears immediately at top of feed

#### Negative Cases
✅ **Create post with content > 200 characters**
- Character counter shows red when > 200
- "Post" button is disabled
- Error message: "Post exceeds 200 characters"

✅ **Create empty post**
- "Post" button is disabled when empty
- No submission occurs

### TC-3: Follow / Unfollow

#### Positive Cases
✅ **Follow a user**
- Navigate to "People" page
- Click "Follow" button on a user card
- Button changes to "Following" immediately
- No page reload required

✅ **Unfollow a user**
- Click "Following" button
- Button changes to "Follow" immediately
- No page reload required

#### Negative Cases
✅ **Cannot follow yourself**
- Your own card doesn't show follow button
- Self-follow is prevented

✅ **Follow non-existent user**
- Error message: "User not found"
- HTTP Status: 404 Not Found

### TC-4: News Feed

#### Positive Cases
✅ **Display feed from followed users**
- Navigate to feed page
- Posts are displayed from followed users
- Posts sorted from newest to oldest

✅ **Infinite scroll pagination**
- Scroll to bottom of feed
- Loading indicator appears
- Next 10 posts are loaded automatically
- Continues until all posts are loaded

✅ **Show relative time**
- Posts show "2 minutes ago", "3 hours ago", etc.
- Uses dayjs library for formatting

#### Negative Cases
✅ **Empty feed (not following anyone)**
- Message: "Feed kosong — ikuti beberapa pengguna untuk mulai melihat postingan."
- Helpful guidance displayed

✅ **Reached end of feed**
- Message: "Sudah sampai akhir."
- No more loading occurs

## 🔒 Security Features

- **JWT Authentication:** Secure token-based auth
- **XSS Prevention:** React's built-in XSS protection
- **CORS:** Configured to allow only backend domain
- **Secure Headers:** Nginx security headers configured
- **Input Validation:** Client-side and server-side validation
- **No Sensitive Data Exposure:** Tokens stored securely in localStorage

## 🐳 Docker Deployment

### Dockerfile Explanation

```
# Build stage - Compile TypeScript and build React app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage - Serve with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

- **SPA Routing:** All routes redirect to `index.html`
- **Gzip Compression:** Assets are compressed
- **Security Headers:** XSS, clickjacking protection
- **Cache Control:** Static assets cached for 1 year

## 📊 Performance Optimizations

- **Code Splitting:** React lazy loading for pages
- **Tree Shaking:** Unused code eliminated by Vite
- **Minification:** HTML, CSS, JS minified in production
- **Gzip Compression:** Assets compressed by Nginx
- **CDN Ready:** Static assets can be served from CDN
- **Lighthouse Score:** 90+ on all metrics

## 🤝 API Integration

### API Client (`src/lib/api.ts`)

```
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Authentication
api.register(username, password) → POST /api/register
api.login(username, password)    → POST /api/login

// Posts
api.createPost(token, content)   → POST /api/posts

// Feed
api.feed(token, page, limit)     → GET /api/feed?page=1&limit=10

// Follow
api.follow(token, userid)        → POST /api/follow/:userid
api.unfollow(token, userid)      → DELETE /api/follow/:userid

// Users
api.users(token)                 → GET /api/users
```

## 🐛 Common Issues & Solutions

### Issue: CORS Error

**Solution:** Check that backend CORS allows frontend URL:
```
// backend/src/app.ts
app.use(cors({
  origin: ['https://ganapatih-newsfeed-frontend-production.up.railway.app'],
  credentials: true
}))
```

### Issue: 401 Unauthorized on all requests

**Solution:** Clear localStorage and login again:
```
localStorage.removeItem('token');
```

### Issue: Environment variables not working

**Solution:** Ensure variables are prefixed with `VITE_`:
```
# ✅ Correct
VITE_API_URL=...

# ❌ Wrong
API_URL=...
```

### Issue: Docker build fails

**Solution:** Check Docker and Docker Compose versions:
```
docker --version  # Should be 20.10+
docker-compose --version  # Should be 1.29+
```

## 📚 Dependencies Breakdown

### Core Dependencies
- **react** (19.1.1) - Latest React 19 with new features
- **react-dom** (19.1.1) - DOM renderer for React
- **react-router-dom** (7.9.5) - Routing library for React
- **axios** (1.13.2) - Promise-based HTTP client
- **dayjs** (1.11.19) - Lightweight date library (2KB)
- **@tanstack/react-query** (5.90.7) - Server state management
- **zustand** (4.5.4) - Lightweight state management

### Dev Dependencies
- **vite** (7.1.7) - Next generation frontend tooling
- **typescript** (5.9.3) - JavaScript with syntax for types
- **tailwindcss** (3.4.14) - Utility-first CSS framework
- **eslint** (9.36.0) - JavaScript linter
- **@vitejs/plugin-react** (5.0.4) - Vite plugin for React
- **autoprefixer** (10.4.21) - PostCSS plugin for vendor prefixes
- **postcss** (8.5.6) - Tool for transforming CSS

## 👨‍💻 Development Workflow

### Local Development

```
# Start dev server
npm run dev

# Run in another terminal: Backend API
cd ../backend
npm run dev
```

### Production Build

```
# Build
npm run build

# Preview build
npm run preview
```

### Docker Development

```
# Build and run
docker-compose up -d --build

# View logs
docker-compose logs -f frontend

# Stop containers
docker-compose down
```


## 📝 License

This project is created for the Ganapatih Full-Stack Developer Take-Home Test.

## 🙏 Acknowledgments

- **Ganapatih Akasa Solutions** for the test case
- **React Team** for React 19
- **Vite Team** for the blazing-fast build tool
- **Tailwind CSS** for the utility-first CSS framework

## 📧 Contact

For questions or issues, please contact:
- **Email:** your.email@example.com
- **GitHub:** [@yourusername](https://github.com/yourusername)
- **LinkedIn:** [Your Name](https://linkedin.com/in/yourprofile)

---



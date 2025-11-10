import { Route, Routes } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import AuthGuard from '@/components/AuthGuard'
import FeedPage from '@/pages/FeedPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import PeoplePage from '@/pages/PeoplePage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - Always visible */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <AuthGuard>
                <FeedPage />
              </AuthGuard>
            }
          />
          <Route
            path="/people"
            element={
              <AuthGuard>
                <PeoplePage />
              </AuthGuard>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

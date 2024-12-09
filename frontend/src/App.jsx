import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'
import PurchaseSuccessPage from './pages/PurchaseSuccessPage'
import PurchaseCancelPage from './pages/PurchaseCancelPage'
import Navbar from './components/Navbar'
import LoadingSpinner from './components/LoadingSpinner'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './stores/useUserStore'
import { useCartStore } from './stores/useCartStore'
import { useEffect } from 'react'

function App() {
  const {user, checkAuth, checkingAuth} = useUserStore();
  const {getCartItems} = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if(!user) return; 
      getCartItems();
  },[getCartItems, user]);

  if(checkingAuth) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
    <div className='absolute inset-0 overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(209,213,219,0.5)_0%,rgba(156,163,175,0.3)_45%,rgba(107,114,128,0.1)_100%)]' />
      </div>
    </div>

    <div className='relative z-50 p-20'>

    

    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />
      <Route path="/category/:category" element={<CategoryPage/>} />
      <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
      <Route path='/purchase-success' element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />} />
      <Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
    </Routes>
    </div>
 
    <Toaster />
  </div>
  )
}

export default App;
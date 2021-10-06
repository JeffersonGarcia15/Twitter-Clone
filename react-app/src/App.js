import { useState, useEffect } from 'react'
import Auth from './Auth'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './utils/contexts'
import { isUserLoggedInApi } from './api/auth'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(isUserLoggedInApi())
  }, [])

  return (
    <AuthContext.Provider value={user}>
      {user ? <h1>You are logged in</h1> : <Auth/>}
      <ToastContainer 
      position="top-right" 
      autoClose={5000} 
      hideProgressBar={false}
      newestOnTop={false} 
      closeOnClick 
      rtl={false} 
      pauseOnVisibilityChange 
      draggable
      pauseOnHover
      ></ToastContainer>
    </AuthContext.Provider>
  )
}


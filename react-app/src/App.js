import { useState, useEffect } from 'react'
import Auth from './Auth'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './utils/contexts'
import { isUserLoggedInApi } from './api/auth'
import Routing from './routes/Routing'

export default function App() {
  const [user, setUser] = useState(null)
  const [loadUser, setLoadUser] = useState(false)
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false)

  useEffect(() => {
    setUser(isUserLoggedInApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin])

  if(!loadUser) return null

  return (
    <AuthContext.Provider value={user}>
      {user ? <Routing setRefreshCheckLogin={setRefreshCheckLogin}></Routing>
      : <Auth setRefreshCheckLogin={setRefreshCheckLogin}/>}
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


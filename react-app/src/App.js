import { useState } from 'react'
import Auth from './Auth'
import { ToastContainer } from 'react-toastify'

export default function App() {
  const [user, setUser] = useState({ name: "Jefferson"} )

  return (
    <div>
      {user ? (
        <div>
          <Auth />
        </div>
      ) : <h1>You are not logged in</h1>}
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
    </div>
  )
}


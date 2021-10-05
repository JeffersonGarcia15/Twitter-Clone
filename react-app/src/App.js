import { useState } from 'react'
import Auth from './Auth'

export default function App() {
  const [user, setUser] = useState({ name: "Jefferson"} )

  return (
    <div>
      {user ? (
        <div>
          <Auth />
        </div>
      ) : <h1>You are not logged in</h1>}
      
    </div>
  )
}


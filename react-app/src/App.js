import { useState } from 'react'

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <div>
      {user ? <h1>You are logged in</h1> : <h1>You are not logged in</h1>}
      
    </div>
  )
}


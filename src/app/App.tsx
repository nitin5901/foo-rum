import Routes from '../routes'
import { AuthProvider } from '../contexts/AuthContext'

function App() {

  return (
    <AuthProvider>
      <div>
       <Routes />
      </div>
    </AuthProvider>
  )
}

export default App

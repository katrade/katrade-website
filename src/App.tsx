import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthWrapper from './components/Wrapper/AuthWrapper'
import { AuthProvider } from './contexts/Auth'
import './styles/animation.css'
import theme from './styles/theme'
import { Home } from './views/Home'
import ItemPage from './views/Item'
import Market from './views/Market'
import Signup from './views/Signup'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path='/market'
              element={
                <AuthWrapper title='Market - Place where you find what you want.'>
                  <Market />
                </AuthWrapper>
              }
            />
            <Route
              path='/i/:itemId'
              element={
                <AuthWrapper>
                  <ItemPage />
                </AuthWrapper>
              }
            />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App

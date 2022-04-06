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
import NontsriLoginPage from './views/Signin/Nontsri'
import Signup from './views/Signup'
import Nontsri from './views/Signup/Nontsri'
import VerifyEmail from './views/VerifyEmail'

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
            <Route path='/signin/nontsri' element={<NontsriLoginPage />} />
            <Route path='/v/email/sent' element={<VerifyEmail />}/>
            <Route path='/signup/nontsri' element={<Nontsri />}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App

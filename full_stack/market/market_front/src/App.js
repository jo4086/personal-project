import { Routes, Route } from 'react-router-dom'
import { Home, LoginPage, MyPage, Mypage, SignupPage } from './pages'
import { Navbar } from './components/shared'
import './styles/common.css'

function App() {
   return (
      <>
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/signup" element={<SignupPage />} />
         </Routes>
      </>
   )
}

export default App

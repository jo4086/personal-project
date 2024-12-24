import { Routes, Route } from 'react-router-dom'
import { Home, LoginPage, Mypage } from './pages'
import { Navbar } from './components/shared'
import './styles/common.css'

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/my_page" element={<LoginPage />} />
            </Routes>
        </>
    )
}

export default App

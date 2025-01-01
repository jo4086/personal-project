import { Routes, Route } from 'react-router-dom'
import { Home, LoginPage, MyPage, Mypage, PostCreatePage, SignupPage, BoardSelector } from './pages'
import { Boardbar, Navbar } from './components/shared'
import './styles/common.css'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusThunk } from './features/slice/authSlice'
import { FreeBoard } from './components/board'

function App() {
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(checkAuthStatusThunk())
    }, [dispatch])

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} user={user} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/post/create" element={<PostCreatePage />} />
                <Route path="/board" element={<BoardSelector />} />
                <Route path="/board/:type" element={<BoardSelector isAuthenticated={isAuthenticated} />} />
            </Routes>
        </>
    )
}

export default App

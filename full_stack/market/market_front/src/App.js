import { Routes, Route } from 'react-router-dom'
import { Home, LoginPage, MyPage, Mypage, PostCreatePage, SignupPage, BoardSelector } from './pages'
import { Boardbar, Navbar } from './components/shared'
import ImageUploader from './components/media/ImageUploader'
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
            <Routes>
                {/* 네비게이션 바 포함된 레이아웃 */}
                <Route
                    path="/*"
                    element={
                        <>
                            <Navbar isAuthenticated={isAuthenticated} user={user} />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/mypage" element={<MyPage />} />
                                <Route path="/signup" element={<SignupPage />} />
                                <Route path="/board" element={<BoardSelector />} />
                                <Route path="/board/:type" element={<BoardSelector isAuthenticated={isAuthenticated} />} />
                                <Route path="/post/create" element={<PostCreatePage />} />
                            </Routes>
                        </>
                    }
                />

                {/* 네비게이션 바 없이 독립적으로 렌더링 */}
                <Route path="/image-uploader" element={<ImageUploader />} />
            </Routes>
        </>
    )
}

export default App
       


//      <Navbar isAuthenticated={isAuthenticated} user={user} />

                // <Route path="/board/:type" element={<BoardSelector isAuthenticated={isAuthenticated} />} />

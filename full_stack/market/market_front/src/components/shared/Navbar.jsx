import { Link, useNavigate } from 'react-router-dom'
import { AppBar } from '@mui/material'
import { Nav, Button, Divider, Li, Text } from '../../styles/myUi'
import { logoutUserThunk } from '../../features/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'

const Navbar = ({ isAuthenticated, user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(isAuthenticated)
    // console.log(user)


    const handleLogout = useCallback(() => {
        dispatch(logoutUserThunk())
            .unwrap()
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                alert(err)
            })
    }, [dispatch, navigate])

    return (
        <Nav {...navrprops}>
            <Link to="/">
                <svg style={{ margin: '0px', padding: '0', display: 'block', boxSizing: 'border-box' }} xmlns="http://www.w3.org/2000/svg" width="140" height="24" viewBox="0 0 140 24" role="img" aria-label="Market Place Logo">
                    {/* <rect width="140" height="24px" fill="#f0f0f0" stroke="red" strokeWidth="2" /> */}
                    <text x="5" y="17" dy="0.1em" fontFamily="'JetBrains Mono', sans-serif" fontStyle="italic" fontSize="18" fontWeight="bold" fill="black">
                        Market Place
                    </text>
                </svg>
            </Link>
            <ul style={{ display: 'flex', gap: '5px', alignItems: 'center', height: '100%' }}>
                {/* <Li>환영합니다.</Li> */}
                {isAuthenticated ? (
                    <>
                        <Li display="flex" alignItems="center">
                            <Text display="inline" fontSize="12px" color="rgb(20,20,20)" lineHeight="30px">
                                환영합니다{' '}
                                <Text display="inline" fontSize="13px" color="rgb(100,100,100)" fontWeight="bold" lineHeight="30px" marginSide="2px">
                                    {user.nick}
                                </Text>
                                님
                            </Text>
                        </Li>
                        <Li height="100%" display="flex">
                            <Divider height="50%" />
                        </Li>
                    </>
                ) : null}
                <Li>
                    <Link to="/mypage" style={{ textDecoration: 'none', caretColor: 'transparent', cursor: 'pointer' }}>
                        <Button boxShadow paddingVertical="2px">
                            My page
                        </Button>
                    </Link>
                </Li>
                <Li height="100%" display="flex">
                    <Divider height="50%" />
                </Li>
                {isAuthenticated ? (
                    <Li onClick={handleLogout}>
                        <Button boxShadow paddingVertical="2px">
                            Logout
                        </Button>
                    </Li>
                ) : (
                    <Li>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button boxShadow paddingVertical="2px">
                                Login
                            </Button>
                        </Link>
                    </Li>
                )}
            </ul>
        </Nav>
    )
}

export default Navbar

const navrprops = {
    left: 'max(0px, calc((100% - 1080px) / 2))',
    right: 'max(0px, calc((100% - 1080px) / 2))',
    padding: '0 10px 0 0',
    alignItems: 'center',
    userSelect: 'none',
    top: '0px',
    justifyContent: 'space-between',
    height: '30px',
}

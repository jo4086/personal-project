import { Link, useNavigate } from 'react-router-dom'
import { AppBar } from '@mui/material'
import { Nav, Button, Divider, Li } from '../../styles/myUi'

const Navbar = () => {
    return (
        <Nav height="30px">
            <Link to="/">
                <svg style={{ margin: '0px', padding: '0', display: 'block', boxSizing: 'border-box' }} xmlns="http://www.w3.org/2000/svg" width="140" height="24" viewBox="0 0 140 24" role="img" aria-label="Market Place Logo">
                    <rect width="140" height="24px" fill="#f0f0f0" stroke="red" strokeWidth="2" />
                    <text x="5" y="17" dy="0.1em" fontFamily="'JetBrains Mono', sans-serif" fontStyle="italic" fontSize="18" fontWeight="bold" fill="black">
                        Market Place
                    </text>
                </svg>
            </Link>
            <ul style={{ display: 'flex', gap: '5px', alignItems: 'center', height: '100%' }}>
                <Li>
                    <Link to="/my_page" style={{ textDecoration: 'none' }}>
                        <Button boxShadow paddingVertical="2px">
                            My page
                        </Button>
                    </Link>
                </Li>
                <Li height="100%" layout="flex">
                    <Divider />
                </Li>
                <Li>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button boxShadow paddingVertical="2px">
                            Login
                        </Button>
                    </Link>
                </Li>
            </ul>
        </Nav>
    )
}

export default Navbar

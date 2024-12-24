import { Link, useNavigate } from 'react-router-dom'
import { AppBar } from '@mui/material'

const Navbar = () => {
    return (
        <AppBar position="fixed" style={{ backgroundColor: 'yellow' }}>
            <div></div>
            <Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50" role="img" aria-label="Market Place Logo">
                    <rect width="100%" height="100%" fill="#f0f0f0" stroke="red" stroke-width="2" />
                    <text x="10" y="35" font-family="'JetBrains Mono', sans-serif" font-style="italic" font-size="24" font-weight="bold" fill="black">
                        Market Place
                    </text>
                </svg>
            </Link>
        </AppBar>
    )
}

export default Navbar

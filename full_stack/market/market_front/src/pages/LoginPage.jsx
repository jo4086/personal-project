import Login from '../components/auth/Login'
import { Container, Box } from '../styles/myUi'
import { SignUi } from '../styles/myUi/common'

const LoginPage = () => {
    return (
        <Container {...SignUi}>
            <Box margin="50px">
                <h1>Login</h1>
            </Box>
            <Login />
        </Container>
    )
}
export default LoginPage

/*
        <Container flexDirection='column' margin="60px auto" maxWidth="1080px" backgroundColor="rgba(00,00,0, 0.05)" paddingBottom="60px" >
            <Box margin="50px">
                <h1>Login</h1>
            </Box>
            <Login />
        </Container>
*/

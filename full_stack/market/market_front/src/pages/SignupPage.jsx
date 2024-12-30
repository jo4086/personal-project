import { Container, Box } from '../styles/myUi'
import { theme, SignUi } from '../styles/myUi/common'
import Signup from '../components/auth/Signup'

const SignupPage = () => {
    return (
        <Container {...SignUi}>
            <Signup />
        </Container>
    )
}
export default SignupPage

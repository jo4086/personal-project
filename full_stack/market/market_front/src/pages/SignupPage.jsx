import { Container, Box } from '../styles/myUi'
import { theme, SignUi } from '../styles/myUi/common'
import Signup from '../components/auth/Signup'

const SignupPage = () => {
    return (
        <Container {...SignUi}>
            <h2>회원가입 페이지입니다.</h2>
            <Signup />
        </Container>
    )
}
export default SignupPage

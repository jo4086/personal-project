import { Container, Box } from '../styles/myUi'
import { theme } from '../styles/myUi/common'

const MyPage = () => {
   return (
      <Container {...theme}>
         <h2>My page입니다.</h2>
      </Container>
   )
}
export default MyPage

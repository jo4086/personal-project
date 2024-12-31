import { Boardbar, Banner } from '../components/shared'
import { Container, Section, Box } from '../styles/myUi'
import { theme } from '../styles/myUi/common'


const Home = () => {
    return (
        <>
            <Container {...theme}>
                <Banner />
                <Boardbar />
                <Box width="100%" display="flex" backgroundColor="khaki" margin="10px auto" gap="10px">
                    <Section backgroundColor="lightgray" flexGrow="1" width="33.33%">
                        hi
                    </Section>
                    <Section flexGrow="2" width="66.66%">
                        hi
                    </Section>
                </Box>
            </Container>
        </>
    )
}

export default Home

//  <Container width='1080px' display='flex' flexDirection="column">
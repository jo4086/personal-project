import { Container, Section } from '../styles/myUi'

const Home = () => {
    return (
        <>
            <Container width="1080px" display="flex" backgroundColor="yellow" margin="30px auto 10px" flexDirection="column">
                <svg style={{ margin: '10px auto', padding: '0', display: 'block', boxSizing: 'border-box' }} xmlns="http://www.w3.org/2000/svg" width="1080" height="100" viewBox="0 0 1080 100" role="img" aria-label="Market Place Banner">
                    <rect width="1080" height="100px" fill="skyblue" />
                    <text x="250" y="40" dy="0.1em" fontFamily="'JetBrains Mono', sans-serif" fontSize="22" fontWeight="bold" fill="black"></text>
                    <text x="600" y="60" dy="0.1em" fontFamily="'JetBrains Mono', sans-serif" fontSize="22" fontStyle="italic" fontWeight="bold" fill="black">
                        Market Place
                    </text>
                </svg>
                <Section backgroundColor="white"></Section>
            </Container>
            <Container width="1080px" display="flex" backgroundColor="khaki" margin="10px auto" gap="10px">
                <Section backgroundColor="lightgray" flexGrow="1" width="33.33%">
                    hi
                </Section>
                <Section flexGrow="2" width="66.66%">hi</Section>
            </Container>
        </>
    )
}

export default Home

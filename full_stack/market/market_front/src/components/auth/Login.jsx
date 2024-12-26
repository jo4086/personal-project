import { Section, Text, TextField, Box, HyperLink, Btn } from '../../styles/myUi'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <>
            <Box {...Box1Props}>
                {/* <Section width="40%" backgroundColor="hotpink" flexDirection="column"> */}
                <form>
                    <TextField
                        label="이메일"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        {...textFieldDefaultProps}
                    />
                    <Text {...text}>
                        이메일를 잊어버렸나요?{' '}
                        <HyperLink to="/origin" {...hyper}>
                            이메일{' '}
                        </HyperLink>
                        찾기
                    </Text>
                    <TextField label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} {...textFieldDefaultProps} />
                    <Text {...text}>
                        비밀번호를 잊어버렸나요?{' '}
                        <HyperLink to="/origin" {...hyper}>
                            {' '}
                            textDirction{' '}
                        </HyperLink>{' '}
                        찾기
                    </Text>

                    <Box display="flex" marginVertical="20px" padding="10px 0" width="100%" flexDirection="column">
                        <Btn
                            type="submit" // 서브밋
                            marginTop="10px"
                            marginSide="auto"
                            marginVertical="20px"
                            padding="10px 0"
                            width="100%"
                            borderRadius="5px"
                            border="none"
                            boxShadow="0px 0px 0px 0.5px rgba(0,0,0,0.5)"
                            backgroundColor="white">
                            로그인
                        </Btn>
                        <HyperLink
                            to="/signup" // 회원가입링크
                            display="block"
                            marginLeft="auto"
                            textDecoration="none">
                            <Btn
                                display="block" // 타입 버튼
                                padding="6px 10px"
                                marginLeft="auto"
                                marginRight="2px"
                                borderRadius="4px"
                                fontSize="12px"
                                border="none"
                                boxShadow="0px 0px 0px 0.5px rgba(0,0,0,0.5)"
                                width="auto">
                                회원가입
                            </Btn>
                        </HyperLink>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default Login

const textFieldDefaultProps = {
    marginVertical: '5px',
    paddingVertical: '2px',
    paddingSide: '10px',
    flexGrow: 1,
    height: '50px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.5)',
}
const Box1Props = {
    width: '40%',
    // border: '1px solid black',
    flexDirection: 'column',
}

const text = {
    fontSize: '12px',
    textAlign: 'start',
    padding: '5px',
}
const hyper = {
    // textDecoration: 'overline dashed red',
    textDecoration: 'none',
    padding: '2px',
    // textDecoration: 'dotted',
}

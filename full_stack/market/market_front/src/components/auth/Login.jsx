import { Text, TextField, Box, HyperLink, Btn } from '../../styles/myUi'
import { useCallback, useState } from 'react'
import { loginUserThunk } from '../../features/slice/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = ({ status }) => {
    const [identify, setIdentify] = useState('')
    const [inputType, setInputType] = useState('email')
    const [inputName, setInputName] = useState('identify')
    const [inputAutoComplete, setInputAutoComplete] = useState('email')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false)

    const { loading, error } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleBlur = () => {
        // 입력값에 따라 최종적으로 타입과 이름 설정
        if (identify.includes('@')) {
            setInputType('email')
            setInputAutoComplete('email')
        } else {
            setInputType('text')
            setInputAutoComplete('username')
        }
        console.log('inputType: ', inputType)
        console.log('inputName: ', inputName)
    }

    const handleLogin = useCallback(() => {
        if (login) {
            return setLogin(false)
        }
        setLogin(true)
        console.log(login)
        return
    }, [login])

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()

            if (!identify.trim() || !password.trim()) {
                console.error('이메일 또는 아이디와 비밀번호를 입력해주세요.')
                alert('이메일 또는 아이디와 비밀번호를 입력해주세요.')
                return
            }

            let userData = { identify, password }

            // if (inputName === 'identify') {
            //     userData.identify = value.trim()
            // } else {
            //     userData.identify = value.trim()
            // }

            dispatch(loginUserThunk(userData))
                .unwrap()
                .then(() => navigate('/'))
                .catch((err) => {
                    console.error('로그인 실패: ', err)
                    alert('로그인 도중 오류가 발생하였습니다.')
                })
        },
        [dispatch, identify, password, inputName, navigate],
    )

    if (status === 'signup') {
        return (
            <>
                <Box {...Box1Props} width="60%">
                    <Text type="h4" fontSize="20px" margin="20px auto">
                        회원가입을 축하합니다!
                    </Text>

                    <HyperLink
                        to="/signup" // 회원가입링크
                        display="block"
                        marginRight="auto"
                        textDecoration="none"
                        marginVertical="5px">
                        <Btn
                            display="block" // 타입 버튼
                            padding="6px 10px"
                            marginLeft="2px"
                            marginRight="2px"
                            borderRadius="4px"
                            fontSize="12px"
                            border="none"
                            tabindex="-1"
                            caretColor="transparent"
                            // pointerEvents="none"
                            boxShadow="0px 0px 0px 0.5px rgba(0,0,0,0.5)"
                            width="100px"
                            backgroundColor="white"
                            hoverBackgroundColor="rgba(0,0,0,0.05)">
                            홈으로
                        </Btn>
                    </HyperLink>

                    <Text type="h3" fontSize="15px" letterSpacing="0px" color="darkblue" hoverColor="blue" cursor="pointer" paddingLeft="2px" margin="20px auto 20px 5px" onClick={handleLogin}>
                        로그인 하기
                    </Text>

                    {login && (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="이메일 또는 아이디"
                                type={inputType}
                                name="identify"
                                value={identify}
                                autoComplete={inputAutoComplete}
                                onChange={(e) => {
                                    setIdentify(e.target.value)
                                }}
                                onBlur={handleBlur}
                                {...textFieldDefaultProps}
                            />

                            <TextField
                                label="비밀번호" // 패스워드
                                type="password"
                                name="password"
                                value={password}
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                                {...textFieldDefaultProps}
                            />

                            <Box display="flex" marginVertical="20px" padding="10px 0" width="100%" flexDirection="column" caretColor="transparent">
                                <Btn
                                    type="submit" // 서브밋
                                    marginTop="10px"
                                    marginSide="auto"
                                    marginVertical="20px"
                                    padding="10px 0"
                                    width="100%"
                                    borderRadius="5px"
                                    border="none"
                                    caretColor="transparent"
                                    boxShadow="0px 0px 0px 0.5px rgba(0,0,0,0.5)"
                                    backgroundColor="white"
                                    fontSize="16px">
                                    로그인
                                </Btn>
                            </Box>
                        </form>
                    )}
                </Box>
            </>
        )
    }

    return (
        <>
            <Box {...Box1Props}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="이메일 또는 아이디"
                        type={inputType}
                        name="identify"
                        value={identify}
                        autoComplete={inputAutoComplete}
                        onChange={(e) => {
                            setIdentify(e.target.value)
                        }}
                        onBlur={handleBlur}
                        {...textFieldDefaultProps}
                    />
                    <Text {...text}>
                        이메일를 잊어버렸나요?{' '}
                        <HyperLink to="/origin" color="blue" {...hyper}>
                            이메일{' '}
                        </HyperLink>
                        찾기
                    </Text>
                    <TextField
                        label="비밀번호" // 패스워드
                        type="password"
                        name="password"
                        value={password}
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        {...textFieldDefaultProps}
                    />
                    <Text {...text}>
                        비밀번호를 잊어버렸나요?{' '}
                        <HyperLink to="/origin" color="blue" {...hyper}>
                            {' '}
                            비밀번호{' '}
                        </HyperLink>{' '}
                        찾기
                    </Text>

                    <Box display="flex" marginVertical="20px" padding="10px 0" width="100%" flexDirection="column" caretColor="transparent">
                        <Btn
                            type="submit" // 서브밋
                            marginTop="10px"
                            marginSide="auto"
                            marginVertical="20px"
                            padding="10px 0"
                            width="100%"
                            borderRadius="5px"
                            border="none"
                            caretColor="transparent"
                            boxShadow="0px 0px 0px 0.5px rgba(0,0,0,0.5)"
                            backgroundColor="white"
                            fontSize="16px">
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
                                tabindex="-1"
                                caretColor="transparent"
                                // pointerEvents="none"
                                boxShadow="0px 0px 0px 0.5px rgba(0,0,0,0.5)"
                                width="auto"
                                hoverBackgroundColor="rgba(0,0,0,0.05)">
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
    paddingTop: '5px',
    flexGrow: 1,
    height: '50px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.5)',
    //  fontSize: '30px',

    // tabindex: '-1',
    //    caretColor: 'transparent',
}
const Box1Props = {
    width: '40%',
    flexDirection: 'column',
}

const text = {
    fontSize: '12px',
    textAlign: 'start',
    padding: '5px',
    caretColor: 'transparent',
}
const hyper = {
    // textDecoration: 'overline dashed red',
    textDecoration: 'none',
    padding: '0px',
    margin: '2px',
    color: 'blue',
    // textDecoration: 'dotted',
}

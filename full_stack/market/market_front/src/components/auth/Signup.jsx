import { Box, Text, TextField, HyperLink, Btn } from '../../styles/myUi'
import { Box1Props } from '../../styles/myUi/common'
import { useCallback, useState, useEffect } from 'react'

const Signup = () => {
    const [name, setName] = useState('')
    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('')
    const [nick, setNick] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [withdrawal, setWithdrawal] = useState('')
    const [refund, setRefund] = useState('')
    const [address, setAddress] = useState('')
    const [nickPlaceholder, setNickPlaceholder] = useState('* 기본값 = 아이디')

    useEffect(() => {
        if (userId) {
            setNickPlaceholder(`* 기본값: ${userId}`) // 플레이스홀더 업데이트
        } else {
            setNickPlaceholder('* 기본값: 아이디') // 기본값
        }
    }, [userId])

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
    })
    return (
        <>
            <Box {...BoxStyle}>
                <form onSubmit={handleSubmit}>
                    <Text {...text}>개인정보</Text>
                    <Box gap="10px" width="100%" backgroundColor="yellow" display="flex">
                        <TextField
                            label="이름"
                            type="text"
                            name="userName"
                            value={name}
                            flexGlow="1"
                            fieldWidth="50%"
                            autoComplete="username"
                            placeholder="* 필수"
                            phrStyles={phrStyles}
                            width="30%"
                            className="Input"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            {...textFieldDefaultProps}
                        />
                        <TextField
                            label="전화번호"
                            type="tel"
                            name="tel"
                            value={phone}
                            fieldWidth="50%"
                            flexGlow="1"
                            autoComplete="tel"
                            placeholder="* 필수"
                            phrStyles={phrStyles}
                            className="Input"
                            onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                            {...textFieldDefaultProps}
                        />
                    </Box>
                    <TextField
                        label="이메일"
                        type="email"
                        name="email"
                        value={email}
                        autoComplete="email"
                        placeholder="* 필수"
                        phrStyles={phrStyles}
                        className="Input"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        {...textFieldDefaultProps}
                    />

                    <TextField
                        label="주소지"
                        type="address"
                        name="address"
                        value={address}
                        autoComplete="address"
                        placeholder="* 필수"
                        phrStyles={phrStyles}
                        className="Input"
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                        {...textFieldDefaultProps}
                    />
                    <Text {...text}>아이디 생성</Text>
                    <Box gap="10px" width="100%" backgroundColor="yellow" display="flex">
                        <TextField
                            label="아이디 (12자)"
                            type="text"
                            name="userId"
                            value={userId}
                            autoComplete="username"
                            placeholder="* 필수"
                            phrStyles={phrStyles}
                            className="Input"
                            onChange={(e) => {
                                setUserId(e.target.value)
                            }}
                            {...textFieldDefaultProps}
                        />
                        <TextField
                            label="닉네임"
                            type="text"
                            name="nick"
                            value={nick}
                            autoComplete="off"
                            placeholder={nickPlaceholder}
                            phrStyles={phrStyles}
                            onChange={(e) => {
                                setNick(e.target.value)
                            }}
                            {...textFieldDefaultProps}
                        />
                    </Box>

                    <Box gap="10px" width="100%" backgroundColor="yellow" display="flex">
                        <TextField
                            label="비밀번호" // 패스워드
                            type="password"
                            name="password"
                            value={password}
                            autoComplete="new-password"
                            placeholder="* 필수"
                            phrStyles={phrStyles}
                            className="Input"
                            onChange={(e) => setPassword(e.target.value)}
                            {...textFieldDefaultProps}
                        />
                        <TextField
                            label="비밀번호 확인" // 패스워드
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            autoComplete="new-password"
                            placeholder="* 필수"
                            phrStyles={phrStyles}
                            className="Input"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            {...textFieldDefaultProps}
                        />
                    </Box>

                    <Text {...text}>출금/환불 계좌</Text>
                    <TextField
                        label="출금계좌"
                        type="text"
                        name="withdrawal"
                        value={withdrawal}
                        autoComplete="off"
                        placeholder="* 추후 입력가능"
                        phrStyles={phrStyles}
                        className="Input"
                        onChange={(e) => {
                            setWithdrawal(e.target.value)
                        }}
                        {...textFieldDefaultProps}
                    />
                    <TextField
                        label="환불계좌"
                        type="text"
                        name="refund"
                        value={refund}
                        autoComplete="off"
                        placeholder="* 추후 입력가능"
                        phrStyles={phrStyles}
                        className="Input"
                        onChange={(e) => {
                            setRefund(e.target.value)
                        }}
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
                            회원가입
                        </Btn>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default Signup

const BoxStyle = {
    width: '60%',
    flexDirection: 'column',
    // alignItems: 'flex-start',
    border: '1px solid black',
    // justifyContent: 'start',
}
const textFieldDefaultProps = {
    marginVertical: '5px',
    paddingVertical: '2px',
    paddingSide: '10px',
    // width:"100%",
    flexGrow: 1,
    height: '50px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.5)',
    tabindex: '-1',
}
// const Box1Props = {
//     width: '40%',
//     flexDirection: 'column',
// }

const text = {
    fontSize: '12px',
    textAlign: 'start',
    padding: '5px',
    caretColor: 'transparent',
}
const hyper = {
    textDecoration: 'none',
    padding: '0px',
    margin: '2px',
    color: 'blue',
}

// const phrStyles = `
// text-align: end;

//   `

const phrStyles = {
    textAlign: 'end',
    paddingRight: '5px',
    whiteSpace: 'pre-line',
}

const aa = `
  text-aling: end;
`
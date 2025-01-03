import { Box, Text, TextField, HyperLink, Btn } from '../../styles/myUi'
// import { Box1Props } from '../../styles/myUi/common'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signCheckThunk } from '../../features/slice/blurSlice'
import { registerAddressThunk, registerUserThunk } from '../../features/slice'
import { validateField, formatPhone } from '../../utils'
import Login from './Login'

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
    const [textColor, setTextColor] = useState('black')
    const [isSignupComplete, setIsSignupComplete] = useState(false)

    const dispatch = useDispatch()
    const { status, messages } = useSelector((state) => state.blur)

    useEffect(() => {
        if (userId) {
            setNickPlaceholder(`* 기본값: ${userId}`) // 플레이스홀더 업데이트
        } else {
            setNickPlaceholder('* 기본값: 아이디') // 기본값
        }
    }, [userId])

    const handleChange = (e) => {
        const input = e.target.value
        if (/^[0-9]*$/.test(input)) {
            setPhone(input) // 숫자만 입력
        }

        // 자릿수에 따른 텍스트 색상 변경
        if (input.startsWith('01')) {
            // 휴대전화
            if (input.length > 0 && input.length < 12) {
                setTextColor('black') // 유효한 길이
            } else {
                setTextColor('red') // 유효하지 않은 길이
            }
        } else if (/^(02|0[3-6][1-9])/.test(input)) {
            // 유선전화
            const areaCodeLength = input.startsWith('02') ? 2 : 3 // 지역번호 길이
            const mainNumberLength = input.length - areaCodeLength
            if (mainNumberLength >= 7 && mainNumberLength <= 8) {
                setTextColor('black') // 유효한 길이
            } else {
                setTextColor('red') // 유효하지 않은 길이
            }
        } else {
            setTextColor('red') // 유효하지 않은 시작번호
        }
    }

    const handleFocus = () => {
        setTextColor('black')
        setPhone(phone.replace(/-/g, '')) // 하이픈 제거
    }
    const handleBlur = async (type, data, confirmValue = '') => {
        try {
            if (!data) return

            if (type === 'confirmPassword') {
                const errorMessage = validateField(type, data, confirmValue)
                if (errorMessage) {
                    console.error(errorMessage) // 프론트엔드 에러 처리
                    alert(errorMessage)
                }
                return // 백엔드 요청 없이 종료
            }

            const errorMessage = validateField(type, data)
            if (errorMessage) {
                alert(errorMessage)
                console.error(errorMessage) // 콘솔로 에러 표시
                return
            }

            if (type === 'phone') {
                data = formatPhone(data) // 하이픈 추가
                setPhone(data)
                setTextColor('green')
                console.log(data)
            }

            await dispatch(signCheckThunk({ type, data })).unwrap()
            
        } catch (err) {
            console.error(err)
        }
    }
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()

            const isBusiness = false

            const sanitizedNick = nick === '' ? userId : nick

            const sanitizedWithdrawal = withdrawal === '' ? null : withdrawal

            const sanitizedRefund = refund === '' ? null : refund

            const userData = { isBusiness, name, userId, email, address, nick: sanitizedNick, phone, password, withdrawal: sanitizedWithdrawal, refund: sanitizedRefund }
            dispatch(registerUserThunk(userData))
                .unwrap()
                .then(() => {
                    setIsSignupComplete(true)
                })
                .catch((error) => {
                    console.error('회원가입 중 에러: ', error)
                })
        },
        [dispatch, name, userId, email, nick, phone, password, withdrawal, refund],
    )
    
    if (isSignupComplete) {
        return (
            <Box {...BoxStyle} textAlign="center">
                <Login status="signup" />
            </Box>
        )
    }

    return (
        <>
            <Box {...BoxStyle} gap="14px">
                <h2>회원가입</h2>
                <form onSubmit={handleSubmit}>
                    <Text {...text}>개인정보</Text>
                    <Box gap="10px" width="100%" display="flex">
                        <Box width="100%" flexDirection="column">
                            <TextField
                                label="이름"
                                type="text"
                                name="userName"
                                value={name}
                                flexGrow="1"
                                fieldWidth="100%"
                                autoComplete="username"
                                placeholder="* 필수"
                                phrStyles={phrStyles}
                                width="100%"
                                className="Input"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                {...textFieldDefaultProps}
                                {...labelStyle}
                            />
                            {status.phone === 'success' && phone ? <Text height="14px" lineHeight="10px" color="	#00B6FF" fontSize="10px"></Text> : <Text height="0px"></Text>}
                        </Box>
                        <Box width="100%" flexDirection="column">
                            <TextField
                                label="전화번호"
                                type="tel"
                                name="tel"
                                color={textColor}
                                value={phone}
                                fieldWidth="0   q0%"
                                flexGrow="1"
                                autoComplete="tel"
                                placeholder="* 필수"
                                phrStyles={phrStyles}
                                className="Input"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={(e) => handleBlur('phone', e.target.value)}
                                {...textFieldDefaultProps}
                                {...labelStyle}
                            />
                            {status.phone === 'success' && phone ? (
                                <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="#00B6FF">
                                    {messages.phone}
                                </Text>
                            ) : (
                                <Text height="0px"></Text>
                            )}
                        </Box>
                    </Box>{' '}
                    <Box width="100%" flexDirection="column">
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
                            onBlur={(e) => handleBlur('email', e.target.value)}
                            {...textFieldDefaultProps}
                            {...labelStyle}
                        />
                        {status.email === 'success' && email ? (
                            <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="#00B6FF">
                                {messages.email}
                            </Text>
                        ) : (
                            <Text height="0px"></Text>
                        )}
                    </Box>{' '}
                    <Box width="100%" flexDirection="column">
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
                            onBlur={(e) => handleBlur('address', e.target.value)}
                            {...textFieldDefaultProps}
                            {...labelStyle}
                        />{' '}
                        {status.address === 'success' && address ? (
                            <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="#00B6FF">
                                {messages.address}
                            </Text>
                        ) : (
                            <Text height="0px"></Text>
                        )}
                    </Box>
                    <Text {...text}>아이디 생성</Text>
                    <Box gap="10px" width="100%" display="flex">
                        <Box width="100%" flexDirection="column">
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
                                onBlur={(e) => handleBlur('userId', e.target.value)}
                                {...textFieldDefaultProps}
                                {...labelStyle}
                            />{' '}
                            {status.userId === 'success' && userId ? (
                                <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="#00B6FF">
                                    {messages.userId}
                                </Text>
                            ) : (
                                <Text height="0px"></Text>
                            )}
                        </Box>
                        <Box width="100%" flexDirection="column">
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
                                onBlur={(e) => handleBlur('nick', e.target.value)}
                                {...textFieldDefaultProps}
                                {...labelStyle}
                            />{' '}
                            {status.nick === 'success' && nick ? (
                                <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="#00B6FF">
                                    {messages.nick}
                                </Text>
                            ) : (
                                <Text height="0px"></Text>
                            )}
                        </Box>
                    </Box>
                    <Box gap="10px" width="100%" display="flex">
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
                            {...labelStyle}
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
                            onBlur={(e) => handleBlur('confirmPassword', e.target.value, password)}
                            {...textFieldDefaultProps}
                            {...labelStyle}
                        />
                    </Box>
                    <Text {...text}>출금/환불 계좌</Text>
                    <Box width="100%" flexDirection="column">
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
                            onBlur={(e) => handleBlur('withdrawal', e.target.value)}
                            {...textFieldDefaultProps}
                            {...labelStyle}
                        />{' '}
                        {status.withdrawal === 'success' && withdrawal ? (
                            <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="#00B6FF">
                                {messages.withdrawal}
                            </Text>
                        ) : (
                            <Text height="0px"></Text>
                        )}
                    </Box>
                    <Box width="100%" flexDirection="column">
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
                            onBlur={(e) => handleBlur('refund', e.target.value)}
                            {...textFieldDefaultProps}
                            {...labelStyle}
                        />{' '}
                        {status.refund === 'success' && refund ? (
                            <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="#00B6FF">
                                {messages.refund}
                            </Text>
                        ) : (
                            <Text height="0px"></Text>
                        )}
                    </Box>
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

// pointer-events: none;
// caret-color: 'transparent';

const BoxStyle = {
    width: '60%',
    flexDirection: 'column',
    //    caretColor: 'transparent',
    // border: '1px solid black',
}
const textFieldDefaultProps = {
    marginVertical: '5px',
    paddingVertical: '2px',
    paddingSide: '10px',
    width: '100%',
    flexGrow: 1,
    height: '50px',
    // fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.5)',
    fontSize: '1em',
    // backgroundColor: 'black',
    //    tabindex: '-1',
    //    caretColor: 'black',
}

const text = {
    fontSize: '12px',
    textAlign: 'start',
    padding: '5px',
    caretColor: 'transparent',
    fontWeight: 'bold',
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
    paddingLeft: '20px',
    // color:'red'
    // paddingRight: '5px',
    // whiteSpace: 'pre-line',
}

const labelStyle = {
    labelLeft: '13px',
    labelTop: '20px'
}

/*   if (input.startsWith('01')) {
            // 휴대전화
            if (input.length === 10 || input.length === 11) {
                setTextColor('green') // 유효한 길이
            } else {
                setTextColor('red') // 유효하지 않은 길이
            } */

/* 
   {!email && status.email === 'success' ? (
                            <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="	#DB3245">
                                값을 입력하세요
                            </Text>
                        ) : status.email === 'success' ? (
                            <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="	#00B6FF">
                                {messages.email}
                            </Text>
                        ) : (
                            <Text height="0px"></Text>
                        )}

*/
/*

    <Text
                            paddingLeft="4px"
                            height={status.email === 'success' || (!email && status.email === 'success') ? '14px' : '0px'}
                            lineHeight="11px"
                            fontSize="11px"
                            color={
                                !email
                                    ? '#DB3245' // 에러 색상 (값 입력 필요)
                                    : status.email === 'success'
                                    ? '#00B6FF' // 성공 색상
                                    : 'transparent' // 기본 숨김
                            }>
                            {!email && status.email === 'success'
                                ? '값을 입력하세요' // 에러 메시지
                                : status.email === 'success'
                                ? messages.email // 성공 메시지
                                : ''}{' '}
                        </Text>
                        {warnings.email && <Text style={{ color: 'red', fontSize: '12px' }}>값을 입력하세요</Text>}
*/

/*
{' '}
                        <Text paddingLeft="4px" height={(loading.email === 'success' && email) || (loading.email === 'loading' && !email) ? '14px' : '0px'} lineHeight="11px" fontSize="11px" color="#00B6FF">
                            {!email && status.email === 'success'
                                ? '' // 에러 메시지
                                : loading.email === 'success' && email
                                ? messages.email // 성공 메시지
                                : ''}{' '}
                        </Text>
                        {warnings.email && <Text style={{ color: 'red', fontSize: '12px' }}>값을 입력하세요</Text>}
*/

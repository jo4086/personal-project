import { Box, Text, TextField, HyperLink, Btn } from '../../styles/myUi'
import { Box1Props } from '../../styles/myUi/common'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signCheckThunk } from '../../features/slice/blurSlice'

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

    const dispatch = useDispatch()
    const { status, messages } = useSelector((state) => state.blur)
    const [previousValues, setPreviousValues] = useState({})
    const [warnings, setWarnings] = useState({})

    const handleBlur = async (type, data) => {
        try {
            if (!setWarnings[type]) {
                setWarnings((prev) => ({
                    ...prev,
                    [type]: !data, // 값이 비어 있으면 true로 설정
                }))
            }

            if (!data) return

            if (previousValues[type] === data && !previousValues[type]) {
                console.log(`[INFO] ${type} 값이 변경되지 않아 API 요청 생략`)
                return
            }

            console.log({ type, data })
            await dispatch(signCheckThunk({ type, data })).unwrap()

            setPreviousValues((prev) => ({
                ...prev,
                [type]: data,
            }))

            setWarnings((prev) => ({
                ...prev,
                [type]: !data, // 값이 비어 있으면 true로 설정
            }))
        } catch (err) {}
    }

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
            <Box {...BoxStyle} gap="14px">
                <form onSubmit={handleSubmit}>
                    <Text {...text}>개인정보</Text>
                    <Box gap="10px" width="100%" display="flex">
                        <Box width="100%" flexDirection="column">
                            <TextField
                                label="이름"
                                type="text"
                                name="userName"
                                value={name}
                                flexGlow="1"
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
                            />
                            {status.phone === 'success' ? <Text height="14px" lineHeight="10px" color="	#00B6FF" fontSize="10px"></Text> : <Text height="0px"></Text>}
                        </Box>
                        <Box width="100%" flexDirection="column">
                            <TextField
                                label="전화번호"
                                type="tel"
                                name="tel"
                                value={phone}
                                fieldWidth="0   q0%"
                                flexGlow="1"
                                autoComplete="tel"
                                placeholder="* 필수"
                                phrStyles={phrStyles}
                                className="Input"
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                }}
                                onBlur={(e) => handleBlur('phone', e.target.value)}
                                {...textFieldDefaultProps}
                            />
                            {status.phone === 'success' ? (
                                <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="	#00B6FF">
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
                        />{' '}
                        {warnings.email ? (
                            <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="	#DB3245">
                                값을 입력하세요
                            </Text>
                        ) : status.email === 'success' ? (
                            <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="	#00B6FF">
                                {messages.email}
                            </Text>
                        ) : !email && status.email === 'success' ? (
                            <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="	#DB3245">
                                값을 입력하세요
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
                        />{' '}
                        {status.address === 'success' ? (
                            <Text paddingLeft="4px" height="14px" lineHeight="11px" fontSize="11px" color="	#00B6FF">
                                {messages.address}
                            </Text>
                        ) : (
                            <Text height="0px"></Text>
                        )}
                    </Box>
                    <Text {...text}>아이디 생성</Text>
                    <Box gap="10px" width="100%" display="flex">
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
    backroundColor: 'black',
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
    paddingRight: '5px',
    whiteSpace: 'pre-line',
}

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

import { Text, TextField, Box, HyperLink, Btn } from '../../styles/myUi'
import { useCallback, useState } from 'react'

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const handleSubmit = useCallback((e) => {
      e.preventDefault()
   })

   return (
      <>
         <Box {...Box1Props}>
            <form onSubmit={handleSubmit}>
               <TextField
                  label="이메일"
                  type="email"
                  name="email"
                  value={email}
                  autoComplete="username"
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
                  <HyperLink to="/origin" {...hyper}>
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
    paddingTop:'5px',
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

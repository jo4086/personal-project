import { borderRadius, lineHeight, textAlign } from '@mui/system'
import { Box, Text, HyperLink, Ul, Li, Table, Thead, Tbody, Divider } from '../../styles/myUi'

const FreeBoard = () => {
    return (
        <>
            <Box width="100%" borderRadius="5px" border="1px solid blue">
                <Table width="100%">
                    <Thead width="100%" backgroundColor="rgba(30,30,30,0.5)" height="30px" lineHeight="30px" textAlign="center">
                        <Ul type="tr" height="100%">
                            <Li type="th" width="5%" {...commonTh}>
                                <Divider display="inline-block" height="60%" margin="-4px 15px -4px 0" backgroundColor="transparent" />
                                추천
                            </Li>
                            <Li type="th" width="10%" {...commonTh}>
                                <Divider display="inline-block" height="60%" margin="-4px 30px -4px 0" backgroundColor="transparent" />
                                분류
                                <Divider display="inline-block" height="60%" margin="-4px 0 -4px 30px" backgroundColor="transparent" />
                            </Li>
                            <Li type="th" width="*" {...commonTh}>
                                제목
                            </Li>
                            <Li type="th" width="10%" {...commonTh}>
                                <Divider display="inline-block" height="60%" margin="-4px 25px -4px 0" backgroundColor="transparent" />
                                닉네임
                                <Divider display="inline-block" height="60%" margin="-4px 0 -4px 24px" backgroundColor="transparent" />
                            </Li>
                            <Li type="th" width="6%" {...commonTh}>
                                조회수
                                <Divider display="inline-block" height="60%" margin="-4px 0 -4px 12px" backgroundColor="transparent" />
                            </Li>
                            <Li type="th" width="10%" {...commonTh}>
                                날짜
                            </Li>
                        </Ul>
                    </Thead>
                    <Tbody width="100%" marginTop="10px">
                        <Ul type="tr" backgroundColor="rgba(0,0,0,0.2)" {...commonTr} height="1px" width="100%">
                            <td colSpan={6} style={{ width: '100%' }}></td>
                        </Ul>
                        <Ul type="tr" width="100%" {...commonTr}>
                            <Li type="td" width="5%" {...commonTd}>
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 15px -4px 0" />
                                추천
                            </Li>
                            <Li width="10%" {...commonTd}>
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 30px -4px 0" />
                                분류
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 0 -4px 30px" />
                            </Li>
                            <Li width="*" {...commonTd}>
                                제목
                            </Li>
                            <Li width="10%" {...commonTd}>
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 25px -4px 0" />
                                닉네임
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 0 -4px 24px" />
                            </Li>
                            <Li width="6%" {...commonTd}>
                                조회수
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 0 -4px 12px" />
                            </Li>
                            <Li width="10%" {...commonTd}>
                                날짜
                            </Li>
                        </Ul>
                        <Ul type="tr" backgroundColor="rgba(0,0,0,0.2)" {...commonTr} height="1px" width="100%">
                            <td colSpan={6} style={{ width: '100%' }}></td>
                        </Ul>
                        <Ul type="tr" width="100%" {...commonTr}>
                            <Li type="td" width="5%" {...commonTd}>
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 15px -4px 0" />
                                추천
                            </Li>
                            <Li width="10%" {...commonTd}>
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 30px -4px 0" />
                                분류
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 0 -4px 30px" />
                            </Li>
                            <Li width="*" {...commonTd}>
                                제목
                            </Li>
                            <Li width="10%" {...commonTd}>
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 25px -4px 0" />
                                닉네임
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 0 -4px 24px" />
                            </Li>
                            <Li width="6%" {...commonTd}>
                                조회수
                                <Divider backgroundColor="rgba(0,0,0,0.4)" display="inline-block" height="60%" margin="-4px 0 -4px 12px" />
                            </Li>
                            <Li width="10%" {...commonTd}>
                                날짜
                            </Li>
                        </Ul>
                    </Tbody>
                </Table>
            </Box>
        </>
    )
}

export default FreeBoard
const commonTr = {
    fontSize: '13px',
    textAlign: 'center',
    lineHeight: '30px',
    height: '30px',
    paddding: '0',
}

const commonTh = {
    fontSize: '13px',
    textAlign: 'center',
    lineHeight: '30px',
    height: '30px',
    paddding: '0',
    type: 'th',
}
const commonTd = {
    fontSize: '13px',
    textAlign: 'center',
    lineHeight: '30px',
    height: '30px',
    paddding: '0',
    type: 'td',
}

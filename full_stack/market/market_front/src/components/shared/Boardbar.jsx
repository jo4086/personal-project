import { border, boxSizing, display, fontFamily, fontWeight, letterSpacing, textAlign } from '@mui/system'
import { Box, HyperLink, Li } from '../../styles/myUi'

const Boardbar = () => {
    return (
        <ul style={{ display: 'flex', width: '100%', height: '40px', boxSizing: 'border-box', padding: 0, margin: 0 }}>
            <Li {...li}>
                <HyperLink to="/board/notice" {...tabStyle}>
                    공지사항
                </HyperLink>
            </Li>
            <Li {...li}>
                <HyperLink to="/board/free" {...tabStyle}>
                    자유게시판
                </HyperLink>
            </Li>
            <Li {...li}>
                <HyperLink to="/board/sell" {...tabStyle}>
                    판매게시판
                </HyperLink>
            </Li>
            <Li {...li}>
                <HyperLink to="/board/buy" {...tabStyle}>
                    구매게시판
                </HyperLink>
            </Li>
            <Li {...li}>
                <HyperLink to="/board/info" {...tabStyle}>
                    정보게시판
                </HyperLink>
            </Li>
            {/* <Li {...li}>
                <HyperLink {...tabStyle}>6</HyperLink>
            </Li> */}
        </ul>
    )
}
export default Boardbar

const bar = {
    width: '100%',
    height: '40px',
    border: '1px solid black',
}

const li = {
    flexGrow: '1',
    height: '100%',
    width: '100%',
    // border: '1px solid red',
    boxShadow: '0 0 1px black',
    display: 'block',
    backgroundColor: 'rgb(245,245,245)',
    hoverBackgroundColor: 'rgb(255,255,255)',
    padding: 0,
    margin: '0 2px',
}

const tabStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgb(245,245,245)',
    // hoverBackgroundColor: 'rgb(255,255,255)',
    letterSpacing: '6px',
    fontSize: '1.1em',
    fontFamily: 'Jua',
    paddingTop: '2px',
    userSelect:'none'
}

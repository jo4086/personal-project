import { FiMeh, FiFrown } from 'react-icons/fi'
import { FaSmile, FaExclamationCircle } from 'react-icons/fa'

const airQuality = {
   1: {
      label: '좋음',
      color: '#00e400',
      icon: FaSmile, // 밝은 웃는 얼굴
   },
   2: {
      label: '보통',
      color: '#ffff00',
      icon: FiMeh, // 중립적인 표정
   },
   3: {
      label: '나쁨',
      color: '#ff7e00',
      icon: FiFrown, // 슬픈 표정
   },
   4: {
      label: '매우 나쁨',
      color: '#ff0000',
      icon: FaExclamationCircle, // 경고 아이콘
   },
   5: {
      label: '위험',
      color: '#8f3f97',
      icon: FaExclamationCircle, // 심각한 경고
   },
}

export default airQuality

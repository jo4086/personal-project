import { FiSun, FiMeh, FiFrown } from 'react-icons/fi'
import { FaSmile, FaExclamationCircle } from 'react-icons/fa'

// 아이콘 매핑
const airQualityIcon = {
   good: FaSmile,
   fair: FiMeh,
   poor: FiFrown,
   veryPoor: FaExclamationCircle,
   sun: FiSun,
}

export default airQualityIcon

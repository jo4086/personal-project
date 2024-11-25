import { FaTemperatureArrowUp, FaTemperatureArrowDown, FaTemperatureHigh, FaCloudRain, FaSnowflake } from 'react-icons/fa6'
import { LuWind, LuDroplets } from 'react-icons/lu'
import { CiCloudOn } from 'react-icons/ci'
import { RiWaterPercentLine } from 'react-icons/ri'
import { PiMoonStarsFill, PiSunFill, PiCloudWarningFill } from 'react-icons/pi'
import {  MdExplore, MdWindPower } from 'react-icons/md'
import { TbMist } from 'react-icons/tb'
import { IoIosWarning } from 'react-icons/io'
import { FaAngleDoubleRight, FaAngleRight } from 'react-icons/fa'

const weatherIcon = {
   현재온도: FaTemperatureHigh, //
   최고기온: FaTemperatureArrowUp, //
   최저기온: FaTemperatureArrowDown, //
   체감온도: FaTemperatureHigh, //
   습도: LuDroplets, //
   구름량: CiCloudOn,//
   비: FaCloudRain,
   눈: FaSnowflake,
   강수확률: RiWaterPercentLine, //
   낮: PiSunFill, //
   밤: PiMoonStarsFill, //
   "풍향 / 풍속": LuWind, //
   미풍: FaAngleRight, //
   강풍: FaAngleDoubleRight, //
   대기질: TbMist, //
   미세먼지: PiCloudWarningFill, //
   경고: IoIosWarning,
}

export default weatherIcon
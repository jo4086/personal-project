import { weatherIcon } from "../icons"

const weatherMapper = {
  temp: {
    label: '현재온도',
    color: '#FFA500', // 주황색
    icon: weatherIcon.FaTemperatureHigh,
    unit: '°C',
  },
  max_temp: {
    label: '최고기온',
    color: '#FF4500', // 빨강색
    icon: weatherIcon.FaTemperatureArrowUp,
    unit: '°C',
  },
  min_temp: {
    label: '최저기온',
    color: '#1E90FF', // 파랑색
    icon: weatherIcon.FaTemperatureArrowDown,
    unit: '°C',
  },
  feel_temp: {
    label: '체감온도',
    color: '#FFD700', // 노랑색
    icon: weatherIcon.FaTemperatureHigh,
    unit: '°C',
  },
  humidity: {
    label: '습도',
    color: '#00BFFF', // 밝은 파랑색
    icon: weatherIcon.LuDroplets,
    unit: '%',
  },
  wind_speed: {
    label: '풍속',
    color: '#32CD32', // 연녹색
    icon: weatherIcon.LuWind,
    unit: 'm/s',
  },
  scripts: {
    label: '날씨',
    color: '#696969', // 회색
    icon: null,
  },
};
export default weatherMapper;
/* 
clouds: 93
feels_like: 0.72
humidity: 66
period: '밤'
pop: 0.31
rain: 0
scripts: {
  description: '구름으로 뒤덮인 흐린 하늘'
  direction: '북서 (NW)'
  weatherName: '흐림'
}
temp_max: 3.85
temp_min: 3.85
temperature: 3.85 */
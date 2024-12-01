import { weatherIcon } from '../icons'

const weatherMapper = {
   temp: {
      label: '현재온도',
      color: '#FFA500', // 주황색
      unit: '°C',
      get icon() {
         return weatherIcon[this.label]
      },
   },
   max_temp: {
      label: '최고기온',
      color: '#FF4500', // 빨강색
      unit: '°C',
      get icon() {
         return weatherIcon[this.label]
      },
   },
   min_temp: {
      label: '최저기온',
      color: '#1E90FF', // 파랑색
      unit: '°C',
      get icon() {
         return weatherIcon[this.label]
      },
   },
   feel_temp: {
      label: '체감온도',
      color: '#FFD700', // 노랑색
      unit: '°C',
      get icon() {
         return weatherIcon[this.label]
      },
   },
   humidity: {
      label: '습도',
      color: '#00BFFF', // 밝은 파랑색
      unit: '%',
      get icon() {
         return weatherIcon[this.label]
      },
   },
   pop: {
      label: '강수확률',
      color: '#696969', // 회색
      unit: '%',
      get icon() {
         return weatherIcon[this.label]
      },
   },
   wind: {
      label: '풍향 / 풍속',
      color: '#32CD32', // 연녹색
      unit: 'm/s',
      get icon() {
         return weatherIcon[this.label]
      },
      extra: {
         low: weatherIcon['미풍'],
         hight: weatherIcon['강풍'],
      },
   },
   scripts: {
      label: '날씨',
      color: '#696969', // 회색
      icon: null,
   },
   clouds: {
      label: '구름량',
      color: '#696969', // 회색
      unit: '%',
      get icon() {
         return weatherIcon[this.label]
      },
   },
   period: {
      낮: {
         label: '낮',
         color: '#FFA500', // 주황색
         unit: '%',
         get icon() {
            return weatherIcon[this.label]
         },
      },
      밤: {
         label: '낮',
         color: '#696969', // 회색
         unit: '%',
         get icon() {
            return weatherIcon[this.label]
         },
      },
   },
   aqi: {
      label: '대기질',
      color: '#696969', // 회색
      unit: '',
      get icon() {
         return weatherIcon[this.label]
      },
   },
   pm2_5: {
      label: '초미세먼지',
      color: '#696969', // 회색
      unit: '',
      get icon() {
         return weatherIcon['미세먼지']
      },
   },
   pm10: {
      label: '미세먼지',
      color: '#696969', // 회색
      unit: '',
      get icon() {
         return weatherIcon['미세먼지']
      },
   },
   rain: {
      label: '비',
      color: '#00BFFF', // 회색
      unit: 'mm',
      get icon() {
         return weatherIcon[this.label]
      },
   },
   snow: {
      label: '눈',
      color: '#00BFFF', // 회색
      unit: '',
      get icon() {
         return weatherIcon[this.label]
      },
   },
}
export default weatherMapper
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
temperature: 3.85
 */

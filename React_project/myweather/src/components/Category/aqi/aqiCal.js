const aqiRanges = [
   { aqi: '0-50', pm2_5: [0, 12.0], pm10: [0, 54], co: [0, 4400], o3: [0, 54], no2: [0, 0.053], so2: [0, 35] },
   { aqi: '51-100', pm2_5: [12.1, 35.4], pm10: [55, 154], co: [4500, 9400], o3: [55, 70], no2: [0.054, 0.1], so2: [36, 75] },
   { aqi: '101-150', pm2_5: [35.5, 55.4], pm10: [155, 254], co: [9500, 12400], o3: [71, 85], no2: [0.101, 0.36], so2: [76, 185] },
   { aqi: '151-200', pm2_5: [55.5, 150.4], pm10: [255, 354], co: [12500, 15400], o3: [86, 105], no2: [0.361, 0.649], so2: [186, 304] },
   { aqi: '201-300', pm2_5: [150.5, 250.4], pm10: [355, 424], co: [15500, 30400], o3: [106, 200], no2: [0.65, 1.249], so2: [305, 604] },
   { aqi: '301-500', pm2_5: [250.5, 500.4], pm10: [425, 604], co: [30500, 50400], o3: [201, 604], no2: [1.25, 2.049], so2: [605, 1004] },
]

// AQI 상태 결정 함수
const getStatus = (aqi) => {
   if (aqi <= 50) return '좋음'
   if (aqi <= 100) return '보통'
   if (aqi <= 150) return '민감군 영향 있음'
   if (aqi <= 200) return '나쁨'
   if (aqi <= 300) return '매우 나쁨'
   return '위험' // 301 이상
}

// AQI 계산 함수
const results = (Cp, param) => {
   for (const range of aqiRanges) {
      const BP_LO = range[param][0]
      const BP_HI = range[param][1]
      const I_LO = parseInt(range.aqi.split('-')[0], 10)
      const I_HI = parseInt(range.aqi.split('-')[1], 10)

      if (Cp >= BP_LO && Cp <= BP_HI) {
         const aqiValue = (((I_HI - I_LO) / (BP_HI - BP_LO)) * (Cp - BP_LO) + I_LO).toFixed(1)
         const status = getStatus(aqiValue)
         return { aqi: aqiValue, status }
      }
   }

   // 범위 밖 처리
   if (Cp < aqiRanges[0][param][0]) {
      const aqiValue = parseInt(aqiRanges[0].aqi.split('-')[0], 10)
      const status = getStatus(aqiValue)
      return { aqi: aqiValue, status }
   } else if (Cp > aqiRanges[aqiRanges.length - 1][param][1]) {
      const aqiValue = parseInt(aqiRanges[aqiRanges.length - 1].aqi.split('-')[1], 10)
      const status = getStatus(aqiValue)
      return { aqi: aqiValue, status }
   }

   return { aqi: 'Out of range', status: '알 수 없음' }
}

// 모든 오염물질의 AQI 계산
export const aqiCal = (inputs) => {
   return Object.entries(inputs).reduce((acc, [key, value]) => {
      acc[key] = results(value, key)
      return acc
   }, {})
}

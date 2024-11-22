// 매핑테이블
const aqiRanges = [
   { aqi: '0-50', pm2_5: [0, 12.0], pm10: [0, 54], co: [0, 4400], o3: [0, 54], no2: [0, 0.053], so2: [0, 35] },
   { aqi: '51-100', pm2_5: [12.1, 35.4], pm10: [55, 154], co: [4500, 9400], o3: [55, 70], no2: [0.054, 0.1], so2: [36, 75] },
   { aqi: '101-150', pm2_5: [35.5, 55.4], pm10: [155, 254], co: [9500, 12400], o3: [71, 85], no2: [0.101, 0.36], so2: [76, 185] },
   { aqi: '151-200', pm2_5: [55.5, 150.4], pm10: [255, 354], co: [12500, 15400], o3: [86, 105], no2: [0.361, 0.649], so2: [186, 304] },
   { aqi: '201-300', pm2_5: [150.5, 250.4], pm10: [355, 424], co: [15500, 30400], o3: [106, 200], no2: [0.65, 1.249], so2: [305, 604] },
   { aqi: '301-500', pm2_5: [250.5, 500.4], pm10: [425, 604], co: [30500, 50400], o3: [201, 604], no2: [1.25, 2.049], so2: [605, 1004] },
]

// AQI 계산 함수 ... 각각 오염물질 최소최대, aqi범위 최소,최대
const calculate = (Cp, param) => {
   for (const range of aqiRanges) {
      const BP_LO = range[param][0]
      const BP_HI = range[param][1]
      const I_LO = parseInt(range.aqi.split('-')[0], 10)
      const I_HI = parseInt(range.aqi.split('-')[1], 10)

      if (Cp >= BP_LO && Cp <= BP_HI) {
         return ((I_HI - I_LO) / (BP_HI - BP_LO)) * (Cp - BP_LO) + I_LO
      }
   }

   if (Cp < aqiRanges[0][param][0]) {
      return parseInt(aqiRanges[0].aqi.split('-')[0], 10)
   } else if (Cp > aqiRanges[aqiRanges.length - 1][param][1]) {
      return parseInt(aqiRanges[aqiRanges.length - 1].aqi.split('-')[1], 10)
   }

   return 'Out of range'
}

// 입력값을 받아 각 오염물질의 AQI 계산
export const aqiCal = (inputs) => {
   return Object.entries(inputs).reduce((acc, [key, value]) => {
      acc[`${key}_AQI`] = calculate(value, key)
      return acc
   }, {})
}

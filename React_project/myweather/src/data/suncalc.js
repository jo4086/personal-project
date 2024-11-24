import SunCalc from 'suncalc'

// UTC 시간 계산
export const getSunTimesUTC = (latitude, longitude, date = new Date()) => {
   const sunTimes = SunCalc.getTimes(date, latitude, longitude)

   console.log('Raw SunCalc Data:', sunTimes) // 디버깅용

   return {
      sunriseUTC: sunTimes.sunrise?.toISOString(), // 예외 처리 추가
      sunsetUTC: sunTimes.sunset?.toISOString(),
   }
}
// UTC -> 로컬 시간 변환
export const convertToLocalTime = (utcTime, timezoneOffset) => {
   if (!utcTime) {
      console.error('Invalid UTC Time:', utcTime)
      return 'Invalid Time'
   }

   const utcDate = new Date(utcTime)
   const localDate = new Date(utcDate.getTime() + timezoneOffset * 1000)
   return localDate.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
   })
}

// 일출/일몰 데이터 제공
export const getSunData = (latitude, longitude, timezoneOffset) => {
   const today = new Date()
   const tomorrow = new Date()
   tomorrow.setDate(today.getDate() + 1)

   const sunData = {
      today: getSunTimesUTC(latitude, longitude, today),
      tomorrow: getSunTimesUTC(latitude, longitude, tomorrow),
   }

   
   return {
      today: {
         sunrise: convertToLocalTime(sunData.today.sunriseUTC, timezoneOffset),
         sunset: convertToLocalTime(sunData.today.sunsetUTC, timezoneOffset),
      },
      tomorrow: {
         sunrise: convertToLocalTime(sunData.tomorrow.sunriseUTC, timezoneOffset),
         sunset: convertToLocalTime(sunData.tomorrow.sunsetUTC, timezoneOffset),
      },
   }
}

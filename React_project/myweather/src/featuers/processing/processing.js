// UTC → 로컬 시간 변환
const convertToLocalTime = (utcTime, timezoneOffset) => {
   return utcTime + timezoneOffset
}

// 현재 시각 기준 오늘 남은 시간 계산
const calculateRemainingHours = (localTime) => {
   const currentHour = new Date(localTime * 1000).getHours()
   return 24 - currentHour
}

// 1시간 단위로 보간된 hourly 데이터 생성
const generateHourlyData = (weather, forecast, timezoneOffset) => {
   const localWeatherTime = convertToLocalTime(weather.dt, timezoneOffset)
   const localWeatherHour = new Date(localWeatherTime * 1000).getHours() // 현재 시각
   const hoursLeftToday = 24 - localWeatherHour // 오늘 남은 시간

   const relevantForecast = forecast.list.slice(0, Math.ceil(hoursLeftToday / 3)) // 오늘 데이터만 추출

   const interpolate = (x, x1, x2, y1, y2) => {
      return y1 + ((x - x1) / (x2 - x1)) * (y2 - y1)
   }

   const hourlyData = []

   for (let i = 0; i < relevantForecast.length - 1; i++) {
      const current = relevantForecast[i]
      const next = relevantForecast[i + 1]

      const x1 = current.dt + timezoneOffset
      const x2 = next.dt + timezoneOffset

      for (let x = Math.max(localWeatherTime, x1); x < x2 && x <= localWeatherTime + hoursLeftToday * 3600; x += 3600) {
         const temp = interpolate(x, x1, x2, current.main.temp, next.main.temp)
         const windSpeed = interpolate(x, x1, x2, current.wind.speed, next.wind.speed)
         const windDeg = interpolate(x, x1, x2, current.wind.deg, next.wind.deg)

         hourlyData.push({
            time: new Date(x * 1000).toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' }),
            temp: temp.toFixed(1),
            wind_speed: windSpeed.toFixed(1),
            wind_deg: Math.round(windDeg),
            humidity: current.main.humidity,
            rain: current.rain ? current.rain['3h'] || 0 : 0,
            pop: current.pop,
            weather: current.weather[0].main,
            icon: current.weather[0].icon,
         })
      }
   }

   return hourlyData
}

// 데일리 데이터를 8개 시간대로 그룹화
const groupDailyData = (forecastList, timezoneOffset) => {
   const dailyData = forecastList.reduce((days, item) => {
      const localTime = convertToLocalTime(item.dt, timezoneOffset)
      const hour = new Date(localTime * 1000).getHours()

      if (hour % 3 === 0) {
         const date = new Date(localTime * 1000).toLocaleDateString('ko-KR')
         if (!days[date]) {
            days[date] = []
         }
         days[date].push({
            time: new Date(localTime * 1000).toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' }),
            temp: item.main.temp,
            weather: item.weather[0].main,
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            pop: item.pop,
         })
      }

      return days
   }, {})

   // 완전한 날짜만 필터링 (8개 데이터가 있는 날)
   return Object.values(dailyData).filter((day) => day.length === 8)
}

function getHourlyData(data) {
   console.log(data)
   const gap = Math.round(data.restHour / 3)
   console.log(gap)

   const hourMap = data.list.slice(0, gap).map((item) => {
      return {
         ...item,
         date: new Date(item.dt + data.timezone * 1000),
         //  dt_txt: item.dt + data.timezone
      }
   })
   console.log(hourMap)
}

export const getHome = ({ weather, forecast, airPollution }) => {
   const nowHour = new Date().getHours()
   const restHour = 24 - nowHour
   const timezone = weather.timezone
   forecast = { ...forecast, timezone, restHour }

   const timeData = { restHour, timezone }

   console.log(timezone)
   console.log(24 - nowHour)
   console.log(weather)

   const hourly = getHourlyData(forecast)

   return {}
}

export const getToday = () => {}

export const getHourly = () => {}

export const getDaily = () => {}

export const getAir = () => {}

export const getHome2 = ({ weather, forecast, airPollution }) => {
   console.log(weather)

   const interpolate = (x, x1, x2, y1, y2) => {
      return y1 + ((x - x1) / (x2 - x1)) * (y2 - y1)
   }

   // 2. 3시간 데이터를 1시간 단위로 변환
   const generateHourlyData = (forecastList) => {
      const hourlyData = []

      for (let i = 0; i < forecastList.length - 1; i++) {
         const current = forecastList[i]
         const next = forecastList[i + 1]

         // 현재와 다음 시간 데이터
         const x1 = current.dt
         const x2 = next.dt

         for (let x = x1; x < x2; x += 3600) {
            // 1시간 간격
            const temp = interpolate(x, x1, x2, current.main.temp, next.main.temp)
            const windSpeed = interpolate(x, x1, x2, current.wind.speed, next.wind.speed)
            const windDeg = interpolate(x, x1, x2, current.wind.deg, next.wind.deg)

            hourlyData.push({
               time: new Date(x * 1000).toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' }),
               temp: temp.toFixed(1),
               wind_speed: windSpeed.toFixed(1),
               wind_deg: Math.round(windDeg),
               humidity: current.main.humidity, // 3시간마다 그대로 사용
               rain: current.rain ? current.rain['3h'] || 0 : 0,
               pop: current.pop, // 강수 확률
               weather: current.weather[0].main,
               icon: current.weather[0].icon,
            })
         }
      }

      return hourlyData
   }

   // 3. 24시간 데이터 생성
   const hourly = generateHourlyData(forecast.list).slice(0, 24)

   // 4. 다른 데이터 처리
   const now = {
      id: weather.id,
      name: weather.name,
      temp: weather.main.temp,
      weather: weather.weather[0].main,
      icon: weather.weather[0].icon,
   }

   const air = {
      pm2_5: airPollution.components.pm2_5,
      pm10: airPollution.components.pm10,
   }

   const daily = [] // Daily 데이터도 여기에 추가 가공 필요

   return {
      now,
      air,
      hourly,
      daily,
   }
}

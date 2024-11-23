export const getHome = ({ weather, forecast, airPollution }) => {
   console.log(weather)
    console.log('forecast',forecast)

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
      pm2_5: airPollution.list[0].components.pm2_5,
      pm10: airPollution.list[0].components.pm10,
   }

   const daily = [] // Daily 데이터도 여기에 추가 가공 필요

    console.log('now',now)
    console.log('air', air)
    console.log('hourly', hourly)
    console.log('daily', daily)


   return {
      now,
      air,
      hourly,
      daily,
   }
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

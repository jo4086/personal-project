import './css/HomeLayer.css'

function HomeLayer({ data }) {
   console.log('HomeLayer Data: ', data)
   const weather = data.weather
   const forecast = data.forecast
   const air_pollution = data.airPollution
   return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <div className="box box1" style={{ width: '100%', backgroundColor: 'yellow' }}>
            <p>대한민국 현재날씨</p>
            <div style={{ boxSizing: 'border-box', border: '1px 1px solid black', backgroundColor: 'tan', width: '50%' }}>
               <img src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} width={170} style={{ padding: '0px', margin: '0' }} />
               <div className='Image'></div>
               <ul>
                  <li style={{ fontWeight: 'bold' }}>현재기온</li>
                  <li style={{ fontSize: '4em' }}>{weather.temp.toFixed(1)}</li>
                  <li></li>
               </ul>
            </div>
            <div>h1</div>
         </div>
         <div className="box box2">2</div>
         <div className="box box3">3</div>
         <h4>Home, Left Layer</h4>
      </div>
   )
}

export default HomeLayer

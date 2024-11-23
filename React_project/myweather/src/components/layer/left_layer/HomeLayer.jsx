import './css/HomeLayer.css'
import * as L from './css/leftStyled'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function HomeLayer({ data, region }) {
   const [state, setState] = useState('대한민국 (Republic of Korea)')
   const weather = data.weather
   const forecast = data.forecast
   const air_pollution = data.airPollution

   const navigate = useNavigate()

   console.log(data)
   useEffect(() => {
      if (region === 'south-korea') {
         return
      }
      setState(region)
   }, [region])

   const link = () => {
      navigate(`/weather/${region}/detail`)
   }
   return (
      <>
         <L.title>{state}</L.title>
         {/* <p style={{ margin: '5px 0' }}>{weather.date} 업데이트</p> */}
         <L.module>
            <L.header>
               <L.sub_title>
                  <span style={{ fontSize: '1.0em', fontWeight: 'normal' }}>
                     업데이트 시간 <span style={{ margin: '5px 0', fontSize: '0.8em' }}>{data.weather.date} </span>
                  </span>
               </L.sub_title>
               <L.details_button type="button" onClick={link} style={{ margin: '0px', padding: '5px 20px', borderRadius: '10px' }}>
                  자세히 보기
               </L.details_button>
            </L.header>
            <L.container>
               <L.flexBox>
                  <L.flexItemImage icon={weather.icon}><div style={{float:"right", width:'40%', border:'1px solid black',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center'}}>맑음</div></L.flexItemImage>
                  <L.flexItem1></L.flexItem1>
                  <L.flexItem2></L.flexItem2>
                  <L.flexItem2></L.flexItem2>
               </L.flexBox>
            </L.container>
         </L.module>
      </>
   )
}

export default HomeLayer

/* 
<L.leftBox1 style={{ border: '1px solid black' }}>
         <L.flexBox style={{ display: 'flex' }}>
         </L.flexBox>
      </L.leftBox1>
      <L.rightBox1 style={{ border: '1px solid black' }}></L.rightBox1>
 */


/* 
Parameter	English	Your language
200	thunderstorm with light rain	가벼운 비를 동반한 천둥구름
201	thunderstorm with rain	비를 동반한 천둥구름
202	thunderstorm with heavy rain	폭우를 동반한 천둥구름
210	light thunderstorm	약한 천둥구름
211	thunderstorm	천둥구름
212	heavy thunderstorm	강한 천둥구름
221	ragged thunderstorm	불규칙적 천둥구름
230	thunderstorm with light drizzle	약한 연무를 동반한 천둥구름
231	thunderstorm with drizzle	연무를 동반한 천둥구름
232	thunderstorm with heavy drizzle	강한 안개비를 동반한 천둥구름
300	light intensity drizzle	가벼운 안개비
301	drizzle	안개비
302	heavy intensity drizzle	강한 안개비
310	light intensity drizzle rain	가벼운 적은비
311	drizzle rain	적은비
312	heavy intensity drizzle rain	강한 적은비
313	shower rain and drizzle	소나기와 안개비
314	heavy shower rain and drizzle	강한 소나기와 안개비
321	shower drizzle	소나기
500	light rain	악한 비
501	moderate rain	중간 비
502	heavy intensity rain	강한 비
503	very heavy rain	매우 강한 비
504	extreme rain	극심한 비
511	freezing rain	우박
520	light intensity shower rain	약한 소나기 비
521	shower rain	소나기 비
522	heavy intensity shower rain	강한 소나기 비
531	ragged shower rain	불규칙적 소나기 비
600	light snow	가벼운 눈
601	snow	눈
602	heavy snow	강한 눈
611	sleet	진눈깨비
612	shower sleet	소나기 진눈깨비
615	light rain and snow	약한 비와 눈
616	rain and snow	비와 눈
620	light shower snow	약한 소나기 눈
621	shower snow	소나기 눈
622	heavy shower snow	강한 소나기 눈
701	mist	박무
711	smoke	연기
721	haze	연무
731	sand, dust whirls	모래 먼지
741	fog	안개
751	sand	모래
761	dust	먼지
762	volcanic ash	화산재
771	squalls	돌풍
781	tornado	토네이도
800	clear sky	구름 한 점 없는 맑은 하늘
801	few clouds	약간의 구름이 낀 하늘
802	scattered clouds	드문드문 구름이 낀 하늘
803	broken clouds	구름이 거의 없는 하늘
804	overcast clouds	구름으로 뒤덮인 흐린 하늘
900	tornado	토네이도
901	tropical storm	태풍
902	hurricane	허리케인
903	cold	한랭
904	hot	고온
905	windy	바람부는
906	hail	우박
951	calm	바람이 거의 없는
952	light breeze	약한 바람
953	gentle breeze	부드러운 바람
954	moderate breeze	중간 세기 바람
955	fresh breeze	신선한 바람
956	strong breeze	센 바람
957	high win	돌풍에 가까운 센 바람
958	gale	돌풍
959	severe gale	심각한 돌풍
960	storm	폭풍
961	violent storm	강한 폭풍
962	hurricane	허리케인
 */
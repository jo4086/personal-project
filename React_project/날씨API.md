API Data (json)

```
{
  "coord": {
    "lon": 126.4161,
    "lat": 37.45
  },
  "weather": [
    {
      "id": 500,
      "main": "Rain",
      "description": "실 비",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 14.93,
    "feels_like": 14.36,
    "temp_min": 14.93,
    "temp_max": 15.99,
    "pressure": 1021,
    "humidity": 72,
    "sea_level": 1021,
    "grnd_level": 1019
  },
  "visibility": 10000,
  "wind": {
    "speed": 4.12,
    "deg": 130
  },
  "clouds": {
    "all": 75
  },
  "dt": 1731546000,
  "sys": {
    "type": 1,
    "id": 8093,
    "country": "KR",
    "sunrise": 1731535969,
    "sunset": 1731572694
  },
  "timezone": 32400,
  "id": 1843561,
  "name": "Incheon",
  "cod": 200
}
```

# Open Weather 개발과정

## 목차

-  ### 개요

   -  목표 및 필요기능

      -  화면 설계
      -  API key 발급
      -  기본 정보
      -  폴더 구조 작성

-  ### Chapter1.

-  ### API 가져오기
-  ### 폴더 구조 작성
-  ### Non

---

-  화면설계
   1. 홈

## 필수 사항

-  화면 설계 (figma)\
   => figma 가입하기\
   => 페이지별 설명 및 예시 이미지

-  openWeather key 발급\
   => openWeather 가입\
   => 현재날씨 & 5일 날씨

-  폴더 구조 작성하기

-

-  **API 가져오기**

> API Key : f24ef11ff3ac3759827b92ca024bf829

-  쿼리 파라
-  현재 날씨
-  5일 날씨
-  날씨 아이콘

-  날씨 아이콘 이미지\
   https://openweathermap.org/img/wn\
   json Data에서 \< "icon": "10d" >의 10d가 날씨 이미지 정보\
   크기 배율조절은 뒤에 [ $\textsf{@}\bf{\it{n}}\textsf{x}$ ] : n배율

   > 기본 크기 50px x 50px\
   > https://openweathermap.org/img/wn/10d.png \
   > [@2x] 2배율 100px x 100px \
   > https://openweathermap.org/img/wn/10d@2x.png \
   > [@4x] 4배율 200px x 200px \
   > https://openweathermap.org/img/wn/10d.png

-  현재 날씨

   > api.openweathermap.org/data/2.5/weather?\
   > q={city name}&\
   > appid={api key}&\
   > units={measurement}&\
   > lang={country}\
   > \
   > ▼ 현재 사용 코드\
   > api.openweathermap.org/data/2.5/weather?q=incheon&appid=f24ef11ff3ac3759827b92ca024bf829&units=metric&lang=kr

   쿼리 파라 : q, appid, units, lang

   -  q : 도시 이름\
      => incheon
   -  appid : API 인증키\
      => f24ef11ff3ac3759827b92ca024bf829
   -  units : 측정단위\
      => metric (섭씨)
   -  lang : 지원언어\
      => kr

-  5일치 날씨

   > api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}&units={measurement}&lang={country}
   >
   > > api.openweathermap.org/data/2.5/forecast?\
   > > q={city name}&\
   > > appid={API key}&\
   > > units={measurement}&\
   > > lang={country}
   >
   > api.openweathermap.org/data/2.5/forecast?q=incheon&appid=f24ef11ff3ac3759827b92ca024bf829

-  대한민국 8도 지역명 및 id

   > api.openweathermap.org/data/2.5/group?id=1835847,1841610,1843125,1845106,1845105,1845789,1845105,1845105, 1845789,1845788,1841597,1902028,1846265&appid=f24ef11ff3ac3759827b92ca024bf829&units=metric&lang=kr

   > 1835847,1841610,1843125,1845106,1845105,1845789,1845105,1845105, 1845789,1845788,1841597,1902028,1846265

   -  대한민국 : Republic of Korea\
       id : 1835841\
      lon : 127.5\
      lat : 37.0

   -  서울 : Seoul
   -  세종특별자치시 : Sejong
   -  광역시
      -  인천 : Incheon\
         id : 1843561\
         "coord" : {\
          "lon": 126.731667,\
          "lat": 37.453609\
          }
      -  대전 : Daejson
      -  광주 : Gwangju
      -  대구 : Daegu
      -  울산 : Ulsan
      -  부산 : Busan

-  ### 시, 도

   -  [서울](#서울--seoul)
   -  [경기도](#경기도--gyeonggi-do)
   -  [강원도](#강원도--gangwon-do)
   -  [충청북도](#충청북도--chungcheongbuk-do)
   -  [충청남도](#충청남도--chungcheongnam-do)
   -  [전라북도](#전라북도--jeollabuk-do)
   -  [전라남도](#전라남도--jeollanam-do)
   -  [경상북도](#경상북도--gyeongsangbuk-do)
   -  [경상남도](#경상남도--gyeongsangnam-do)
   -  [제주도](#제주도--jeju-do)

      -  #### [서울 : Seoul](#시-도)
         id : 1835847

      ```
         {
         "id": 1835847,
         "name": "Seoul",
         "state": "",
         "country": "KR",
         "coord": {
         "lon": 127.0,
         "lat": 37.583328
             }
         }
      ```

      -  #### [경기도 : Gyeonggi-do](#시-도)
         id : 1841610

      ```
         {
         "id": 1841610,
         "name": "Gyeonggi-do",
         "state": "",
         "country": "KR",
         "coord": {
         "lon": 127.75,
         "lat": 37.599998
             }
         }
      ```

      -  #### [강원도 : Gangwon-do](#시-도)
         id : 1843125

      ```
         {
         "id": 1843125,
         "name": "Gangwon-do",
         "state": "",
         "country": "KR",
         "coord": {
         "lon": 128.25,
         "lat": 37.75
             }
         }
      ```

      -  #### [충청북도 : Chungcheongbuk-do](#시-도)
         id : 1845106

      ```
         {
         "id": 1845106,
         "name": "Chungcheongbuk-do",
         "state": "",
         "country": "KR",
         "coord": {
         "lon": 128.0,
         "lat": 36.75
             }
         }
      ```

      -  #### [충청남도 : Chungcheongnam-do](#시-도)
         id : 1845105

      ```
         {
         "id": 1845105,
         "name": "Chungcheongnam-do",
         "state": "",
         "country": "KR",
         "coord": {
         "lon": 127.0,
         "lat": 36.5
             }
         }
      ```

      -  #### [전라북도 : Jeollabuk-do](#시-도)
         id : 1845789

      ```
         {
         "id": 1845789,
         "name": "Jeollanam-do",
         "state": "",
         "country": "KR",
         "coord": {
         "lon": 127.25,
         "lat": 35.75
             }
         }
      ```

      -  #### [전라남도 : Jeollanam-do](#시-도)
         id: 1845788

      ```
         {
         "id": 1845788,
         "name": "Jeollanam-do",
         "state": "",
         "country": "KR",
         "coord": {
         "lon": 127.0,
         "lat": 34.75
             }
         }
      ```

      -  #### [경상북도 : Gyeongsangbuk-do](#시-도)
         id : 1841597

      ```
         {
         "id": 1841597,
         "name": "Gyeongsangbuk-do",
         "state": "",
         "country": "KR",
         "coord": {
         "lon": 128.75,
         "lat": 36.333328
             }
         }
      ```

      -  #### [경상남도 : Gyeongsangnam-do](#시-도)
         id : 1902028

      ```
         {
         "id": 1902028,
         "name": "Gyeongsangnam-do",
         "state": "",
         "country": "KR",
         "coord": {
         "lon": 128.25,
         "lat": 35.25
             }
         }
      ```

      -  #### [제주도 : Jeju-do](#시-도)
         id : 1846265

      ```
      {
      "id": 1846265,
      "name": "Jeju-do",
      "state": "",
      "country": "KR",
      "coord": {
      "lon": 126.5,
      "lat": 33.416672
         }
      }
      ```

   참고 데이터

   ```
   # 받은 값 JSON 형태로 정제하여 반환
   items = json.loads(res)
   print(items)
   print("============================")
   print("도시명 : %r" % items['name'])
   print("============================")
   print("날씨 : %r" % items['weather'][0]['main'])
   print("날씨상세 : %r" % items['weather'][0]['description'])
   print("아이콘 : %r  (사이트참조: https://openweathermap.org/weather-conditions)" % items['weather'][0]['icon'])
   print("============================")
   print("현재온도 : %r" % str(int(items['main']['temp'])-273.15))
   print("체감온도 : %r" % str(int(items['main']['feels_like'])-273.15))
   print("최저온도 : %r" % str(int(items['main']['temp_min'])-273.15))
   print("최고온도 : %r" % str(int(items['main']['temp_max'])-273.15))
   print("습도 : %r" % items['main']['humidity'])
   print("기압 : %r" % items['main']['pressure'])
   print("============================")
   print("가시거리 : %r" % items['visibility'])
   print("풍속 : %r" % items['wind']['speed'])
   print("풍향 : %r" % items['wind']['deg'])
   print("============================")
   #print("강수량 : %r (시간당)" % items['rain']['1h']) #비 올때만 생김
   print("============================")
   print("구름 : %r " % items['clouds']['all'])
   print("일출 : %r " % items['sys']['sunrise'])
   print("일몰 : %r " % items['sys']['sunset'])
   print("============================")


   ```

날씨별 description\
온흐림 : overcast clouds\
실 비 : moderate rain\
튼구름 : broken clouds\
구름조금 : scattered clouds\
맑음 : clear sky\
박무 : mist\
약간의 구름이 낀 하늘 : few clouds

snow
thunderstorm
rain
shower rain

Group 7xx : Atmosphere

| 코드 | 영문  |        d         | 번역 |
| :--: | :---: | :--------------: | :--: |
| 711  | Smoke |        d         |  d   |
| 721  | Haze  |        d         |  d   |
| 731  | Dust  | sand/dust whirls |  d   |
| 741  |  Fog  |                  | 안개 |
| 751  | Sand  |                  |  ㅇ  |
| 761  | Dust  |       dust       |  d   |

|

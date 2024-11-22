function AqiCircle({ data }) {
   const set = data.aqi
   const segments = [
      { range: [0, 50], color: '#00E400' }, // 좋음
      { range: [51, 100], color: '#FFFF00' }, // 보통
      { range: [101, 150], color: '#FF7E00' }, // 민감군
      { range: [151, 200], color: '#FF0000' }, // 나쁨
      { range: [201, 300], color: '#8b00ff' }, // 매우 나쁨
      { range: [301, 500], color: '#99004C' }, // 위험
   ]

   const totalAngle = 360 // 전체 원의 각도
   const center = { x: 50, y: 50 } // SVG 중심 좌표
   const radius = 45 // 도넛 차트 외부 반지름
   const innerRadius = 32 // 도넛 차트 내부 반지름

   // 현재 데이터 값에 해당하는 색상 찾기
   const segment = segments.find(({ range }) => set >= range[0] && set <= range[1])
   const fillColor = segment ? segment.color : '#ccc' // 기본 색상은 회색

   // 현재 데이터 값에 따른 채워야 할 각도 계산
   const filledAngle = (set / 500) * totalAngle // 전체 비율 계산
   const startAngle = -90 // 상단(90도)에서 시작
   const endAngle = startAngle + filledAngle

   if (filledAngle === 360) {
      // 완전한 원을 그릴 경우
      return (
         <svg width="100" height="100" viewBox="0 0 100 100">
            <defs>
               <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#000" floodOpacity="0.7" />
               </filter>
            </defs>
            {/* 완전한 원을 <circle>로 표현 */}
            <circle cx={center.x} cy={center.y} r={radius} fill={fillColor} filter="url(#shadow)" />
            <circle cx={center.x} cy={center.y} r={innerRadius} fill="#fff" />
            <text x={center.x} y={center.y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#000">
               {set}
            </text>
         </svg>
      )
   }

   // 시작과 끝 좌표 계산
   const startX = center.x + radius * Math.cos((Math.PI / 180) * startAngle)
   const startY = center.y + radius * Math.sin((Math.PI / 180) * startAngle)
   const endX = center.x + radius * Math.cos((Math.PI / 180) * endAngle)
   const endY = center.y + radius * Math.sin((Math.PI / 180) * endAngle)

   // 큰 호인지 판단
   const largeArcFlag = filledAngle > 180 ? 1 : 0

   // path 데이터 생성
   const pathData = `
    M ${startX} ${startY}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
    L ${center.x} ${center.y} Z
  `

   return (
      <svg width="250" height="250" viewBox="0 0 100 100">
         {/* <circle cx={center.x} cy={center.y} r={radius} fill="#cccc" filter="url(#shadow)" /> */}
         <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
               <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="#000" floodOpacity="0.7" />
            </filter>
         </defs>
         <circle cx={center.x} cy={center.y} r={radius} fill="#cccc" filter="url(#shadow)" />

         {/* 도넛 차트 */}
         <path d={pathData} fill={fillColor} />
         {/* 도넛 중심의 빈 공간 */}
         <circle cx={center.x} cy={center.y} r={innerRadius} fill="#fff" filter="url(#shadow)" />
         <text x={center.x} y={center.y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#000">
            {/* {set} */}
            <tspan x={center.x} dy="-3">
               {set}
            </tspan>
            <tspan x={center.x} dy="10" fontSize="6" fill="#666">
                  AQI
            </tspan>
         </text>
      </svg>
   )
}

export default AqiCircle

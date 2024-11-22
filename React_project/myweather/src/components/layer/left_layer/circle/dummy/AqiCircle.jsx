function AqiCircle({ data }) {
   const set = 100
   const segments = [
      { range: [0, 50], color: '#00E400' }, // 좋음
      { range: [51, 100], color: '#FFFF00' }, // 보통
      { range: [101, 150], color: '#FF7E00' }, // 민감군
      { range: [151, 200], color: '#FF0000' }, // 나쁨
      { range: [201, 300], color: '#99004C' }, // 매우 나쁨
      { range: [301, 500], color: '#000000' }, // 위험
   ]

   const totalSegments = 6 // 전체 구간 개수
   const totalAQI = 500 // AQI 최대값
   const totalAngle = 360 // 전체 원의 각도
   const center = { x: 50, y: 50 } // SVG 중심 좌표
   const radius = 40 // 도넛 차트 외부 반지름
   const innerRadius = 25 // 도넛 차트 내부 반지름

   const segmentAngle = totalAngle / totalSegments
   console.log(segmentAngle)
   const angles = segments.map(({ range }) => {
      const [min, max] = range
      return ((max - min) / totalAQI) * totalAngle
   })

   let filledAngle = (set / totalAQI) * totalAngle
   let remainingAngle = filledAngle
   console.log(filledAngle)
   console.log('segment', segmentAngle)
   let startAngle = -90
   return (
      <svg width="100" height="100" viewBox="0 0 100 100">
         <circle cx={center.x} cy={center.y} r={radius} fill="#cccc" />
         {segments.map(({ color }, index) => {
            const currentSegmentAngle = Math.min(remainingAngle, segmentAngle)
            const endAngle = startAngle + currentSegmentAngle

            // 시작과 끝 좌표 계산
            const startX = center.x + radius * Math.cos((Math.PI / 180) * startAngle)
            const startY = center.y + radius * Math.sin((Math.PI / 180) * startAngle)
            const endX = center.x + radius * Math.cos((Math.PI / 180) * endAngle)
            const endY = center.y + radius * Math.sin((Math.PI / 180) * endAngle)

            // 큰 호인지 판단
            const largeArcFlag = currentSegmentAngle > 180 ? 1 : 0

            // path 데이터 생성
            const pathData = `
          M ${startX} ${startY}
          A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
          L ${center.x} ${center.y} Z
        `

            // 다음 시작 각도 설정 및 남은 각도 감소
            remainingAngle -= currentSegmentAngle
            startAngle = endAngle

            // 남은 각도가 없으면 그리기를 중단
            if (currentSegmentAngle <= 0) return null

            return <path key={index} d={pathData} fill={color} />
         })}
         {/* 도넛 중심의 빈 공간 */}
         <circle cx={center.x} cy={center.y} r={innerRadius} fill="#fff" />
      </svg>
   )
}

export default AqiCircle

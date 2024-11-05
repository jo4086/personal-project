const importAll = (r) => {
   let images = {}
   r.keys().forEach((item) => {
      images[item.replace('./', '')] = r(item)
   })
   console.log(images)

   return images
}

// 이미지 가져오기
const images = importAll(require.context('../images/pokemon', false, /\w_/))
// console.log(images)

const PokeListImages = () => {
   // 이미지 배열 생성
   const imageArray = Object.keys(images).map((key) => {
      const parts = key.split('_')
      const prefix = parts[0]
      const suffix = parts[1]?.split('.')[0] // 뒤 숫자를 분리하고 확장자 제거

      const tribeNumber = prefix.slice(0, 4) // 앞 4자리 숫자
      const suffixNumber = suffix || '' // 뒤 숫자 (없으면 빈 문자열)

      return {
         tribeNumber, // 종족 번호
         suffixNumber, // 뒤 2자리 숫자
         isTribeName: suffixNumber === '00', // 종족명 여부
         name: key.split('.')[0].split('_')[1], // 파일 이름 (확장자 제외)
         trinumber: key.split('.')[0].split('_')[0],
         src: images[key], // 이미지 경로
      }
   })

   // 종족별로 묶기
   const tribes = {}
   imageArray.forEach((image) => {
      if (!tribes[image.tribeNumber]) {
         tribes[image.tribeNumber] = {
            tribeName: null,
            members: [],
         }
      }

      if (image.isTribeName) {
         tribes[image.tribeNumber].tribeName = image.name // 종족명 설정
      } else {
         tribes[image.tribeNumber].members.push(image) // 종족 멤버 추가
      }
   })
   console.log(imageArray)
   console.log(tribes)
   return (
      <div>
         {Object.keys(tribes).map((tribeNumber) => (
            <div key={tribeNumber}>
               {/* 종족명 */}
               <h2>{tribes[tribeNumber].tribeName || `Tribe ${tribeNumber}`}</h2>
               {tribes[tribeNumber].members.map((member) => (
                  <div key={member.name}>
                     {/* 포켓몬 이름 */}
                     <h3>{member.name}</h3>
                     <h3>{member.trinumber}</h3>
                     {/* 이미지 */}
                     <img src={member.src} alt={member.name} style={{ width: '100px', height: '100px' }} />
                  </div>
               ))}
            </div>
         ))}
      </div>
   )
}

export default PokeListImages

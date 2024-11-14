/* function importAll(img) {
   let images = {}
   img.keys().forEach((item) => {
      images[item.replace('./', '')] = img(item)
   })
   return images
}

const images = importAll(require.context('../images/pokemon', false, /\.png$/))

function PokeImages() {
    const imageArray = Object.keys(images).map((key))
    

}

export default PokeImages */

const importAll = (r) => {
   console.log('r.keys()', r.keys())
   let images = {}
   r.keys().forEach(
      (item) => {
         images[item.replace('./', '')] = r(item)
      }
      // { images[item.replace('.', 'd')] = r(item); }
   )
   console.log('images', images)
   return images
}

// 이미지 가져오기
const images = importAll(require.context('../images/pokemon', false, /\w_/))
console.log('Object.keys(images)', Object.keys(images))
// console.log('Object.keys(images)', Object.keys(images))
const PokeImages = () => {
   // 이미지 이름을 기준으로 객체 배열 생성
   const imageArray = Object.keys(images).map((key) => ({
      tribenumber: key.split('_')[0].slice(0, 4),
      //    test: Math.floor(key.split('_')[0].slice(0, 6)/100)*100
      /* if(test: Math.floor(key.split('_')[0].slice(0, 6)/100)*100) */
      //   test3: if(key.split('.')[0].split('_')[0])
      //    testtt : if( Math.floor(key.split('_')[0].slice(0, 6) / 100) * 100 == key.split('.')[0].split('_')[0] ) {}
      test2: key.split('.')[0].split('_')[0],
      test: Math.floor(key.split('_')[0].slice(0, 6) / 100) * 100,
      //    tribes: if(key.split('.')[0].split('_').join().replace(',', '')=1 ){return '00'}
      tribe: key.split('.')[0].split('_').join().replace(',', ''),
      name: key.split('.')[0], // 파일 이름 (확장자 제외)
      src: images[key], // 이미지 경로
   }))
      console.log('개체정보', imageArray)


   return (
      <div>
         {imageArray.map((image) => (
            <div key={image.name}>
               <h3>{image.name}</h3>
               <img src={image.src} alt={image.name} style={{ width: '100px', height: '100px' }} />
            </div>
         ))}
      </div>
   )
}

export default PokeImages

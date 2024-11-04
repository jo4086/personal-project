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
   let images = {};
   r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
   return images;
};

// 이미지 가져오기
const images = importAll(require.context('../images/pokemon', false, /\.png$/));

const PokeImages = () => {
   // 이미지 이름을 기준으로 객체 배열 생성
   const imageArray = Object.keys(images).map((key) => ({
       name: key.split('.')[0], // 파일 이름 (확장자 제외)
       src: images[key], // 이미지 경로
   }));

   return (
       <div>
           {imageArray.map((image) => (
               <div key={image.name}>
                   <h3>{image.name}</h3>
                   <img src={image.src} alt={image.name} style={{ width: '100px', height: '100px' }} />
               </div>
           ))}
       </div>
   );
};

export default PokeImages;
import './css/PokeTemplate.css'

function PokeTemplate({children}) {
   return (
      <div className="container">
         <div></div>
           <div>{children}</div>
      </div>
   )
}
export default PokeTemplate

/*
import React from 'react';

// 이미지 파일들을 자동으로 가져오기
const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
};

// 이미지 가져오기
const images = importAll(require.context('./images/pokemon', false, /\.png$/));

const ImageList = () => {
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

export default ImageList;
 */

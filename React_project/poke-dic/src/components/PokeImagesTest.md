1. **[ const images = importAll(require.context('../images/pokemon', false, /\w_/)) ]** 에서 이미지 폴더의 포켓몬 이미지를 가져옴
2. 이때 **_[ importAll ]_** 함수 호출
3. **_[ importAll ]_** 함수에서 images 객체 생성
   -  **_[ importAll ]_** 의 매개변수 **( r )** 에 [ _require.context('../images/pokemon', false, /\w__/) ]가 들어감
   -  이미지파일의 경로에서 정규표현식을 통해 언더바가 있는 파일들을 ./이미지이름.png을 보냄
4.  **_[ importAll ]_** 함수에서 받은 매개변수에 키속성으로 forEach로 순회시키며 이미지에 배열형태로 key 이름을 저장시킴
> ```
   > const importAll = (r) => {
   >  let images = {}
   >  r.keys().forEach((item) => {
   >     images[item.replace('./', '')] = r(item)
   >  })
   >  return images
   > }
   > ```

5. 
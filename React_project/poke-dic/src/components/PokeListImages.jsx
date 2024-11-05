import React from 'react';

// 이미지 가져오기 함수
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

// 이미지 가져오기
const images = importAll(require.context('../images/pokemon', false, /\w_/));

console.log(images)
// console.log(JSON.stringify(images, null, 3))
console.log(Object.keys(images))
// console.log(Object.keys(images).split('_'))

// 포켓몬 정보 추출 함수
function extractPokemonInfo(fileName) {
// console.log(fileName.split('_')[0])
   // console.log(fileName.split('_')[1])
   // console.log(parseInt(fileName.split('_')[0], 10))
   console.log(Math.floor(parseInt(fileName.split('_')[0]/10000)))
   
  const [idPart, name] = fileName.split('_');
  const id = parseInt(idPart, 10);
  const speciesNumber = Math.floor(id / 10000); // 종족 번호
  const evolutionStage = Math.floor((id % 10000) / 100); // 진화 단계
   const specialEvolution = id % 100; // 특수 진화 여부

  return {
    name: name.replace('.png', ''),
    speciesNumber,
    evolutionStage,
    specialEvolution,
    fullId: id,
  };
}


function PokeListImages() {
  // 모든 포켓몬 정보를 가져오기
  const pokemonArray = Object.keys(images).map((fileName) =>
    extractPokemonInfo(fileName)
   );
  // 종족별 최대 진화 단계를 계산
  const maxEvolutionStages = {};
  pokemonArray.forEach((pokemon) => {
    if (
      !maxEvolutionStages[pokemon.speciesNumber] ||
      maxEvolutionStages[pokemon.speciesNumber] < pokemon.evolutionStage
    ) {
      maxEvolutionStages[pokemon.speciesNumber] = pokemon.evolutionStage;
    }
  });

  // 최대 진화 단계까지만 포함하도록 필터링
  const filteredPokemonArray = pokemonArray.filter(
    (pokemon) =>
      pokemon.evolutionStage <= maxEvolutionStages[pokemon.speciesNumber]
  );

  return (
    <div className="poke-list-images">
      {filteredPokemonArray.map((pokemon, index) => (
        <div key={index} className="poke-item">
          <img
            // src={images[`${pokemon.fullId}_${pokemon.name}.png`]}
            src='../images/pokemon/000010_이상해씨.png'
            alt={pokemon.name}
          />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}

export default PokeListImages;

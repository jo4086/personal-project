import './css/PokeListImages.css'
import React from 'react'

// 이미지 가져오기 함수
const importAll = (r) => {
   let images = {}
   r.keys().forEach((item) => {
      images[item.replace('./', '')] = r(item)
   })
   return images
}

// 이미지 가져오기
const images = importAll(require.context('../images/pokemon', false, /\w_/))
console.log(images)
// console.log(Object.keys(images).length)

// 포켓몬 정보 추출 함수
function extractPokemonInfo(fileName) {
   const [idPart, name] = fileName.split('_')
   const id = parseInt(idPart, 10)
   const speciesNumber = Math.floor(id / 10000) // 종족 번호
   const evolutionStage = Math.floor((id % 10000) / 100) // 진화 단계
   const specialEvolution = id % 100 // 특수 진화 여부

   return {
      name: name.replace('.png', ''),
      speciesNumber,
      evolutionStage,
      specialEvolution,
      fullId: id,
      src: images[fileName],
   }
}

function PokeListImages() {
   // 모든 포켓몬 정보를 가져오기
   const pokemonArray = Object.keys(images).map((fileName) => extractPokemonInfo(fileName))
   // 종족별 최대 진화 단계를 계산
   const maxEvolutionStages = {}
   pokemonArray.forEach((pokemon) => {
      if (!maxEvolutionStages[pokemon.speciesNumber] || maxEvolutionStages[pokemon.speciesNumber] < pokemon.evolutionStage) {
         maxEvolutionStages[pokemon.speciesNumber] = pokemon.evolutionStage
      }
   })

   // 최대 진화 단계까지만 포함하도록 필터링
   const filteredPokemonArray = pokemonArray.filter((pokemon) => pokemon.evolutionStage <= maxEvolutionStages[pokemon.speciesNumber])

   return (
      <div className="poke-list-images">
         {filteredPokemonArray.map((pokemon, index) => (
            <div key={index} className="poke-item">
               <img src={pokemon.src} alt={pokemon.name} style={{ width: '100px', height: '100px' }} />
               <p>{pokemon.name}</p>
            </div>
         ))}
      </div>
   )
}

export default PokeListImages

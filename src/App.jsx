import "./App.css"
import Header from "./components/Header"
import Main from "./components/Main"
import { useState } from "react"
import { useEffect } from "react"

export default function App() {
  const [pokemons, setPokemons] = useState([])
  const [score, setScore] = useState({ score: 0, bestScore: 0 })
  const [clickedPokemonId, setClickedPokemonId] = useState(new Set())

  useEffect(() => {
    let ignore = false
    fetch("https://dummyapi.online/api/pokemon")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          const updatedData = data.map((poke) => {
            const { id, pokemon, image_url } = poke
            return { id, pokemon, image_url, isSelected: false }
          })
          setPokemons(shuffleArray(updatedData))
        }
      })
    return () => {
      ignore = true
    }
  }, [])

  function handleClick(id) {
    if (clickedPokemonId.has(id)) {
      setScore((prev) => ({
        ...prev,
        score: 0,
        bestScore: Math.max(prev.score, prev.bestScore),
      }))
      setClickedPokemonId(new Set())
    } else {
      setClickedPokemonId((prev) => new Set(prev).add(id))
      setScore((prevScore) => ({ ...prevScore, score: prevScore.score + 1 }))
      setPokemons((prev) => shuffleArray(prev))
    }
  }

  function shuffleArray(arr) {
    let i = arr.length,
      random,
      temp
    while (--i > 0) {
      random = Math.floor(Math.random() * (i + 1)) // Get random number ranging between 0 and i
      temp = arr[random]
      arr[random] = arr[i]
      arr[i] = temp
    }
    return arr
  }

  console.log(pokemons)
  return (
    <>
      <Header score={score} />
      <Main pokemons={pokemons} handleClick={handleClick} />
    </>
  )
}

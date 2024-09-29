import "./App.css"
import Header from "./components/Header"
import Main from "./components/Main"
import { useState } from "react"
import { useEffect } from "react"

export default function App() {
  const [pokemons, setPokemons] = useState([])
  const [score, setScore] = useState({ score: 0, bestScore: 0 })

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
    setPokemons((prev) => {
      return prev.map((pokemon) => {
        if (pokemon.id === id) {
          if (!pokemon.isSelected) {
            setScore({ ...score, score: score.score + 1 })
            return {
              ...pokemon,
              isSelected: true,
            }
          } else {
            alert("You lost")
          }
        }
        return pokemon
      })
    })

    setPokemons((prev) => shuffleArray(prev))
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

import "./Main.css"

export default function Main({ pokemons, handleClick }) {
  return (
    <main>
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          className="card"
          onClick={() => handleClick(pokemon.id)}
        >
          <img src={pokemon.image_url} alt={pokemon.pokemon} />
          <p>{pokemon.pokemon}</p>
        </div>
      ))}
    </main>
  )
}

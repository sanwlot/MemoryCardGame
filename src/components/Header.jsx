import "./Header.css"

export default function Header({ score }) {
  return (
    <header>
      <h1>Memory Card Game</h1>
      <div className="scoreContainer">
        <p>Score: {score.score}</p>
        <p>Best Score: {score.bestScore}</p>
      </div>
    </header>
  )
}

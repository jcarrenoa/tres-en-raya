import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { TURNS, WINNER_LINES } from './constants'
import { checkWinner, checkEndGame } from './logic/board'
import './App.css'

function App() {
  
  const [board, setBoard ] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Resetear el juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              > 
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelect = {turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelect = {turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <section>
        <WinnerModal winner={winner} resetGame={resetGame} />
      </section>
    </main>
  )
}

export default App

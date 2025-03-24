import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelect, updateBoard, index }) => {
  
  const classN = `square ${isSelect ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={ handleClick } className={ classN }>
      {children}
    </div>
  )
}

const WINNER_LINES = [
  [0, 1, 2], // Horizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Vertical
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonal
  [2, 4, 6]
]

function App() {
  
  const [board, setBoard ] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  
  const checkWinner = (board) => {
    for (const combo of WINNER_LINES) {
      const [a, b, c] = combo
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const checkEndGame = (board) => {
    return board.every((cell) => cell !== null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
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
        {
          winner!==null && (
            <section className='winner'>
              <div className='text'>
                <h2>
                {
                  winner !== false ? 'El ganador es' : 'Empate'
                }
                </h2>

                <header className='win'>
                    {winner && <Square> {winner} </Square>}
                </header>

                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>

            </section>
          )
        }
      </section>
    </main>
  )
}

export default App

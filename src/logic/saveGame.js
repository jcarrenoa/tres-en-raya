export function saveGame({ board, turn }) {
    localStorage.setItem('board', JSON.stringify(board))
    localStorage.setItem('turn', turn)
}

export function delateGame() {
    localStorage.removeItem('board')
    localStorage.removeItem('turn')
}
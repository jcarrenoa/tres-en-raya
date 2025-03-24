export const Square = ({ children, isSelect, updateBoard, index }) => {
  
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
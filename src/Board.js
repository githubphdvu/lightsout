//https://perfectweb.org/ddo/solver/vale_puzzle.html
import React, {useState} from "react"
import Cell from "./Cell"
import "./Board.css"
/*3 props:nrows,ncols: number of rows,columns of board
 * - chanceLightStartsOn: float, chance any cell is lit at start
 * State:board: matrix rowsxcols of true/false , ex: [[f, f, f], [t, t, f], [f, f, f]]
 *  This should render an HTML table of individual <Cell /> components.
 *  This doesn't handle any clicks --- clicks are on individual cells
 **/
function Board({nrows=3,ncols=3,chanceLightStartsOn=0.25}){
    //initial create nrows x ncols board, each cell randomly lit or unlit
    const [board,setBoard] = useState(Array.from({length:nrows}).map(row=>Array.from({length:ncols}).map(cell=>Math.random()<chanceLightStartsOn)))
    function F(coord) {//Flip neighbor cells around a given cell
        setBoard( (oldBoard)=>{
            const [y, x] = coord.split("-").map(Number)
            const flipCell=(y,x,boardCopy)=>{// if this coord is actually on board, flip it
                if(x>=0 && x<ncols && y>=0 && y<nrows) boardCopy[y][x] = !boardCopy[y][x]
            }
            const boardCopy = oldBoard.map(row => [...row])
            flipCell(y, x, boardCopy)
            flipCell(y, x - 1, boardCopy)
            flipCell(y, x + 1, boardCopy)
            flipCell(y - 1, x, boardCopy)
            flipCell(y + 1, x, boardCopy)
            return boardCopy
        })
    }
    if (board.every(row => row.every(cell => cell))) return <div>You Won</div>

    // make table board(rows of Cell components)
    let tblBoard = []
    for (let y = 0; y < nrows; y++) {
        let row = []
        for (let x = 0; x < ncols; x++)
            row.push(<Cell key={`${y}-${x}`} isLit={board[y][x]} flipCellsAroundMe={evt=>F(`${y}-${x}`)}/>)
        tblBoard.push(<tr key={y}>{row}</tr>)
    }
    return (
        <table className="Board">
            <tbody>{tblBoard}</tbody>
        </table>
    )
}
export default Board

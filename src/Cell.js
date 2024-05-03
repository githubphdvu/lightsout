import React from "react"
import "./Cell.css"

/*return a cell,no state,2 props:
 * - flipCellsAroundMe() from parent Board component
 * - isLit: boolean, is this cell lit?
 * This handles clicks --- by calling flipCellsAroundMe
 */
function Cell({flipCellsAroundMe,isLit=false}){
    return <td className={`cell ${isLit ? "lit" : ""}`} onClick={flipCellsAroundMe} role="button" />
}
export default Cell
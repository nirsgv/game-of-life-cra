import React from 'react';
import Cell from './cell';
import boardUtils from "../utils/boardUtils";

const Board = (props) => {

    const {rows, columns, board} = props;

    // const rowsArr = Array.from({length: rows});
    // const columnsArr = Array.from({length: columns});

    return (
        <table>
            <tbody>
            {
                board.map((row, rowIndex, arr) =>
                    <tr key={boardUtils.genId()}>
                        {
                            row.map((column, columnIndex, arr) =>
                                <Cell key={boardUtils.genId()}
                                      rowIndex={rowIndex}
                                      columnIndex={columnIndex}
                                      toggleActive = {props.toggleActive}
                                      toggleHighlight={props.toggleHighlight}
                                      cellInfo = {column}
                                />
                            )
                        }
                    </tr>)
            }
            </tbody>
        </table>
    )
};
export default Board;
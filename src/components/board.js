import React from 'react';
import Cell from './cell';
import boardUtils from "../utils/boardUtils";

const Board = (props) => {
    const { board, toggleActive, toggleHighlight, paintCreature, highlightCreature, isMainBoard } = props;

    return (
        <table>
            <tbody>
            {board.map((row, rowIndex, arr) =>
                <tr key={boardUtils.genId()}>
                    {row.map((column, columnIndex, arr) =>
                        <Cell key={boardUtils.genId()}
                              rowIndex={rowIndex}
                              columnIndex={columnIndex}
                              toggleActive = {toggleActive}
                              toggleHighlight={toggleHighlight}
                              paintCreature={paintCreature}
                              highlightCreature={highlightCreature}
                              cellInfo = {column}
                              isFromMainBoard = {isMainBoard}
                        />
                    )}
                </tr>)}
            </tbody>
        </table>
    )
};
export default Board;
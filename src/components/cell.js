import React from 'react';


const Cell = (props) => {
    const {rowIndex, columnIndex, toggleActive, toggleHighlight, cellInfo } = props;
    return (
    <th
        onClick={() => toggleActive(rowIndex, columnIndex)}
        onMouseEnter={() => toggleHighlight(rowIndex, columnIndex, true)}
        className={`${cellInfo.cellActive ? 'active' : ''} ${cellInfo.cellHighlight ? 'highlight' : ''}`}
        data-test="cell"
    >
        -
    </th>)
};
export default Cell;

//data-rowColumnIndexes={props.rowColumnIndexes}
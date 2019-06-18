
class boardUtils {

    genInitialBoard = (rowCount, columnCount) => {
        return Array.from({length: rowCount}).map((row, index, arr) =>
            Array.from({length: columnCount}).map((column, index, arr) =>
                new this.CellData(false,false)));
    };

    genId = () => {
        return `_${Math.random().toString(36).substr(2, 9)}`;
    };

    CellData = function (cellActive = false, cellHighlight = false) {
        this.cellActive = cellActive;
        this.cellHighlight = cellHighlight;
    };

    toggleActive = (rowIndex, columnIndex,board) => {
        const newBoard = board.map((row, localRowIndex, arr) =>
            row.map((column, localColumnIndex, arr) => {
                if (localRowIndex == rowIndex && localColumnIndex == columnIndex) {
                    return Object.assign(column, {cellActive: !column.cellActive})
                } else {
                    return column;
                }
            }));
        return newBoard;
    };

    toggleHighlight = (rowIndex, columnIndex, board) => {
        const newBoard = board.map((row, localRowIndex, arr) =>
            row.map((column, localColumnIndex, arr) => {
                if (localRowIndex == rowIndex && localColumnIndex == columnIndex) {
                    return Object.assign(column, {cellHighlight: true})
                } else {
                    return Object.assign(column, {cellHighlight: false})
                }
            }));
        return newBoard;
    };

    randomBoard = (board) => {
        const newBoard = board.map((row) =>
            row.map((column) => {
                    return Object.assign(column, {cellActive: Boolean(Math.round(Math.random()))})
            }));
        return newBoard;
    };
}

export default new boardUtils();

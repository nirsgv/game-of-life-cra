
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

    checkHorizontalEdge = (curRow, curColumn, curBoard) => {
        if (curColumn === -1) {
            curColumn = curBoard[curRow].length - 1
        }
        if (curColumn >= curBoard[curRow].length) {
            curColumn = curColumn - curBoard[curRow].length;
        }
        return curColumn;
    };

    checkVerticalEdge = (curRow, curColumn, curBoard) => {
        if (curRow === -1) {
            curRow = curBoard.length - 1;
        }
        if (curRow >= curBoard.length) {
            curRow = curRow - curBoard.length;
        }
        return curRow;
    };

    randomBoard = (board) => {
        const newBoard = board.map((row) =>
            row.map((column) => {
                    return Object.assign(column, {cellActive: Boolean(Math.round(Math.random()))})
            }));
        return newBoard;
    };

    populateNextGeneration = (board) => {
        const clone = JSON.parse(JSON.stringify(board));
        let activeNeighboursCount;
        const newBoard = clone.map((row, rowIndex) =>
            row.map((column, columnIndex) => {
                activeNeighboursCount = this.countNeighbours(board, rowIndex, columnIndex);
                return Object.assign(column, {cellActive: this.willCellExist(column.cellActive, activeNeighboursCount)})
            }));
        return newBoard;
    };

    countNeighbours = (board, rowIndex, columnIndex) => {
        let activeNeighbours = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {continue;}
                let curRow = rowIndex + i, curColumn = columnIndex + j;
                curRow = this.checkVerticalEdge(curRow,curColumn,board);
                curColumn = this.checkHorizontalEdge(curRow,curColumn,board);
                if (board[curRow][curColumn] && board[curRow][curColumn].cellActive) {
                    activeNeighbours++;
                }
            }
        }
        return activeNeighbours;
    };

    willCellExist = (cellActive, activeNeighboursCount) => {
        return cellActive
            ? (!(activeNeighboursCount < 2 || activeNeighboursCount > 3))
            : (activeNeighboursCount === 3)
    };

    changeBoardSize = (board, rowCount, columnCount) => {
        const clone = JSON.parse(JSON.stringify(board));
        console.log(3);
        return Array.from({length: rowCount}).map((row, rowIndex, arr) =>
            Array.from({length: columnCount}).map((column, columnIndex, arr) => {
              return  board && board[rowIndex] && board[rowIndex][columnIndex]
                  ? board[rowIndex][columnIndex]
                  : new this.CellData(false,false);
        }))
    }

}

export default new boardUtils();


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
        return board.map((row, localRowIndex, arr) =>
            row.map((column, localColumnIndex, arr) => {
                if (localRowIndex === rowIndex && localColumnIndex === columnIndex) {
                    return Object.assign(column, {cellActive: !column.cellActive})
                } else {
                    return column;
                }
        }));
    };

    toggleHighlight = (rowIndex, columnIndex, board) => {
        return board.map((row, localRowIndex, arr) =>
            row.map((column, localColumnIndex, arr) => {
                if (localRowIndex === rowIndex && localColumnIndex === columnIndex) {
                    return Object.assign(column, {cellHighlight: true})
                } else {
                    return Object.assign(column, {cellHighlight: false})
                }
        }));
    };

    getRowIndex = (index, startIndex, rowLen) => {
        return index + startIndex < rowLen
            ? index + startIndex
            : (index + startIndex) - rowLen;
    };

    gen2ndArray = (rowLen, colLen, startIndex, shape) => {

        const rowStartIndex = colLen - startIndex[0];
        const columnStartIndex = rowLen - startIndex[1];

        return Array.from({length: rowLen}).map((row,rowIndex,arr) =>
            Array.from({length: colLen}).map((column,columnIndex,arr) => {
                const shapeRowIndex = this.getRowIndex(rowIndex,rowStartIndex,rowLen);
                const shapeColumnIndex = this.getRowIndex(columnIndex,columnStartIndex,colLen);
                return (
                    shape[shapeRowIndex] &&
                    shape[shapeRowIndex][shapeColumnIndex] &&
                    shape[shapeRowIndex][shapeColumnIndex] === 1 ? 1 : 0
                );
            })
        )
    };

    paintCreature = (rowIndex, columnIndex, creatureStructure, board) => {

        const equalToArr = this.gen2ndArray(board.length,board[0].length,[rowIndex, columnIndex],creatureStructure);

        return board.map((row, localRowIndex, arr) =>
            row.map((column, localColumnIndex, arr) => {
                let toggled;
                if (equalToArr[localRowIndex] &&
                    equalToArr[localRowIndex][localColumnIndex]) {
                        toggled = equalToArr[localRowIndex][localColumnIndex] === 1;
                        return Object.assign(column, {cellActive: toggled});
                } else {
                    return column;
                }
            }));
    };

    highlightCreature = (rowIndex, columnIndex, creatureStructure, board) => {

        const equalToArr = this.gen2ndArray(board.length,board[0].length,[rowIndex, columnIndex],creatureStructure);

        return board.map((row, localRowIndex, arr) =>
            row.map((column, localColumnIndex, arr) => {
                let toggled;
                if (equalToArr[localRowIndex] &&
                    equalToArr[localRowIndex][localColumnIndex]) {
                        toggled = equalToArr[localRowIndex][localColumnIndex] === 1;
                        return Object.assign(column, {cellHighlight: toggled});
                } else {
                    return column;
                }
            }));
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





    /**
     * Toggles individual cell active state.
     * @param {array} board - complete 2d matrix board ( array of array of objects )
     * @param {string} color - 'random', 'fill', 'clear'
     * @returns {array} ( array of array of objects )
     */
    colorBoard = (board, color) => {
        const _getColoring = function(colorStyle) {
            switch (colorStyle) {
                case 'random': return Boolean(Math.round(Math.random()));
                case 'fill': return 1;
                case 'clear': return 0;
                default: return 0;
            }
        };

        const newBoard = board.map((row) =>
            row.map((column) => {
                    return Object.assign(column, {cellActive: _getColoring(color)})
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
        return Array.from({length: rowCount}).map((row, rowIndex) =>
            Array.from({length: columnCount}).map((column, columnIndex) => {
              return  board && board[rowIndex] && board[rowIndex][columnIndex]
                  ? board[rowIndex][columnIndex]
                  : new this.CellData(false,false);
        }))
    };

    generateFamilies = (creatures) => {
        const families = [];

        for (let key in creatures) {
            if (!families.includes(creatures[key].kind)) {
                families.push(creatures[key].kind)
            }
        }

        return families;
    };

    pickFirstMember = (creatures, family) => {

        for (let key in creatures) {
            if (creatures[key].kind === family) {
                return creatures[key].value;
            }
        }
    }

}

export default new boardUtils();

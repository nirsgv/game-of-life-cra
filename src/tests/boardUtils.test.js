import React from 'react';
import boardUtils from '../utils/boardUtils';

it('genId to produce a 10 characters unique id', () => {
    const idA = boardUtils.genId();
    const idB = boardUtils.genId();
    expect(idA.length === 10).toBe(true);
    expect(idA !== idB).toBe(true);
});

it('randomBoard to produce a random board', () => {
    const rowCount = 10;
    const columnCount = 10;
    let count = 0;
    const randomizedBoard = boardUtils.randomBoard(boardUtils.genInitialBoard(rowCount,columnCount));

    for (let x=0; x < randomizedBoard.length; x++) {
        for (let y=0; y < randomizedBoard[x].length; y++) {
            if (randomizedBoard[x][y].cellActive) {count++};
        }
    }
    expect(count > rowCount && count < rowCount * columnCount).toBe(true);
});
import React from 'react';


const NumField = (props) => {
    const { labelVal, inputId, inputVal, onChangeCallback, onClickCallback } = props;
    return (
        <span>
            <label htmlFor={inputId}>{labelVal}</label>
            <input type="text" id={inputId} value={inputVal} onChange={onChangeCallback}/>
            <button onClick={() => onClickCallback(Number(inputVal)+1)}>+</button>
            <button onClick={() => onClickCallback(Number(inputVal)-1)}>-</button>
        </span>
    )
};
export default NumField;

//data-rowColumnIndexes={props.rowColumnIndexes}
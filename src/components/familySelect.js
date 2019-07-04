import React from 'react';
import boardUtils from "../utils/boardUtils";


const FamilySelect = (props) => {
    const { familiesTitles, familyTitle, onClickCallback } = props;
    return (
        <>
            {familiesTitles.map((item) =>
                <span className={familyTitle === item ? 'active' : ''}
                    onClick={() => onClickCallback(item)}
                    key={boardUtils.genId()}
                >
                    {item}
                </span>)}
        </>
    )
};
export default FamilySelect;
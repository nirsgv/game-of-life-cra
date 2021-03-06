import React from 'react';
import boardUtils from "../utils/boardUtils";


const FamilySelect = (props) => {
    const { familiesTitles, familyTitle, onClickCallback } = props;
    return (
        <ul className='list inline-list'>
            {familiesTitles.map((item) =>
                <li className={familyTitle === item ? 'active' : ''}
                    onClick={() => onClickCallback(item)}
                    key={boardUtils.genId()}
                >
                    {item}
                </li>)}
        </ul>
    )
};
export default FamilySelect;
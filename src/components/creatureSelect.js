import React from 'react';
import boardUtils from "../utils/boardUtils";


const CreatureSelect = (props) => {
    const { creatures, familyTitle, creatureTitle, onClickCallback } = props;

    const creaturesArrGroup = [];
    for (let key in creatures) {
        if (creatures[key].kind === familyTitle) {
            creaturesArrGroup.push(creatures[key].value)
        }
    }

    return (
        <ul className='list inline-list'>
            {creaturesArrGroup.map((item,index) =>
                <li key={boardUtils.genId()}
                    className={creatureTitle === item ? 'active' : ''}
                    onClick={() => onClickCallback(item)}
                >
                    {item}
                </li>
            )}
        </ul>
    )
};
export default CreatureSelect;

//data-rowColumnIndexes={props.rowColumnIndexes}
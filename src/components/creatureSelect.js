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
        <>
            {creaturesArrGroup.map((item,index) =>
                <span key={boardUtils.genId()}
                    className={creatureTitle === item ? 'active' : ''}
                    onClick={() => onClickCallback(item)}
                >
                    {item}
                </span>
            )}
        </>
    )
};
export default CreatureSelect;

//data-rowColumnIndexes={props.rowColumnIndexes}
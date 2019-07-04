import React from 'react';
const {PropTypes} = React;

const icons = {
    drag: 'M496 288H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-128H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z',
    dragVertical: 'M96 496V16c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16zm128 0V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16z',
};

const Icon = (props) => (
    <div className={"icon"}>
        <svg width="22" height="22" viewBox="0 0 256 512">
            <path d={icons[props.icon]}></path>
        </svg>
    </div>
);

// Icon.propTypes = {
//     icon: PropTypes.string.isRequired,
// };

export default Icon;

import React from 'react';
import Icon from './icon';


class DraggableCreature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    itemDragStarted = (e, creatureTitle) => {
        e.dataTransfer.setData("text", creatureTitle);
    };

    consolog = (val) => {
        console.log(val);
    };

    render(props) {
        return (
            <div draggable
                 alt={this.props.creatureTitle}
                 onDragStart={(e) => this.itemDragStarted(e, this.props.creatureTitle)}
                 onDragEnd={(e) => this.consolog(e.target)}
                 onDragOver={() => this.consolog(3)}
                 onDrop={() => this.consolog(5)}
                 className={"draggable-object"}
            >

                <Icon icon={"drag"} />
                {this.props.children}
            </div>
        );
    }
};
export default DraggableCreature;
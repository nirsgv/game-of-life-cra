import React from 'react';
import _ from 'lodash';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        };
        this.throttledFunc = _.throttle(this.consologSomething, 1000);
    };


    consologSomething = (val) => {
        console.log('something');
        //this.props.paintCreature(val[0], val[1], 'block');

    };

    itemDraggedOver = (e, val) => {
        e.preventDefault();
        //console.log(val);
        this.throttledFunc(val);
        //this.props.paintCreature(this.props.rowIndex, this.props.columnIndex, 'block');
    };

    itemDropped = (e, val) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        console.log(data);
        this.props.paintCreature(val[0], val[1], data);
    };

    toggleSelfHighlight = (e,condition) => {
        e.preventDefault();

        this.setState({isHovered:condition});
    };

    render() {

        const {rowIndex, columnIndex, toggleActive, cellInfo, isFromMainBoard} = this.props;

        return (
            <th
                onClick={() => toggleActive(rowIndex, columnIndex)}
                onMouseEnter={isFromMainBoard ? (e) => this.toggleSelfHighlight(e,true) : undefined}
                onMouseLeave={isFromMainBoard ? (e) => this.toggleSelfHighlight(e,false) : undefined}
                onDragOver={isFromMainBoard ? (e) => this.itemDraggedOver(e, [rowIndex, columnIndex]) : undefined}
                onDrop={isFromMainBoard ? (e) => this.itemDropped(e, [rowIndex, columnIndex]) : undefined}
                className={`${cellInfo === 1 || cellInfo.cellActive ? 'on' : ''} ${this.state.isHovered || cellInfo.cellHighlight ? 'highlight' : ''}`}
                data-test="cell"
            >

            </th>)
    }
};
export default Cell;
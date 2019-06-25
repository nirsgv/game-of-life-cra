import React from 'react';
import './App.css';
import Board from './components/board';
import NumField from './components/numField';
import boardUtils from './utils/boardUtils';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            columns: this.props.columns,
            board: null,
            intervalHolder: null,
            speed: 1
        };
        this.state.board = boardUtils.genInitialBoard(this.state.rows, this.state.columns);
    }

    holdInterval = (speed) => {
        if (!this.state.intervalHolder) {
            this.setState({intervalHolder: this.animate(speed)});
        }
    };

    clearInterval = () => {
        clearInterval(this.state.intervalHolder);
        this.setState({intervalHolder: null});
    };

    animate = (speed) => {
        return setInterval(function(){
            this.setState({board:boardUtils.populateNextGeneration(this.state.board)});
        }.bind(this), Math.floor(1000 / speed));
    };

    /**
     * Toggles individual cell active state.
     * @param {string} rowColumnIndexes
     * @returns {string}
     */
    toggleActive = (rowIndex, columnIndex) => {
        this.setState({board:boardUtils.toggleActive(rowIndex, columnIndex, this.state.board)});
    };

    toggleHighlight = (rowIndex, columnIndex) => {
        this.setState({board:boardUtils.toggleHighlight(rowIndex, columnIndex, this.state.board)});
    };

    changeBoardSize = (val, rowColumnSwitch) => {
        if (rowColumnSwitch === 'rows') {
            val >= 1 && this.setState({
                rows: val,
                board: boardUtils.changeBoardSize(this.state.board, val, this.state.columns)
            });
        } else {
            val >= 1 && this.setState({
                columns: val,
                board: boardUtils.changeBoardSize(this.state.board, this.state.rows, val)
            });
        }
    };

    changeFps = (val) => {
        const action = () => {
            this.setState({speed:val});
            this.clearInterval();
            this.holdInterval(val);
        };
        val >= 1 && action();
    };

    getProps = function(opt) {
        switch (opt) {
            case 'rows': return {
                labelVal: "Rows",
                inputId: "rows-num-field",
                inputVal: this.state.rows,
                onChangeCallback: (e) => this.changeBoardSize(Number(e.target.value), 'rows'),
                onClickCallback: (val) => this.changeBoardSize(val, 'rows')
            };
            case 'columns': return {
                labelVal: "Columns",
                inputId: "columns-num-field",
                inputVal: this.state.columns,
                onChangeCallback: (e) => this.changeBoardSize(Number(e.target.value), 'columns'),
                onClickCallback: (val) => this.changeBoardSize(val, 'columns')
            };
            case 'fps': return {
                labelVal: "Fps",
                inputId: "fps-num-field",
                inputVal: this.state.speed,
                onChangeCallback: (e) => this.changeFps(Number(e.target.value)),
                onClickCallback: (val) => this.changeFps(val)
            };
            default: return {};
        }
    };

    render() {

        return (
            <div className="App" data-test="app-container">
                <header>
                    <button onClick={() => this.setState({board:boardUtils.randomBoard(this.state.board)})}>random</button>
                    <button onClick={() => this.holdInterval(this.state.speed)}>animate</button>
                    <button onClick={() => this.clearInterval()}>clear</button>
                    <NumField {...this.getProps('rows')} />
                    <NumField {...this.getProps('columns')} />
                    <NumField {...this.getProps('fps')} />
                </header>

                <Board {...this.state} toggleActive={this.toggleActive} toggleHighlight={this.toggleHighlight} />

            </div>
        );
    }
}

export default App;
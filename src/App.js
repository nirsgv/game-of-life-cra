import React from 'react';
import './App.css';
import Board from './components/board';
import boardUtils from './utils/boardUtils';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            columns: this.props.columns,
            board: null,
            intervalHolder: null,
            speed: 60
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
        }.bind(this), Math.floor(speed));
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
        const inputVal = Number(val);
        if (rowColumnSwitch === 'rows') {
            this.setState({
                rows:Number(val),
                board:boardUtils.changeBoardSize(this.state.board, inputVal, this.state.columns)
            });
        } else {
            this.setState({
                columns:Number(val),
                board:boardUtils.changeBoardSize(this.state.board, this.state.rows, inputVal)
            });
        }
    };

    render() {

        return (
            <div className="App" data-test="app-container">
                <header>
                    <button onClick={() => this.setState({board:boardUtils.randomBoard(this.state.board)})}>random</button>
                    <button onClick={() => this.holdInterval(this.state.speed)}>animate</button>
                    <button onClick={() => this.clearInterval()}>clear</button>
                    <input type="number" value={this.state.rows} onChange={(e) => this.changeBoardSize(e.target.value, 'rows')}/>
                    <input type="number" value={this.state.columns} onChange={(e) => this.changeBoardSize(e.target.value, 'columns')}/>
                </header>

                <Board {...this.state} toggleActive={this.toggleActive} toggleHighlight={this.toggleHighlight} />

            </div>
        );
    }
}

export default App;

import React from 'react';
import './App.css';
import creatures from './utils/creatures';
import boardUtils from './utils/boardUtils';
import Board from './components/board';
import NumField from './components/numField';
import FamilySelect from './components/familySelect';
import CreatureSelect from './components/creatureSelect';
import DraggableCreature from './components/draggableCreature';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            columns: this.props.columns,
            board: null,
            intervalHolder: null,
            speed: 1,
            familiesTitles: boardUtils.generateFamilies(creatures),
            familyTitle: null,
            creatureTitle: null,
            creatureBoard: null
        };
        this.state.board = boardUtils.genInitialBoard(this.state.rows, this.state.columns);
        this.state.familyTitle = this.state.familiesTitles[0];
        this.state.creatureTitle = boardUtils.pickFirstMember(creatures,this.state.familyTitle);
        this.state.creatureBoard = creatures[this.state.creatureTitle].structure;
    };

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

    paintCreature = (rowIndex, columnIndex, creature) => {
        const creatureStructure = creatures[creature].structure;
        this.setState({board:boardUtils.paintCreature(rowIndex, columnIndex, creatureStructure, this.state.board)});
    };

    highlightCreature = (rowIndex, columnIndex, creature) => {
        const creatureStructure = 'block';
        this.setState({board:boardUtils.highlightCreature(rowIndex, columnIndex, creatureStructure, this.state.board)});
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

    chooseFamily = (val) => {
        this.state.familyTitle !== val && this.setState({familyTitle:val})
    };

    chooseCreature = (creature) => {
        this.state.creatureTitle !== creature && this.setState({creatureTitle:creature});
        this.setCreatureBoard(creature);
    };

    setCreatureBoard = (creature) => {

        this.setState({creatureBoard: creatures[creature].structure});
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
                    <div className="settings-speed">
                        <button onClick={() => this.holdInterval(this.state.speed)}>animate</button>
                        <button onClick={() => this.clearInterval()}>clear</button>
                        <NumField {...this.getProps('fps')} />
                    </div>
                    <div className="settings-size">
                        <NumField {...this.getProps('rows')} />
                        <NumField {...this.getProps('columns')} />
                    </div>
                    <div className="settings-color">
                        <button onClick={() => this.setState({board:boardUtils.colorBoard(this.state.board, 'random')})}>random</button>
                        <button onClick={() => this.setState({board:boardUtils.colorBoard(this.state.board, 'fill')})}>fill</button>
                        <button onClick={() => this.setState({board:boardUtils.colorBoard(this.state.board, 'clear')})}>clear</button>
                    </div>
                </header>
                <main>
                    <Board board = {this.state.board}
                           toggleActive={this.toggleActive}
                           toggleHighlight={this.toggleHighlight}
                           paintCreature={this.paintCreature}
                           highlightCreature={this.highlightCreature}
                           isMainBoard = {true}
                    />
                </main>
                <footer>
                    <div className="creature-select--family">
                        <FamilySelect
                            familiesTitles={this.state.familiesTitles}
                            familyTitle={this.state.familyTitle}
                            onClickCallback={(item) => this.chooseFamily(item)}
                        />
                    </div>

                    <div className="creature-select--item">
                        <CreatureSelect
                            creatures={creatures}
                            familyTitle={this.state.familyTitle}
                            creatureTitle={this.state.creatureTitle}
                            onClickCallback={(item) => this.chooseCreature(item)}
                        />
                    </div>
                    <div className="creature-select--drag">
                        <DraggableCreature creatureTitle={this.state.creatureTitle}>
                            <Board board = {this.state.creatureBoard}
                                   isMainBoard = {false}
                            />
                        </DraggableCreature>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
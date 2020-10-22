import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <td className={`board-cell ${props.value}`} onClick={props.onClick}>
            <svg aria-label="X" role="img" viewBox="0 0 128 128" style={{ display: "none" }}>
                <path className="svg-item" d="M16,16L112,112"
                    style={{
                        stroke: "rgb(84, 84, 84)",
                        strokeDasharray: "135.764",
                        strokeDashoffset: "0"
                    }}>
                </path>
                <path className="svg-item" d="M112,16L16,112"
                    style={{
                        stroke: "rgb(84, 84, 84)",
                        strokeDasharray: "135.764",
                        strokeDashoffset: "0"
                    }}>
                </path>
            </svg>
            <svg aria-label="O" role="img" viewBox="0 0 128 128" style={{ display: "none" }}>
                <path className="svg-item" d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"
                    style={{ stroke: "rgb(242, 235, 211)" }}></path>
            </svg>
        </td>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (

            <div className="board">
                <svg className="fill-content board-outline" style={{ width: '216px' }}>
                    <path className="svg-item" d="M108,83L6,83" style={{ strokeDasharray: 102, strokeDashoffset: 0 }} />
                    <path className="svg-item" d="M108,153L6,153" style={{ strokeDasharray: 102, strokeDashoffset: 0 }}>
                    </path>
                    <path className="svg-item" d="M108,83L210,83" style={{ strokeDasharray: 102, strokeDashoffset: 0 }}>
                    </path>
                    <path className="svg-item" d="M108,153L210,153" style={{ strokeDasharray: 102, strokeDashoffset: 0 }}>
                    </path>
                    <path className="svg-item" d="M73,118L73,16" style={{ strokeDasharray: 102, strokeDashoffset: 0 }}>
                    </path>
                    <path className="svg-item" d="M143,118L143,16" style={{ strokeDasharray: 102, strokeDashoffset: 0 }}>
                    </path>
                    <path className="svg-item" d="M73,118L73,220" style={{ strokeDasharray: 102, strokeDashoffset: 0 }}>
                    </path>
                    <path className="svg-item" d="M143,118L143,220" style={{ strokeDasharray: 102, strokeDashoffset: 0 }}>
                    </path>
                </svg>
                <table className="board-table">
                    <tbody>
                        <tr>
                            {this.renderSquare(0)}
                            {this.renderSquare(1)}
                            {this.renderSquare(2)}
                        </tr>
                        <tr>
                            {this.renderSquare(3)}
                            {this.renderSquare(4)}
                            {this.renderSquare(5)}
                        </tr>
                        <tr>
                            {this.renderSquare(6)}
                            {this.renderSquare(7)}
                            {this.renderSquare(8)}
                        </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}

function Manager(props) {
    return (
        <div className="game-manager">
            <table className="turn-table">
                <tbody>
                    <tr>
                        <td>
                            <button className={"Gfzyee hide-focus-ring zPNTne R1smN Pjsr7c " + (props.xIsNext && !props.won ? "TTT-active" : "")} tabIndex={0}>
                                <div className="fSXkBc"><svg aria-label="X" role="img" viewBox="0 0 128 128">
                                    <path className="svg-item" d="M16,16L112,112" />
                                    <path className="svg-item" d="M112,16L16,112" />
                                </svg>
                                    <span>{props.xScore}</span></div>
                            </button>
                        </td>
                        <td>
                            <button className={"Gfzyee hide-focus-ring zPNTne R1smN Pjsr7c " + (props.xIsNext || props.won ? "" : "TTT-active")} tabIndex={0}>
                                <div className="fSXkBc"><svg aria-label="O" role="img" viewBox="0 0 128 128">
                                    <path className="svg-item" d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16">
                                    </path>
                                </svg><span>{props.oScore}</span></div>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="turn-anouncer">
                <span style={{ opacity: (props.xIsNext && !props.won ? 1 : 0) }}>
                    <svg aria-label="X" role="img" viewBox="0 0 128 128">
                        <path className="svg-item" d="M16,16L112,112" />
                        <path className="svg-item" d="M112,16L16,112" />
                    </svg>Turn</span>
                <span style={{ opacity: (props.xIsNext || props.won ? 0 : 1) }}>
                    <svg aria-label="O" role="img" viewBox="0 0 128 128">
                        <path className="svg-item" d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16" />
                    </svg> Turn</span>
                <span style={{ opacity: props.won ? 1 : 0 }} onClick={()=>props.restart()}>
                    <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 14.155 14.155" style={{ enableBackground: 'new 0 0 14.155 14.155'}} xmlSpace="preserve">
                        <g>
                            <path style={{ fill: '#14bdac', marginRight: '2px'}} d="M12.083,1.887c-0.795-0.794-1.73-1.359-2.727-1.697v2.135c0.48,0.239,0.935,0.55,1.334,0.95
		c1.993,1.994,1.993,5.236,0,7.229c-1.993,1.99-5.233,1.99-7.229,0c-1.991-1.995-1.991-5.235,0-7.229
		C3.466,3.269,3.482,3.259,3.489,3.25h0.002l1.181,1.179L4.665,0.685L0.923,0.68l1.176,1.176C2.092,1.868,2.081,1.88,2.072,1.887
		c-2.763,2.762-2.763,7.243,0,10.005c2.767,2.765,7.245,2.765,10.011,0C14.844,9.13,14.847,4.649,12.083,1.887z" />
                        </g>
                    </svg>
                    Game Over! Winner:
                    {props.won ? props.won.toUpperCase() : ""}
                </span>
            </div>
            <div id="diff">
                <p className={props.diff === "easy" ? "active" : ""} onClick={() => props.onClick("easy")}>Easy</p>
                <p className={props.diff === "med" ? "active" : ""} onClick={() => props.onClick("med")}>Medium</p>
                <p className={props.diff === "hard" ? "active" : ""} onClick={() => props.onClick("hard")}>Hard</p>
            </div>
        </div >
    );
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            diff: 'hard',
            xScore: 0,
            oScore: 0,
        };
    }

    restart() {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
        })
    }

    playCircle(squares) {
        let newSquares = [];
        squares = squares.map(square => square === null ? "nil" : square);
        fetch("/next_move?pos=[" + squares.toString() + "]&diff=" + this.state.diff).then(
            (newPos) => {
                newPos.text().then(data => {
                    setTimeout(()=>{
                        newSquares = data.substring(1, data.length - 1).split(',');
                        newSquares = newSquares.map(item => item === "nil" ? null : item);
                        this.setState({
                            squares: newSquares,
                            xIsNext: true,
                        });
                        if(calculateWinner(newSquares)){
                            let s = (this.state.oScore + 1);
                            this.setState({
                                oScore: s,
                            })
                        }
                    }, 300);
                });
            }
        )
    }

    changeDiff(newDiff) {
        this.setState({
            diff: newDiff,
        });
    }

    handleClick(i) {
        if (this.state.xIsNext) {
            const squares = this.state.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = 'x';
            this.setState({
                squares: squares,
                xIsNext: false,
            });
            if (calculateWinner(squares)) {
                if(calculateWinner(squares) != "Draw!"){
                    let s = (this.state.xScore + 1);
                    this.setState({
                        xScore: s,
                    })
                }
                return;
            }
            this.playCircle(squares);
        }
    }
    render() {
        return (
            <div className="game">
                <Manager
                    onClick={(diff) => this.changeDiff(diff)}
                    xIsNext={this.state.xIsNext}
                    won={calculateWinner(this.state.squares)}
                    diff={this.state.diff}
                    xScore={this.state.xScore}
                    oScore={this.state.oScore}
                    restart={()=>this.restart()}
                />
                <Board
                    squares={this.state.squares}
                    xIsNext={this.state.xIsNext}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    let noNull = true;
    squares.forEach(square => {
        if (square === null) {
            noNull = false;
        }
    })
    if (noNull) {
        return "Draw!"
    }
    return null;
}
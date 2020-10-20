import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <td className={`board-cell ${props.value}`} onClick={props.onClick}>
            <svg aria-label="X" role="img" viewBox="0 0 128 128" style={{ display: "none" }}>
                <path className="svg-item" d="M16,16L112,112"
                    style={{
                        "stroke": "rgb(84, 84, 84)",
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
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'x' : 'o';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
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
                <div className="status">{status}</div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <Board />
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
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
    return null;
}
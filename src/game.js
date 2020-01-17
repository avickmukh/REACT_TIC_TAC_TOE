import React from 'react';
import Board from './board';
import calculateWinner from './selector';

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        xIsNext: true,
        stepNumber: 0,
        history: [
          {
            squares: Array(9).fill(null)
          }
        ]
      };
      this.resetBoard = this.resetBoard.bind(this);
    }
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0
      });
    }
  
    resetBoard() {
      this.setState({
        xIsNext: true,
        stepNumber: 0,
        history: [
          {
            squares: Array(9).fill(null)
          }
        ]
      });
    }
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const winner = calculateWinner(squares);
      if (winner || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat({
          squares
        }),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length
      });
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ? " Go to #" + move : "start the Game";
        return (
          <li>
            <button
              onClick={() => {
                this.jumpTo(move);
              }}
            >
              {desc}
            </button>
          </li>
        );
      });
      let status = "Next Player is X";
      if (winner) {
        status = "winner is " + winner;
      } else {
        status = " Next Player is " + (this.state.xIsNext ? "X" : "O");
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board
              status={status}
              squares={current.squares}
              onClick={i => this.handleClick(i)}
              resetBoard={this.resetBoard}
            />
          </div>
        </div>
      );
    }
  }

export default Game;
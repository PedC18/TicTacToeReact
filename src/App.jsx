import { useState } from 'react';
import './style.scss';
import Board from './components/Board';
import calculateWinner from './Winner';
import History from './components/History';
import StatusMessage from './components/StatusMessage';

function App() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), isXNext: false }
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const winner = calculateWinner(gamingBoard.squares);

  const handleSquareClick = clcikedPosition => {
    if (gamingBoard.squares[clcikedPosition] || winner) {
      return;
    }

    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== history.length;

      const lastGameState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextGameState = lastGameState.squares.map(
        (squareValue, position) => {
          if (clcikedPosition === position) {
            return lastGameState.isXNext ? 'X' : 'O';
          }

          return squareValue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGameState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextGameState,
        isXNext: !lastGameState.isXNext
      });
    });

    // setIsXNext(currentIsXNext => !currentIsXNext);
    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  return (
    <div className="app">
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
      />
      <h2>Current game history</h2>
      <History
        history={history}
        moveTo={moveTo}
        currentMove={currentMove}
      ></History>
    </div>
  );
}

export default App;

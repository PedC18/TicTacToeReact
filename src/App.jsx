import { useState } from 'react';
import './style.scss';
import Board from './components/Board';
import { calculateWinner } from './Winner';
import History from './components/History';
import StatusMessage from './components/StatusMessage';

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);

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

    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const NewGameStart = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        className={`btn-reset ${winner ? 'active' : ''}`}
        onClick={NewGameStart}
      >
        Start New Game
      </button>
      <h2
        style={{
          fontWeight: 'normal'
        }}
      >
        Current game history
      </h2>
      <History
        history={history}
        moveTo={moveTo}
        currentMove={currentMove}
      ></History>
    </div>
  );
}

export default App;

const StatusMessage = ({ winner, isXNext, squares }) => {
  const noMovesLeft = squares.every(squareValue => squareValue !== null);

  const player = isXNext ? 'X' : 'O';

  const renderStatusMessage = () => {
    if (winner) {
      return (
        //SHORT WAY OF USING REACT FRAGMENT
        <>
          Winner is{' '}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
        </>
      );
    }

    if (!winner && noMovesLeft) {
      return (
        <>
          <span className="text-orange"> O</span> and{' '}
          <span className="text-green">X</span> tied
        </>
      );
    }

    if (!winner && !noMovesLeft) {
      return (
        <>
          Next player is{' '}
          <span className={isXNext ? 'text-green' : 'text-orange'}>
            {player}
          </span>
        </>
      );
    }

    return null;
  };

  return <h2 className="status-message">{renderStatusMessage()}</h2>;
};

export default StatusMessage;
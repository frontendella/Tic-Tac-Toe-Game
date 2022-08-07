import React from "react";

const x_player = "❌";
const o_player = "0️⃣";
const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function EndGame({ clearHistory, winCount, restartGame, player, draw }) {
  return (
    <div className="end-game-screen">
      {!draw && <span className="win-text">{player ? "O WON" : "X WON"}</span>}
      {draw && <span className="win-text">DRAW GAME</span>}

      <span className="win-history">
        X's WINS: {winCount.X}
        <br />
        O's WINS: {winCount.O}
      </span>

      <button className="btn" onClick={restartGame}>
        RESTART GAME
      </button>
      <button className="btn" onClick={clearHistory}>
        CLEAR HISTORY
      </button>
    </div>
  );
}
function Game() {
  const Square = ({ value, onClick }) => {
    const style = value === "❌" ? "square x" : "square o";
    return (
      <div className={style} onClick={onClick}>
        {value}
      </div>
    );
  };

  const newGameState = Array(9)
    .fill(true)
    .map((i) => " ");

  const [gameState, setGameState] = React.useState(newGameState);
  const [player, setPlayer] = React.useState(true);
  const [gameFinished, setGameFinished] = React.useState(false);
  const [draw, setDraw] = React.useState(false);
  const [winCount, setwinCount] = React.useState({ X: 0, O: 0 });

  function isGameOver() {
    if (!gameFinished) {
      //* X win check
      for (let i = 0; i < 8; i++) {
        if (
          gameState[winCombination[i][0]] === x_player &&
          gameState[winCombination[i][1]] === x_player &&
          gameState[winCombination[i][2]] === x_player
        ) {
          setGameFinished(true);
          setwinCount({ ...winCount, X: winCount.X + 1 });
          console.log("X WON");
          return;
        }
      }

      //* O win check
      for (let i = 0; i < 8; i++) {
        if (
          gameState[winCombination[i][0]] === o_player &&
          gameState[winCombination[i][1]] === o_player &&
          gameState[winCombination[i][2]] === o_player
        ) {
          setGameFinished(true);
          setwinCount({ ...winCount, O: winCount.O + 1 });
          console.log("O WON");
          return;
        }
      }

      //* Draw game check
      if (!gameState.includes(" ")) {
        setDraw(true);
        setGameFinished(true);
        console.log("DRAW");
      }
    }
  }
  function restartGame() {
    setGameState(Array(9).fill(" "));
    setGameFinished(false);
    setDraw(false);
  }

  function clearHistory() {
    setwinCount({ X: 0, O: 0 });
    restartGame();
  }

  isGameOver();

  const handleClick = (idX) => {
    setGameState(
      gameState.map((value, i) => {
        if (i === idX) {
          return player ? x_player : o_player;
        } else {
          return value;
        }
      })
    );

    setPlayer(!player);
  };

  return (
    <section>
      <span className="win-history">
        X's WINS: {winCount.X}
        <br />
        O's WINS: {winCount.O}
      </span>
      <h1>Tic-Tac-Toe</h1>
      <p>First player's turn!</p>
      <div className="board">
        {gameFinished && (
          <EndGame
            winCount={winCount}
            restartGame={restartGame}
            player={player}
            draw={draw}
            clearHistory={clearHistory}
          />
        )}
        {gameState.map((value, i) => {
          return (
            <Square
              key={i}
              value={value}
              onClick={() => {
                if (value !== " ") {
                  return;
                }
                handleClick(i);
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Game;

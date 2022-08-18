import Cell from "./Cell";
import classNames from "classnames";

const Gameboard = ({ gameState, playFunc, win, winLine }) => {
  let winClass = classNames({
    horizontal: [11, 12, 13].includes(winLine),
    "top-row": winLine === 11,
    "mid-row": winLine === 12,
    "bot-row": winLine === 13,
    vertical: [21, 22, 23].includes(winLine),
    "left-col": winLine === 21,
    "mid-col": winLine === 22,
    "right-col": winLine === 23,
    diag1: winLine === 3,
    diag2: winLine === 4,
    "no-win": winLine === 0,
    "win-p1": win === 1,
    "win-p2": win === 2,
    winLine,
  });

  return (
    <div className="gameboard">
      {gameState.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            cellState={cell}
            pos={[i, j]}
            key={`${i}${j}`}
            playFunc={playFunc}
          />
        ))
      )}
      <div className={winClass}></div>
    </div>
  );
};

export default Gameboard;

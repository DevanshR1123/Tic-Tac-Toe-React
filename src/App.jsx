import { useRef, useState } from "react";
import "./App.css";
import Gameboard from "./Gameboard";
import PlayerDisplay from "./PlayerDisplay";
import Options from "./Options";
import { flushSync } from "react-dom";

const App = () => {
  const [Game, setGame] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [Player, setPlayer] = useState(1);
  const [WinPlayer, setWinPlayer] = useState(0);
  const [PlayMode, setPlayMode] = useState(2);
  const moves = useRef(0);
  const winLine = useRef(0);

  const endGame = (winner, winRow) => {
    setWinPlayer(winner);
    winLine.current = winRow;
    console.log("winner", winner);
  };

  const checkWin = () => {
    const arr = [0, 1, 2];
    for (let i in arr) {
      if (Game[i][0] !== 0 && Game[i].every((x) => x === Game[i][0]))
        return [true, 11 + +i];
    }

    const TGame = Game.map((_, i) => _.map((_, j) => Game[j][i]));

    for (let i in arr) {
      if (TGame[i][0] !== 0 && TGame[i].every((x) => x === TGame[i][0]))
        return [true, 21 + +i];
    }

    let Diag1 = [Game[0][0], Game[1][1], Game[2][2]];
    let Diag2 = [Game[0][2], Game[1][1], Game[2][0]];

    if (Diag1[0] !== 0 && Diag1.every((x) => x === Diag1[0])) return [true, 3];
    if (Diag2[0] !== 0 && Diag2.every((x) => x === Diag2[0])) return [true, 4];
    return [false, 0];
  };

  const switchPlayer = async (n = 0) => {
    if (WinPlayer === 0) {
      const winCond = checkWin();
      if (winCond[0]) {
        endGame(Player, winCond[1]);
        return;
      } else if (moves.current === 9) {
        endGame(3);
      }
      console.log(Player);
      flushSync(() => setPlayer((player) => n || (player === 1 ? 2 : 1)));
    }
  };

  const play = ([i, j]) => {
    if (Game[i][j] !== 0) return;
    moves.current++;
    let newBoard = [...Game];
    newBoard[i][j] = Player === 1 ? 1 : -1;
    setGame(newBoard);
    return true;
  };

  const playSP = (pos) => {
    if (play(pos)) switchPlayer();
  };

  const playRand = () => {
    let available = [];
    for (let i = 0; i < Game.length; i++) {
      for (let j = 0; j < Game[i].length; j++) {
        if (Game[i][j] === 0) available.push([i, j]);
      }
    }
    let k = Math.floor(Math.random() * available.length);
    console.log("AI Plays", ...available[k], Player);
    return play(available[k]);
  };

  const playAI = async (pos) => {
    if (play(pos)) await switchPlayer(2);
    if (playRand()) await switchPlayer();
  };

  const reset = () => {
    setGame([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setPlayer(1);
    setWinPlayer(0);
    moves.current = 0;
    winLine.current = 0;
  };

  const changePlay = (n) => {
    setPlayMode(n);
    reset();
  };

  const genPlayFunc = () => {
    if (WinPlayer === 0) {
      if (PlayMode === 1) return playAI;
      else return playSP;
    } else return () => {};
  };

  return (
    <div className="App">
      <PlayerDisplay activePlayer={Player} winPlayer={WinPlayer} />
      <Gameboard
        gameState={Game}
        playFunc={genPlayFunc()}
        win={WinPlayer}
        winLine={winLine.current}
      />
      <Options resetFunc={reset} playModeFunc={changePlay} />
    </div>
  );
};

export default App;

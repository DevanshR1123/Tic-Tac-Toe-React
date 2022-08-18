import { faUser, faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayerDisplay = ({ activePlayer, winPlayer }) => {
  const winClasses = [
    winPlayer === 1 ? "win" : "",
    winPlayer === 2 ? "win" : "",
    winPlayer === 3 ? "draw" : "",
  ];

  const activeClass = activePlayer === 1 ? "left" : "right";
  return (
    <div className={`player-display ${activeClass} ${winClasses[2]}`}>
      <div className={`player p1 ${winClasses[0]}`}>
        <FontAwesomeIcon icon={faUser} className="player-icon" />
        P1
        <FontAwesomeIcon icon={faCrown} className="win-icon" />
      </div>

      <div className="tie">
        <FontAwesomeIcon icon={faCrown} size="2x" className="tie-icon" />
      </div>

      <div className={`player p2 ${winClasses[1]}`}>
        <FontAwesomeIcon icon={faCrown} className="win-icon" />
        P2
        <FontAwesomeIcon icon={faUser} className="player-icon" />
      </div>
    </div>
  );
};

export default PlayerDisplay;

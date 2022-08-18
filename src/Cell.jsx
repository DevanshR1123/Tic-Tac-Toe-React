import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cell = ({ cellState, pos, playFunc }) => {
  return (
    <div
      className={`cell ${cellState === 0 ? "empty-cell" : ""}`}
      onClick={() => playFunc(pos)}
    >
      {cellState !== 0 ? (
        cellState === 1 ? (
          <FontAwesomeIcon icon={faTimes} className="X" />
        ) : (
          <FontAwesomeIcon
            icon={faCircle}
            size="xs"
            strokeWidth=".8em"
            stroke="currentColor"
            className="O"
          />
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Cell;

import {
  faRedo,
  faUser,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Options = ({ resetFunc, playModeFunc }) => {
  return (
    <div className="options">
      <FontAwesomeIcon
        icon={faRedo}
        className="reset-btn opt-btn"
        onClick={resetFunc}
        size="2x"
      />

      <FontAwesomeIcon
        icon={faUser}
        className="sp-btn opt-btn"
        onClick={() => playModeFunc(1)}
        size="2x"
      />

      <FontAwesomeIcon
        icon={faUserFriends}
        className="mp-btn opt-btn"
        onClick={() => playModeFunc(2)}
        size="2x"
      />
    </div>
  );
};

export default Options;

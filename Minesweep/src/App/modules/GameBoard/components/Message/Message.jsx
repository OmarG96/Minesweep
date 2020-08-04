import React from "react";
import { func, oneOf, bool } from "prop-types";

import styles from "./Message.module.scss";

Message.propTypes = {
  type: oneOf(["lost", "won"]),
  onRestart: func,
  isOpen: bool,
};

export default function Message({ type, onRestart: handleRestart, isOpen }) {
  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ""}`}>
      <span>{type === "lost" ? "YOU LOST" : "YOU WIN"}</span>
      <button data-testid="restart" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
}

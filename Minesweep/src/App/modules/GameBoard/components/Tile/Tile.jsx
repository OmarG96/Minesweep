import React from "react";
import { shape, bool, func } from "prop-types";

import { ReactComponent as IconBomb } from "../../../../assets/icons/icon-bomb.svg";
import { ReactComponent as IconFlag } from "../../../../assets/icons/icon-flag.svg";

import styles from "./Tile.module.scss";

Tile.propTypes = {
  data: shape({
    isBomb: bool,
    isFlag: bool,
    showContent: bool,
  }),
  onClick: func,
  onToggleFlag: func,
};

export default function Tile({
  data = { isBomb: false, isFlag: false, showContent: false },
  onClick: handleClick = () => {},
  onToggleFlag: handleToggleFlag = () => {},
}) {
  const { isBomb, isFlag, showContent, bombsAround } = data;

  function handleRightClick(event) {
    event.preventDefault();
    handleToggleFlag();
  }

  return (
    <button
      data-testid="tile"
      disabled={showContent || isFlag}
      onClick={handleClick}
      type="button"
      className={`${styles.tile} ${showContent ? styles.disabled : ""}`}
      onContextMenu={handleRightClick}
    >
      {isBomb && showContent && <IconBomb data-testid="icon-bomb" />}
      {!showContent && isFlag && <IconFlag data-testid="icon-flag" />}
      {!isBomb && showContent && bombsAround !== 0 && (
        <span>{bombsAround}</span>
      )}
    </button>
  );
}

import React from "react";
import { node } from "prop-types";

import styles from "./AppLayout.module.scss";
import { NavLink } from "react-router-dom";

AppLayout.propTypes = {
  children: node,
};

export default function AppLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <NavLink to="/home">
          <button type="button">Home</button>
        </NavLink>
        <NavLink to="/finished-games-list">
          <button type="button">Finished games list</button>
        </NavLink>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

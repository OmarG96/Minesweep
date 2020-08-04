import React from "react";

import styles from "./FinishedGamesList.module.scss";

export default function FinishedGamesList() {
  const finishedGames = JSON.parse(localStorage.getItem("finishedGamesList"));

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Start time</th>
            <th>End time</th>
            <th>Difficulty</th>
            <th>Total time spent</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {finishedGames &&
            finishedGames.map((game, index) => (
              <tr key={"game-" + index}>
                <td>{game.startTime}</td>
                <td>{game.endTime}</td>
                <td>{game.difficulty}</td>
                <td>{game.totalTimeSpent}</td>
                <td>{game.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!finishedGames && <span>No games registered</span>}
    </div>
  );
}

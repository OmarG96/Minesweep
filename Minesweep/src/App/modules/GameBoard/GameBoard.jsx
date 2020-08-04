import React, { useEffect, useState, useCallback } from "react";
import { shape, string } from "prop-types";
import { history as historyPropTypes } from "history-prop-types";

import styles from "./GameBoard.module.scss";

import { Board, Message } from "./components";
import { format, differenceInSeconds } from "date-fns";
import toHHMMSS from "../../assets/functions/toHHMMSS";

GameBoard.propTypes = {
  match: shape({
    params: shape({
      rows: string,
      columns: string,
      bombs: string,
      difficulty: string,
    }),
  }),
  history: shape(historyPropTypes),
};

export default function GameBoard({ match, history }) {
  const rows = Number(match.params.rows);
  const columns = Number(match.params.columns);
  const bombs = Number(match.params.bombs);
  const { difficulty } = match.params;
  const startTime = new Date();

  const [schema, setSchema] = useState(null);
  const [message, setMessage] = useState({ isOpen: false, type: "lost" });
  const [tilesCovered, setTilesCovered] = useState(rows * columns - bombs);

  const calculateBombsAround = useCallback(
    (newSchema, row, column) => {
      for (let indexRow = row - 1; indexRow < row + 2; indexRow++) {
        for (
          let indexColumn = column - 1;
          indexColumn < column + 2;
          indexColumn++
        ) {
          if (
            indexRow < rows &&
            indexRow > -1 &&
            indexColumn < columns &&
            indexColumn > -1
          ) {
            newSchema[indexRow][indexColumn] = {
              ...newSchema[indexRow][indexColumn],
              bombsAround: newSchema[indexRow][indexColumn].bombsAround + 1,
            };
          }
        }
      }
    },
    [rows, columns]
  );

  const fillSchema = useCallback(
    (newSchema) => {
      for (let index = 0; index < bombs; index++) {
        const randomRow = getRandomPosition(0, rows);
        const randomColumn = getRandomPosition(0, columns);

        if (!newSchema[randomRow][randomColumn].isBomb) {
          newSchema[randomRow][randomColumn] = {
            ...newSchema[randomRow][randomColumn],
            isBomb: true,
          };
          calculateBombsAround(newSchema, randomRow, randomColumn);
        } else {
          index--;
        }
      }
    },
    [bombs, columns, rows, calculateBombsAround]
  );

  const generateSchema = useCallback(() => {
    var newSchema = Array(rows);

    for (let index = 0; index < rows; index++) {
      newSchema[index] = Array(columns).fill({
        isBomb: false,
        isFlag: false,
        bombsAround: 0,
        showContent: false,
      });
    }

    return newSchema;
  }, [rows, columns]);

  const addGameFinished = useCallback(
    (status) => {
      var finishedGames = JSON.parse(localStorage.getItem("finishedGamesList"));
      const game = {
        startTime: format(startTime, "MM/dd/yyyy hh:mm:ss a"),
        endTime: format(new Date(), "MM/dd/yyyy hh:mm:ss a"),
        difficulty,
        totalTimeSpent: toHHMMSS(
          differenceInSeconds(startTime, new Date()) * -1
        ),
        status,
      };

      if (finishedGames) {
        finishedGames.push(game);
      } else {
        finishedGames = [game];
      }
      localStorage.setItem("finishedGamesList", JSON.stringify(finishedGames));
    },
    [difficulty, startTime]
  );

  useEffect(() => {
    var newSchema = generateSchema();
    fillSchema(newSchema);
    setSchema(newSchema);
  }, [fillSchema, setSchema, generateSchema]);

  useEffect(() => {
    if (tilesCovered === 0) {
      setMessage({ isOpen: true, type: "won" });
      addGameFinished("won");
    }
  }, [tilesCovered, addGameFinished]);

  function getRandomPosition(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function handleClickTile(row, column) {
    let newSchema = schema.slice();
    newSchema[row][column] = { ...newSchema[row][column], showContent: true };
    setTilesCovered(tilesCovered - 1);

    if (newSchema[row][column].isBomb) {
      setMessage({ isOpen: true, type: "lost" });
      addGameFinished("lost");
      return;
    }
    if (newSchema[row][column].bombsAround === 0) {
      revealEmptyTile(row, column, newSchema);
    }
    setSchema(newSchema);
  }

  function revealEmptyTile(row, column, newSchema) {
    for (let indexRow = row - 1; indexRow < row + 2; indexRow++) {
      for (
        let indexColumn = column - 1;
        indexColumn < column + 2;
        indexColumn++
      ) {
        if (
          indexRow < rows &&
          indexRow > -1 &&
          indexColumn < columns &&
          indexColumn > -1
        ) {
          if (!newSchema[indexRow][indexColumn].showContent) {
            newSchema[indexRow][indexColumn] = {
              ...newSchema[indexRow][indexColumn],
              showContent: true,
            };
            setTilesCovered(tilesCovered - 1);

            if (newSchema[indexRow][indexColumn].bombsAround === 0) {
              revealEmptyTile(indexRow, indexColumn, newSchema);
            }
          }
        }
      }
    }
  }

  function handleToggleFlag(row, column) {
    let newSchema = schema.slice();
    newSchema[row][column] = {
      ...newSchema[row][column],
      isFlag: !newSchema[row][column].isFlag,
    };

    setSchema(newSchema);
  }

  function handleRestart() {
    history.push("/home");
  }

  return (
    <div className={styles.container}>
      <Message
        isOpen={message.isOpen}
        type={message.type}
        onRestart={handleRestart}
      />
      {schema && (
        <Board
          schema={schema}
          onClickTile={handleClickTile}
          onToggleFlag={handleToggleFlag}
        />
      )}
    </div>
  );
}

import React, { useState } from "react";
import { useFormik } from "formik";
import { object, number } from "yup";

import styles from "./Home.module.scss";

const validationSchema = object().shape({
  rows: number().required("Insert a number of rows"),
  columns: number().required("Insert a number of columns"),
  bombs: number().required("Insert a number of bombs"),
});

export default function Home({ history }) {
  const [isShowForm, setIsShowForm] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      rows: "",
      columns: "",
      bombs: "",
    },
    validationSchema,
    onSubmit: (data) => {
      handleClickStartCustom(data);
    },
  });

  function handleClick(event) {
    const { name } = event.target;

    switch (name) {
      case "easy":
        history.push("/game-board&difficulty=easy&rows=5&columns=5&bombs=10");
        break;
      case "medium":
        history.push(
          "/game-board&difficulty=medium&rows=10&columns=10&bombs=30"
        );
        break;
      case "hard":
        history.push("/game-board&difficulty=hard&rows=10&columns=20&bombs=50");
        break;
      case "custom":
        setIsShowForm(true);
        break;
      default:
        break;
    }
  }

  function handleClickStartCustom() {
    const { rows, columns, bombs } = values;
    history.push(
      `/game-board&difficulty=custom&rows=${rows}&columns=${columns}&bombs=${bombs}`
    );
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>MINESWEEP</span>
      <div className={styles.buttonsContainer}>
        <button onClick={handleClick} name="easy">
          Easy
        </button>
        <button onClick={handleClick} name="medium">
          Medium
        </button>
        <button onClick={handleClick} name="hard">
          Hard
        </button>
        <button onClick={handleClick} name="custom">
          Custom
        </button>
      </div>
      {isShowForm && (
        <form
          noValidate
          onSubmit={handleSubmit}
          className={styles.customContainer}
        >
          <input
            type="number"
            name="rows"
            onChange={handleChange}
            placeholder="Number of rows"
            value={values.rows}
          />
          {errors.rows && <span>{errors.rows}</span>}
          <input
            type="number"
            name="columns"
            onChange={handleChange}
            placeholder="Number of columns"
            value={values.columns}
          />
          {errors.columns && <span>{errors.columns}</span>}

          <input
            type="number"
            name="bombs"
            onChange={handleChange}
            placeholder="Number of bombs"
            value={values.bombs}
          />
          {errors.bombs && <span>{errors.bombs}</span>}

          <button type="submit" name="start">
            Start
          </button>
        </form>
      )}
    </div>
  );
}

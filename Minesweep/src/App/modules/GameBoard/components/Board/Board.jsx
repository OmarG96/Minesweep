import React from "react";
import { arrayOf, shape, bool, func } from "prop-types";

import Tile from "../Tile";

Board.propTypes = {
  schema: arrayOf(
    arrayOf(
      shape({
        isBomb: bool,
        isFlag: bool,
        showContent: bool,
      })
    )
  ),
  onClickTile: func,
  onToggleFlag: func,
};

export default function Board({
  schema,
  onClickTile: handleClickTile,
  onToggleFlag: hanldeToggleFlag,
}) {
  return (
    <table>
      <tbody>
        {schema.map((row, indexRow) => (
          <tr key={"row-" + indexRow}>
            {row.map((element, indexColumn) => (
              <td key={"column-" + indexColumn}>
                <Tile
                  data={element}
                  onClick={() => {
                    handleClickTile(indexRow, indexColumn);
                  }}
                  onToggleFlag={() => {
                    hanldeToggleFlag(indexRow, indexColumn);
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

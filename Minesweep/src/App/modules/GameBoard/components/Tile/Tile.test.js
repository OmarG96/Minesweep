import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Tile from "./Tile";

describe("GIVEN Tile", () => {
  describe("WHEN Tile render", () => {
    test("THEN should dont show a bomb or a number if the tile is covered", () => {
      const data = {
        isBomb: true,
        isFlag: false,
        showContent: false,
        bombsAround: 2,
      };
      const { queryByTestId, queryByText } = render(<Tile data={data} />);

      expect(queryByTestId("icon-bomb")).toBeNull();
      expect(queryByText("2")).toBeNull();
    });

    test("THEN should show a bomb ", () => {
      const data = {
        isBomb: true,
        isFlag: false,
        showContent: true,
        bombsAround: 2,
      };
      const { queryByTestId } = render(<Tile data={data} />);

      expect(queryByTestId("icon-bomb")).toBeInTheDocument();
    });

    test("THEN should show a number ", () => {
      const data = {
        isBomb: false,
        isFlag: false,
        showContent: true,
        bombsAround: 2,
      };
      const { queryByText } = render(<Tile data={data} />);

      expect(queryByText("2")).toBeInTheDocument();
    });

    test("THEN should show a flag ", () => {
      const data = {
        isBomb: false,
        isFlag: true,
        showContent: false,
        bombsAround: 2,
      };
      const { queryByTestId } = render(<Tile data={data} />);

      expect(queryByTestId("icon-flag")).toBeInTheDocument();
    });

    test("THEN should execute the onClick function received via props ", () => {
      const onClick = jest.fn();
      const { getByTestId } = render(<Tile onClick={onClick} />);

      fireEvent.click(getByTestId("tile"));

      expect(onClick).toBeCalled();
    });

    test("THEN should execute the onClick function received via props ", () => {
      const onToggleFlag = jest.fn();
      const { getByTestId } = render(<Tile onToggleFlag={onToggleFlag} />);

      fireEvent.contextMenu(getByTestId("tile"));

      expect(onToggleFlag).toBeCalled();
    });
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Message from "./Message";

describe("GIVEN Tile", () => {
  describe("WHEN Tile render", () => {
    test("THEN should show YOU LOST", () => {
      const type = "lost";
      const { getByText } = render(<Message type={type} />);

      expect(getByText("YOU LOST")).toBeInTheDocument();
    });

    test("THEN should show YOU WIN", () => {
      const type = "won";
      const { getByText } = render(<Message type={type} />);

      expect(getByText("YOU WIN")).toBeInTheDocument();
    });

    test("THEN should execute the onRestart function if the restart button is clicked", () => {
      const onRestart = jest.fn();
      const { getByTestId } = render(<Message onRestart={onRestart} />);

      fireEvent.click(getByTestId("restart"));

      expect(onRestart).toBeCalled();
    });
  });
});

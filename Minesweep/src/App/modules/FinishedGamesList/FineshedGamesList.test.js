import React from "react";
import { render } from "@testing-library/react";
import FinishedGamesList from "./FinishedGamesList";

describe("GIVEN FinishedGamesList", () => {
  describe("WHEN FinishedGamesList render", () => {
    test("THEN should show the finished games list", () => {
      Storage.prototype.getItem = jest.fn(() =>
        JSON.stringify([
          {
            endTime: "endTime",
            startTime: "startTime",
            difficulty: "difficulty",
            totalTimeSpent: "totalTimeSpent",
            status: "status",
          },
        ])
      );
      const { getByText } = render(<FinishedGamesList />);

      expect(getByText("endTime")).toBeInTheDocument();
      expect(getByText("startTime")).toBeInTheDocument();
      expect(getByText("difficulty")).toBeInTheDocument();
      expect(getByText("endTime")).toBeInTheDocument();
      expect(getByText("totalTimeSpent")).toBeInTheDocument();
    });

    test("THEN should show a message if the finished games list is empty", () => {
      Storage.prototype.getItem = jest.fn(() => null);
      const { getByText } = render(<FinishedGamesList />);

      expect(getByText("No games registered")).toBeInTheDocument();
    });
  });
});

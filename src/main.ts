import { Puzzle } from "./puzzle";

const puzzle = new Puzzle({
  initialState: [
    [1, 8, 2],
    [0, 4, 3],
    [7, 6, 5],
  ],
});
puzzle.solve();

import { isEqual, cloneDeep } from "lodash";

type RowType = [number, number, number];
type State = [RowType, RowType, RowType];
type Direction = "left" | "right" | "up" | "down";

interface Queue {
  state: State;
  score: number;
}

const initialState: State = [
  [1, 8, 2],
  [0, 4, 3],
  [7, 6, 5],
];

const FINAL_STATE: State = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
];

function print(state: State) {
  for (let i = 0; i < state.length; i++) {
    console.log(state[i]);
  }
  console.log("\n");
}

// h(n) = No. of misplaced elements in the state.
function getHeuristics(state: State) {
  let misplacedElementCount = 0;

  for (let i = 0; i < state.length; i++) {
    const row = state[i];
    for (let j = 0; j < row.length; j++) {
      const correctElement = FINAL_STATE[i][j];
      const rowElement = row[j];

      if (rowElement === 0) continue;
      if (rowElement === correctElement) continue;

      misplacedElementCount++;
    }
  }

  return misplacedElementCount;
}

function getIndexOf(number: number, state: State) {
  for (let i = 0; i < state.length; i++) {
    let index = state[i].indexOf(number);
    if (index > -1) {
      return [i, index];
    }
  }
  return [-1, -1];
}

function getPossibleMoveDirections(state: State) {
  let possibleMoves: Direction[] = ["left", "right", "up", "down"];
  const [row, col] = getIndexOf(0, state);

  if (row === 1 && col === 1) return possibleMoves;

  if (row === 0) {
    possibleMoves = possibleMoves.filter((move) => move !== "up");
  }

  if (row === 2) {
    possibleMoves = possibleMoves.filter((move) => move !== "down");
  }

  if (col === 0) {
    possibleMoves = possibleMoves.filter((move) => move !== "left");
  }

  if (col === 2) {
    possibleMoves = possibleMoves.filter((move) => move !== "right");
  }

  return possibleMoves;
}

function getNewState(currentState: State, direction: Direction) {
  const [row, col] = getIndexOf(0, currentState);
  const state = cloneDeep(currentState);

  if (direction === "left" && col !== 0) {
    const toMoveElement = currentState[row][col - 1];
    state[row][col - 1] = 0;
    state[row][col] = toMoveElement;
    return state;
  }

  if (direction === "right" && col !== 2) {
    const toMoveElement = currentState[row][col + 1];
    state[row][col + 1] = 0;
    state[row][col] = toMoveElement;
    return state;
  }

  if (direction === "up" && row !== 0) {
    const toMoveElement = currentState[row - 1][col];
    state[row - 1][col] = 0;
    state[row][col] = toMoveElement;
    return state;
  }

  if (direction === "down" && row !== 2) {
    const toMoveElement = currentState[row + 1][col];
    state[row + 1][col] = 0;
    state[row][col] = toMoveElement;
    return state;
  }

  return state;
}

let gScore = 0;
const queue: Queue[] = [];
queue.push({
  state: initialState,
  score: gScore + getHeuristics(initialState),
});

while (true) {
  gScore++;
  const { state } = queue.shift() as Queue;

  // Break the loop if we have a solution
  if (isEqual(state, FINAL_STATE)) {
    console.log("SOLVED!!");
    break;
  }

  // Get possible moves
  let possibleMoves = getPossibleMoveDirections(state);

  // Move in the possible directions & get new states
  for (let i = 0; i < possibleMoves.length; i++) {
    const move = possibleMoves[i];
    const newState = getNewState(state, move);
    queue.push({
      state: newState,
      score: gScore + getHeuristics(newState),
    });
  }

  // Sort the states in queue by their heuristics
  queue.sort((a, b) => a.score - b.score);
}

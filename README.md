## 8 Puzzle Game Solved Using A\* Search - TypeScript

The 8-puzzle problem is a puzzle invented and popularized by Noyes Palmer Chapman in the 1870s. It is played on a 3-by-3 grid with 8 square blocks labeled 1 through 8 and a blank square. The goal is to rearrange the blocks so that they are in order.

### To try this, you can either:

- Clone the repository
- Download zip

### Perform the following:

1. Install the dependencies:

```yarn
yarn install
```

2. Build the project:

```yarn
yarn build
```

### You can also change the initial state of the puzzle inside the code as:

```typescript
const puzzle = new Puzzle({
  // Any valid state
  initialState: [
    [1, 8, 2],
    [0, 4, 3],
    [7, 6, 5],
  ],
});
```

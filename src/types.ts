export type RowType = [number, number, number];
export type State = [RowType, RowType, RowType];
export type Direction = "left" | "right" | "up" | "down";

export interface QueueItem {
  state: State;
  score: number;
}

export type Queue = QueueItem[];

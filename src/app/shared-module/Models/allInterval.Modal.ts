export interface Interval {
  title: string;
  workoutTime: string;
  restTime: string;
  rounds?: number;
  round?: Loop[];
  id: string;
  noOfLoops: number;
  timeBetweenLoops: string;
  date?: string;
  time: string;
  every?: string;
  for?: string;
}
export interface Loop {
  noRounds: number;
  timeBetween: string;
}


export interface IntervalAll {
  title: string;
  workoutTime?: string;
  restTime?: string;
  rounds?: number;
  round?: Loop[];
  id: string;
  date: string;
  time: string;
  every?: string;
  for?: number;
}
export interface Loop {
  noRounds: number;
  timeBetween: string;
}

// import { IntervalType } from "./intervalType.enum";

// export interface Workout {
//   id: string;
//   name: string;
//   title: IntervalType;
//   date: string;
//   time: string;
//   noOfLoops?: number;
//   timeBetweenLoops?:number;
// }
// export interface FORTIME extends Workout {
//   workoutTime: string;
//   noOfLoops: number;
//   timeBetweenLoops: string;
//   round?: Loop[];

// }
// export interface Loop {
//   noRounds: number;
//   timeBetween: string;
// }
// export interface TABATA extends Workout {
//   workoutTime: string;
//   restime: string;
//   rounds: number;
// }
// export interface EMOM extends Workout {
//   for: string;
//   every: number;
// }
// export interface AMRAP extends Workout {
//   workoutTime: string;
// }





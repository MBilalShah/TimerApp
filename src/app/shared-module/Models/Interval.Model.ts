export interface Interval{
  type:IntervalType,
  time:number
}

export enum IntervalType{
  workout,
  rest
}


export interface IntervalForm{
  title:string;
  workoutTime:string;
  restTime:string;
  rounds:number
}

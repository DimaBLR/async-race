export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface IRaceData {
  distance: number;
  velocity: number;
}

export interface IWinner {
  id: number;
  time: number;
  wins: number;
}

export interface IWinn {
  time: number;
  wins: number;
}

export interface IResult {
  id: number;
  name: string;
  succes: boolean;
  time: number;
}

export interface ICreate {
  name: string;
  color: string;
}

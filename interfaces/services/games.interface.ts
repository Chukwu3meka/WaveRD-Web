// export interface GetProfileResponse {
//   title: string;
//   created: Date;
//   id: string;
//   unmanaged: number;
//   divisions: { [key: string]: number };
// }

export interface GetGameWorldsResponse {
  ref: string;
  title: string;
  created: Date;
  unmanaged: number;
  divisions: { total: number; division: string; _id: string }[];
}

export interface GetGameWorldClubsResponse {
  ref: string;
  title: string;
  budget: number;
  manager: null | string;
}

interface Player {
  ref: string;
  age: number;
  name: string;
  rating: number;
  roles: string[];
}

interface Club {
  rating: number;
  title: string;
  manager: string | null;
  stadium: string | null;
  location: string | null;
}
export interface GetGameWorldClubResponse {
  players: Player[];
  club: Club;
}

export interface GetGameWorldClubPayload {
  world: string;
  club: string;
}

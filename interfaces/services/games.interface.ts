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

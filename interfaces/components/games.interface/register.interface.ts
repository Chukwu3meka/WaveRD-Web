import { GetGameWorldClubResponse, GetGameWorldClubsResponse, GetGameWorldsResponse } from "interfaces/services/games.interface";
import { SyntheticEvent } from "react";

export interface RegisterViewClubProps {
  created: Date;
  clubData: RegisterClubData;
  viewClubHandler: () => void;
}

export interface RegisterFormData {
  gameWorld: string;
  gameWorldInput: string;
  division: string;
  club: string;
}

export interface RegisterDivisions {
  ref: string;
  title: string;
  manager: null;
  budget: number;
  unmanaged: number;
}

export interface RegisterClubData extends GetGameWorldClubResponse {
  ref: string;
  loading: boolean;
  visibility: boolean;
}

export interface RegisterSelectGameWorld {
  loadingWorlds: boolean;
  formData: RegisterFormData;
  gameWorlds: GetGameWorldsResponse[];
  onGameWorldChange: (event: SyntheticEvent<Element, Event>, gameWorld: any | null) => Promise<void>;
  onGameWorldInputChange: (event: SyntheticEvent<Element, Event>, newInputValue: string) => Promise<void>;
}

export interface RegisterSelectGameDivision {
  division: string;
  divisions: RegisterDivisions[];
  onDivisionChange: (event: SyntheticEvent<Element, Event>, divisionLabel: any | null) => Promise<void>;
}

export interface RegisterViewProps {
  loadingClubs: boolean;
  loadingWorlds: boolean;
  formData: RegisterFormData;
  clubData: RegisterClubData;
  divisions: RegisterDivisions[];
  clubs: GetGameWorldClubsResponse[];
  gameWorlds: GetGameWorldsResponse[];
  viewClubHandler: (ref?: string) => Promise<void>;
  manageClubHandler: (ref: string) => Promise<void>;
  onGameWorldChange: (event: SyntheticEvent<Element, Event>, gameWorld: any) => Promise<void>;
  onDivisionChange: (event: SyntheticEvent<Element, Event>, divisionLabel: any) => Promise<void>;
  onGameWorldInputChange: (event: SyntheticEvent<Element, Event>, newInputValue: string) => Promise<void>;
}

"use client";

import GamesService from "services/games.service";

import { RegisterView } from ".";
import { enqueueSnackbar } from "notistack";
import { transformDivision } from "utils/helpers";
import { SyntheticEvent, useEffect, useState } from "react";
import { GetGameWorldClubsResponse, GetGameWorldsResponse } from "interfaces/services/games.interface";
import { RegisterClubData, RegisterDivisions, RegisterFormData } from "interfaces/components/games.interface/register.interface";

const initClub = { rating: 0, title: "", manager: null, stadium: null, location: null };
const initFormData: RegisterFormData = { gameWorld: "", gameWorldInput: "", division: "", club: "" };
const initClubData: RegisterClubData = { ref: "", players: [], loading: true, club: initClub, visibility: false };

const RegisterContainer = () => {
  const gamesService = new GamesService(),
    [loadingClubs, setLoadingClubs] = useState(false),
    [loadingWorlds, setLoadingWorlds] = useState(false),
    [clubs, setClubs] = useState<GetGameWorldClubsResponse[]>([]),
    [divisions, setDivisions] = useState<RegisterDivisions[]>([]),
    [formData, setFormData] = useState<RegisterFormData>(initFormData),
    [clubData, setClubData] = useState<RegisterClubData>(initClubData),
    [gameWorlds, setGameWorlds] = useState<GetGameWorldsResponse[]>([]);

  useEffect(() => {
    getGameWorlds(null);
  }, []);

  const getGameWorlds = async (title: null | string) => {
    setDivisions([]);
    setGameWorlds([]);
    setLoadingWorlds(true);

    await gamesService
      .getGameWorlds(title)
      .then(({ success, data }) => {
        if (success) return setGameWorlds(data);
        return setGameWorlds([]);
      })
      .finally(() => setLoadingWorlds(false));
  };

  const onGameWorldChange = async (event: SyntheticEvent<Element, Event>, gameWorld: any) => {
    if (clubs) setClubs([]);
    if (divisions) setDivisions([]);

    setFormData((x) => ({ ...x, division: "", club: "", gameWorld: gameWorld?.ref }));

    if (gameWorld)
      setDivisions(
        gameWorld.divisions
          .sort((a: any, b: any) => Number(a.division.split("_")[0].replace("tour", "")) - Number(b.division.split("_")[0].replace("tour", "")))
          .map(({ division, total }: any) => ({ title: transformDivision("ref", division), ref: division, unmanaged: total }))
      );
  };

  const onGameWorldInputChange = async (event: SyntheticEvent<Element, Event>, newInputValue: string) => {
    setFormData((x) => ({ ...x, gameWorldInput: newInputValue, division: "", club: "" }));

    // Check if Current Input exists in already fetch game worlds list
    const exists = gameWorlds.find((world) => world.title === newInputValue);
    if (!exists) await getGameWorlds(newInputValue || null);
  };

  const onDivisionChange = async (event: SyntheticEvent<Element, Event>, divisionLabel: any) => {
    const [world, initDivision] = [formData.gameWorld, formData.division],
      divisionReference = transformDivision("tournament", divisionLabel) || "";

    if (initDivision === divisionReference) {
      // terminate division change operation
      // user might have tried typing a division that does not exist
      return;
    }

    if (world && divisionReference) {
      setClubs([]);
      setLoadingClubs(true);
      setFormData((formData) => ({ ...formData, division: divisionReference, club: "" }));

      await gamesService
        .getGameWorldClubs({ world, division: divisionReference })
        .then(({ success, data }) => {
          if (success) return setClubs(data);
        })
        .finally(() => setLoadingClubs(false));
    }
  };

  const viewClubHandler = async (ref: string = "") => {
    const [world, club] = [formData.gameWorld, ref];
    setClubData((data) => ({ ...data, loading: true, visibility: true }));

    if (world && club) {
      await gamesService.getGameWorldClub({ world, club }).then(({ success, data }) => {
        if (success) return setClubData({ ...data, loading: false, visibility: true, ref });
        enqueueSnackbar("Failed to fetch club data, Kindly try again", { variant: "error" });
      });
    } else {
      setClubData(initClubData);
    }
  };

  const manageClubHandler = async (ref: string) => {
    //

    console.log({ manageClubHandler: ref });
  };

  return (
    <RegisterView
      clubs={clubs}
      formData={formData}
      clubData={clubData}
      divisions={divisions}
      gameWorlds={gameWorlds}
      loadingClubs={loadingClubs}
      loadingWorlds={loadingWorlds}
      viewClubHandler={viewClubHandler}
      onDivisionChange={onDivisionChange}
      manageClubHandler={manageClubHandler}
      onGameWorldChange={onGameWorldChange}
      onGameWorldInputChange={onGameWorldInputChange}
    />
  );
};
export default RegisterContainer;

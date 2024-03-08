import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Clubs, ViewClubContainer } from ".";
import { ordinalSuffix } from "@utils/clientFuncs";
import { fetchMassDataAction, fetchClubPlayersAction } from "@store/actions";

const ClubsContainer = (props) => {
  const [divisionOptions, setDivisionOptions] = useState({
      divisionOne: 16,
      divisionTwo: 16,
      divisionThree: 16,
      divisionFour: 16,
    }),
    { enqueueSnackbar } = useSnackbar(),
    [lastSort, setLastSort] = useState("desc"),
    { values, setValues, fetchMassDataAction, ManageClub, fetchClubPlayersAction } = props,
    { massIntro, club, displayClub, masses, mass, clubs, division, massData } = values,
    { setMassIntro, setDisplayClub, setMass, setDivision, setMassData, setClubs, setStep, setClub } = setValues;

  // fetch clubs  whenever mass is modified
  useEffect(() => {
    if (props.massData) setMassData(props?.massData);
  }, [props.massData]);

  useEffect(() => {
    if (props.clubPlayers) {
      setDisplayClub({ squad: props?.clubPlayers, club: clubs.find((x) => x.ref === club) });
    }
  }, [props.clubPlayers]);

  const massChangeHandler = (
    mass
    // {ref, unmanaged, created, season, sponsor}
  ) => {
    setClubs(null);
    setDivision(null);
    setMass(mass || null);
    if (mass) {
      fetchMassDataAction({ mass: mass.ref });
      setDivisionOptions(mass.unmanaged);
      setMassIntro(`Mass created ${new Date(mass.created).toDateString()}; ${ordinalSuffix(mass.season)} Season`);
    } else {
      setMassIntro("Select Mass & Division to display clubs");
    }
  };

  const divisionChangeHandler = (value) => {
    setDivision(value);
    if (!mass) return enqueueSnackbar("You've not selected a mass yet", { variant: "error" });
    if (value) setClubs(massData?.divisions[value].map((club) => massData?.clubs.find((x) => x.ref === club)));
  };

  const viewClubHandler = (club) => async () => {
    setClub(club);
    await fetchClubPlayersAction({ club, mass: mass.ref });
  };

  const sortClubsBudget = () => {
    setLastSort(lastSort === "ascd" ? "desc" : "ascd");
    setClubs(lastSort === "ascd" ? clubs.sort((x, y) => x["budget"] - y["budget"]) : clubs.sort((x, y) => y["budget"] - x["budget"]));
  };

  return (
    <>
      <Clubs
        {...{
          mass,
          clubs,
          masses,
          setStep,
          division,
          massIntro,
          ManageClub,
          viewClubHandler,
          divisionOptions,
          sortClubsBudget,
          massChangeHandler,
          divisionChangeHandler,
        }}
      />
      {displayClub && <ViewClubContainer displayClub={displayClub} setDisplayClub={setDisplayClub} />}
    </>
  );
};

const mapStateToProps = (state) => ({
  massData: state.mass.massData,
  clubPlayers: state.club.clubPlayers,
});

const mapDispatchToProps = {
  fetchMassDataAction,
  fetchClubPlayersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubsContainer);

const formations = ["352A", "352B", "343", "4141", "433A", "433B", "433C", "442A", "442B", "451A", "451B", "541", "532", "523"];

const roles = {
  "352A": ["GK", "CB", "CB", "CB", "DM", "CM", "CM", "LM", "RM", "CF", "CF"],
  "352B": ["GK", "CB", "CB", "CB", "DM", "DM", "LM", "AM", "RM", "CF", "CF"],
  343: ["GK", "CB", "CB", "CB", "LM", "CM", "CM", "RM", "LF", "RF", "CF"],
  4141: ["GK", "CB", "CB", "LB", "RB", "DM", "AM", "AM", "LM", "RM", "CF"],
  "433A": ["GK", "CB", "CB", "LB", "RB", "DM", "CM", "CM", "LF", "RF", "CF"],
  "433B": ["GK", "CB", "CB", "LB", "RB", "CM", "CM", "CM", "LF", "RF", "CF"],
  "433C": ["GK", "CB", "CB", "LB", "RB", "DM", "AM", "AM", "LF", "RF", "CF"],
  "442A": ["GK", "CB", "CB", "LB", "RB", "DM", "LM", "RM", "AM", "CF", "CF"],
  "442B": ["GK", "CB", "CB", "LB", "RB", "DM", "DB", "LM", "RM", "CF", "CF"],
  "451A": ["GK", "CB", "CB", "LB", "RB", "DM", "DM", "LM", "AM", "RM", "CF"],
  "451B": ["GK", "CB", "CB", "LB", "RB", "DM", "DM", "DM", "AM", "AM", "CF"],
  541: ["GK", "CB", "CB", "CB", "LB", "RB", "CM", "CM", "LM", "RM", "CF"],
  532: ["GK", "CB", "CB", "CB", "LB", "RB", "CM", "CM", "CM", "CF", "CF"],
  523: ["GK", "CB", "CB", "CB", "LB", "RB", "DM", "DM", "LF", "RF", "CF"],
};

const rolesStore = ["gk", "cb", "rb", "lb", "dm", "cm", "rm", "lm", "am", "rf", "lf", "cf"];

const rolesTitle = {
  gk: "Goal Keeper(GK)",
  cb: "Center Back(CB)",
  rb: "Right Back(RB)",
  lb: "Left Back(LB)",
  dm: "Defensive Midfielder(DM)",
  cm: "Center Midfielder(CM)",
  rm: "Right Midfielder(RM)",
  lm: "Left Midfielder(LM)",
  am: "Attacking Midfielder(AM)",
  rf: "Right Forward(RF)",
  lf: "Left Forward(LF)",
  cf: "Center Forward(RF)",
};

export { formations, roles, rolesTitle, rolesStore as default };

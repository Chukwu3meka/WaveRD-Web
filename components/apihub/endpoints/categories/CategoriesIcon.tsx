import { ReactNode } from "react";
import { CategoriesIconProps } from "interfaces/components/apihub/endpoints.interface";
import { AcUnit, GroupsRounded, EmojiEvents, ForkLeft, Public, SettingsAccessibility } from "@mui/icons-material";

const CategoriesIcon = (props: CategoriesIconProps): ReactNode => {
  const { icon, ...otherProps } = props;

  switch (icon) {
    case "football-countries":
      return <Public {...otherProps} />;

    case "football-players":
      return <SettingsAccessibility {...otherProps} />;

    case "football-competitions":
      return <EmojiEvents {...otherProps} />;

    case "football-referees":
      return <ForkLeft {...otherProps} />;

    case "football-clubs":
      return <GroupsRounded {...otherProps} />;

    default:
      return <AcUnit {...otherProps} />;
  }
};

export default CategoriesIcon;

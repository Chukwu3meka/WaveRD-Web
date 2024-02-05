import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { Info as InfoIcon } from "@mui/icons-material";
import { UserRoleProps } from "interfaces/components/shared.interface";

const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 20,
  right: 20,
  left: 0,
  marginLeft: "auto",
});

const UserRole = ({ role, clickHandler }: UserRoleProps) => {
  switch (role) {
    case "test":
      return (
        <StyledFab color="error" size="medium" aria-label="user-role-info" draggable onClick={clickHandler}>
          <InfoIcon />
        </StyledFab>
      );
    default:
      return null;
  }
};

export default UserRole;

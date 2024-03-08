import { styles } from ".";
import Image from "next/image";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import WarningIcon from "@mui/icons-material/Warning";
import TableViewIcon from "@mui/icons-material/TableView";
import AssistantIcon from "@mui/icons-material/Assistant";
import DangerousIcon from "@mui/icons-material/Dangerous";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";

const Header = ({ club, tab, handleTabChange }) => {
  return (
    <Paper className={styles.header}>
      <div>
        <Image src={`/images/layout/calendar2.png`} width={60} height={60} alt="SoccerMASS" />
        <Typography component="h1">Tournament</Typography>
        <Image src={`/images/club/${club}.webp`} width={60} height={60} alt="SoccerMASS" />
      </div>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={tab} onChange={handleTabChange} allowScrollButtonsMobile variant="scrollable">
          <Tab icon={<TableViewIcon />} value="table" />
          <Tab icon={<SportsSoccerIcon />} value="goal" />
          <Tab icon={<AssistantIcon />} value="assist" />
          <Tab icon={<InsertInvitationIcon />} value="calendar" />
          <Tab icon={<WarningIcon />} value="yellow" />
          <Tab icon={<DangerousIcon />} value="red" />
        </Tabs>
      </Box>
    </Paper>
  );
};

export default Header;

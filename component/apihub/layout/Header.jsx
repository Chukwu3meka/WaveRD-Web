import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import Link from "next/link";

import ApiIcon from "@mui/icons-material/Api";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "auto",
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(1),
    maxWidth: 130,
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "100%",
    maxWidth: 300,
  },
  // border: "3px solid red",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "10ch",
    },
  },
}));

const menuItems = [
  { label: "APIs Endpoint", icon: <ApiIcon fontSize="small" />, link: "/endpoints" },
  { label: "Announcement", icon: <NotificationsIcon fontSize="small" />, link: "/announcement" },
  { label: "Notification", icon: <MailIcon />, link: "/" },
  { label: "Documentation", icon: <AutoStoriesIcon fontSize="small" />, link: "/docs" },
  { label: "Profile", icon: <AccountCircle fontSize="small" />, link: "/" },
];

const Header = () => {
  const mobileMenuId = "primary-search-account-menu-mobile";
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMenuClose = () => handleMobileMenuClose(),
    handleMobileMenuClose = () => setMobileMoreAnchorEl(null),
    handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuList sx={{ width: "100%", maxWidth: 320 }}>
        {menuItems.map(({ label, icon, link }) => (
          <Link href={link}>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          </Link>
        ))}
        <Divider />
        <MenuItem href="https://www.viewcrunch.com/">
          <Typography variant="body2" color="text.secondary">
            built by&nbsp;
          </Typography>
          <ListItemText> ViewCrunch</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return <>s</>;
};

export default Header;

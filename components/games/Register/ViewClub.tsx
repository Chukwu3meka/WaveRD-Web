import { Grid, Table, Paper, Alert, Button, TableRow, TableBody, TableCell, TableHead, TextField, Typography, TableContainer } from "@mui/material";
import { ReactElement, forwardRef } from "react";
import { TransitionProps } from "@mui/material/transitions";

import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box, Divider, Skeleton, Stack } from "@mui/material";

import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import StadiumIcon from "@mui/icons-material/Stadium";
import TimelineIcon from "@mui/icons-material/Timeline";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import BadgeIcon from "@mui/icons-material/Badge";

import CloseIcon from "@mui/icons-material/Close";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { ordinalSuffix } from "utils/helpers";
import Ellipsis from "components/shared/ellipsis";
const Transition = forwardRef(function Transition(props: TransitionProps & { children: ReactElement<any, any> }, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ViewClubProps {
  showClub: boolean;
  showClubHandler: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
  clubData: any;
  created: Date;
}
const ViewClub = ({ showClub, showClubHandler, clubData, created }: ViewClubProps) => (
  <Dialog
    fullWidth
    keepMounted
    open={showClub}
    maxWidth={false}
    onClose={showClubHandler}
    TransitionComponent={Transition}
    aria-describedby="club-details-dialog">
    <DialogContent>
      <DialogContentText id="club-details-dialog">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={4} lg={4}>
              <Stack>
                <Box m="auto" my={-4}>
                  {clubData.ref ? (
                    <Image src={`/images/clubs/${clubData.ref}.webp`} width={120} height={200} alt="Club logo" />
                  ) : (
                    <Skeleton animation="pulse" sx={{ width: 120, borderRadius: "50%", height: 200 }} />
                  )}
                </Box>

                <Divider textAlign="left" sx={{ pb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Currently in {ordinalSuffix(new Date(created || new Date()).getFullYear() - new Date().getFullYear() + 1)} Season.
                  </Typography>
                </Divider>

                <List sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 1 }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BadgeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Club"
                      secondary={
                        clubData.title ? (
                          <Typography fontWeight={600}>{clubData.title}</Typography>
                        ) : (
                          <Skeleton animation="wave" sx={{ maxWidth: 250 }} />
                        )
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ManageAccountsIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Manager"
                      secondary={clubData.manager ? <Typography>{clubData.manager}</Typography> : <Skeleton animation="wave" />}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AddLocationAltIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Location"
                      secondary={clubData.location ? <Typography>{clubData.location}</Typography> : <Skeleton animation="wave" />}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <StadiumIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Stadium"
                      secondary={clubData.stadium ? <Typography>{clubData.stadium}</Typography> : <Skeleton animation="wave" />}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <TimelineIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Rating"
                      secondary={clubData.rating ? <Typography>{clubData.rating}</Typography> : <Skeleton animation="wave" />}
                    />
                  </ListItem>
                </List>
              </Stack>
            </Grid>
            <Grid item sm={12} md={8} lg={8}>
              <TableContainer component={Paper} style={{ maxHeight: "calc(var(--visibleScreen) - var(--headerHeight) - 45px)" }}>
                <Table stickyHeader aria-label="Console Endpoints Table" size="small" sx={{ minWidth: 300 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell width={10} align="center"></TableCell>
                      <TableCell width={250} align="left">
                        Football Player
                      </TableCell>
                      <TableCell width={70} align="right">
                        Rating
                      </TableCell>
                      <TableCell width={100} align="center">
                        Positon(s)
                      </TableCell>
                      <TableCell width={100} align="center">
                        Age
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {1
                      ? Array.from({ length: 20 }, (_, i) => i + 1).map((sn) => (
                          <TableRow hover key={sn}>
                            <TableCell sx={{ py: 1.3 }}>
                              <Typography>{sn}.</Typography>
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton animation="wave" />
                            </TableCell>
                            <TableCell>
                              <Skeleton animation={false} />
                            </TableCell>
                            <TableCell>
                              <Skeleton animation={false} />
                            </TableCell>
                          </TableRow>
                        ))
                      : clubData.squad?.map(({}, sn: number) => (
                          <TableRow key={sn}>
                            <TableCell>
                              <Typography variant="caption" color="text.secondary">
                                {sn + 1}.
                              </Typography>
                            </TableCell>
                            <TableCell>{/*  */}</TableCell>
                            <TableCell align="right">{/* <Ellipsis lines={1} variant="body2"></Ellipsis> */}</TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
        {/* Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running. */}
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

export default ViewClub;

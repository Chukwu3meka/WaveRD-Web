import Image from "next/image";
import Ellipsis from "components/shared/ellipsis";

import { ordinalSuffix } from "utils/helpers";
import { ReactElement, forwardRef } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Table, TableRow, TableBody, TableCell, TableHead, TableContainer } from "@mui/material";
import { RegisterViewClubProps } from "interfaces/components/games.interface/register.interface";
import { DialogContent, Dialog, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import { Avatar, Box, Divider, Skeleton, Stack, Slide, Grid, Paper, Button, Typography, Rating, Tooltip, Zoom } from "@mui/material";

import {
  Star as StarIcon,
  Badge as BadgeIcon,
  Close as CloseIcon,
  Stadium as StadiumIcon,
  Timeline as TimelineIcon,
  AddLocationAlt as AddLocationAltIcon,
  ManageAccounts as ManageAccountsIcon,
} from "@mui/icons-material";

const Transition = forwardRef(function Transition(props: TransitionProps & { children: ReactElement<any, any> }, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewClub = ({ viewClubHandler, clubData, created }: RegisterViewClubProps) => (
  <Dialog
    fullWidth
    keepMounted
    maxWidth={false}
    open={clubData.visibility}
    TransitionComponent={Transition}
    onClose={() => viewClubHandler()}
    aria-describedby="club-details-dialog">
    <DialogContent>
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        <Button
          color="error"
          variant="outlined"
          aria-label="close-club-details"
          onClick={() => viewClubHandler()}
          sx={{ position: "absolute", top: 10 }}>
          <CloseIcon />
        </Button>
        <Grid container spacing={2}>
          <Grid item sm={12} md={4} lg={4}>
            <Stack>
              {!clubData.loading ? (
                <Box m="auto" my={1}>
                  <Image src={`/images/clubs/${clubData.ref}.webp`} width={100} height={90} alt="Club logo" />
                </Box>
              ) : (
                <Box m="auto" my={-2}>
                  <Skeleton animation="pulse" sx={{ width: 110, borderRadius: "50%", height: 165 }} />
                </Box>
              )}

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
                      !clubData.loading ? (
                        <Typography fontWeight={600}>{clubData.club.title}</Typography>
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
                    secondary={!clubData.loading ? <Typography>{clubData.club.manager || " - - - "}</Typography> : <Skeleton animation="wave" />}
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
                    secondary={!clubData.loading ? <Typography>{clubData.club.location || " - - - "}</Typography> : <Skeleton animation="wave" />}
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
                    secondary={!clubData.loading ? <Typography>{clubData.club.stadium || " - - - "}</Typography> : <Skeleton animation="wave" />}
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
                    secondary={
                      !clubData.loading ? (
                        <Rating
                          readOnly
                          precision={0.5}
                          name="club-rating"
                          value={clubData.club.rating}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                      ) : (
                        <Skeleton animation="wave" />
                      )
                    }
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
                    <TableCell width={70} align="center">
                      Rating
                    </TableCell>
                    <TableCell width={100} align="right">
                      Role(s)
                    </TableCell>
                    <TableCell width={100} align="center">
                      Age
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clubData.loading
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
                    : clubData.players.map(({ name, rating, roles, age }, sn: number) => (
                        <TableRow key={sn} hover>
                          <TableCell>
                            <Typography variant="caption" color="text.secondary">
                              {sn + 1}.
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Ellipsis lines={1}>
                              <Tooltip disableInteractive followCursor TransitionComponent={Zoom} title={name}>
                                {name as unknown as ReactElement<any, any>}
                              </Tooltip>
                            </Ellipsis>
                          </TableCell>
                          <TableCell align="center">
                            <Ellipsis lines={1} variant="body2">
                              {rating}
                            </Ellipsis>
                          </TableCell>
                          <TableCell align="right">
                            <Ellipsis lines={1} variant="body2">
                              <Tooltip disableInteractive followCursor TransitionComponent={Zoom} title={roles.join(", ")}>
                                {roles.join(", ") as unknown as ReactElement<any, any>}
                              </Tooltip>
                            </Ellipsis>
                          </TableCell>
                          <TableCell align="center">
                            <Ellipsis lines={1} variant="body2">
                              {age ? `${age}y` : " --- "}
                            </Ellipsis>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </DialogContent>
  </Dialog>
);

export default ViewClub;

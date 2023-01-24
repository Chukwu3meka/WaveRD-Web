import Image from "next/image";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import { styles } from ".";
import { ageGenerator } from "@utils/handlers";

const SearchPlayer = ({ playerDetails, playerSearchInputAutoComplete, playerSearchOptions, setSearchTermHandler, searching }: any) => (
  <section id={styles.sectionSix}>
    {/* <main>
      <Typography color="whitesmoke">Enter Footballer name</Typography>
      <Autocomplete
        color=""
        loading={searching}
        disablePortal
        id="search footballer"
        options={playerSearchOptions}
        onChange={setSearchTermHandler}
        fullWidth
        noOptionsText="No player found"
        loadingText={<CircularProgress size={25} />}
        onInputChange={playerSearchInputAutoComplete}
        getOptionLabel={(option) => option?.name || null}
        isOptionEqualToValue={(option: any, value: any) => option.name === value.name}
        renderInput={(params) => (
          <TextField
            color="primary"
            {...params}
            label={
              <Typography>
                <IconButton aria-label="mongodb" component="span">
                  <Image width={30} height={30} alt="search powered mongodb" src="/images/layout/mongodb.png" />
                </IconButton>
                Search Players by name...
              </Typography>
            }
          />
        )}
      />
      <Typography color="ButtonText">Search powered by MongoDB Atlas Search</Typography>
    </main>

    <main>
      <Paper
        elevation={0}
        sx={{
          display: {
            xs: "none",
            sm: "block",
            background: "none",
          },
        }}>
        <figure>
          <Image src={`/images/playerFaces/${playerDetails.ref}.png`} alt="player face missing" layout="fill" />
        </figure>
        <figure>
          <Image src="/images/layout/homeJersey.png" alt="player Jersey" layout="fill" />
        </figure>
      </Paper>

      <div>
        <Typography>{playerDetails.name}</Typography>
        <div role="presentation">
          {playerDetails.stat.map(({ label, data }: any) => (
            <Breadcrumbs aria-label="stat" separator="-" key={label}>
              <Typography fontSize={16} color="text.primary">
                {label.toUpperCase()}
              </Typography>
              <Typography sx={{ fontWeight: 600 }} color="text.primary">
                {label === "age" ? `${ageGenerator({ date: data })}yrs` : label === "value" ? `$${data}m` : data}
                {"club" === label && (
                  <IconButton aria-label={label} component="span">
                    <Image
                      width={26}
                      height={20}
                      alt={`${playerDetails.name} ${label}`}
                      src={`/images/clubs/${playerDetails.clubRef}.webp`}
                    />
                  </IconButton>
                )}
                {"country" === label && (
                  <IconButton aria-label={label} component="span">
                    <Image
                      width={26}
                      height={15}
                      alt={`${playerDetails.name} ${label}`}
                      src={`/images/countries/${playerDetails.stat[1].data}.png`}
                    />
                  </IconButton>
                )}
              </Typography>
            </Breadcrumbs>
          ))}
        </div>
        <div>
          {playerDetails.roles.map((role: string) => (
            <Paper key={role}>
              <Typography fontSize={13}>{role}</Typography>
            </Paper>
          ))}
        </div>
      </div>
    </main> */}
  </section>
);

export default SearchPlayer;

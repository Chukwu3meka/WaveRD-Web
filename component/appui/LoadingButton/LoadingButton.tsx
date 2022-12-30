import { LoadingButton } from "@mui/lab";
import { Button, styled, Typography } from "@mui/material";

const PREFIX = "NimbusButton";
const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
};

interface RootProps {
  textColor?: "primary" | "secondary";
  buttonTextColor?: "primary" | "secondary";
}

const Root = styled("div", {
  shouldForwardProp: (prop) => prop !== "textColor" && prop !== "buttonTextColor",
  name: "MyThemeComponent",
  slot: "Root",
})<RootProps>(({ theme, textColor, buttonTextColor }) => ({
  [`& .${classes.root}`]: {
    color: textColor ? theme.palette.primary.main : theme.palette.secondary.main,
  },
  [`& .${classes.button}`]: {
    color: buttonTextColor ? theme.palette.primary.main : theme.palette.secondary.main,
  },
}));

type OwnProps = {
  textColor: "primary" | "secondary";
  buttonTextColor: "primary" | "secondary";
  text?: string;
  buttonText: string;
};

// const CustomStyledButton: React.FC<OwnProps> = (props) => {
// };

// export default CustomStyledButton;

const AppUILoadingButton = (props: OwnProps) => {
  const { textColor, buttonTextColor, text, buttonText } = props;
  return (
    <Root className={classes.root} textColor={textColor} buttonTextColor={buttonTextColor}>
      {text && <Typography variant={"body1"}>{text}</Typography>}
      <LoadingButton className={classes.button}>{buttonText}</LoadingButton>
    </Root>
  );

  // return <div>AppUILoadingButton</div>;
};

export default AppUILoadingButton;

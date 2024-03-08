import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Footer } from ".";
import { logoutAction } from "@store/actions";

const FooterContainer = ({ logoutAction, club, maintainance }) => {
  const { enqueueSnackbar } = useSnackbar(),
    social = [
      ["Facebook", "https://web.facebook.com/theAlienForest"],
      ["Twitter", "https://twitter.com/TheAlienForest/"],
      ["Instagram", "https://www.instagram.com/alienforest/"],
      ["LinkedIn", "https://www.linkedin.com/company/alienforest/"],
      ["AlienForest", "https://www.alienforest.com/"],
      // ["Pinterest", "https://www.pinterest.com/viewcrunch/"],
      // ["Github", "https://github.com/viewcrunch/"],
      // ["YouTube", "https://www.youtube.com/channel/UCs_hSlk3N8bxP5xHSdKw3IQ/"],
      // ["Fiverr", "https://www.fiverr.com/viewcrunch/"],
      // ["Whatsapp", "https://wa.me/qr/5KYEVNBVLVVSI1"],
      // ["Phone", "tel:+2347064417213"],
    ];

  const logoutHandler = () => {
    if (club) {
      logoutAction();
    } else {
      enqueueSnackbar("You're not logged in yet", { variant: "info" });
    }
  };

  return <Footer {...{ maintainance, logoutHandler, social }} />;
};

const mapStateToProps = (state) => ({ club: state.profile.auth.club }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);

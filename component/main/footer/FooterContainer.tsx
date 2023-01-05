import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Footer } from ".";
import { IThirdPartyAccounts } from "@interface/main/footer-interface";
// import { logoutAction } from "@store/actions";
const logoutAction = () => {};

const FooterContainer = ({ logoutAction, club, maintainance }: any) => {
  const { enqueueSnackbar } = useSnackbar(),
    thirdPartyAccounts: IThirdPartyAccounts[] = [
      ["Facebook", "https://web.facebook.com/theAlienForest"],
      ["Twitter", "https://twitter.com/TheAlienForest/"],
      ["Instagram", "https://www.instagram.com/alienforest/"],
      ["LinkedIn", "https://www.linkedin.com/company/alienforest/"],
      // ["AlienForest", "https://www.alienforest.com/"],
      // ["Pinterest", "https://www.pinterest.com/viewcrunch/"],
      ["Github", "https://github.com/Chukwu3meka/SoccerMASS-Web"],
      // ["YouTube", "https://www.youtube.com/channel/UCs_hSlk3N8bxP5xHSdKw3IQ/"],
      // ["Fiverr", "https://www.fiverr.com/viewcrunch/"],
      ["Whatsapp", "https://wa.me/qr/5KYEVNBVLVVSI1"],
      ["Phone", "tel:+234(706)-441-7213"],
    ];

  const logoutHandler = () => () => {
    if (club) {
      logoutAction();
    } else {
      enqueueSnackbar("You're not logged in yet", { variant: "info" });
    }
  };

  return <Footer {...{ maintainance, logoutHandler, thirdPartyAccounts }} />;
};

// const mapStateToProps = (state: any) => ({ club: state.profile.auth.club }),
const mapStateToProps = (state: any) => ({ club: state.profile }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);

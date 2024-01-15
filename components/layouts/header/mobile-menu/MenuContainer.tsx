import { useEffect, useState } from "react";

import { Menu } from ".";

// import { ProfileState } from "@interface/components/shared/menuInterface";

// const defaultProfile: ProfileState = { name: "SoccerMASS", handle: "API Hub and Soccer Manager", image: "/images/layout/profile.webp", auth: false };
const defaultProfile = { name: "SoccerMASS", handle: "API Hub and Soccer Manager", image: "/images/layout/profile.webp", auth: false };

const MenuContainer = (props: any) => {
  const [menuOpen, setMenuOpen] = useState(false),
    // [profile, setProfile] = useState<ProfileState>(defaultProfile),
    [profile, setProfile] = useState(defaultProfile),
    [authenticated, setauthenticated] = useState(false),
    iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    setauthenticated(!!props.auth);
    if (props.auth) {
      const { fullName: name, handle } = props.auth;
      // setProfile({ auth: true, handle, name, image: defaultProfile.image });
    } else {
      // setProfile(defaultProfile);
    }
  }, [props.auth]);

  const toggleMenuOpen = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) return;
    setMenuOpen((status) => !status);
  };

  return <Menu {...{ toggleMenuOpen, iOS, menuOpen, authenticated, profile }} />;
};

// const mapStateToProps = (state) => ({ auth: state.auth }),
//   mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
export default MenuContainer;

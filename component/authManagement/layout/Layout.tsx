import { RelativeHeader } from "@component/layout/header";
import authSlideText from "@source/constants/authSlideText";
import Carousel from "nuka-carousel/lib/carousel";

import { styles } from ".";

const Layout = ({ component }: any) => (
  <div className={styles.layout}>
    <RelativeHeader theme="light" />
    <div>
      <aside>
        <div>
          <Carousel wrapAround={true} slidesToShow={1} autoplay={true} withoutControls={true} adaptiveHeight={true} autoplayInterval={5000}>
            {authSlideText.map((slideText: any) => (
              <div key={slideText}>{slideText}</div>
            ))}
          </Carousel>
        </div>
      </aside>
      <main>{component}</main>
    </div>
  </div>
);

export default Layout;

import authSlideText from "@source/constants/authSlideText";
import Carousel from "nuka-carousel/lib/carousel";

import { styles } from ".";

const Layout = ({ children }: any) => (
  <main className={styles.layout}>
    <aside>
      <div>
        <Carousel wrapAround={true} slidesToShow={1} autoplay={true} withoutControls={true} adaptiveHeight={true} autoplayInterval={5000}>
          {authSlideText.map((slideText: any) => (
            <div key={slideText}>{slideText}</div>
          ))}
        </Carousel>
      </div>
    </aside>
    {children}
  </main>
);

export default Layout;

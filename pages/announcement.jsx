import AnnouncementContainer from "@component/announcement";
import { fetcher } from "@utils/clientFuncs";

const AnnouncementPage = ({ initialEndpoints }) => {
  return <AnnouncementContainer initialEndpoints={initialEndpoints} />;
};

export default AnnouncementPage;

export async function getServerSideProps() {
  try {
    const initialEndpoints = await fetcher(`${process.env.HOST}/api/client/getEndpoints`);

    return { props: { initialEndpoints } };
  } catch (e) {
    return { props: { initialEndpoints } };
  }
}

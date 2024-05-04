import { Box } from "@mui/material";
import ComingSoonContainer from "components/shared/coming-soon";
import { Metadata } from "next";
import pageInfo from "utils/page-info";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

const HomePage = async () => <ComingSoonContainer finishDate={new Date("01-01-2025")} />;

export default HomePage;

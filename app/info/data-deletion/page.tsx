import { Metadata } from "next";
import pageInfo from "utils/page-info";
import DataDeletion from "components/info/data-deletion";

export const metadata: Metadata = {
  title: pageInfo.dataDeletion.title,
  keywords: pageInfo.dataDeletion.keywords,
  description: pageInfo.dataDeletion.description,
};

export default function DataDeletionPage() {
  return <DataDeletion />;
}

import { Metadata } from "next";
import pageInfo from "utils/page-info";
import ContactUs from "components/info/contact-us";

export const metadata: Metadata = {
  title: pageInfo.contactUs.title,
  keywords: pageInfo.contactUs.keywords,
  description: pageInfo.contactUs.description,
};

export default function ContactUsPage() {
  return <ContactUs />;
}

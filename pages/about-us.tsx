import InfoPage from "../components/InfoPage/InfoPage";
import PageComponents from "../components/Layout/PageComponents/PageComponents";

export default function AboutUs() {
  return (
    <InfoPage>
      <PageComponents query="about-layout" slug="about-us" />
    </InfoPage>
  );
}

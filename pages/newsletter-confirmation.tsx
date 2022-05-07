import InfoPage from "../components/InfoPage/InfoPage";
import PageComponents from "../components/Layout/PageComponents/PageComponents";

export default function Confirmation() {
  return (
    <InfoPage>
      <PageComponents
        query="newsletter-confirmation-layout"
        slug="newsletter-confirmation"
      />
    </InfoPage>
  );
}

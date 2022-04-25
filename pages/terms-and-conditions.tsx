import InfoPage from "../components/InfoPage/InfoPage";
import PageComponents from "../components/Layout/PageComponents/PageComponents";

export default function TermsAndConditions() {
  return (
    <InfoPage>
      <PageComponents query="terms-layout" slug="terms-and-conditions" />
    </InfoPage>
  );
}

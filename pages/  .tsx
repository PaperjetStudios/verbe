import { useAtom } from "jotai";
import { useEffect } from "react";
import InfoPage from "../components/InfoPage/InfoPage";
import PageComponents from "../components/Layout/PageComponents/PageComponents";
import { clearCart } from "../data/atoms/cart/cartAtoms";

export default function Confirmation() {
  const [cart, clear] = useAtom(clearCart);
  useEffect(() => {
    clear(true);
  }, []);
  return (
    <InfoPage>
      <PageComponents
        query="order-confirmation-layout"
        slug="order-confirmation"
      />
    </InfoPage>
  );
}

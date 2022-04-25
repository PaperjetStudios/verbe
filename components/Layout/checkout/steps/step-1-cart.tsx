import StepBase from "./step-base";
import CartList from "./step1/CartList/CartList";

const Step1Cart: React.FC = () => {
  return (
    <StepBase>
      <CartList />
    </StepBase>
  );
};

export default Step1Cart;

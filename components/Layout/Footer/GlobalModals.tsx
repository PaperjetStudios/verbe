import useUser from "../../../hooks/useUser";
import ModalLoginToContinue from "../../Modal/LoginToContinue";

const GlobalModals = () => {
  const { isLoggedIn } = useUser();

  return <>{!isLoggedIn && <ModalLoginToContinue />}</>;
};

export default GlobalModals;

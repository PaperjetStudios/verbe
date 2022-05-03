import useUser from "../../../hooks/useUser";
import ModalLoginToContinue from "../../Modal/LoginToContinue";

const GlobalModals = () => {
  const { isLoggedIn } = useUser();
  //const isLoggedIn = false;
  //return null;
  return <>{!isLoggedIn && <ModalLoginToContinue />}</>;
};

export default GlobalModals;

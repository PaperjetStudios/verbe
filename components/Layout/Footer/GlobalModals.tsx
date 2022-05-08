import { useAtom } from "jotai";
import { ToggleSearchModal } from "../../../data/atoms/search/searchAtoms";
import useUser from "../../../hooks/useUser";
import ModalLoginToContinue from "../../Modal/LoginToContinue";
import ModalSearch from "../../Modal/Search";

const GlobalModals = () => {
  const { isLoggedIn } = useUser();
  const [searchModal, setSearchModal] = useAtom(ToggleSearchModal);

  return (
    <>
      {!isLoggedIn && <ModalLoginToContinue />}
      <ModalSearch
        disclosure={{
          isOpen: searchModal.isOpen,
          onOpen: () => setSearchModal(true),
          onClose: () => setSearchModal(false),
        }}
      />
    </>
  );
};

export default GlobalModals;

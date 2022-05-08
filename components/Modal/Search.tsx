import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";

import Search from "../Common/Search/Search";
import modal_keys from "./keys";
import ModalBase from "./ModalBase";

type ModalProps = {
  disclosure: UseDisclosureProps;
};

const ModalSearch: React.FC<ModalProps> = ({ disclosure }) => {
  return (
    <>
      <ModalBase
        centered={false}
        heading="Search"
        trigger="general"
        disclosure={disclosure}
        actions={[]}
      >
        <Search />
      </ModalBase>
    </>
  );
};

export default ModalSearch;

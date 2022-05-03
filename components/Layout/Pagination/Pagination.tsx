import { HStack, IconButton, Text } from "@chakra-ui/react";
import { Icons } from "../../Common/icons";

import styles from "./Pagination.module.scss";
import { PaginationSettings } from "./usePagination";

export type PaginationProps = {
  page: number;
  settings: PaginationSettings;

  setPage?: (ind: number) => any;
};

const Pagination: React.FC<PaginationProps> = ({
  settings,
  page,

  setPage,
}) => {
  const { pageSize, total, pageCount } = settings;
  console.log("pagination settings", settings);
  const totalPages = Math.ceil(total / pageSize);

  const selectHandler = (index: number, set: boolean = false) => {
    let newIndex = index;

    if (!set) {
      newIndex = page + index;
    }
    if (newIndex > totalPages) {
      newIndex = totalPages;
    } else if (newIndex < 1) {
      newIndex = 1;
    }

    setPage(newIndex);
  };

  let elements = [];

  for (let i = 1; i < pageCount + 1; i++) {
    elements.push(
      <IconButton
        key={`pagin_${pageCount}_${Math.random() * 10}`}
        onClick={() => selectHandler(i, true)}
        disabled={page === i}
        aria-label={`page_${i}`}
        icon={<Text>{i}</Text>}
      />
    );
  }

  if (total === 0) {
    return <></>;
  } else {
    return (
      <HStack className={styles.container}>
        <IconButton
          key={"backward_pagination"}
          disabled={page === 1}
          onClick={() => selectHandler(-1)}
          icon={Icons.chevron.left}
          aria-label="back"
          variant="pagination"
        />
        {elements}
        <IconButton
          key={"forward_pagination"}
          disabled={page === totalPages}
          onClick={() => selectHandler(1)}
          icon={Icons.chevron.right}
          aria-label="forward"
          variant="pagination"
        />
      </HStack>
    );
  }
};

export default Pagination;

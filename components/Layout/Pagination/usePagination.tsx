import { useState, useEffect } from "react";
import { parseAsInt } from "../../../config/util";

export type PaginationSettings = {
  pageCount: number;
  pageSize: number;
  total: number;
};

const defaultProps = {
  pageCount: 1,
  pageSize: 10,
  total: 1,
};

export default function usePagination(
  inital: PaginationSettings = defaultProps
) {
  const [curPage, setPage] = useState(0);

  const [paginationSettings, setPaginationSettings] =
    useState<PaginationSettings>({
      pageCount: parseAsInt(inital.pageCount),
      pageSize: parseAsInt(inital.pageSize),
      total: parseAsInt(inital.total),
    });

  const setPagination = (paginationSettings: PaginationSettings) => {
    setPaginationSettings(paginationSettings);
  };

  return {
    setPage,
    curPage: curPage,
    setPagination,
    paginationSettings,
  };
}

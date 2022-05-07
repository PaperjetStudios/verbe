import {
  Box,
  Table,
  TableContainer,
  Th,
  Thead,
  Tr,
  Td,
  Tbody,
  Tfoot,
} from "@chakra-ui/react";
import { SizeGuideItem } from "../../../../data/products/types";

import styles from "./SizeGuide.module.scss";

export type SizeGuideProps = {
  data: SizeGuideItem[];
};

const SizeGuide: React.FC<SizeGuideProps> = ({ data }) => {
  const tableInfo = data.map((item, index) => {
    return [
      item.Title,
      ...item.SizeValue.map((size, index) => {
        return size.Value;
      }),
    ];
  });

  const top = tableInfo.slice(0, 1);
  const bottom = tableInfo.slice(1);

  return (
    <Box className={styles.container}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {top[0].map((item, index) => {
                return <Th key={"th_" + item}>{item}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {bottom.map((item, index) => {
              return (
                <Tr key={index + "size_guide_row"}>
                  {item.map((val, index) => {
                    return <Td key={index + val}>{val}</Td>;
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SizeGuide;

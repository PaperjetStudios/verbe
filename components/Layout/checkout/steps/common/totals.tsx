import { Box, Button, Divider, HStack, Stack, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useWizard } from "react-use-wizard";
import { moneyFormatter } from "../../../../../config/util";
import { Total } from "../../../../../data/atoms/cart/cartAtoms";
import { Icons } from "../../../../Common/icons";

type ListItemProps = {
  label: string;
  total: number | string;
  currency?: boolean;
  bigger?: boolean;
  wallet?: boolean;
};
const TotalListItem: React.FC<ListItemProps> = ({
  label,
  total,
  currency = true,
  bigger = false,
}) => {
  if (total === 0 && !bigger) {
    return null;
  } else {
    return (
      <HStack justifyContent="space-between">
        <Text fontSize={bigger ? "md" : "sm"} color="#666666" fontWeight={400}>
          {label}
        </Text>
        <Text
          fontSize={bigger ? "md" : "sm"}
          fontWeight={bigger ? "600" : "400"}
        >
          {currency ? moneyFormatter(total) : total}
        </Text>
      </HStack>
    );
  }
};

type TotalsProps = {
  nextAction?: () => void;
  disableNext?: boolean;
};

const Totals: React.FC<TotalsProps> = ({ nextAction, disableNext = false }) => {
  const [totals] = useAtom(Total);

  const { nextStep, isLastStep, activeStep } = useWizard();

  if (!totals) {
    return <></>;
  }
  const total = totals.total;

  return (
    <Box>
      <Text align={"center"} fontSize="xl" fontWeight="bold">
        Cart Total
      </Text>
      <Divider my={5} />
      <Stack>
        <TotalListItem label="Items" total={totals.total_items} />
        <TotalListItem label="Delivery" total={totals.delivery} />
        <TotalListItem label="Vat" total={totals.vat} />
      </Stack>

      <Divider my={5} />
      <TotalListItem bigger label="Total" total={total} />
      <Divider my={5} />
      {!isLastStep && (
        <Button
          rightIcon={Icons.chevron.right}
          variant="main"
          disabled={disableNext}
          isFullWidth
          onClick={() => {
            if (nextAction) {
              nextAction();
            } else {
              nextStep();
            }
          }}
        >
          Continue
        </Button>
      )}
    </Box>
  );
};

export default Totals;

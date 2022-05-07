import { Box, Button, Divider, HStack, Stack, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useWizard } from "react-use-wizard";
import { moneyFormatter } from "../../../../../config/util";
import { Total } from "../../../../../data/atoms/cart/cartAtoms";
import { SetCoupon } from "../../../../../data/atoms/coupon/couponAtoms";
import { Icons } from "../../../../Common/icons";

type ListItemProps = {
  label: string;
  total: number | string;
  currency?: boolean;
  bigger?: boolean;
  wallet?: boolean;
  ifZero?: string;
};
const TotalListItem: React.FC<ListItemProps> = ({
  label,
  total,
  currency = true,
  bigger = false,
  ifZero = null,
}) => {
  if (total === 0 && !bigger && !ifZero) {
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
          {currency ? (total > 0 ? moneyFormatter(total) : ifZero) : total}
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
  const [coupon] = useAtom(SetCoupon);

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
        <TotalListItem
          label="Delivery"
          total={totals.delivery}
          ifZero="Free Shipping"
        />
        {coupon && (
          <TotalListItem
            currency={false}
            label={`Coupon: ${coupon.Code}`}
            total={`- ${
              coupon.Type === "Fixed"
                ? moneyFormatter(coupon.Discount)
                : `${coupon.Discount}%`
            }`}
          />
        )}
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

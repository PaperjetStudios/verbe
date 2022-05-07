import { currentApi } from "../../../../../../config/api";
import { convertToAmount } from "../../../../../../config/util";
import { OrderData } from "../../../../../../data/orders/types";
import { PayfastSettings } from "./PayfastWidget";

type PFData = {
  [x: string]: any;
};

export const createPFData = (settings: PayfastSettings, order: OrderData) => {
  const debug = settings.debug;

  const merchant_id = !debug ? settings.merchant_id : "10000100";
  const merchant_key = !debug ? settings.merchant_key : "46f0cd694581a";

  const pfData: PFData = {};
  // Merchant details
  pfData["merchant_id"] = merchant_id;
  pfData["merchant_key"] = merchant_key;
  pfData["return_url"] = currentApi.local + "/payfast/accept";
  pfData["cancel_url"] = currentApi.local + "/payfast/decline";
  pfData["notify_url"] = currentApi.local + "/payfast/notify";

  // TODO ADD BUYER Buyer details
  pfData["name_first"] = "First Name";
  pfData["name_last"] = "Last Name";
  pfData["email_address"] = "test@test.com";

  // Transaction details
  pfData["m_payment_id"] = order.Unique;
  pfData["amount"] = convertToAmount(order.Total);
  pfData["item_name"] = order.Unique;

  return pfData;
};

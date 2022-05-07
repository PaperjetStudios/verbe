import React, { useEffect, useState } from "react";
import general from "./general.module.scss";

import { Box, Button, HStack } from "@chakra-ui/react";

import { FormProvider, useForm } from "react-hook-form";
import TextField from "./inputs/textfield";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { axiosInstance } from "../../config/api";
import useUser from "../../hooks/useUser";
import { useAtom } from "jotai";
import { Total } from "../../data/atoms/cart/cartAtoms";
import { SetCoupon } from "../../data/atoms/coupon/couponAtoms";

const schema = yup
  .object({
    coupon: yup
      .string()
      .test("Valid Coupon", "Invalid Coupon.", function (value) {
        return new Promise((resolve, reject) => {
          console.log(value);
          axiosInstance()
            .post(`/orderutils/validateCoupon`, {
              user: this.parent.user,
              code: value,
              orderTotal: this.parent.orderTotal,
            })
            .then((validCheck: any) => {
              console.log(validCheck.data);
              const error = validCheck.data.error;
              if (error === "") {
                resolve(true);
              } else {
                if (error === "Invalid") {
                  resolve(
                    this.createError({ message: "This coupon is invalid." })
                  );
                } else if (error === "Used") {
                  resolve(
                    this.createError({
                      message: "You can only use a coupon once.",
                    })
                  );
                }
              }
              resolve(false);
            });
        });
      })
      .required("Please insert a coupon code"),
  })
  .required();

type FormCouponProps = {};

const FormCoupon: React.FC<FormCouponProps> = () => {
  const [loading, setLoading] = useState(false);

  const [coupon, setCoupon] = useAtom(SetCoupon);

  const { user } = useUser();
  const [totals] = useAtom(Total);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      coupon: "",
      user: 1,
      orderTotal: 0,
    },
  });

  useEffect(() => {
    methods.reset({
      //user: user ? user?.user?.id : -1,
      user: 1,
      orderTotal: totals ? totals.total : 0,
    });
  }, [user, totals]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { coupon } = data;

    try {
      await axiosInstance()
        .post(`/orderutils/getCouponByCode`, {
          code: coupon,
        })
        .then((res) => {
          if (res.data) {
            setCoupon(res.data);
          }
        });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <HStack alignItems={"flex-start"} gap={5}>
            <TextField name="coupon" label="" placeholder="Coupon Code" />

            <Button
              variant="main"
              isLoading={methods.formState.isSubmitting || loading}
              type="submit"
            >
              Apply
            </Button>
          </HStack>
        </form>
      </FormProvider>
    </>
  );
};

export default FormCoupon;

import * as yup from "yup";
import { axiosInstance } from "../../../../config/api";

export const schema = yup
  .object()
  .shape({
    FirstName: yup.string().required("First name is required"),
    LastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please insert a valid email address")
      .test(
        "Unique Email",
        "That email already exists, have you signed up before?",
        function (value) {
          if (value !== this.parent.oldEmail) {
            return new Promise(async (resolve, reject) => {
              return await axiosInstance()
                .get(`/utils/validEmail?email=${value}`)
                .then((validCheck: any) => {
                  resolve(!validCheck.data);
                });
            });
          } else {
            return new Promise((resolve, reject) => {
              resolve(true);
            });
          }
        }
      ),
  })
  .required();

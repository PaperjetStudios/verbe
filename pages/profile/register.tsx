import FormBox from "../../components/Common/FormBox/FormBox";

import FormRegister from "../../components/form/register";
import useUser from "../../hooks/useUser";

const pageQuery = "login-register";

const Register = () => {
  const { user } = useUser();

  return (
    <FormBox>
      <FormRegister />
    </FormBox>
  );
};

export default Register;

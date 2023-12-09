import Register from "../components/inputContent/register";
import { getUser } from "@/actions/getLoginUser";

const RegisterData = async () => {
  const validUser = await getUser();

  return <Register user={validUser} />;
};

export default RegisterData;

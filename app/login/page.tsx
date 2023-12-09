import LoginData from "../components/inputContent/loginData";
import { getUser } from "@/actions/getLoginUser";

const Login = async () => {
  const validUser = await getUser();

  return <LoginData user={validUser} />;
};

export default Login;

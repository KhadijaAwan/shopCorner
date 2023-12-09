import CartContent from "../components/cart/cartContent";
import { getUser } from "@/actions/getLoginUser";

const Cart = async () => {
  const authUser = await getUser();
  console.log("User is ", authUser);

  return <CartContent authUser={authUser} />;
};

export default Cart;

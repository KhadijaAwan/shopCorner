import { getUser } from "@/actions/getLoginUser";
import Unauthorized from "@/app/components/home/unauthorized";
import getUserOrders from "@/actions/getUserOrders";
import UserOrdersContent from "../components/product/manageOrder/userView";

const Orders = async () => {
  const validUser = await getUser();

  const orders = validUser ? await getUserOrders(validUser.id) : null;

  return (
    <>
      {!validUser ? (
        <Unauthorized label="Unauthorized Access" />
      ) : !orders ? (
        <Unauthorized label="No Orders Punched Yet!" />
      ) : (
        <UserOrdersContent orders={orders} />
      )}
    </>
  );
};

export default Orders;

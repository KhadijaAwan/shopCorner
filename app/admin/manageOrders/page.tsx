import AdminLinks from "@/app/components/adminData/adminLinks";
import { getUser } from "@/actions/getLoginUser";
import Unauthorized from "@/app/components/home/unauthorized";
import ManageOrdersContent from "@/app/components/product/manageOrder";
import getOrders from "@/actions/getOrders";

const ManageOrders = async () => {
  const orders = await getOrders();
  const validUser = await getUser();

  return (
    <>
      <AdminLinks />
      {!validUser || validUser.role !== "ADMIN" ? (
        <Unauthorized label="Unauthorized Access" />
      ) : (
        <ManageOrdersContent orders={orders} />
      )}
    </>
  );
};

export default ManageOrders;

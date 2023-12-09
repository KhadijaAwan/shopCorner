import getAllUsers from "@/actions/getUsers";
import AdminLinks from "../components/adminData/adminLinks";
import getOrders from "@/actions/getOrders";
import getProducts from "@/actions/getProducts";
import AdminPage from "../components/adminData/adminPage";

const Admin = async () => {
  const users = (await getAllUsers()) || [];
  const orders = (await getOrders()) || [];
  const products = (await getProducts({ category: null })) || [];

  return (
    <>
      <AdminLinks />
      <AdminPage users={users} orders={orders} products={products} />
    </>
  );
};

export default Admin;

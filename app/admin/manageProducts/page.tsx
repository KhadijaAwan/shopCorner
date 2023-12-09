import AdminLinks from "@/app/components/adminData/adminLinks";
import ManageProductsContent from "@/app/components/product/manageProduct";
import { getUser } from "@/actions/getLoginUser";
import getProducts from "@/actions/getProducts";
import Unauthorized from "@/app/components/home/unauthorized";

const ManageProducts = async () => {
  const products = await getProducts({
    category: null,
  });
  const validUser = await getUser();

  return (
    <>
      <AdminLinks />
      {!validUser || validUser.role !== "ADMIN" ? (
        <Unauthorized label="Unauthorized Access" />
      ) : (
        <ManageProductsContent products={products || []} />
      )}
    </>
  );
};

export default ManageProducts;

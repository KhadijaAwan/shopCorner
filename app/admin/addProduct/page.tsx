import AdminLinks from "@/app/components/adminData/adminLinks";
import { getUser } from "@/actions/getLoginUser";
import Unauthorized from "@/app/components/home/unauthorized";
import AddProductItems from "@/app/components/product/addProduct";

const AddProduct = async () => {
  const validUser = await getUser();

  return (
    <>
      <AdminLinks />
      {validUser && validUser.role !== "ADMIN" ? (
        <Unauthorized label="Unauthorized Access" />
      ) : (
        <AddProductItems />
      )}
    </>
  );
};

export default AddProduct;

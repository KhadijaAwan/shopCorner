import ProductInfo from "@/app/components/product/productInfo";
import getProductId from "@/actions/getProductId";
import { getUser } from "@/actions/getLoginUser";

interface Params {
  productId: string;
}

const Product = async ({ params }: { params: Params }) => {
  console.log("Params : ", params);

  const validUser = await getUser();
  const productdetail = await getProductId(params);

  return <ProductInfo productDetails={productdetail} user={validUser} />;
};

export default Product;

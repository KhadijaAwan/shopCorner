import getOrdersId from "@/actions/getOrderId";
import OrderInfo from "@/app/components/order/orderInfo";

interface Params {
  orderId: string;
}

const Order = async ({ params }: { params: Params }) => {
  console.log("Params : ", params);
  const order = await getOrdersId(params);

  return <>{order ? <OrderInfo orderDetails={order} /> : null}</>;
};

export default Order;

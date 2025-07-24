// import Address from "@/components/shopping-view/address";
// import img from "../../assets/account.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { createNewOrder } from "@/store/shop/order-slice";
// import { Navigate } from "react-router-dom";
// import {toast} from "sonner"; 

// function ShoppingCheckout() {
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const { approvalURL } = useSelector((state) => state.shopOrder);

//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
//   const [isPaymentStart, setIsPaymemntStart] = useState(false);

//   const dispatch = useDispatch();

// //   console.log(currentSelectedAddress, "cartItems");

//   const totalCartAmount =
//     cartItems && cartItems.items && cartItems.items.length > 0
//       ? cartItems.items.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0;

//   function handleInitiatePaypalPayment() {
//     if (cartItems.length === 0) {
//       toast.error("Your cart is empty. Please add items to proceed.");
//       return;
//     }
//     if (currentSelectedAddress === null) {
//       toast.error("Please select a shipping address.");
//       return;
//     }

//     const orderData = {
//       userId: user?.id,
//       cartId: cartItems?._id,
//       cartItems: cartItems.items.map((singleCartItem) => ({
//         productId: singleCartItem?.productId,
//         title: singleCartItem?.title,
//         image: singleCartItem?.image,
//         price:
//           singleCartItem?.salePrice > 0
//             ? singleCartItem?.salePrice
//             : singleCartItem?.price,
//         quantity: singleCartItem?.quantity,
//       })),
//       addressInfo: {
//         addressId: currentSelectedAddress?._id,
//         address: currentSelectedAddress?.address,
//         city: currentSelectedAddress?.city,
//         pincode: currentSelectedAddress?.pincode,
//         phone: currentSelectedAddress?.phone,
//         notes: currentSelectedAddress?.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "paypal",
//       paymentStatus: "pending",
//       totalAmount: totalCartAmount,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//       payerId: "",
//     };

//     dispatch(createNewOrder(orderData)).then((data) => {
//       console.log(data, "Aman");
//       if (data?.payload?.success) {
//         setIsPaymemntStart(true);
//       } else {
//         setIsPaymemntStart(false);
//       }
//     });
//   }

//   if (approvalURL) {
//     window.location.href = approvalURL; // 🔁 Redirect to PayPal
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="relative h-[300px] w-full overflow-hidden">
//         <img src={img} className="h-full w-full object-cover object-center" />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
//         <Address
//           selectedId={currentSelectedAddress}
//           setCurrentSelectedAddress={setCurrentSelectedAddress}
//         />
//         <div className="flex flex-col gap-4 ">
//           {cartItems && cartItems.items && cartItems.items.length > 0
//             ? cartItems.items.map((item) => (
//                 <UserCartItemsContent cartItem={item} />
//               ))
//             : null}
//           <div className="mt-8 space-y-4">
//             <div className="flex justify-between">
//               <span className="font-bold">Total</span>
//               <span className="font-bold">₹{totalCartAmount}</span>
//             </div>
//           </div>
//           <div className="mt-4 w-full">
//             <Button onClick={handleInitiatePaypalPayment} 
//             className={`w-full ${
//               isPaymentStart ? "bg-yellow-500 text-white" : "bg-blue-600 text-white"
//                 }`}
//             >
//               {isPaymentStart
//                 ? "Processing Paypal Payment..."
//                 : "Checkout with Paypal"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingCheckout;



import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";
import { format, addDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const dispatch = useDispatch();

  const estimatedDelivery = format(addDays(new Date(), 5), "dd MMM yyyy");

  const totalCartAmountBeforeDiscount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item?.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
          0
        )
      : 0;

  const totalCartAmount = totalCartAmountBeforeDiscount - discount;

  function applyCoupon() {
    if (coupon.toLowerCase() === "save10") {
      setDiscount(Math.round(totalCartAmountBeforeDiscount * 0.1));
      toast.success("Coupon applied: 10% off");
    } else {
      toast.error("Invalid coupon code");
      setDiscount(0);
    }
  }

  function handleInitiatePaypalPayment() {
    if (!cartItems?.items?.length) {
      toast.error("Your cart is empty. Please add items to proceed.");
      return;
    }
    if (!currentSelectedAddress) {
      toast.error("Please select a shipping address.");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item.salePrice : item.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }
  // console.log("approvalURL",approvalURL);

  return (
    <div className="flex flex-col">
      {/* Top Banner */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
          {/* Address Selection */}
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Shipping Address</h2>
            </div>
            <div className="grid grid-col ">
              <Address
                selectedId={currentSelectedAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            </div> 
          </div>

          {/* Cart Summary */}
          <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-semibold border-b pb-1 mb-2">
              Review Cart
            </h2>
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
              {cartItems?.items?.length > 0 ? (
                cartItems.items.map((item, idx) => (
                  <UserCartItemsContent key={item?.productId || idx} cartItem={item} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              )}
            </div>

            <div className="space-y-2 mt-2">
              <Label htmlFor="coupon">Coupon Code</Label>
              <div className="flex gap-2">
                <Input
                  id="coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon"
                />
                <Button type="button" onClick={applyCoupon}>
                  Apply
                </Button>
              </div>
            </div>

            {/* Totals */}
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalCartAmountBeforeDiscount}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>- ₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalCartAmount}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Estimated Delivery</span>
                <span>{estimatedDelivery}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleInitiatePaypalPayment}
              className={`w-full mt-2 ${
                isPaymentStart ? "bg-yellow-500" : "bg-blue-600"
              } text-white`}
              disabled={isPaymentStart}
            >
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;


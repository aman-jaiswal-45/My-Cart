// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
// import UserCartItemsContent from "./cart-items-content";

// function UserCartWrapper({ cartItems, setOpenCartSheet }) {
//   const navigate = useNavigate();

//   const totalCartAmount =
//     cartItems && cartItems.length > 0 
//       ? cartItems.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0;

//   return (
//     <SheetContent className="sm:max-w-md">
//       <SheetHeader>
//         <SheetTitle>Your Cart</SheetTitle>
//       </SheetHeader>
//       <div className="mt-8 space-y-4">
//         {cartItems && cartItems.length > 0
//           ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
//           : null}
//       </div>
//       <div className="mt-8 space-y-4">
//         <div className="flex justify-between">
//           <span className="font-bold">Total</span>
//           <span className="font-bold">₹{totalCartAmount}</span>
//         </div>
//       </div>
//       <Button
//         isDisabled={cartItems.length === 0} 
//         onClick={() => {
//           navigate("/shop/checkout");
//           setOpenCartSheet(false);
//         }}
//         className="w-full mt-6"
//       >
//         Checkout
//       </Button>
//     </SheetContent>
//   );
// }

// export default UserCartWrapper;




import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { format, addDays } from "date-fns";
import { ShoppingCart } from "lucide-react";


function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const deliveryStart = format(addDays(new Date(), 5), "MMM d, yyyy");
  const deliveryEnd = format(addDays(new Date(), 7), "MMM d, yyyy");
  const deliveryEstimate = `${deliveryStart} - ${deliveryEnd}`;

  const totalCartAmount =
    cartItems && cartItems.length > 0 
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const couponDiscount = totalCartAmount >= 1000 ? 100 : 0; // Example logic
  const grandTotal = totalCartAmount - couponDiscount;

  return (
    
    <SheetContent className="sm:max-w-md flex flex-col">
      <SheetHeader className="flex items-center gap-2 border-b pb-3">
        <ShoppingCart className="w-5 h-5 text-primary" />
        <SheetTitle className="text-lg font-semibold tracking-tight">
          Your Shopping Cart
        </SheetTitle>
      </SheetHeader>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-3 mt-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.productId} cartItem={item} />
          ))
        ) : (
          <div className="text-center text-muted-foreground mt-8">
            <p>Your cart is empty.</p>
          </div>
        )}

        

        {cartItems.length > 0 && (
          <div className="space-y-2 text-sm mt-6">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span>₹{totalCartAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span className="font-medium">Coupon Discount</span>
              <span>- ₹{couponDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Delivery Estimate</span>
              <span>{deliveryEstimate}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Buttons pinned to the bottom */}
      {cartItems.length > 0 && (
        <div className="flex flex-col gap-2 p-3 border-t">
          <Button
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
            className="w-full"
          >
            Checkout
          </Button>

          <Button
            variant="outline"
            onClick={() => setOpenCartSheet(false)}
            className="w-full bg-yellow-300 text-primary"
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </SheetContent>

  );
}

export default UserCartWrapper;


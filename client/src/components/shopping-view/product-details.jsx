// import { StarIcon } from "lucide-react";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { Separator } from "../ui/separator";
// import { Input } from "../ui/input";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { setProductDetails } from "@/store/shop/products-slice";
// import { Label } from "../ui/label";
// import StarRatingComponent from "../common/star-rating";
// import { useEffect, useState } from "react";
// import { addReview, getReviews } from "@/store/shop/review-slice";
// import { toast } from "sonner";

// function ProductDetailsDialog({ open, setOpen, productDetails }) {
//   const [reviewMsg, setReviewMsg] = useState("");
//   const [rating, setRating] = useState(0);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { reviews } = useSelector((state) => state.shopReview);

//   function handleRatingChange(getRating) {
//     // console.log(getRating, "getRating");

//     setRating(getRating);
//   }

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     let getCartItems = cartItems.items || [];

//     if (getCartItems.length) {
//       const indexOfCurrentItem = getCartItems.findIndex(
//         (item) => item.productId === getCurrentProductId
//       );
//       if (indexOfCurrentItem > -1) {
//         const getQuantity = getCartItems[indexOfCurrentItem].quantity;
//         if (getQuantity + 1 > getTotalStock) {
//           toast.error(`Only ${getQuantity} quantity can be added for this item`);

//           return;
//         }
//       }
//     }
//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast.success("Product is added to cart");
//         setOpen(false);
//       }
//     });
//   }

//   function handleDialogClose() {
//     setOpen(false);
//     dispatch(setProductDetails());
//     setRating(0);
//     setReviewMsg("");
//   }

//   function handleAddReview() {
//     // console.log(reviewMsg, rating, "reviewMsg, rating");
//     dispatch(
//       addReview({
//         productId: productDetails?._id,
//         userId: user?.id,
//         userName: user?.userName,
//         reviewMessage: reviewMsg,
//         reviewValue: rating,
//       })
//     ).then((data) => {
//       if (data.payload.success) {
//         setRating(0);
//         setReviewMsg("");
//         dispatch(getReviews(productDetails?._id));
//         toast.success("Review added successfully!");
//       }
//       else{
//         toast.error(data.payload.message || "Failed to add review");
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) dispatch(getReviews(productDetails?._id));
//   }, [productDetails]);

//   // console.log(reviews, "reviews");

//   const averageReview =
//     reviews && reviews.length > 0
//       ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
//         reviews.length
//       : 0;

//   return ( 
//     <Dialog open={open} onOpenChange={handleDialogClose}>
//       <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
//         <div className="relative overflow-hidden rounded-lg">
//           <img
//             src={productDetails?.image}
//             alt={productDetails?.title}
//             width={600}
//             height={600}
//             className="aspect-square w-full object-cover"
//           />
//         </div>
//         <div>
//           <div>
//             <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
//             <p className="text-muted-foreground text-2xl mb-5 mt-4">
//               {productDetails?.description}
//             </p>
//           </div>
//           <div className="flex items-center justify-between">

//             <div className="flex items-center gap-2">
//               <span className="text-3xl font-bold text-primary">
//                 ₹{productDetails?.salePrice > 0 ? productDetails?.salePrice : productDetails?.price}
//               </span>
//               {productDetails?.salePrice > 0 && productDetails?.salePrice !== productDetails?.price && (
//                 <span className="text-lg font-bold line-through text-gray-500 dark:text-gray-400">
//                   ₹{productDetails?.price}
//                 </span>
//               )}
//               </div>
//           </div>
//           <div className="flex items-center gap-2 mt-2">
//             <div className="flex items-center gap-0.5">
//               <StarRatingComponent rating={averageReview} />
//             </div>
//             <span className="text-muted-foreground">
//               ({averageReview.toFixed(2)})
//             </span>
//           </div>
//           <div className="mt-5 mb-5">
//             {productDetails?.totalStock === 0 ? (
//               <Button className="w-full opacity-60 cursor-not-allowed">
//                 Out of Stock
//               </Button>
//             ) : (
//               <Button
//                 className="w-full"
//                 onClick={() =>
//                   handleAddToCart(
//                     productDetails?._id,
//                     productDetails?.totalStock
//                   )
//                 }
//               >
//                 Add to Cart
//               </Button>
//             )}
//           </div>
//           <Separator />
//           <div className="max-h-[300px] overflow-auto">
//             <h2 className="text-xl font-bold mb-4">Reviews</h2>
//             <div className="grid gap-6">
//               {reviews && reviews.length > 0 ? (
//                 reviews.map((reviewItem) => (
//                   <div className="flex gap-4">
//                     <Avatar className="w-10 h-10 border">
//                       <AvatarFallback>
//                         {reviewItem?.userName[0].toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="grid gap-1">
//                       <div className="flex items-center gap-2">
//                         <h3 className="font-bold">{reviewItem?.userName}</h3>
//                       </div>
//                       <div className="flex items-center gap-0.5">
//                         <StarRatingComponent rating={reviewItem?.reviewValue} />
//                       </div>
//                       <p className="text-muted-foreground">
//                         {reviewItem.reviewMessage}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <h1>No Reviews</h1>
//               )}
//             </div>
//             <div className="mt-10 flex-col flex gap-2">
//               <Label>Write a review</Label>
//               <div className="flex gap-1">
//                 <StarRatingComponent
//                   rating={rating}
//                   handleRatingChange={handleRatingChange}
//                 />
//               </div>
//               <Input
//                 name="reviewMsg"
//                 value={reviewMsg}
//                 onChange={(event) => setReviewMsg(event.target.value)}
//                 placeholder="Write a review..."
//               />
//               <Button
//                 onClick={handleAddReview}
//                 disabled={reviewMsg.trim() === ""}
//               >
//                 Submit
//               </Button>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ProductDetailsDialog;



import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { toast } from "sonner";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    const getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const item = getCartItems.find((item) => item.productId === getCurrentProductId);
      if (item && item.quantity + 1 > getTotalStock) {
        toast.error(`Only ${item.quantity} quantity can be added for this item`);
        return;
      }
    }

    dispatch(addToCart({
      userId: user?.id,
      productId: getCurrentProductId,
      quantity: 1,
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart");
        setOpen(false);
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(addReview({
      productId: productDetails?._id,
      userId: user?.id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    })).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast.success("Review added successfully!");
      } else {
        toast.error(data.payload.message || "Failed to add review");
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:p-10 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full aspect-square object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">{productDetails?.title}</h1>
            <p className="text-muted-foreground mt-2 text-base leading-relaxed">
              {productDetails?.description}
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-3 items-center">
              <span className="text-3xl font-bold text-primary">
                ₹{productDetails?.salePrice > 0 ? productDetails?.salePrice : productDetails?.price}
              </span>
              {productDetails?.salePrice > 0 && productDetails?.salePrice !== productDetails?.price && (
                <span className="line-through text-gray-500 text-lg">
                  ₹{productDetails?.price}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-5">
            <StarRatingComponent rating={averageReview} />
            <span className="text-muted-foreground text-sm">
              ({averageReview.toFixed(1)})
            </span>
          </div>

          <div className="mb-6">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">Out of Stock</Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddToCart(productDetails?._id, productDetails?.totalStock)
                }
                className="w-full"
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator className="mb-4" />

          <h2 className="text-xl font-semibold mb-2">Customer Reviews</h2>
          <div className="space-y-4 max-h-[250px] overflow-auto pr-2">
            {reviews && reviews.length > 0 ? (
              reviews.map((reviewItem) => (
                <div key={reviewItem._id} className="flex items-start gap-4 p-2 rounded-lg bg-muted/50">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {reviewItem?.userName?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center gap-2">
                      <h4 className="font-medium">{reviewItem?.userName}</h4>
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                    </div>
                    <p className="text-muted-foreground text-sm">{reviewItem.reviewMessage}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No reviews yet.</p>
            )}
          </div>

          <div className="mt-6 space-y-2">
            <Label>Write a Review</Label>
            <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
            <Input
              placeholder="Share your thoughts..."
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
            />
            <Button onClick={handleAddReview} disabled={!reviewMsg.trim()}>
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;


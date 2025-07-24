// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Button } from "../ui/button";
// import { brandOptionsMap, categoryOptionsMap } from "@/config";
// import { Badge } from "../ui/badge";

// function ShoppingProductTile({
//   product,
//   handleGetProductDetails,
//   handleAddtoCart,
// }) {
//   return (
//     <Card className="w-full max-w-sm mx-auto">
//       <div 
//       onClick={() => handleGetProductDetails(product?._id)}
//       >
//         <div className="relative">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-[300px] object-cover rounded-t-lg"
//           />
//           {
//           product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Out Of Stock
//             </Badge>
//             ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
//               {`Only ${product?.totalStock} items left`}
//             </Badge>
//           ) : 
//           product?.price > 0 ? (
//             <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
//               For Sale
//             </Badge>
//           ) : null} 
//         </div>
//         <CardContent className="p-4">
//           <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-[16px] text-muted-foreground">
//               {categoryOptionsMap[product?.category]}
//             </span>
//             <span className="text-[16px] text-muted-foreground">
//               {brandOptionsMap[product?.brand]}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-lg font-semibold text-primary`}
//             >
//               ${product?.price}
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-lg font-semibold text-primary">
//                 ${product?.salePrice}
//               </span>
//             ) : null}
//           </div>
//         </CardContent> 
//       </div>
//       <CardFooter>
//         {product?.totalStock === 0 ? (
//           <Button className="w-full opacity-60 cursor-not-allowed">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
//             className="w-full"
//           >
//             Add to cart
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// }

// export default ShoppingProductTile;


import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";


function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {

  const discountPercentage = product?.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Card className="w-full max-w-sm mx-auto rounded-2xl shadow-md transition-transform duration-300 hover:shadow-xl group">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.price > 0 ? (
            <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
              For Sale
            </Badge>
          ) : null}

          {product?.salePrice > 0 && product?.salePrice!== product?.price && (
            <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold text-center mb-2 dark:text-white">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2 text-muted-foreground dark:text-gray-400">
            <span className="text-sm">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="flex justify-center gap-1 text-yellow-500 mb-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={16}
                fill={index < (product?.rating ) ? "#facc15" : "none"}
              />
            ))}
          </div>

          <div className="flex justify-center items-baseline space-x-2 mb-2">
            {product?.salePrice > 0 ? (
              <>
                {
                  product?.price > product?.salePrice && (
                    <span className="text-lg font-bold line-through text-gray-500 dark:text-gray-400">
                      ₹{product?.price}
                    </span>
                  )
                }
                <span className="text-lg font-bold text-primary dark:text-white">
                  ₹{product?.salePrice}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary dark:text-white">
                ₹{product?.price}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;



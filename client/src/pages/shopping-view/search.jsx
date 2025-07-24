import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import SearchLoader from "@/components/shopping-view/SearchLoader";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  useEffect(() => {
      if (keyword.trim()) {
        setLoading(true);
        const timer = setTimeout(() => {
          setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
          dispatch(getSearchResults(keyword)).finally(() => setLoading(false));
        }, 600);
        return () => clearTimeout(timer);
      } else {
        setLoading(false);
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(resetSearchResults());
      }
    }, [keyword]);


  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getQuantity} quantity can be added for this item`);
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart!");
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex justify-center mb-10">
        <div className="sticky top-4 z-10 bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 mb-10">
            <Input
              value={keyword}
              name="keyword"
              onChange={(e) => setKeyword(e.target.value)}
              className="py-6 px-6 text-lg border-2 border-gray-300 focus:border-blue-500 rounded-2xl shadow-sm transition-all w-full"
              placeholder="🔍 Search your desired products..."
            />
          </div>
      </div>

      {!searchResults.length && keyword.trim() === "" && (
        <div className="text-center text-gray-600 mt-8 text-xl animate-pulse">
          Start typing to explore your favorite products 🛍️
        </div>
      )}

      {!searchResults.length && keyword.trim() !== "" && (
        <div className="text-center text-red-400 font-semibold text-2xl mt-8">
          No products found! Try a different keyword.
        </div>
      )}

      {loading ? (
          <SearchLoader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all">
            {searchResults.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <ShoppingProductTile
                  handleAddtoCart={handleAddtoCart}
                  product={item}
                  handleGetProductDetails={handleGetProductDetails}
                />
              </motion.div>
            ))}
          </div>
        )}


      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;

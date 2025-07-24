import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For subtle animation
import { useEffect } from "react";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/shop/account"), 5000);
    return () => clearTimeout(timer);
    }, []);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <Card className="w-full max-w-md sm:p-10 p-6 text-center shadow-xl border border-green-200 rounded-2xl">
        <div className="flex flex-col items-center">
          {/* Animated Emoji */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-6xl mb-2"
          >
            🎉
          </motion.div>

          {/* Title immediately below emoji */}
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-3">
            Payment Successful!
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
            Thank you for your purchase. <br className="hidden sm:inline" />
            Your order has been successfully confirmed.
          </p>

          {/* Button */}
          <Button
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 transition duration-200"
            onClick={() => navigate("/shop/account")}
          >
            View My Orders
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;


import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react"; // Icon loader (if using Lucide)

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Extract token and payerId from the URL
  const params = new URLSearchParams(location.search);
  const payerId = params.get("PayerID");
  const token = params.get("token");

  useEffect(() => {
    if (token && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ token, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
         }       
    });
    }
  }, [token, payerId, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-50">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-xl text-center">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-800 mb-2">
            Processing Your Payment...
          </CardTitle>
          <div className="flex justify-center mt-4 animate-spin text-blue-600">
            <Loader2 className="w-10 h-10" />
          </div>
          <p className="mt-6 text-sm text-gray-600">
            Please do not refresh or close this page. Your payment is being verified.
          </p>
        </CardHeader>
      </Card>
    </div>
  );
}

export default PaypalReturnPage; 


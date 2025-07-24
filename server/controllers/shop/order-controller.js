const paypal = require("@paypal/checkout-server-sdk");
const { client } = require("../../helpers/paypal"); // the client() from the helper file
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
      payerId,
    } = req.body;

    // Step 1: Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalAmount.toFixed(2),
              },
            },
          },
          items: cartItems.map((item) => ({
            name: item.title,
            unit_amount: {
              currency_code: "USD",
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
          })),
        },
      ],
      application_context: {
        return_url: "https://my-cart-ashen-omega.vercel.app/shop/paypal-return",
        cancel_url: "https://my-cart-ashen-omega.vercel.app/shop/paypal-cancel", 
      },
    });

    const paypalClient = client();
    const order = await paypalClient.execute(request);

    // Step 2: Save to DB (only save after successful payment in most secure systems)
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      payerId, 
    });

    await newlyCreatedOrder.save();

    // Step 3: Send approval link
    const approvalLink = order.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.status(201).json({
      success: true,
      approvalURL: approvalLink,
      orderId: newlyCreatedOrder._id,
      message: "PayPal order created successfully",
    });
  } catch (err) {
    console.error("PayPal Create Order Error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating PayPal order",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { 
      token, 
      payerId, 
      orderId 
    } = req.body;

    // Validate input
    if ( !token || !payerId || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Missing token, payerId, or orderId",
      });
    }

    // Fetch order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update order payment and status
    order.paymentStatus = "paid";
    order.orderStatus = "pending";
    order.payerId = payerId;

    // Reduce product stock
    for (const item of order.cartItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.productId} not found`,
        });
      }

      if (product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    // Remove cart if it exists
    if (order.cartId) {
      await Cart.findByIdAndDelete(order.cartId);
    }

    // Save the updated order
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order confirmed and payment captured",
      data: order,
    });
  } catch (e) {
    console.error("Error capturing payment:", e);
    return res.status(500).json({
      success: false,
      message: "Server error while capturing payment",
    });
  }
};


const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};

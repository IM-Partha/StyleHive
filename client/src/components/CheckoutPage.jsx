import React from "react";
import { useSelector } from "react-redux";
import PaymentButton from "../components/PaymentButton";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Checkout
      </h2>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 w-full max-w-2xl mx-auto">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Order Summary
        </h3>

        <div className="space-y-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm md:text-base border-b pb-2"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-xl md:text-2xl font-bold text-right">
          Total: ${totalAmount}
        </h3>
      </div>

      {/* Payment Button */}
      <div className="flex justify-center mt-6">
        <PaymentButton  amount={totalAmount} />
      </div>
    </div>
  );
};

export default CheckoutPage;

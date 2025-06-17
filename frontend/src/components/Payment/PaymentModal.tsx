import React, { useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {api} from "../../axios/axiosInstance"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!); // Your Stripe publishable key

const CheckoutForm = ({ amount,appointmentId, onSuccess, onClose }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/api/user/create-stripe-payment-intent", { amount,appointmentId });
      const result = await stripe?.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement)!,
        },
      });

      if (result?.error) {
        setError(result.error.message || "Payment failed");
      } else if (result?.paymentIntent?.status === "succeeded") {
        await api.post("/api/user/mark-appointment-paid", { appointmentId });
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      
      setError(err.message || "Payment failed");
      
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

const StripeModal = ({ open, amount, onSuccess, onClose }: any) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg min-w-[350px]">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ×
        </button>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} onSuccess={onSuccess} onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
};

export default StripeModal;
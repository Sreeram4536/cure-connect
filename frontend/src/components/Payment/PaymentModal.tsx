// frontend/src/components/Payment/PaymentModal.tsx
import React, { useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { api } from "../../axios/axiosInstance";
import { 
  XMarkIcon, 
  CreditCardIcon, 
  ExclamationTriangleIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#374151",
      letterSpacing: "0.025em",
      fontFamily: "Inter, Arial, sans-serif",
      "::placeholder": { 
        color: "#9CA3AF",
        fontSize: "14px"
      },
      padding: "12px 16px",
    },
    invalid: { 
      color: "#EF4444",
      iconColor: "#EF4444"
    },
  },
};

const CheckoutForm = ({ amount, appointmentId, onSuccess, onClose }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/api/user/create-stripe-payment-intent", { amount, appointmentId });
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
    <div className="space-y-6">
      {/* Payment Amount Display */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h3>
        <p className="text-gray-600 mb-4">Enter your card details to proceed</p>
        <div className="text-3xl font-bold text-green-600">₹{(amount / 100).toFixed(2)}</div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
          
          {/* Card Element */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Details
            </label>
            <div className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-colors">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheckIcon className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Secure Payment</p>
              <p className="text-xs text-gray-600">
                Your payment information is encrypted and secure. We use Stripe to process payments and never store your card details.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCardIcon className="w-5 h-5" />
                Pay ₹{(amount / 100).toFixed(2)}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const StripeModal = ({ open, amount, onSuccess, onClose }: any) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <CreditCardIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Secure Payment</h2>
              <p className="text-sm text-gray-600">Complete your payment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} onSuccess={onSuccess} onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
};

export default StripeModal;
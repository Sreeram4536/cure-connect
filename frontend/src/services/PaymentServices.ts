import { api } from "../axios/axiosInstance";

// Create payment intent
export const createPaymentIntent = async (appointmentId: string, token: string) => {
  return await api.post(
    '/api/users/create-payment-intent',
    { appointmentId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Confirm payment
export const confirmPayment = async (paymentIntentId: string, token: string) => {
  return await api.post(
    '/api/users/confirm-payment',
    { paymentIntentId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PaymentWrapperProps {
  amount: number;
  appointmentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({
  amount,
  appointmentId,
  onSuccess,
  onCancel,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        amount={amount}
        appointmentId={appointmentId}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  );
};

export default PaymentWrapper;
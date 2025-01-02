const Payment = require('../models/Payment');

exports.processPayment = async (bookingId, amount, method, transactionId) => {
  try {
    const payment = await Payment.create({
      booking_id: bookingId,
      amount,
      payment_method: method,
      transaction_id: transactionId,
      payment_status: 'paid',
    });
    return payment;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw new Error('Failed to process payment');
  }
};

exports.getPaymentDetails = async (paymentId) => {
  try {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) throw new Error('Payment not found');
    return payment;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw new Error('Failed to fetch payment details');
  }
};

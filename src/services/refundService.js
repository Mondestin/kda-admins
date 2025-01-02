const Refund = require('../models/Refund');
const Payment = require('../models/Payment');

exports.initiateRefund = async (paymentId, refundAmount, reason) => {
  try {
    const payment = await Payment.findByPk(paymentId);
    if (!payment || payment.payment_status !== 'paid') {
      throw new Error('Payment not found or not eligible for refund');
    }

    const refund = await Refund.create({
      payment_id: paymentId,
      refund_amount: refundAmount,
      refund_status: 'success',
      reason,
      transaction_id: `REF-${Date.now()}`, // Generate a unique transaction ID
    });

    // Update payment status to refunded
    await payment.update({ payment_status: 'refunded' });

    return refund;
  } catch (error) {
    console.error('Error initiating refund:', error);
    throw new Error('Failed to initiate refund');
  }
};

exports.getRefundDetails = async (refundId) => {
  try {
    const refund = await Refund.findByPk(refundId, {
      include: ['Payment'],
    });
    if (!refund) throw new Error('Refund not found');
    return refund;
  } catch (error) {
    console.error('Error fetching refund details:', error);
    throw new Error('Failed to fetch refund details');
  }
};

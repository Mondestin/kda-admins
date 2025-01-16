const Payment = require('../../models/Payment');

// Process a payment for a booking
exports.processPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);
    res.status(201).json({ success: true, data: newPayment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error processing payment' });
  }
};

// Initiate a refund for a payment
exports.initiateRefund = async (req, res) => {
  const { payment_id, refund_amount, reason } = req.body;
  try {
    const refund = await Payment.create({
      payment_id,
      refund_amount,
      reason,
    });
    res.status(201).json({ success: true, data: refund });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error initiating refund' });
  }
};

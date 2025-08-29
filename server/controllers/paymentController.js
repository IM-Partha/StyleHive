const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RBCZxW2LPPhd00",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "gA42geO6jLbxF272vQf1toHk",
});

// Create Order
const createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100, // convert to paise
    currency: currency || 'INR',
    receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Order creation failed' });
  }
};

// Verify Payment
const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    res.status(200).json({ success: true, message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature, payment failed' });
  }
};

module.exports = {
  createOrder,
  verifyPayment
};

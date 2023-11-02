const stripeAPI = require("./stripe");

// สร้าง session สำหรับการเช่า เมื่อ user กด rent now
const createCheckoutSession = async (req, res) => {
  const domainUrl = process.env.FIND_WEB_APP_URL;
  console.log(" ##### req.body#####", req.body);
  const { line_items, customer_email } = req.body;
  // เช็คว่ามี line_items และ customer email จาก req body ไหม
  if (!line_items || !customer_email) {
    return res
      .status(400)
      .json({ error: "missing required session parameters" });
  }

  let session;

  try {
    // สร้าง session อิงกับ doc ของ Stripe ต้องส่งค่าต่างๆที่ required
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/cancelled`,
    });
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error", error);
    console.log(error);
  }
};

module.exports = createCheckoutSession;

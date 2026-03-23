// Required Netlify env vars (set in Netlify Dashboard → Site Settings → Environment Variables):
//   STRIPE_SECRET_KEY          = sk_live_... (from Stripe Dashboard → Developers → API keys)
//   STRIPE_COMMUNITY_PRICE_ID  = price_...   (recurring $9.99/month Price ID from Stripe Dashboard)
//
// To create the Price in Stripe:
//   Products → Add Product → Name: "Community Membership" → $9.99 / month (recurring)
//   Copy the Price ID (starts with price_...) → set as STRIPE_COMMUNITY_PRICE_ID in Netlify

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Demo mode: Stripe not configured yet — frontend will handle checkout flow
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_COMMUNITY_PRICE_ID) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ demo: true }),
    };
  }

  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const { email, successUrl, cancelUrl } = JSON.parse(event.body);

    const sessionParams = {
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: process.env.STRIPE_COMMUNITY_PRICE_ID, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { email: email || "" },
    };

    if (email) sessionParams.customer_email = email;

    const session = await stripe.checkout.sessions.create(sessionParams);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe subscription error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};

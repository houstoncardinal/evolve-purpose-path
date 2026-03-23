const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Required Netlify env var: STRIPE_COMMUNITY_PRICE_ID
// Create a recurring $9.99/month Price in your Stripe Dashboard:
//   Products → Add Product → Name: "Community Membership"
//   Pricing: $9.99 / month (recurring)
//   Copy the Price ID (starts with price_...) → set as STRIPE_COMMUNITY_PRICE_ID in Netlify

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { email, successUrl, cancelUrl } = JSON.parse(event.body);

    const sessionParams = {
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_COMMUNITY_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { email: email || "" },
    };

    // Pre-fill email if provided (skips that field in Stripe Checkout)
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
      body: JSON.stringify({ error: err.message }),
    };
  }
};

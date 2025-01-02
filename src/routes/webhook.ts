import Elysia, { error } from "elysia";
import Stripe from "stripe";

export const webhook = new Elysia()
    .post("/webhook", async ({ request, headers }) => {
        const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
            apiVersion: "2024-12-18.acacia",
        });

        const sig = headers["stripe-signature"];
        let event;

        let rawBody;
        try {
            // Read raw request body
            rawBody = await request.text();
        } catch (err) {
            console.error("Failed to read request body:", err);
            return error(400, "Failed to read request body");
        }
        const secret = "whsec_4d662855f700fe26ffbc3b223fbc8b43f2c82c7386979319056be3db50e90ce0"; // Ensure no extra spaces

        try {
            // Use constructEventAsync instead of constructEvent
            event = await stripeClient.webhooks.constructEventAsync(
                rawBody, // Use raw body
                //@ts-ignore
                sig, 
                secret
            );
        } catch (err) {
            console.error("Webhook signature verification failed:", err.message);
            return error(400, "Webhook signature verification failed");
        }

        // Handle different event types
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntentSucceeded = event.data.object;
                console.log("Payment succeeded:", paymentIntentSucceeded);
                break;
            case "charge.succeeded":
                const chargeSucceeded = event.data.object;
                console.log("Charge succeeded:", chargeSucceeded);
                break;
            case "payment_intent.payment_failed":
                const paymentFailed = event.data.object;
                console.error("Payment failed:", paymentFailed);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return { received: true };
    });

export default webhook;
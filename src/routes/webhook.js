import Elysia, { error } from "elysia";
import Stripe from "stripe";
export const webhook = new Elysia({}).post("/webhook", async ({ body, headers }) => {
    const stripeClient = new Stripe(Bun.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-12-18.acacia",
    });
    const sig = headers["stripe-signature"];
    let event;
    try {
        event = stripeClient.webhooks.constructEvent(
        // @ts-ignore
        body, sig, " whsec_4d662855f700fe26ffbc3b223fbc8b43f2c82c7386979319056be3db50e90ce0");
    }
    catch (err) {
        return error(400, "Bad Request");
    }
    // Handle the event
    switch (event.type) {
        case "charge.succeeded":
            const chargeSucceeded = event.data.object;
            // Then define and call a function to handle the event charge.succeeded
            break;
        case "payment_intent.created":
            const paymentIntentCreated = event.data.object;
            // Then define and call a function to handle the event payment_intent.created
            break;
        case "payment_intent.succeeded":
            const paymentIntentSucceeded = event.data.object;
            console.log("payment completed", paymentIntentSucceeded);
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    return { received: true };
});

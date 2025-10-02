/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });
// stripe
const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp();

exports.createCheckoutSession = onRequest(
    { secrets: ['STRIPE_SECRET_KEY'] }, // Declare secret usage
    async (req, res) => {
        return cors(req, res, async () => {
            // Initialize Stripe with environment variable
            const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

            if (req.method !== 'POST') {
                return res.status(405).json({error: 'Method not allowed'});
            }

            try {
                const { cartItems, successUrl, cancelUrl } = req.body;

                if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
                    return res.status(400).json({error: 'Cart items are required'});
                }

                // TODO: Fix the product data structure
                const line_items = cartItems.map((item) => ({
                    price_data: {
                        currency: 'cad',
                        product_data: {
                            name: item.name,
                            description: item.description || '',
                            images: item.src ? [item.src] : [],
                        },
                        unit_amount: Math.round(item.price * 100),
                    },
                    quantity: item.quantity || 1,
                }));

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'payment',
                    line_items: line_items,
                    success_url: successUrl,
                    cancel_url: cancelUrl ,
                    metadata: {
                        cartItems: JSON.stringify(cartItems.map((i) => ({
                            id: i.id,
                            quantity: i.quantity,
                        }))),
                    },
                });
                return res.status(200).json({
                    url: session.url,
                    sessionId: session.id,
                });
            } catch (error) {
                console.error('Error creating checkout session:', error);
                return res.status(500).json({
                    error: error.message,
                });
            }
        });
    },
);

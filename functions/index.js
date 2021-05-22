const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { default: Payment } = require("../src/Payment");
const stripe = require("stripe")(
  "sk_test_51Ishr5CanKdvwQ1k5L8Kn6dsxPDVaJEIzZf6OhOYe3XNjMfAzQFhdj4lZgd29PQE8Z3Fuqyfycm7srR2rUPe06L000lv7k7MaW"
);

// API

// - App config
const app = express();

// - Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!!!! for this amount >>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  // OK - CREATED
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/leon", (request, response) =>
  response.status(200).send("This is my very first endpoint")
);

// - Listen Command
exports.api = functions.https.onRequest(app);

// Example Endpoint
//http://localhost:5001/clone-20100/us-central1/api

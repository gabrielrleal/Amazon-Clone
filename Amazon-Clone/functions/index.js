const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

//App config

const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API Routes
app.get("/", (request, response) =>
  response.status(200).send("hello world get successfully")
);
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("payment request received>>>>this amoung>>>>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//Listen command

exports.api = functions.https.onRequest(app);

//(http://localhost:5001/challenge-e5509/us-central1/api).

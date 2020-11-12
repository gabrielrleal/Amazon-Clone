import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckoutProduct from "../components/CheckoutProduct";
import { useStateValue } from "../StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../styles/pages/Payment.css";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import axios from "../axios";
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the special stripe secret that allows to charge a costumer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
  }, [basket]);

  const handleSubmit = async (event) => {
    //stripe
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment;
  };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div>
      <div className="payment">
        <div className="payment__container">
          <h1>
            Checkout (<Link to="/checkout">{basket?.length} items </Link>)
          </h1>

          <div className="payment__section">
            <div className="payment__title">
              <h3>delivery adress</h3>
            </div>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>Cocó </p>
              <p>Fortaleza, CE</p>
            </div>
          </div>

          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items and delivery</h3>
            </div>
            <div className="payment__items">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  reating={item.reating}
                />
              ))}
            </div>
          </div>

          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

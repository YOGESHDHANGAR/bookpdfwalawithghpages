import React, { useEffect } from "react";
import "./Bookpdfdetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getSingleBookpdfAction } from "../../redux/actions/bookpdfAction";
import { BASE_URL } from "../BaseUrlContanst/Baseurlconstant";

const Bookpdfdetails = () => {
  const dispatch = useDispatch();
  const { bookpdf_id } = useParams();

  const { getsinglebookpdf, loading } = useSelector(
    (state) => state.getsinglebookpdf
  );

  const checkoutHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${BASE_URL}/api/v1/getkey`);

    const myForm = new FormData();
    myForm.set("amount", 5);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/checkout`,
      myForm,
      config
    );

    const razorpayInstanceOrders_id = data.razorpayInstanceOrders.id;

    const options = {
      key,
      amount: 500,
      currency: "INR",
      name: "Yogesh Dhangar",
      description: "BookStore Payment",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: razorpayInstanceOrders_id,
      callback_url: `${BASE_URL}/api/v1/paymentverification/${bookpdf_id}`,
      prefill: {
        name: "Yogesh Dhangar",
        email: "vijay45155@gmail.com",
        contact: "9165607505",
      },
      notes: {
        address:
          "Village Chakeri, Tehsil Anjad, District Barwani, Madhya Pradesh, India",
      },
      theme: {
        color: "#121212",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    dispatch(getSingleBookpdfAction(bookpdf_id));
  }, [dispatch, bookpdf_id]);

  return (
    <div className="productdetails_and_payment_container">
      <div className="productdetails_card_container">
        {loading === false && (
          <div className="productdetails_card">
            <img src={getsinglebookpdf.image} />
            <h2 className="productdetails_name">{getsinglebookpdf.name}</h2>
            <h2 className="productdetails_price">
              Price: ₹{getsinglebookpdf.price}
            </h2>
            <p className="productdetails_description">
              If you create a folder names images and put an image named
              mypic.jpg into it, then you can reference its path like
            </p>
          </div>
        )}
      </div>
      <div className="payment_container">
        <h1 onClick={checkoutHandler}>Pay To Download PDF</h1>
      </div>
    </div>
  );
};

export default Bookpdfdetails;

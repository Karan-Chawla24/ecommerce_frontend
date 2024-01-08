import React from "react";
import "../stylesheets/success.css";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { reference_id } = useParams();
  return (
    <div className="success-body">
      <div className="card">
        <div className="border border-r-gray-200 h-52 w-52 bg-white m-auto">
          <i className="checkmark">✓</i>
        </div>
        <h1>Success</h1>
        <p>
          We received your purchase request;
          <br /> we'll be in touch shortly!
          <br /> OrderID: {reference_id}
        </p>
      </div>
      <Link
        to={"/getAllProducts"}
        className="flex font-semibold text-indigo-600 text-sm mt-10 justify-center"
      >
        <svg
          className="fill-current mr-2 text-indigo-600 w-4"
          viewBox="0 0 448 512"
        >
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
        Continue Shopping
      </Link>
    </div>
  );
};

export default PaymentSuccess;

import { delay } from "@reduxjs/toolkit/dist/utils";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { totalAmountSelector } from "../../domain/cart/cartSlice";
import { useAppSelector } from "../../store.hooks";

const OrderPlacedSuccessful = (): JSX.Element => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const totalAmount = useAppSelector(totalAmountSelector);

  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto my-20">
      <div className="card-body">
        <h2 className="card-title">Order Placed SuccessFully!</h2>
        <h2 className="card-title">Order ID : 32456</h2>
        <p className="text-2xl self-center">{`${state.state.firstName} ${state.state.lastName}. Your order is successfully placed.`}</p>
        <p className="text-xl">{"Please pay at the time of delivery."}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary mt-8"
            onClick={() => navigate("/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-left mr-3"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            Continue to Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderPlacedSuccessful;

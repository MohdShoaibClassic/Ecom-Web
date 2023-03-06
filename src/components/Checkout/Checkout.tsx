import { delay } from "@reduxjs/toolkit/dist/utils";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  cartSelector,
  clearCart,
  removeFromCart,
  totalAmountSelector,
} from "../../domain/cart/cartSlice";
import { CartItem, CartState } from "../../domain/cart/types";
import { useAppDispatch, useAppSelector } from "../../store.hooks";

export const Checkout = () => {
  const [state, setState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    province: "",
    postalCode: "",
    phone: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart: CartState = useAppSelector(cartSelector);

  const handleInputChange = (event: {
    target: HTMLInputElement | HTMLSelectElement;
  }) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/orderplaced", {
      state: {
        state,
      },
    });
    dispatch(clearCart());
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const subTotal = useAppSelector(totalAmountSelector);
  const totalAmount = parseInt(subTotal);
  const shipping = 5.0;
  const taxes = 5.52;
  const total = (totalAmount + shipping + taxes).toFixed(2);

  return (
    <div className="flex m-8 bg-gray-200 border rounded-lg  ">
      <div className="my-8 mx-auto  p-6  w-fit">
        <form onSubmit={handleSubmit}>
          <div className="block">
            <div className="text-2xl mb-8">Contact Information</div>
            <div className="text-xl mb-4">Email</div>
            <input
              type="text"
              placeholder="Enter Email"
              className="input w-full mb-8"
              onChange={handleInputChange}
              name="email"
              value={state.email}
            />
          </div>
          <div className="divider"></div>
          <div className="block">
            <div className="text-2xl mb-8">Shipping Information</div>
            <div className="flex gap-8">
              <div className="block">
                <div className="text-xl mb-4">First Name</div>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="input w-full max-w-xs  mb-8"
                  onChange={handleInputChange}
                  name="firstName"
                  value={state.firstName}
                />
              </div>
              <div className="block">
                <div className="text-xl mb-4">Last Name</div>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="input w-full max-w-xs  mb-8"
                  onChange={handleInputChange}
                  name="lastName"
                  value={state.lastName}
                />
              </div>
            </div>
            <div className="text-xl mb-4">Company</div>
            <input
              type="text"
              placeholder="Enter Company"
              className="input w-full mb-8"
              onChange={handleInputChange}
              name="company"
              value={state.company}
            />
            <div className="text-xl mb-4">Address</div>
            <input
              type="text"
              placeholder="Enter Address"
              className="input w-full mb-8"
              onChange={handleInputChange}
              name="address"
              value={state.address}
            />
            <div className="text-xl mb-4">Apartments</div>
            <input
              type="text"
              placeholder="Enter Apartments"
              className="input w-full mb-8"
              onChange={handleInputChange}
              name="apartment"
              value={state.apartment}
            />
            <div className="flex gap-8">
              <div className="block">
                <div className="text-xl mb-4">City</div>
                <input
                  type="text"
                  placeholder="Enter City"
                  className="input w-full mb-8"
                  onChange={handleInputChange}
                  name="city"
                  value={state.city}
                />
              </div>
              <div className="block">
                <div className="text-xl mb-4">Country</div>
                <select
                  className="select w-full"
                  onChange={handleInputChange}
                  name="country"
                  value={state.country}
                >
                  <option disabled selected>
                    Select Country
                  </option>
                  <option>United States</option>
                  <option>India</option>
                  <option>Canada</option>
                  <option>UAE</option>
                  <option>Australia</option>
                </select>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="block">
                <div className="text-xl mb-4">State/Province</div>
                <input
                  type="text"
                  placeholder="Enter State/Province"
                  className="input w-full mb-8"
                  onChange={handleInputChange}
                  name="province"
                  value={state.province}
                />
              </div>
              <div className="block">
                <div className="text-xl mb-4">Postal code</div>
                <input
                  type="text"
                  placeholder="Enter Postal code"
                  className="input w-full max-w-xs  mb-8"
                  onChange={handleInputChange}
                  name="postalCode"
                  value={state.postalCode}
                />
              </div>
            </div>
            <div className="text-xl mb-4">Phone</div>
            <input
              type="number"
              placeholder="Enter Phone"
              className="input w-full mb-8"
              onChange={handleInputChange}
              name="phone"
              value={state.phone}
            />
          </div>
          {cart.cartItems.length > 0 && (
            <button className="btn btn-primary w-full" type="submit">
              Confirm Order
            </button>
          )}
        </form>
        {cart.cartItems.length <= 0 && (
          <div>
            <button className="btn btn-primary w-full opacity-50 cursor-not-allowed">
              Confirm Order
            </button>
            <Link to="/">
              <div className="text-xl font-medium my-8">
                Please add products in cart first...
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="my-8 mx-auto  p-6  w-fit">
        {cart.cartItems.length > 0 && (
          <div className="text-2xl mb-8">Order Summary</div>
        )}
        <div className="bg-white border rounded-lg shadow-md ">
          {cart.cartItems &&
            cart.cartItems.map((cartItem) => (
              <div key={cartItem.id} className="p-8 border">
                <div className="flex gap-2">
                  <img
                    className="h-40 w-36"
                    src={cartItem.image && cartItem.image}
                    alt={cartItem.name}
                  />
                  <div className="w-80 p-4">
                    <div className="flex justify-between">
                      <h3 className="text-md">{cartItem.title}</h3>
                      <div>
                        <button
                          style={{
                            backgroundColor: "#FFF",
                            border: "1px solid #FFF",
                          }}
                          onClick={() => handleRemoveFromCart(cartItem)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between mt-12">
                      <div className="text-xl">${cartItem.price}</div>
                      <div className="text-xl">{cartItem.cartQuantity}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {cart.cartItems.length > 0 && (
            <div className="border">
              <div className="px-8 py-4 flex justify-between">
                <div className="text-2xl">Subtotal</div>
                <div className="text-2xl">${totalAmount}</div>
              </div>
              <div className="px-8 py-4 flex justify-between">
                <div className="text-2xl">Shipping</div>
                <div className="text-2xl">${shipping}</div>
              </div>
              <div className="px-8 py-4 flex justify-between">
                <div className="text-2xl">Taxes</div>
                <div className="text-2xl">${taxes}</div>
              </div>
            </div>
          )}
          {cart.cartItems.length > 0 && (
            <div className="px-8 py-4 flex justify-between border">
              <div className="text-2xl">Total</div>
              <div className="text-2xl">${total}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

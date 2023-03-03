import { cartSelector, removeFromCart, totalAmountSelector } from "./cartSlice";
import { Link } from "react-router-dom";
import { CartItem, CartState } from "./types";
import { useAppDispatch, useAppSelector } from "../../store.hooks";
import { total } from "../../utils/total";

const CartPage = (): JSX.Element => {
  const cart: CartState = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const totalAmount = useAppSelector(totalAmountSelector);

  return (
    <div className="py-8 px-16">
      <h2 className="text-3xl text-center font-medium mb-8">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className=" text-2xl flex flex-col items-center mt-4 text-gray-500">
          <p>Your cart is currently empty</p>
        </div>
      ) : (
        <div>
          <div className="grid items-center grid-cols-4 gap-2 text-center mb-4 pb-4 border-b-2 shadow-lg text-2xl text-black">
            <h3>Product</h3>
            <h3>Price</h3>
            <h3>Quantity</h3>
            <h3>Remove</h3>
          </div>
          <div>
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div
                  className="grid items-center grid-cols-4 gap-2 text-center  py-4 shadow-lg"
                  key={cartItem.id}
                >
                  <div className="flex flex-col items-center">
                    <img
                      className="h-60 w-44"
                      src={cartItem.image && cartItem.image}
                      alt={cartItem.name}
                    />
                    <div>
                      <h3 className="text-2xl p-4">{cartItem.title}</h3>
                    </div>
                  </div>
                  <div className="text-2xl">${cartItem.price}</div>
                  <div>
                    <div className="text-2xl">{cartItem.cartQuantity}</div>
                  </div>
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
                        width="35"
                        height="35"
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
              ))}
          </div>
          <div className="border-t-2">
            <div className="flex justify-between gap-8 mt-8 text-2xl font-bold items-center">
              <div className="flex justify-center gap-8  text-2xl font-bold">
                <span>Total</span>
                <span>${totalAmount}</span>
                <span>(Please pay at the time of delivery.)</span>
              </div>
              <Link to="/checkout">
                <button className="flex gap-4 btn btn-primary">
                  Go For checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

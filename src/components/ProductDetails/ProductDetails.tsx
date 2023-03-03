import React from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../../domain/products/types";
import { addToCart } from "../../domain/cart/cartSlice";
import { useAppDispatch } from "../../store.hooks";

const ProductDetails = (): JSX.Element => {
  const location = useLocation();
  const { product } = location.state;
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl  m-10 p-10">
      <figure>
        <img src={product.image} alt="Album" />
      </figure>
      <div className="card-body w-fit">
        <h2 className="card-title text-3xl">{product.title}</h2>
        <div className="text-3xl  pb-10">{product.description}</div>
        <div className="card-actions justify-between">
          <h2 className="text-3xl">${product.price}</h2>
          <button
            className="btn btn-primary"
            onClick={() => handleAddToCart(product)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;

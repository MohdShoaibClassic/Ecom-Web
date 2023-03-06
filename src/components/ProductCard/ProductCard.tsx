import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../domain/products/types";
import { addToCart } from "../../domain/cart/cartSlice";
import { useAppDispatch } from "../../store.hooks";
/* 
  We would define the structure of the props in the same file as the component.
  Since, this component has the same props as Type Book, we would assign it to it props.
*/
type ProductProps = Product;

export const ProductCard = (product: ProductProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  
  return (
    <div
      key={product.id}
      className="card card-compact w-96 bg-base-100 shadow-xl space-x-4 m-4 p-4"
    >
      <Link to={`/productdetails/${product.id}`} state={{ product: product }}>
        <figure>
          <img
            className="h-60"
            src={product.image && product.image}
            alt={product.name}
          />
        </figure>
      </Link>
      <div className="card-body">
        <div className="flex items-center justify-between text-xl h-20 mt-8">
          <h2 className="card-title">{product.title}</h2>
        </div>
        <span className="text-xl my-4 font-medium">${product.price}</span>
        <div className="card-actions justify-end mt-4">
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

import { productsSelector, getProducts } from "./productsSlice";
import { Product } from "./types";
import { ProductCard } from "../../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../../store.hooks";
import { useEffect } from "react";

const ProductsPage: React.FunctionComponent = () => {
  const { products: products, loading } = useAppSelector(productsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const renderContent = () => {
    if (loading === "loading") {
      return (
        <div className="flex items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      );
    }

    if (loading === "error") {
      return <p>Unexpected error occured...</p>;
    }

    return (
      <>
        <h2 className="text-3xl text-center font-medium">
          New Products Arrivals
        </h2>
        <div className="flex justify-between flex-wrap mt-6">
          {products &&
            products?.map((product: Product) => (
              <ProductCard {...product} key={product.id} />
            ))}
        </div>
      </>
    );
  };

  return <div className="py-8 px-4">{renderContent()}</div>;
};

export default ProductsPage;

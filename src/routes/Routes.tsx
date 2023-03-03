import { Route, Routes as Switch } from "react-router-dom";
import Checkout from "../components/Checkout/Checkout";
import OrderPlacedSuccessful from "../components/OrderPlaced/OrderPlacedSuccessful";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import CartPage from "../domain/cart/CartPage";
import ProductsPage from "../domain/products/ProductsPage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/" element={<ProductsPage />} />
      <Route path="/productdetails/:id" element={<ProductDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orderplaced" element={<OrderPlacedSuccessful />} />
    </Switch>
  );
};
export default Routes;

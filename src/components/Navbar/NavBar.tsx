import { NavLink } from "react-router-dom";
import { totalItemsCount } from "../../domain/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store.hooks";
const NavBar = (): JSX.Element => {
  const totalCount = useAppSelector(totalItemsCount);
  return (
    <nav className="flex items-center bg-gray-500 justify-between p-4 text-3xl">
      <NavLink className="text-white" to="/">
        <h2>ECOM </h2>
      </NavLink>
      <input
        type="text"
        placeholder="Search Products"
        className="input input-bordered w-full max-w-xs"
      />
      <NavLink className="focus:underline text-white" to="/cart">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {totalCount}
              </span>
            </div>
          </label>
        </div>
      </NavLink>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { useDispatch } from "react-redux";
import { CartItems } from "../Actions";
import { updateCart, DeleteCart } from "../Actions";

// Component for each item in cart
export default function Cart({ item }) {
  const dispatchPlus = useDispatch();
  const dispatchMinus = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchDelete = useDispatch();
  // increase quantity of product
  function handlePlus(item) {
    item.qty += 1;
    dispatchPlus(updateCart(item));
    dispatchTotal(CartItems());
  }
  // decrease quantity of product
  function handleMinus(item) {
    if (item.qty > 1) {
      item.qty -= 1;
      dispatchMinus(updateCart(item));
      dispatchTotal(CartItems());
    }
  }
  // delete product from cart
  function handleCancel(item) {
    dispatchDelete(DeleteCart(item));
    dispatchTotal(CartItems());
  }
  return (
    <>
      {/* items added to Cart  */}
      <div className="d-flex container-sm p-3 bg-white  gap-5">
        {/* left part  */}
        <img
          src={item.thumbnail}
          alt="error"
          id="card-image "
          style={{ width: "60%", height: "10rem", objectFit: "cover" }}
        />
        {/* right-part  */}
        <div
          className="d-flex flex-column gap-3 justify-content-center "
          style={{ width: "100%", marginLeft: "20px" }}
        >
          <h5>{item.title}</h5>
          <h6 className="text-success">
            <span className="text-danger">Price:</span>
            <span>&#8377;</span>
            {item.price}
          </h6>

          <div className="d-flex gap-4 mt-4">
            <img
              src="https://freeiconshop.com/wp-content/uploads/edd/minus-flat.png"
              alt="error"
              width={"30rem"}
              height={"30rem"}
              onClick={() => handleMinus(item)}
            />
            <h6 className=" border border-0 border-dark px-1 pt-2">
              {item.qty}
            </h6>

            <img
              src="https://www.svgrepo.com/show/157858/plus.svg"
              alt="error"
              width={"30rem"}
              height={"30rem"}
              onClick={() => handlePlus(item)}
            />

            <div className="d-flex gap-4  ">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => handleCancel(item)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

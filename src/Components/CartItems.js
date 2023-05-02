import React from "react";
import Cart from "./Cart";
import styled from "styled-components";
import { useSelector } from "react-redux";

// Creating a styled component - PriceDetail
const PriceDetail = styled.div`
  width: 45%;
  height: fit-content;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

export default function () {
  // Using useSelector hook to get the 'cart' and 'totalCart' from the store
  let CartItem = useSelector((state) => state.cart);
  let totalItem = useSelector((state) => state.totalCart);

  // Calculating the total price of the items in the cart using reduce method
  let totalPrice = CartItem.reduce((total, item) => {
    return (total += item.price * item.qty);
  }, 0);

  // Calculating the total discount of the items in the cart using reduce method
  let totalDiscount = CartItem.reduce((total, item) => {
    return (total += (item.price * item.qty * item.discountPercentage) / 100);
  }, 0);

  // If cart is empty, then display a message
  if (CartItem.length === 0)
    return <h1 className="text-center mt-5">Your cart is empty</h1>;

  // Otherwise, display the cart items and the price details
  return (
    <div className=" container-sm d-flex flex-column flex-lg-row mt-4 gap-3 ">
      {/* Cart items section */}
      <div className="d-flex flex-column gap-3">
        {CartItem.map((item) => (
          <Cart item={item} key={item.id} />
        ))}
      </div>

      {/* Price details section */}
      <PriceDetail className="bg-white p-5 d-flex flex-column gap-2 ">
        <span className="fs-4  pb-2 fw-bold">Price Details</span>
        <hr className="mt-0" />
        <div className="d-flex justify-content-between">
          <span>Price({totalItem} items)</span>
          <span><span>&#8377;</span>{totalPrice}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Discount</span>
          <span><span>&#8377;</span>{Math.floor(totalDiscount)}</span>
        </div>
        <div className="d-flex justify-content-between ">
          <span className="">Delivery Charges</span>
          <h6 className="text-success">Free</h6>
        </div>
        <hr className="mb-0" />
        <div className="d-flex justify-content-between mt-3">

          <h5>Total Amount</h5>
          <h5 className="text-success"><span>&#8377;</span>{totalPrice - Math.floor(totalDiscount)}</h5>
        </div>

        <div className="position-relative">
          <button className=" position-absolute top-0 end-0 btn btn-warning">Proceed to Buy</button>
        </div>
      </PriceDetail>
    </div>
  );
}

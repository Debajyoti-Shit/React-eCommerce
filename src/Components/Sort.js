import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addproducts } from "../Actions";

export default function Sort() {
  // Define flag state 
  const [flag, setflag] = useState(false);

  // Get the products state from the store
  const products = useSelector((state) => state.products);

  // Get dispatch functions for adding products (sorted and unsorted)
  const dispatchSort = useDispatch();
  const dispatchCancel = useDispatch();

  // Define function to sort the products and update the store with the sorted products
  function handleSort() {
    let sortedData = products.sort((a, b) => a.price - b.price);
    dispatchSort(addproducts([...sortedData]));
    setflag(true);
  }

  // Define function to cancel the sort and update the store with the original products
  function cancelSort() {
    let products = JSON.parse(window.localStorage.getItem("products"));
    dispatchCancel(addproducts([...products]));
    setflag(false);
  }

  // Render the Sort component
  return (
    <div className="align-self-end">
      <div
        className="bg-white p-2 rounded-5  d-flex justify-content-around"
        style={style}
      >

        {/* Show a "Sort by Price" button that triggers the sort function when clicked */}
        <span className="fw-bold " onClick={() => handleSort()}>
          Sort by Price
        </span>

        {/* Show a cancel button when the products are sorted */}
        {flag && (
          <span>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWFntcWBEUs8GXR2NGvYddqKxoT-H5n4PBd_Qm_iaIPsrOEWIKaWYL7F3ft92M6ZTWd6Q&usqp=CAU"
              alt="error"
              width={"22rem"}
              onClick={() => cancelSort()}
              style={{ cursor: "pointer"}}
            />
          </span>
        )}
      </div>
    </div>
  );
}

// Define the style for the sort button
const style = {
  width: "9rem",
  cursor: "pointer",
};

import React from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import Sort from "./Sort";

export default function ProductItemList({ }) {
  // use the useSelector hook to get the product data from the redux store
  const data = useSelector((state) => state.products);

  // if the data is empty, show a spinner indicating that data is being loaded
  if (data.length == 0) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div
          className="spinner-border"
          style={{ width: "5rem", height: "5rem", alignItems: "center", justifyContent: "center", marginTop: "15%", color: "#fa8211" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    // otherwise, show the Sort component and the list of ProductItems
    return (
      <div className="d-flex flex-column container-sm mt-4">
        <Sort />
        {data.map((item) => (
          <ProductItem item={item} key={item.title} />
        ))}
      </div>
    );
  }
}

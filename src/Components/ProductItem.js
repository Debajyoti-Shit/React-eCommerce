import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicRating from "./BasicRating";
import { ProductToview, addproducts } from "../Actions";
import { useNavigate } from "react-router-dom";
import { addCart, CartItems } from "../Actions";
import { useState } from "react";
import customFetch from "../apiCall";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../Notification/notify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductItem({ item }) {
  // Define state variables for the item being added to cart and the product properties.
  const [addedItem, setaddedItem] = useState(true);
  const [title, settitle] = useState(item.title);
  const [price, setprice] = useState(item.price);
  const [rating, setrating] = useState(item.rating);
  const [description, setdescription] = useState(item.description);

  // Get the products from the Redux store and define dispatch functions.
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchProduct = useDispatch();

  // Function to handle clicks on the product item.
  function handleClick(item) {
    // Dispatch an action to add the item to the view and navigate to the product details page.
    dispatch(ProductToview(item));
    navigate(`/productdetails/${item.id}`);
  }

  // Function to handle adding items to the cart.
  function handleCart(item) {
    // If the item has not been added to the cart yet, set its quantity to 1 and 
    //dispatch an action to add it to the cart.
    if (addedItem) {
      item.qty = 1;
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      setaddedItem(false);
      showToastMessage("item Added to cart", "success");
    } // If the item has already been added to the cart, navigate to the cart page.
    else {
      navigate("/cart");
    }
  }

  // Function to handle editing a product.
  function handleEdit(item) {
    // Set the item's "edit" property to false and 
    //dispatch an action to update the products array in the Redux store.
    item.edit = false;
    dispatchProduct(addproducts([...products]));
  }


  // Function to handle deleting a product.
  function handleDelelteProduct(item) {
    // Send a DELETE request to the API and remove the product from the products array in the Redux store.
    let url = `https://my-json-server.typicode.com/Debajyoti-Shit/dummy-ecommerce-api/products/${item.id}`;
    let result = customFetch(url, { method: "DELETE" });

    let index = products.indexOf(item);
    products.splice(index, 1);
    dispatchProduct(addproducts([...products]));
    showToastMessage("item deleted", "warning");
  }
  // Function to cancel editing a product.
  function handleCancel(item) {
    // Set the item's "edit" property to true and 
    //dispatch an action to update the products array in the Redux store.
    item.edit = true;
    dispatchProduct(addproducts([...products]));
  }
  // Function to save changes made to a product.
  function handleSave(item) {
    // Send a PUT request to the API with the updated product information and 
    //update the products array in the Redux store.
    let url = `https://my-json-server.typicode.com/Debajyoti-Shit/dummy-ecommerce-api/products/${item.id}`;
    let result = customFetch(url, {
      body: {
        ...item,
        title,
        price,
        rating,
        description,
        edit: true,
      },
      method: "PUT",
    });
    result.then((data) => {
      let index = products.indexOf(item);
      products[index] = data;

      dispatchProduct(addproducts([...products]));
      showToastMessage("Edit suceesful", "success");
    });
  }
  return (
    //   container
    <div className="d-flex container-sm bg-white px-1 py-5 mt-4 flex-column flex-lg-row gap-3">
      {/* left section  */}
      <ToastContainer />
      <div className="d-flex container-sm gap-5">
        <img
          src={item.thumbnail}
          alt=""
          width={"200rem"}
          onClick={() => handleClick(item)}
        />
        {/* right-part Content  */}
        <div className="d-flex flex-column gap-1">
          {item.edit ? (
            <h5>{item.title}</h5>
          ) : (
            <input
              type="text"
              value={title}
              className="w-50"
              onChange={(e) => settitle(e.target.value)}
            ></input>
          )}
          {item.edit ? (
            <h6 className="text-success"><span>&#8377;</span>{item.price}</h6>
          ) : (
            <input
              type="text"
              value={price}
              className="w-50"
              onChange={(e) => setprice(e.target.value)}
            ></input>
          )}
          {item.edit ? (
            <BasicRating value={item.rating} />
          ) : (
            <div>
              <h5>Ratings:</h5>
              <input
                type="number"
                max={"5"}
                min={"0"}
                value={rating}
                step={"0.5"}
                onChange={(e) => setrating(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      {/* right section  */}
      <div className="p-2">
        {item.edit ? (
          <span>{item.description}</span>
        ) : (
          <div className="form-floating">
            <textarea
              className="form-control"
              value={description}
              id="floatingTextarea"
              style={{ width: "20rem", height: "5rem" }}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
      {/* footer section  */}
      <div className="align-self-end d-flex align-items-center gap-4 flex-lg-grow-1 p-3">
        {item.edit ? (
          <button
            type="button"
            className="btn btn-warning"
            style={{
              width: "9rem",
            }}
            onClick={() => handleCart(item)}
          >
            {addedItem ? "ADD TO CART" : "GO TO CART"}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleCancel(item)}
          >
            Cancel
          </button>
        )}

        {item.edit ? (
          <>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3196/3196909.png"
                alt="error"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(item)}
              />
            </span>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3817/3817209.png"
                alt="error"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleDelelteProduct(item)}
              />

            </span>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => handleSave(item)}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}

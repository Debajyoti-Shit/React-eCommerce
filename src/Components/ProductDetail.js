import React from "react";
import BasicRating from "./BasicRating";
import { addCart, CartItems } from "../Actions";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from "../Notification/notify";

export default function ProductDetail({ item }) {
  // useDispatch is a hook from React-Redux that returns a reference to the store's dispatch function
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();

  function handleClick(item) {
    if (!item.qty) {
      item.qty = 1;

      // Dispatching actions to add items to the cart and update the total cart items count
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());

      // Showing a toast notification to inform the user that the item was successfully added to the cart
      showToastMessage("item Added to cart", "success");
    } else {
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      showToastMessage("item Added to cart", "success");
    }
  }
  return (
    // Product detail container
    <div className="container-sm d-flex flex-lg-row  flex-column mt-4 gap-5">
      {/* left side  */}
      <ToastContainer />
      {item.images ? (
        <div
          className=" border border-1 "
          style={{ width: "100%", objectFit: "cover" }}
        >
          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            style={{ height: "100%" }}
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              {item.images[0] && (
                <div className="carousel-item active" data-bs-interval="10000">
                  <img
                    src={item.images[0]}
                    className="d-block w-100 "
                    alt="error"
                    style={{ height: "38rem" }}
                  />
                </div>
              )}
              {item.images[1] && (
                <div className="carousel-item" data-bs-interval="2000">
                  <img
                    src={item.images[1]}
                    className="d-block w-100"
                    alt="error"
                    style={{ height: "38rem" }}
                  />
                </div>
              )}

              {item.images[2] && (
                <div className="carousel-item">
                  <img
                    src={item.images[2]}
                    className="d-block w-100"
                    alt="error"
                    style={{ height: "38rem" }}
                  />
                </div>
              )}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      ) : (
        <img src={item.thumbnail} alt="error" id="detailAddedImage" />
      )}
      {/* right side  */}

      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column gap-2">
          <h5>{item.title}</h5>
          <span>
            <BasicRating value={item.rating} />
          </span>
          <div className="d-flex gap-3 ">
            <h6 className="text-success">
              <span className="text-danger">Price:</span> <span>&#8377;</span>{item.price}
            </h6>
            <h6 className="text-danger">
              Discount:
              <span className="text-success">
                {item.discountPercentage ? item.discountPercentage : ""}%
              </span>
            </h6>
          </div>
          <h6 className="text-danger">
            Category:<span className="text-success">{item.category}</span>
          </h6>
        </div>
        <div className="d-flex flex-column gap-3">
          <h6 className="text-danger">
            {" "}
            Stocks:
            <span className="text-success">{item.stock ? item.stock : ""}</span>
          </h6>
          <span>{item.description}</span>
        </div>

        <div className="align-self-end">
          <div
            type="image"
            style={{
              width: "10rem",
              height: "5rem",
              backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/019/787/040/small/add-to-cart-icon-add-to-card-button-on-transparent-background-free-png.png')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              cursor: 'pointer'
            }}
            onClick={() => handleClick(item)}
          >
            {/* Add to Cart */}
          </div>
        </div>
      </div>
    </div>
  );
}

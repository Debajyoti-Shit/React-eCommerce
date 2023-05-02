import { getDefaultNormalizer } from "@testing-library/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Nav() {

  // Use the useNavigate hook to enable navigation
  const navigate = useNavigate();

  // Use the useSelector hook to access data from the Redux store
  let total = useSelector((state) => state.totalCart);

  return (
    // Create the navigation bar
    <nav
      className="navbar navbar-expand-lg p-2 align-items-center"
      style={style.nav}
    >
      <div className="container-fluid">

        {/* Add a logo image to the navbar */}
        <img className="navbar-brand fs-3" style={style.logo} src="https://www.freepnglogos.com/uploads/shopping-bag-png/shopping-bag-plaseto-bag-plaseto-bags-manufacturer-west-bengal-17.png"></img>

        {/* Add the heading of the navbar */}
        <a className="navbar-brand fs-3" href="#" style={style.navHead}>
          e-Commerce
        </a>
        {/* Add a button to toggle the navbar */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Add the navigation links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active text-light" href="#">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addproducts" className="nav-link active text-light">
                Add product
              </Link>
            </li>
          </ul>

          {/* Add the shopping cart icon */}
          <div className="d-flex gap-5 position-relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3501/3501047.png"
              alt="error"
              width={"40rem"}
              onClick={() => navigate("/cart")}
              style={{ cursor: "pointer" }}
            />

            {/* Add a badge with the total number of items in the cart */}
            {total ? (
              <p
                className="bg-white rounded-circle position-absolute d-flex align-items-center justify-content-center"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  top: "21%",
                  left: "20%",
                }}
              >
                {total}
              </p>
            ) : (
              ""
            )}
            {/* Add the user avatar icon */}
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"
              alt="error"
              width={"40rem"}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

// Define the styles for the navbar
const style = {
  nav: {
    backgroundColor: "var(--nav)",
  },
  navHead: {
    fontFamily: "var(--fontStyle)",
    color: "#fa8211",
  },
  logo: {
    height: 40,
    width: 30
  }
};
// #9375b7

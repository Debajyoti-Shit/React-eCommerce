import Nav from "./Components/Nav";
import ProductDetail from "./Components/ProductDetail";
import AddProduct from "./Components/AddProduct";
import CartItems from "./Components/CartItems";
import ProductItemList from "./Components/ProductItemList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addproducts } from "./Actions/index";
import customFetch from "./apiCall";
import { useEffect } from "react";

// Define the main App component
function App() {
  // Get the itemToDisplay value from the Redux store
  let productDetailItem = useSelector((state) => state.itemToDisplay);

  // Define the URL for the API call
  const url = "https://my-json-server.typicode.com/Debajyoti-Shit/dummy-ecommerce-api/db";

  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Fetch data from the API and store it in local storage on component mount
  useEffect(() => {
    let response = customFetch(url, {
      method: "GET",
    });
    response.then((data) => {
      let modifiedData = data.products.map((item) => {
        item.edit = true;
        return item;
      });

      // Store the modified data in local storage
      window.localStorage.setItem("products", JSON.stringify(modifiedData));

      // Get the stored data from local storage
      let products = JSON.parse(window.localStorage.getItem("products"));

      // Dispatch an action to add the products to the Redux store
      dispatch(addproducts(products));
    });
  }, []);


  // Render the main App component
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<ProductItemList />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route
            path={`/productdetails/${productDetailItem.id}`}
            element={<ProductDetail item={productDetailItem} />}
          />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the main App component
export default App;

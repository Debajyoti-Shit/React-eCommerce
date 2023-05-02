import {
  Add_products,
  Add_cart,
  Product_view,
  Cart_items,
  update_cart,
  delete_cart
} from "../Actions";

// Initial state for the products reducer
let initialState = {
  products: [],
  cart: [],
  itemToDisplay: "",
  totalCart: 0,
};

// Reducer function for handling actions related to products
export default function products(state = initialState, actions) {

  switch (actions.type) {

    case Add_products:
      // Update the products array in the state with the provided products
      return {
        ...state,
        products: actions.products,
      };
      break;


    case Add_cart:
      // Check if the cart already contains the item being added
      let flag = state.cart.indexOf(actions.cart);

      if (flag !== -1) {
        // If the item already exists in the cart, increase its quantity by 1
        actions.cart.qty += 1;
        return {
          ...state,
        };
      }  // If the item is not already in the cart, add it to the cart array in the state
      else {
        return {
          ...state,
          cart: [actions.cart, ...state.cart],
        };
      }
      break;


    case Product_view:
      // Update the itemToDisplay in the state with the provided view item
      return {
        ...state,
        itemToDisplay: actions.view,
      };
      break;


    case Cart_items:
      // Calculate the total quantity of items in the cart
      let { cart } = state;
      let total = cart.reduce((total, item) => {
        return (total += item.qty);
      }, 0);

      // Update the totalCart in the state with the calculated total
      return {
        ...state,
        totalCart: total,
      };
      break;


    case update_cart:
      // Update the cart with the updated item
      let index = state.cart.indexOf(actions.updatedItem);
      let updatedCart = null;
      if (index !== -1) {
        state.cart[index] = actions.updatedItem;
        updatedCart = state.cart;
      }
      return {
        ...state,
        cart: [...updatedCart],
      };



    case delete_cart:
      // Remove the item from the cart based on its position
      let position = state.cart.indexOf(actions.item);
      state.cart.splice(position, 1);
      return {
        ...state,
      }
    default:
      return state;
  }
}

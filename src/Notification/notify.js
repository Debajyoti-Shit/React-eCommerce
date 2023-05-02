import { toast } from "react-toastify";

// Function to show a toast message using the React Toastify library
export const showToastMessage = (message, type) => {

  // Call the `toast` method of the `toast` object with the provided `message` and `type`
  toast[type](message, {

    // Set the position of the toast message
    position: toast.POSITION.TOP_RIGHT,

  });
};

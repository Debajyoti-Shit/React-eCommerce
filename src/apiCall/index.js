// This function performs a customized fetch request with additional options
const customFetch = async (url, { body, ...rest }) => {
  // Create the initial config object with the provided options
  const config = {
    ...rest,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  // If a request body is provided, stringify it and add it to the config
  if (body) {
    config.body = JSON.stringify(body);
  }
  try {
    // Send the fetch request with the provided URL and config
    let response = await fetch(url, config);
    let data = await response.json();

    // If data is available, return it
    if (data) {
      return data;
    } else {
      throw new Error("data not fetched");
    }
  } catch (error) {
    // Log any errors that occur during the fetch request

    console.log(error);
  }
};
export default customFetch;

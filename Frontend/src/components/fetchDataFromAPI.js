import axios from "axios";
async function fetchDataFromAPI(url) {
  try {
    let response = await axios.get(url);

    return { status: 1, responseData: response.data };
  } catch (err) {
    console.log("Error in fetching");
  }
  return { status: 0, msg: "Error in fetching" };
}

export default fetchDataFromAPI;

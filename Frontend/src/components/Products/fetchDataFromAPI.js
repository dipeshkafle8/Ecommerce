import axios from "axios";
async function fetchDataFromAPI(url) {
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log("Error in fetching" + err);
  }
  return { msg: "Error in fetching" };
}

export default fetchDataFromAPI;

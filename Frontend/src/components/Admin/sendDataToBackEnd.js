async function sendDataToTheBackEnd(obj) {
  try {
    let res = await fetch("http://localhost:3000/api/v1/products/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    res = await res.json();
    return res;
  } catch (err) {
    console.log("Error in sending request to BackEnd", err);
    return { status: 0, message: "Error in sending Data" };
  }
}
export default sendDataToTheBackEnd;
